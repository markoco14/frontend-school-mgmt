import { useUserContext } from "@/src/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MobileNavbar() {
  const { user, selectedSchool, logout } = useUserContext();
  const router = useRouter();
  const [isShowing, setIsShowing] = useState<boolean>(false);
  return (
    <nav>
      {/* Sliding Panel */}
      {isShowing && (
        <div>
          <div className="absolute left-0 top-0 flex h-full w-screen flex-col bg-blue-900 text-white pb-[36px]">
            <div className="flex flex-col items-center opacity-100 text-white text-2xl justify-evenly h-full">
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
              {user &&
                user.permissions.includes(1) &&
                selectedSchool &&
                user.user_id === selectedSchool.owner_id && (
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
            {/* Close Nav Bar Button */}
            {/* <div className="absolute bottom-0 left-0">
              <button
                onClick={() => {
                  setIsShowing(false);
                }}
                className="absolute bottom-0 left-0 text-3xl"
              >
                <span className="sr-only">Navigation Toggle</span>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div> */}
          </div>
        </div>
      )}
      {/* Bottom Nav Bar */}
      <div className="justify-left fixed bottom-0 left-0 flex h-[36px] w-full items-center bg-blue-900 px-2 text-white">
        <button
          className="flex items-center"
          onClick={() => {
            setIsShowing(!isShowing);
          }}
        >
          <span className="sr-only">Navigation Toggle</span>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}
