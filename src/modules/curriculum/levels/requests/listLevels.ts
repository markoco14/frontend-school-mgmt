import { Level } from "@/src/modules/curriculum/levels/entities/Level";
import Cookie from "js-cookie";


async function listLevels(schoolSlug: string): Promise<Level[]> {
    const accessToken = Cookie.get("accessToken");

    if (!accessToken) {
        throw new Error("No access token.")
    }

    let url = `${process.env.NEXT_PUBLIC_API_URL}/levels/?school=${schoolSlug}`;

    const response = await fetch(
        url,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        }
    );

    if (!response.ok) {
        throw new Error("Something went wrong with fetch.")
    }

    const levels: Level[] = await response.json();

    return levels
}


export default listLevels