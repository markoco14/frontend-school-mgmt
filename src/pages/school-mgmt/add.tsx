import { useUserContext } from "@/src/UserContext";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Add() {
  const { user } = useUserContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [newSchoolName, setNewSchoolName] = useState<string>("");

  async function handleAddSchool() {
    if (!newSchoolName) {
      toast("You forgot to add your school's name!");
    }

    if (user && newSchoolName) {
      try {
        setLoading(true);
        const response = await schoolAdapter.addSchool({
          schoolName: newSchoolName,
          ownerId: user.user_id,
        });
        setNewSchoolName("");
        setLoading(false);
        toast.success("School added.");
        return response;
      } catch (error) {
        console.error(error);
        toast.error(
          "Something went wrong. Please try again or contact customer support.",
        );
      }
    }
  }

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <section>
          <div className="mb-4">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-3xl">New School Information</h2>
              <Link href="/">Back</Link>
            </div>
            <p>Add basic information for your school.</p>
          </div>
          {!loading ? (
            <form
              className=""
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSchool();
              }}
            >
              <div className="mb-4 flex flex-col">
                <label className="mb-2">School Name</label>
                <input
                  onChange={(e) => {
                    setNewSchoolName(e.target.value);
                  }}
                  type="text"
                  className="rounded border p-2 shadow-md"
                />
              </div>
              <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
                Save
              </button>
            </form>
          ) : (
            <p>loading...</p>
          )}
        </section>
      </div>
    </Layout>
  );
}
