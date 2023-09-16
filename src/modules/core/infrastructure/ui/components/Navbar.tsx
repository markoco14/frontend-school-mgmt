import AuthContext from "@/src/AuthContext";
import { UserContext } from "@/src/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function Navbar() {
  const context = useContext(UserContext);
  const { user, selectedSchool, logout } = useContext(AuthContext);
  const router = useRouter();
  const [isShowing, setIsShowing] = useState<boolean>(false);
  return (
    <nav className="flex h-[48px] items-center justify-between bg-blue-900 px-2 text-white xs:relative xs:bg-transparent xs:text-black ">
      {/* desktop nav */}
      <div className="hidden w-full gap-2 xs:flex xs:justify-end">
        {user && (
          <>
            <Link
              href="/"
              className={`${
                router.pathname === "/"
                  ? "text-blue-700 underline decoration-2 underline-offset-4"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={`/profile/${user.user_id}`}
              className={`${
                router.pathname.includes("profile")
                  ? "text-blue-700 underline decoration-2 underline-offset-4"
                  : ""
              }`}
            >
              Profile
            </Link>
          </>
        )}
        {user &&
          user.permissions.includes(1) &&
          selectedSchool &&
          user.user_id === selectedSchool.owner_id && (
            <>
              <Link
                href="/curriculum/"
                className={`${
                  router.pathname.includes("curriculum")
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Curriculum
              </Link>
              <Link
                href="/schedule/"
                className={`${
                  router.pathname.includes("schedule")
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Schedule
              </Link>
              <Link
                href="/staff/"
                className={`${
                  router.pathname.includes("staff")
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Staff
              </Link>
              <Link
                href="/classes/"
                className={`${
                  router.pathname.includes("classes")
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Classes
              </Link>
              <Link
                href="/students/"
                className={`${
                  router.pathname.includes("students")
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Students
              </Link>
              <Link
                href="/reports/"
                className={`${
                  router.pathname.includes("reports")
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Reports
              </Link>
              <Link
                href="/manage"
                className={`${
                  router.pathname.includes("manage")
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
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
              context.setUser();
              logout();
              router.push("/");
            }}
          >
            Log Out
          </button>
        )}
      </div>
      {/* mobile nav */}
      {isShowing && (
        <div className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center gap-4 bg-blue-300/75 text-3xl text-black xs:hidden">
          <button
            onClick={() => {
              setIsShowing(false);
            }}
            className="absolute left-2 top-2 text-3xl"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          {user && (
            <>
              <Link
                href="/"
                className={`${
                  router.pathname === "/"
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Home
              </Link>
              <Link
                href={`/profile/${user.user_id}`}
                className={`${
                  router.pathname.includes("profile")
                    ? "text-blue-700 underline decoration-2 underline-offset-4"
                    : ""
                }`}
              >
                Profile
              </Link>
            </>
          )}
          {user &&
            user.permissions.includes(1) &&
            selectedSchool &&
            user.user_id === selectedSchool.owner_id && (
              <>
                <Link
                  href="/curriculum/"
                  className={`${
                    router.pathname.includes("curriculum")
                      ? "text-blue-700 underline decoration-2 underline-offset-4"
                      : ""
                  }`}
                >
                  Curriculum
                </Link>
                <Link
                  href="/schedule/"
                  className={`${
                    router.pathname.includes("schedule")
                      ? "text-blue-700 underline decoration-2 underline-offset-4"
                      : ""
                  }`}
                >
                  Schedule
                </Link>
                <Link
                  href="/staff/"
                  className={`${
                    router.pathname.includes("staff")
                      ? "text-blue-700 underline decoration-2 underline-offset-4"
                      : ""
                  }`}
                >
                  Staff
                </Link>
                <Link
                  href="/classes/"
                  className={`${
                    router.pathname.includes("classes")
                      ? "text-blue-700 underline decoration-2 underline-offset-4"
                      : ""
                  }`}
                >
                  Classes
                </Link>
                <Link
                  href="/students/"
                  className={`${
                    router.pathname.includes("students")
                      ? "text-blue-700 underline decoration-2 underline-offset-4"
                      : ""
                  }`}
                >
                  Students
                </Link>
                <Link
                  href="/reports/"
                  className={`${
                    router.pathname.includes("reports")
                      ? "text-blue-700 underline decoration-2 underline-offset-4"
                      : ""
                  }`}
                >
                  Reports
                </Link>
                <Link
                  href="/manage"
                  className={`${
                    router.pathname.includes("manage")
                      ? "text-blue-700 underline decoration-2 underline-offset-4"
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
                context.setUser();
                logout();
                router.push("/");
              }}
            >
              Log Out
            </button>
          )}
        </div>
      )}
      {!isShowing && (
        <button
          className="flex items-center xs:hidden"
          onClick={() => {
            setIsShowing(true);
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      )}
    </nav>
  );
}
