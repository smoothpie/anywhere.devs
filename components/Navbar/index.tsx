"use client";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import s from "./Navbar.module.scss";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <nav className={s.nav}>
      <Link href="/">
        <div className={s.companyName}>Coding school</div>
      </Link>
      <div className={s.links}>
        <Link href="/about">About</Link>
        <Link href="/courses">Courses</Link>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div className={s.authButtons}>
            <Link href="/login">
              <button>Log in</button>
            </Link>
            <Link href="/signup">
              <button>Sign up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;

