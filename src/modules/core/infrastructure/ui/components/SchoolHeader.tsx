import AuthContext from "@/src/AuthContext";
import Link from "next/link";
import { useContext } from "react";

export default function SchoolHeader() {
  const { selectedSchool, setSelectedSchool } = useContext(AuthContext);
  return (
    <p className=" text-gray-500 mb-4 flex justify-between items-baseline">
      {selectedSchool ? (
        <>
          <span className="text-2xl">{selectedSchool.name}</span>
          <button
            onClick={() => {
              setSelectedSchool(null);
            }}
          >
            Change school
          </button>
        </>
      ) : (
        <Link href="/">You have not chosen a school</Link>
      )}
    </p>
  );
}
