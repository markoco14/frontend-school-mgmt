import { useUserContext } from "@/src/contexts/UserContext";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import { ReactElement } from "react";
import AlreadyLoggedIn from "../modules/public/AlreadyLoggedIn";
import Signup from "../modules/public/Signup";
import { NextPageWithLayout } from "./_app";


const Home: NextPageWithLayout = () => {
  const { user } = useUserContext();

  return (
    <>
      {!user && (
        <GuestLayout>
          <Signup />
        </GuestLayout>
      )}

      {user && (
        <GuestLayout>
          <AlreadyLoggedIn />
        </GuestLayout>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
