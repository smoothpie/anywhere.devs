import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/communities",
    "/tools",
    "/investors",
    "/programs",
    "/grants",
    "/competitions",
    "/events",
    "/people",
    "/companies",
    "/courses/[courseId]",
    "/companies/:id",
    "/jobs/:id",
    "/membership",
    "/login",
    "/signup",
    "/api/auth/webhook",
    "/api/courses",
    "/api/courses/:id"
  ],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};