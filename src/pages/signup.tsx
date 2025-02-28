import { AuthUser } from "@/src/contexts/UserContext";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import { ReactElement, useEffect } from "react";
import Signup from "../modules/public/Signup";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";

type SignupPageProps = {
  user: AuthUser | null;
}

const SignupPage: NextPageWithLayout<SignupPageProps> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/")
    }
  }, [user, router])

  if (!user) {
    return (
      <GuestLayout>
        <Signup />
      </GuestLayout>

    )
  }

  return null;
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SignupPage;
