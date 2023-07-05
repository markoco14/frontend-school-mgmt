import { UserContext } from "@/src/context";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  email: string;
  password: string;
}

export default function Login() {

  const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    toast('logging in!')
    reset()
    return
    try {

    } catch (error) {

    }
  };

  return (
    <>
      <h2 className="mb-4">Log In to manage your schools.</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col mb-4'>
          <label className="mb-2">Email</label>
          <input 
            type="email"
            className="p-2 rounded shadow"
            {...register("email", { required: true })}
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label className="mb-2">Password</label>
          <input 
            type="password"
            className="p-2 rounded shadow"
            {...register("password", { required: true })}
          />
        </div>
        <button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
          Login
        </button>
      </form>
    </>
  );
}
