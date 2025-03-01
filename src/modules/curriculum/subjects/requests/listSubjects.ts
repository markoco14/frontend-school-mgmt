import { Subject } from "@/src/modules/curriculum/entities/Subject";
import Cookie from "js-cookie";

async function listSubjects(schoolSlug: string): Promise<Subject[]> {
    const accessToken = Cookie.get("accessToken");

    if (!accessToken) {
        throw new Error("No access token.")
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subjects/?school=${schoolSlug}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail)
    }

    const subjects: Subject[] = await response.json();

    return subjects;
}

export default listSubjects