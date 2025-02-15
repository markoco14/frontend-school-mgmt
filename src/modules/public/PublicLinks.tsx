import Link from "next/link";
import { useRouter } from "next/router";

export default function PublicLinks() {
  const router = useRouter();
  return (
    <nav className="flex gap-4 h-[48px] items-center justify-end">
      <Link
        href="/"
        className={`${router.asPath === ""
          ? "underline decoration-blue-500 decoration-4 underline-offset-[6px]"
          : null
          }`}
      >
        Home
      </Link>
      <Link
        href="/signup"
        className={`${router.asPath === "signup"
          ? "underline decoration-blue-500 decoration-4 underline-offset-[6px]"
          : null
          }`}
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        className={`${router.asPath === "login"
          ? "underline decoration-blue-500 decoration-4 underline-offset-[6px]"
          : null
          }`}
      >
        Log In
      </Link>
    </nav>
  );
}