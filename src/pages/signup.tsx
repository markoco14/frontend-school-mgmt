import { useUserContext } from "@/src/contexts/UserContext";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import { ReactElement } from "react";
import Signup from "../modules/public/Signup";
import { NextPageWithLayout } from "./_app";
import AlreadyLoggedIn from "../modules/public/AlreadyLoggedIn";


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
