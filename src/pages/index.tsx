import { AuthUser } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import Layout from "@/src/modules/core/components/Layout";
import LandingPage from "@/src/modules/public/LandingPage";
import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

type HomePageProps = {
  user: AuthUser | null;
}

const HomePage: NextPageWithLayout<HomePageProps> = ({ user }) => {
  if (!user) {
    return (
      <GuestLayout>
        <LandingPage />
      </GuestLayout>
    )
  }

  return (
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
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default HomePage;
