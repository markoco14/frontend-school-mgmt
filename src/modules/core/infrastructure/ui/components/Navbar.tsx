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
    <nav className="xs:relative h-[48px] bg-blue-900 text-white xs:bg-transparent xs:text-black flex justify-between items-center px-2 ">
      {/* desktop nav */}
      <div className="w-full hidden xs:flex xs:justify-end gap-2">
        {user  && (
          <>
            <Link
              href="/"
              className={`${
                router.pathname === "/"
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={`/profile/${user.user_id}`}
              className={`${
                router.pathname.includes("profile")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Profile
            </Link>
          </>
        )}
        {user && user.role === "OWNER" && selectedSchool && user.user_id === selectedSchool.owner_id && (
          <>
            <Link
              href="/curriculum/"
              className={`${
                router.pathname.includes("curriculum")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Curriculum
            </Link>
            <Link
              href="/teachers/"
              className={`${
                router.pathname.includes("teachers")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Teachers
            </Link>
            <Link
              href="/class-mgmt/"
              className={`${
                router.pathname.includes("class-mgmt")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Classes
            </Link>
            <Link
              href="/student-mgmt/"
              className={`${
                router.pathname.includes("student-mgmt")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Students
            </Link>
            <Link
              href="/report-mgmt/"
              className={`${
                router.pathname.includes("report-mgmt")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Reports
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
        <div className="z-10 text-3xl absolute top-0 left-0 flex flex-col gap-4 h-screen justify-center w-full items-center text-black bg-blue-300/75 xs:hidden">
          <button
            onClick={() => {
              setIsShowing(false);
            }}
            className="absolute top-2 left-2 text-3xl"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          {user && (
            <>
              <Link
                href="/"
                className={`${
                  router.pathname === "/"
                    ? "underline underline-offset-4 decoration-2 text-blue-700"
                    : ""
                }`}
              >
                Home
              </Link>
              <Link
              href={`/profile/${user.user_id}`}
              className={`${
                router.pathname.includes("profile")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Profile
            </Link>
            </>
          )}
          {user && user.role === "OWNER" && selectedSchool && user.user_id === selectedSchool.owner_id && (
            <>
              <Link
              href="/curriculum/"
              className={`${
                router.pathname.includes("curriculum")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Curriculum
            </Link>
            <Link
              href="/teachers/"
              className={`${
                router.pathname.includes("teachers")
                  ? "underline underline-offset-4 decoration-2 text-blue-700"
                  : ""
              }`}
            >
              Teachers
            </Link>
              <Link
                href="/class-mgmt/"
                className={`${
                  router.pathname.includes("class-mgmt")
                    ? "underline underline-offset-4 decoration-2 text-blue-700"
                    : ""
                }`}
              >
                Classes
              </Link>
              <Link
                href="/student-mgmt/"
                className={`${
                  router.pathname.includes("student-mgmt")
                    ? "underline underline-offset-4 decoration-2 text-blue-700"
                    : ""
                }`}
              >
                Students
              </Link>
              <Link
                href="/report-mgmt/"
                className={`${
                  router.pathname.includes("report-mgmt")
                    ? "underline underline-offset-4 decoration-2 text-blue-700"
                    : ""
                }`}
              >
                Reports
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
