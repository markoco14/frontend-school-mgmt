import { UserContext } from "@/src/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Navbar() {
  const context = useContext(UserContext);
  const router = useRouter();
  return (
    <nav className="h-[48px] flex justify-between items-center px-4">
      <div className="flex gap-2">
        <Link href="/">Home</Link>
        {context?.user ? <Link href="/school-mgmt/">Schools</Link> : null}
        {context?.user ? <Link href="/student-mgmt/">Students</Link> : null}
      </div>
      {context?.user ? (
        <button
          onClick={() => {
            context.setUser();
            router.push("/");
          }}
        >
          Log Out
        </button>
      ) : null}
    </nav>
  );
}
