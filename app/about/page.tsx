import s from './About.module.scss';

const AboutPage = () => (
  <div className={s.container}>
    <h1>About the project</h1>
    <p>
      This project is a demo of how to use MongoDB, Prisma and Clerk to build a fullstack Next.js app.
    </p>
    <p>
      And also, a useful resource for people looking for these courses :D
    </p>
    <p>
      It includes:
    </p>
    <ul>
      <li>Signup/login</li>
      <li>Listing the courses and basic sorting/filtering</li>
      <li>Protected pages</li>
      <li>Protected API routes</li>
      <li>As admins, we'll be able to manage the course listings</li>
      <li>Deploying the app to Vercel</li>
    </ul>
    <p>
      The source code for this project is available on <a href="https://github.com" target="_blank">GitHub</a>.
    </p>
  </div>
)

export default AboutPage;