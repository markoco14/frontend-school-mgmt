import { useUserContext } from "@/src/contexts/UserContext";
import { SubmitHandler, useForm } from "react-hook-form";
import PublicLinks from "./PublicLinks";
import { useState } from "react";
import toast from "react-hot-toast";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { loginUser } = useUserContext();
  const { reset, register, handleSubmit } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true)
      await loginUser(data);
    } catch (error) {
      toast.error("Unable to login. Please check your email or password.");
    } finally {
      setIsLoading(false)
      reset();
    }
  };

  return (
    <div className="mx-auto max-w-[500px] px-2 md:px-0">
      <PublicLinks />
      <h2 className="text-blue-700 text-2xl mb-4">Log In to manage your schools.</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="mb-4 flex flex-col">
          <label className="mb-2">Email</label>
          <input
            type="email"
            className="rounded p-2 shadow"
            {...register("username", { required: true })}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="mb-2">Password</label>
          <input
            type="password"
            className="rounded p-2 shadow"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
        </div>
        <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
          { isLoading ? "Signing In" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
