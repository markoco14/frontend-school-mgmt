import AuthContext from "@/src/AuthContext";
import { useContext } from "react";

export default function SchoolHeader() {
  const { selectedSchool } = useContext(AuthContext);
  return (
    <p className="text-xl text-gray-500 mb-4">{selectedSchool?.name}</p>
  );
}
