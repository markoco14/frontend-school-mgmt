import Login from "@/src/modules/user-mgmt/components/Login";
import { useState } from "react";
import Signup from "../user-mgmt/components/Signup";

const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  return (
    <div className="mx-auto max-w-[1000px]">
      <section>
        <h1>The Greatest Cram School Management System Ever</h1>
      </section>
      <section>
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setIsSignUp(true)}
            className={`${
              isSignUp
                ? "underline decoration-blue-500 decoration-4 underline-offset-[6px]"
                : null
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={`${
              !isSignUp
                ? "underline decoration-blue-500 decoration-4 underline-offset-[6px]"
                : null
            }`}
          >
            Log In
          </button>
        </div>

        {isSignUp ? <Signup /> : <Login />}
      </section>
    </div>
  );
};

export default LandingPage;
