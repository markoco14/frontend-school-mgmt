import Cookie from "js-cookie";
import { School } from "@/src/modules/schools/entities/School";

async function getSchoolBySlug(selectedSchool: string): Promise<School> {
    const accessToken = Cookie.get("accessToken");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/schools/slug/${selectedSchool}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail);
      }

      const school = await res.json();

      return school;
    } catch (error) {
      throw new Error("Unauthorized. Please log in and try again.");
    }
  }

  export default getSchoolBySlug