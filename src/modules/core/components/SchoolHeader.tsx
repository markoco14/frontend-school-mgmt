import { checkIsSchools } from "@/src/utils/checkIsSchools";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SchoolHeader() {
  const router = useRouter();
  const isInSchoolWorkspace = checkIsSchools(router.asPath)
  const selectedSchool = router.query.school
  return (
    <section>
      <div className="border-b h-[48px] px-2 sm:px-16 md:h-[72px] flex w-full items-center justify-between text-gray-500 ">
        {isInSchoolWorkspace && selectedSchool && selectedSchool !== "new" && (
          <>
            <span className="text-2xl">{selectedSchool ? selectedSchool : "No school"}</span>
            <Link href="/schools">Change school</Link>
          </>
        )}
      </div>
    </section>
  );
}
