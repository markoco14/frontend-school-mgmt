import AuthContext from "@/src/AuthContext";
import { UserContext } from "@/src/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Navbar() {
  const context = useContext(UserContext);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  return (
    <nav className="h-[48px] flex justify-between items-center px-4">
      <div className="flex gap-2">
        <Link href="/">Home</Link>
        {user ? <Link href="/school-mgmt/">Schools</Link> : null}
        {user ? <Link href="/student-mgmt/">Students</Link> : null}
        {user ? <Link href="/report-mgmt/">Reports</Link> : null}
      </div>
      {user ? (
        <button
          onClick={() => {
            context.setUser();
            logout();
            router.push("/");
          }}
        >
          Log Out
        </button>
      ) : null}
    </nav>
  );
}
