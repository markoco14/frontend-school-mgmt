import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { schoolAdapter } from "@/src/modules/school-mgmt/adapters/schoolAdapter";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Add() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [newSchoolName, setNewSchoolName] = useState<string>("");

  async function handleAddSchool(newSchoolName: string, userId: number) {
    if (!newSchoolName) {
      toast("You forgot to add your school's name!");
      return
    }

    try {
      setLoading(true);
      const response = await schoolAdapter.addSchool({
        schoolName: newSchoolName,
        ownerId: userId,
      });
      setNewSchoolName("");
      setLoading(false);
      toast.success("School added.");
      return response;
    } catch (error) {
      setLoading(false);
      toast.error(
        "Something went wrong. Please try again.",
      );
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
    <AdminLayout>
      <div className="max-w-[500px]">
        <section>
          <div className="mb-4">
              <h1 className="text-3xl">Add Your New School</h1>
          </div>
            <form
              className="grid"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSchool(newSchoolName, user.user_id);
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
                {loading ? "Adding School" : "Add School"}
              </button>
            </form>
        </section>
      </div>
    </AdminLayout>
  );
}
