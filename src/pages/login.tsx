import { AuthUser } from "@/src/contexts/UserContext";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import { ReactElement, useEffect } from "react";
import Login from "../modules/public/Login";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";

type LoginPageProps = {
  user: AuthUser | null;
}

const LoginPage: NextPageWithLayout<LoginPageProps> = ({ user }) => {
  const router = useRouter();
  
    useEffect(() => {
      if (user) {
        router.replace("/")
      }
    }, [user, router])

  if (!user) {
    return (
      <GuestLayout>
        <Login />
      </GuestLayout>
    )
  }

  return null;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default LoginPage;
