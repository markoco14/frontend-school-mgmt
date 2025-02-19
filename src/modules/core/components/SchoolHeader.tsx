import { checkIsSchools } from "@/src/utils/checkIsSchools";
import { getSelectedSchool } from "@/src/utils/getSelectedSchool";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SchoolHeader() {
  const router = useRouter();
  const isSchools = checkIsSchools(router.asPath)
  const selectedSchool = getSelectedSchool(router.asPath)
  return (
    <section>
      <div className="border-b h-[48px] px-2 sm:px-16 md:h-[72px] flex w-full items-center justify-between text-gray-500 ">
        {isSchools && selectedSchool && selectedSchool !== "new" && (
          <>
            <span className="text-2xl">{selectedSchool ? selectedSchool : "No school"}</span>
            <Link href="/schools">Change school</Link>
          </>
        )}
      </div>
    </section>
  );
}
