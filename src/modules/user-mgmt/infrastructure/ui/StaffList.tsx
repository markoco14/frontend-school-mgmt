import { Teacher } from "../../domain/entities/Teacher";

const StaffList = ({ staffList }: { staffList: Teacher[] }) => {
  return (
    <ul className="mb-4 rounded bg-gray-100 shadow-inner">
      {staffList?.map((staff: any, index: number) => (
        <li key={index} className="grid grid-cols-3 p-2 hover:bg-gray-300">
          <span>{staff.first_name}</span>
          <span>{staff.last_name}</span>
          <span>{staff.email}</span>
          {/* <span>remove</span> */}
        </li>
      ))}
    </ul>
  );
}

export default StaffList
