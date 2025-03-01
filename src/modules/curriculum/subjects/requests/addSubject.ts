import Cookie from "js-cookie";

import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { NewSubject } from "@/src/modules/curriculum/subjects/entities/NewSubject";

async function addSubject(newSubject: NewSubject): Promise<Subject> {
    const accessToken = Cookie.get("accessToken");

    if (!accessToken) {
        throw new Error("No access token.")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects/new/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubject),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
    }
    
    const level: Subject = await response.json();

    return level;
}

export default addSubject