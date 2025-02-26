import Cookie from "js-cookie";
import { ClassEntity } from "../entities/ClassEntity";

async function getClass(classID: number, signal: AbortSignal): Promise<ClassEntity> {
    const accessToken = Cookie.get("accessToken")

    if (!accessToken) {
        throw new Error("Access denied. Please make sure you are logged in.")
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/classes/${classID}/`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            signal
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail)
    }

    const classEntity: ClassEntity = await response.json();

    return classEntity;
}

export default getClass