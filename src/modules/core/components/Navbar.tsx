import { useUserContext } from "@/src/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, selectedSchool, logout } = useUserContext();
  const router = useRouter();
  
  return (
    <nav className="">
      {/* desktop nav */}
      <div className="hidden h-screen xs:flex flex-col gap-2 text-center bg-blue-900 text-gray-200">
        {user && (
          <>
            <Link
              href="/"
              className={`${
                router.pathname === "/"
                  ? "text-white underline decoration-2 underline-offset-4"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={`/profile/${user.user_id}`}
              className={`${
                router.pathname.includes("profile")
                  ? "text-white underline decoration-2 underline-offset-4"
                  : ""
              }`}
            >
              Profile
            </Link>
          </>
        )}

        {/* array1. some((item) => array2. includes(item)) */}
        {user &&
          user?.permissions.some((permission) => [1, 2].includes(permission)) &&
          selectedSchool && (
            // user.user_id === selectedSchool.owner_id && (
            <>
              <Link
                href="/curriculum/"
                className={`${
                  router.pathname.includes("curriculum")
                    ? "text-white underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Curriculum
              </Link>
              <Link
                href="/schedule/"
                className={`${
                  router.pathname.includes("schedule")
                    ? "text-white underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Schedule
              </Link>
              <Link
                href="/staff/"
                className={`${
                  router.pathname.includes("staff")
                    ? "text-white underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Staff
              </Link>
              <Link
                href="/classes/"
                className={`${
                  router.pathname.includes("classes")
                    ? "text-white underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Classes
              </Link>
              <Link
                href="/students/"
                className={`${
                  router.pathname.includes("students")
                    ? "text-white underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Students
              </Link>
              <Link
                href="/reports/"
                className={`${
                  router.pathname.includes("reports")
                    ? "text-white underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Reports
              </Link>
              <Link
                href="/manage"
                className={`${
                  router.pathname.includes("manage")
                    ? "text-white underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Manage
              </Link>
            </>
          )}
        {user && (
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}
