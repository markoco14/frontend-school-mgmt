import { useUserContext } from "@/src/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SchoolHeader() {
  const { selectedSchool, handleDeselectSchool } = useUserContext();
  const router = useRouter();
  return (
    <section>
      <p className=" mb-4 flex items-baseline justify-between text-gray-500">
        {selectedSchool ? (
          <>
            <Link href="/" className="text-2xl">
              {selectedSchool.name}
            </Link>
            <button
              onClick={() => {
                handleDeselectSchool();
                if (router.pathname !== "/") {
                  router.push("/");
                }
              }}
            >
              Change school
            </button>
          </>
        ) : (
          <Link href="/">You have not chosen a school</Link>
        )}
      </p>
    </section>
  );
}
