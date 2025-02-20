import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { schoolAdapter } from "@/src/modules/school-mgmt/adapters/schoolAdapter";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function Add() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  async function handleAddSchool(userId: number) {
    if (!nameInputRef.current || !urlInputRef.current) {
      return
    }

    if (nameInputRef.current.value === "") {
      toast("You need to give your school a name.");
    }
    
    if (urlInputRef.current.value === "") {
      toast("You need to give your school a unique URL.");
    }

    try {
      setLoading(true);
      const response = await schoolAdapter.addSchool({
        schoolName: nameInputRef.current.value,
        slug: urlInputRef.current.value,
        ownerId: userId,
      });
      setLoading(false);
      nameInputRef.current.value = "";
      urlInputRef.current.value = "";
      toast.success("School added.");
      return response;
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  if (user?.membership !== "OWNER") {
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
              handleAddSchool(user.user_id);
            }}
          >
            <div className="mb-4 flex flex-col">
              <label className="mb-2">School Name</label>
              <input
                ref={nameInputRef}
                onChange={(e) => {
                  if (urlInputRef.current) {
                    urlInputRef.current.value = e.target.value.toLowerCase().trim().replace(/[\s\W-]+/g, "-").replace(/^-+|-+$/g, "");
                  }
                }}
                type="text"
                className="rounded border p-2 shadow-md"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="mb-2">Unique URL</label>
              <input
                ref={urlInputRef}
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
