

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextResponse } from "next/server";
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '../../../../lib/prisma';

async function getUniqueUserName(originalUsername: string, num: number): Promise<string> {
  const username = num === 0 ? originalUsername : `${originalUsername}-${num}`;
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return await getUniqueUserName(originalUsername, num + 1);
  }

  return username
}

function formatUsername(username) {
  const pattern = /^[a-zA-Z0-9-_]+$/;

  if (pattern.test(username)) {
    return username;
  } else {
    return username.replace(/[^a-zA-Z0-9-_]/g, '');
  }
}
 
export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
  
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  const user: any = evt.data;
  console.log(user, 'USER')
 
  const eventType = evt.type;
  if (eventType === 'user.created') {
    console.log(`User ${user.id} was ${eventType}`);
    const existingUser = await prisma.user.findMany({
      where: { clerkId: user.id },
    });

    if (!existingUser.length) {
      const userEmail = user.email_addresses && user.email_addresses[0]?.email_address;
      let username;
      if (user.username) {
        username = user.username
      } else if (userEmail) {
        username = userEmail.split('@')[0].toLowerCase();
      } else {
        username = (user.first_name + user.last_name).toLowerCase();
      }
      const formattedUsername = formatUsername(username);
      // check if user with this username exists
      const finalUsername = await getUniqueUserName(formattedUsername, 0);

      let displayName;
      if (user.first_name && user.last_name) {
        displayName = `${user.first_name} ${user.last_name}`
      } else if (user.username) {
        displayName = user.username
      } else if (user.preferred_username) {
        displayName = user.preferred_username
      } else if (user.name) {
        displayName = user.name
      } else {
        displayName = userEmail && userEmail.split('@')[0] || ""
      }

      const createdUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          username: finalUsername,
          email: userEmail,
          avatar: user.profile_image_url,
        }
      })

      return NextResponse.json(createdUser, { status: 201 });
    }
  }

  if (eventType === 'user.updated') {
    return NextResponse.json("User updated", { status: 201 });
  }

  if (eventType === 'user.deleted') {
    await prisma.user.delete({
      where: { clerkId: user.id },
    });

    return NextResponse("User deleted", { status: 201 });
  }

  return NextResponse(null, { status: 200 });
}