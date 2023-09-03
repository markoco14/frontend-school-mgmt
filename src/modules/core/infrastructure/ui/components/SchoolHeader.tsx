import AuthContext from "@/src/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function SchoolHeader() {
  const { selectedSchool, setSelectedSchool, handleDeselectSchool } = useContext(AuthContext);
  const router = useRouter();
  return (
    <section>
      <p className=" text-gray-500 mb-4 flex justify-between items-baseline px-4">
        {selectedSchool ? (
          <>
            <Link href="/" className="text-2xl">{selectedSchool.name}</Link>
            <button
              onClick={() => {
                handleDeselectSchool();
                if (router.pathname !== '/') {
                  router.push('/')
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
