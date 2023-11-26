import { User } from "@/src/modules/user-mgmt/entities/User";
import ListContainer from "../../core/components/ListContainer";

const StaffList = ({ staffList }: { staffList: User[] }) => {
  return (
    <ListContainer>
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
    </ListContainer>
  );
};

export default StaffList;
