import { User } from "@/src/modules/user-mgmt/entities/User";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userAdapter } from "../adapters/userAdapter";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Signup() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const user: User = await userAdapter.addUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      toast.success("User added.");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="mb-4">Sign up to get started.</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col">
          <label className="mb-2">First Name</label>
          <input
            type="text"
            {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 50,
            })}
            className="rounded border p-2 shadow-md"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-2">Last Name</label>
          <input
            type="text"
            {...register("lastName", {
              required: true,
              minLength: 2,
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
    </>
  );
}
