import { SignUp } from "@clerk/nextjs";
import s from "./Signup.module.scss";

export default function SignupPage() {
  return (
    <main className={s.main}>
      <SignUp afterSignUpUrl="/courses" afterSignInUrl="/courses" />
    </main>
  );
}