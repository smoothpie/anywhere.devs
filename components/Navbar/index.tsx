"use client";
import Link from "next/link";
import s from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <Link href="/">
        <div className={s.companyName}>anywhere devs</div>
      </Link>
      <div className={s.links}>
        <Link href="/">Jobs</Link>
        <Link href="/companies">Companies</Link>
        {/* <Link href="/about">About</Link> */}
        {/* <Link href="/blog">Blog</Link> */}
        {/* <Link href="/membership">Newsletter</Link>
        <Link href="/jobs/new">
          <button>Post a job</button>
        </Link> */}
        {/* {isSignedIn ? (
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
        )} */}
      </div>
    </nav>
  )
}

export default Navbar;

