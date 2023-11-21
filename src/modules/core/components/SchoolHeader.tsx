import { useUserContext } from "@/src/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SchoolHeader() {
  const { selectedSchool, handleDeselectSchool } = useUserContext();
  const router = useRouter();
  return (
    <section>
      <div className="mb-4 flex w-full items-baseline justify-between gap-16 text-gray-500">
        <Link href="/" className="text-2xl">
          {selectedSchool ? selectedSchool.name : "Choose a school"}
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
