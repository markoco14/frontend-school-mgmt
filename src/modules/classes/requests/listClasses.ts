import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import Cookie from "js-cookie";

async function listClasses({
    schoolSlug,
    signal,
  }: {
    schoolSlug: string;
    signal: AbortSignal;
  }): Promise<ClassEntity[]> {
    const accessToken = Cookie.get("accessToken");
    
    if (!accessToken) {
        throw new Error("No access token.")
    }
    

    const url = `${process.env.NEXT_PUBLIC_API_URL}/classes/?school=${schoolSlug}`;
    const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          signal
        }
      );

    if (!response.ok) {
        throw new Error("Something went wrong with fetch.")
    }
    const classEntities: ClassEntity[] = await response.json();

    return classEntities;
  }

export default listClasses