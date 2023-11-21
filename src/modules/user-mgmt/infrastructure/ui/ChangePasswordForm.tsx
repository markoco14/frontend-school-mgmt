import { useUserContext } from "@/src/UserContext";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userAdapter } from "../../adapters/userAdapter";

type Inputs = {
  current_password: string;
  new_password: string;
};

export default function ChangePasswordForm() {
  const { user } = useUserContext();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (user) {
      await userAdapter
        .changeUserPassword({
          id: user.user_id,
          current_password: data.current_password,
          new_password: data.new_password,
        })
        .then((res) => {
          if (res.detail) {
            toast.success(res.detail);
            reset();

            return;
          }

          if (res.current_password) {
            toast.error(res.current_password);
            return;
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">Current Password</label>
        <input
          className="rounded px-1 py-2 shadow"
          type="password"
          {...register("current_password", {
            required: true,
            minLength: 8,
            maxLength: 50,
          })}
        />
        {errors.current_password?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            Current password required.
          </p>
        )}
        {errors.current_password?.type === "minLength" && (
          <p role="alert" className="mt-2 text-red-500">
            Current password needs to be longer.
          </p>
        )}
        {errors.current_password?.type === "maxLength" && (
          <p role="alert" className="mt-2 text-red-500">
            Current password needs to be shorter.
          </p>
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">New Password</label>
        <input
          className="rounded px-1 py-2 shadow"
          type="password"
          {...register("new_password", {
            required: true,
            minLength: 8,
            maxLength: 50,
          })}
        />
        {errors.new_password?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            New password required.
          </p>
        )}
        {errors.new_password?.type === "minLength" && (
          <p role="alert" className="mt-2 text-red-500">
            New password needs to be longer.
          </p>
        )}
        {errors.new_password?.type === "maxLength" && (
          <p role="alert" className="mt-2 text-red-500">
            New password needs to be shorter.
          </p>
        )}
      </div>

      <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
        Save
      </button>
    </form>
  );
}
