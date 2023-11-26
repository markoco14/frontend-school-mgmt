import { useUserContext } from "@/src/contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SchoolHeader() {
  const { selectedSchool, handleDeselectSchool } = useUserContext();
  const router = useRouter();
  return (
    <section>
      <div className="border-b p-2 flex w-full items-baseline justify-between gap-16 text-gray-500 sm:py-4 sm:px-16">
        <Link href="/" className="text-2xl">
          {selectedSchool ? selectedSchool.name : "No school"}
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
      </div>
    </section>
  );
}
