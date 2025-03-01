import { Level } from "@/src/modules/curriculum/levels/entities/Level";
import { NewLevel } from "@/src/modules/curriculum/levels/entities/NewLevel";
import Cookies from "js-cookie";

async function addLevel(newLevel: NewLevel): Promise < Level > {
    const accessToken = Cookies.get("accessToken")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels/new/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newLevel)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail)
    }

    const level: Level = await response.json();

    return level

}



export default addLevel