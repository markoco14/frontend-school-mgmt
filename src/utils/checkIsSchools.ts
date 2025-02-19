export function checkIsSchools(path: string) {
    return path.split("/")[1] === "schools" ? true : false
}