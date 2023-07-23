import AuthContext from "@/src/AuthContext";
import { UserContext } from "@/src/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Navbar() {
  const context = useContext(UserContext);
  const { user, selectedSchool, logout } = useContext(AuthContext);
  const router = useRouter();
  return (
    <nav className="h-[48px] fixed w-full bottom-0 left-0 bg-blue-900 text-white flex justify-between items-center px-2 xs:relative xs:bg-transparent xs:text-black">
      <div className="flex gap-2">
        {user && selectedSchool ? (
          <Link href="/class-mgmt/">Classes</Link>
        ) : null}
        {user && selectedSchool ? (
          <Link href="/student-mgmt/">Students</Link>
        ) : null}
        {user && selectedSchool ? (
          <Link href="/report-mgmt/">Reports</Link>
        ) : null}
        {user && selectedSchool ? (
          <Link href="/school-mgmt/">Admin</Link>
        ) : null}
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
