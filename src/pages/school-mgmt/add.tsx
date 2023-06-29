import { UserContext } from "@/src/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";

export default function Home() {
  const context = useContext(UserContext);
  const router = useRouter();
  const schoolNameRef = useRef<HTMLInputElement>(null);

  async function handleAddSchool() {
    if (context.user?.id && schoolNameRef.current?.value) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/add-school/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: schoolNameRef.current?.value,
              owner: context.user.id,
            }),
          }
        );
        schoolNameRef.current.value = "";
        return response.json();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <main className="min-h-screen max-w-[600px] mx-auto">
      <nav className="h-[48px] flex justify-between items-center px-4">
        <div className="flex gap-2">
          <Link href="/">Home</Link>
          <Link href="/school-mgmt/">Schools</Link>
          <Link href="/student-mgmt/">Students</Link>
        </div>
        <button
          onClick={() => {
            context.setUser();
            router.push("/");
          }}
        >
          Log Out
        </button>
      </nav>
      <div>
        <h1 className="mb-4 p-4">
          Add all of your school locations here.
        </h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-4">
              <h2 className="text-3xl">New School Information</h2>
              <Link href="/school-mgmt/">Cancel</Link>
            </div>
            <p>Add basic information for your school.</p>
          </div>
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
                ref={schoolNameRef}
                type="text"
                className="shadow-md border p-2 rounded"
              />
            </div>
            <button
              className='bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded'
            >Save</button>
          </form>
        </section>
      </div>
    </main>
  );
}
