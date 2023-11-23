import { User } from "@/src/modules/user-mgmt/entities/User";

const StaffList = ({ staffList }: { staffList: User[] }) => {
  return (
    <ul className="grid gap-2 rounded bg-gray-100 p-2 shadow-inner">
      {staffList?.map((staff: any, index: number) => (
        <li
          key={index}
          className="grid rounded bg-white p-2 shadow hover:bg-gray-300 sm:grid-cols-3"
        >
          <span>{staff.first_name}</span>
          <span>{staff.last_name}</span>
          <span>{staff.email}</span>
          {/* <span>remove</span> */}
        </li>
      ))}
    </ul>
  );
};

export default StaffList;
