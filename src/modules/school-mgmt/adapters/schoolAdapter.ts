import Cookie from "js-cookie";
import { School } from "../entities/School";

class SchoolAdapter {
  public async listUserSchools(): Promise<School[]> {
    const accessToken = Cookie.get("accessToken");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-schools/`,
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
      const schools = await res.json();

      const schoolList: School[] = schools;

      return schoolList;
    } catch (error) {
      throw new Error("Unauthorized. Please log out and try again.");
    }
  }

  public async addSchool({
    schoolName,
    slug,
    ownerId,
  }: {
    schoolName: string;
    slug: string;
    ownerId: number;
  }): Promise<School> {
    const accessToken = Cookie.get("accessToken");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/add/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: schoolName,
          slug: slug,
          owner_id: ownerId,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail)
    }

    const data = await response.json();
    const school: School = data;

    return school;
  }
}

export const schoolAdapter = new SchoolAdapter();
