import { useUserContext } from "@/src/UserContext";
import { User } from "@/src/modules/user-mgmt/entities/User";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userAdapter } from "../adapters/userAdapter";

type Inputs = {
  first_name: string;
  email: string;
  password: string;
};

export default function AdminSignup({
  admins,
  setAdmins,
}: {
  admins: User[];
  setAdmins: Function;
}) {
  const { user, selectedSchool } = useUserContext();

  const { reset, register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (admins.find((admin) => admin.email === data.email)) {
      toast("You already shared your school with this teacher.");
      return;
    }

    if (
      admins.find(
        (admin) => user?.email === data.email && admin.email == user?.email,
      )
    ) {
      toast("You cannot add yourself as an admin in this school.");
      return;
    }

    try {
      const admin: User = await userAdapter.addAdmin({
        first_name: data.first_name,
        email: data.email,
        password: data.password,
        school_id: selectedSchool?.id,
      });

      toast.success("School shared with admin.");
      setAdmins((prevAdmins: User[]) => [...prevAdmins, admin]);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">First Name</label>
        <input
          type="text"
          {...register("first_name", {
            required: true,
            minLength: 1,
            maxLength: 50,
          })}
          className="rounded border p-2 shadow-md"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">Email</label>
        <input
          type="email"
          {...register("email", {
            required: true,
            minLength: 3,
            maxLength: 50,
          })}
          className="rounded border p-2 shadow-md"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
          className="rounded border p-2 shadow-md"
        />
      </div>
      <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
        Save
      </button>
    </form>
  );
}
