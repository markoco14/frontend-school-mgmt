import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import { schoolAdapter } from "@/src/modules/school-mgmt/infrastructure/adapters/schoolAdapter";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

export default function Add() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [newSchoolName, setNewSchoolName] = useState<string>("");

  async function handleAddSchool() {
    if (!newSchoolName) {
      toast("You forgot to add your school's name!");
    }

    if (user && newSchoolName) {
      try {
        setLoading(true);
        const response = await schoolAdapter.addSchool({schoolName: newSchoolName, ownerId: user.user_id})
        setNewSchoolName("");
        setLoading(false);
        toast.success("School added.");
        return response;
      } catch (error) {
        console.error(error);
        toast.error(
          "Something went wrong. Please try again or contact customer support."
        );
      }
    }
  }

  return (
    <Layout>
      <div>
        <section>
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-4">
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
              <div className="flex flex-col mb-4">
                <label className="mb-2">School Name</label>
                <input
                  onChange={(e) => {
                    setNewSchoolName(e.target.value);
                  }}
                  type="text"
                  className="shadow-md border p-2 rounded"
                />
              </div>
              <button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
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
