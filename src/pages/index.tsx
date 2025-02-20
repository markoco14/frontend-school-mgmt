import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import Layout from "@/src/modules/core/components/Layout";
import LandingPage from "@/src/modules/public/LandingPage";
import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";


const Home: NextPageWithLayout = () => {
  const { user } = useUserContext();

  return (
    <>
      {!user ? (
        <GuestLayout>
          <LandingPage />
        </GuestLayout>
      ) : (
        <Layout>
          <AdminLayout>
            <div className="max-w-[800px]">
              <h2 className="mb-4 text-3xl">Welcome back, {user?.name}!</h2>
              <article className="grid gap-4 rounded-lg border p-4 shadow">
                <Link href="/schools">Go to your schools</Link>
              </article>
            </div>
          </AdminLayout>
        </Layout>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
