import AuthContext from "@/src/AuthContext";
import Link from "next/link";
import { useContext } from "react";

export default function SchoolHeader() {
  const { selectedSchool } = useContext(AuthContext);
  return (
    <p className="text-xl text-gray-500 mb-4">{selectedSchool ? selectedSchool.name : <Link href='/'>You have not chosen a school</Link>}</p>
  );
}
