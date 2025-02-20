import { useUserContext } from "@/src/contexts/UserContext";
import { checkIsSchools } from "@/src/utils/checkIsSchools";
import { getSelectedSchool } from "@/src/utils/getSelectedSchool";
import Link from "next/link";
import { useRouter } from "next/router";

const NavigationLinks = () => {
  const { user, logout } = useUserContext();
  const router = useRouter();
  const isSchools = checkIsSchools(router.asPath)
  const selectedSchool = getSelectedSchool(router.asPath)
  
  return (
    <>
      {user && (
        <>
          <Link
            href="/schools"
            className={`${router.pathname === "/"
              ? "text-white underline decoration-2 underline-offset-4"
              : ""
              }`}
          >
            Home
          </Link>
          {isSchools && selectedSchool && selectedSchool !== "new" && (
            <>
              <Link
                href={`/schools/${selectedSchool}/curriculum`}
                className={`${router.pathname.includes("curriculum")
                  ? "text-white underline decoration-2 underline-offset-4"
                  : ""
                  }`}
              >
                Curriculum
              </Link>
              <Link
                href={`/schools/${selectedSchool}/schedule`}
                className={`${router.pathname.includes("schedule")
                  ? "text-white underline decoration-2 underline-offset-4"
                  : ""
                  }`}
              >
                Schedule
              </Link>
              {/* <Link
              href="/staff/"
              className={`${
                router.pathname.includes("staff")
                ? "text-white underline decoration-2 underline-offset-4"
                  : ""
                  }`}
                  >
                  Staff
                  </Link> */}
              <Link
                href={`/schools/${selectedSchool}/classes`}
                className={`${router.pathname.includes("classes")
                  ? "text-white underline decoration-2 underline-offset-4"
                  : ""
                  }`}
              >
                Classes
              </Link>
              <Link
                href={`/schools/${selectedSchool}/students`}
                className={`${router.pathname.includes("students")
                  ? "text-white underline decoration-2 underline-offset-4"
                  : ""
                  }`}
              >
                Students
              </Link>
            </>
          )}
          <Link
            href={`/profile/${user.user_id}`}
            className={`${router.pathname.includes("profile")
              ? "text-white underline decoration-2 underline-offset-4"
              : ""
              }`}
          >
            Profile
          </Link>
        </>
      )}
      {/* 
      TODO: implement link permissions based on school roles 
            but allow authenticated users to see all links for now
      */}
      {/* {user && (user.role == "OWNER" || user.role == "ADMIN")  &&
        selectedSchool && (
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
          </>
        )} */}
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
    </>
  );
};

export default NavigationLinks;
