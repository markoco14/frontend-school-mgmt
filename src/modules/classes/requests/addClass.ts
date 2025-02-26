import { ClassEntity } from "@/src/modules/classes/entities/ClassEntity";
import Cookie from "js-cookie";
import { NewClassEntity } from "../entities/NewClassEntity";

async function addClass(newClass: NewClassEntity): Promise<ClassEntity> {
    const accessToken = Cookie.get("accessToken")

    if (!accessToken) {
        throw new Error("Access denied. Please make sure you are logged in.")
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/new/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
    });

    const newClassData: ClassEntity = await res.json();

    return newClassData;
}

export default addClass;