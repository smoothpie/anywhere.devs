import { SignIn } from "@clerk/nextjs";
import s from "./Login.module.scss";
 
export default function LoginPage() {
  return (
    <main className={s.main}>
      <SignIn afterSignInUrl="/courses" afterSignUpUrl="/courses" />
    </main>
  );
}