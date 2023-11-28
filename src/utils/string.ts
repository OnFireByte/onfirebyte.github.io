export function extractDesc(md: string) {
    const lines = md.trim().split("\n");

    let desc = "";
    for (const line of lines) {
        if (line.startsWith("#")) break;
        if (line.startsWith("```")) break;
        if (line.startsWith("---")) break;
        if (line == "") break;
        desc += line + "\n";
    }
    return desc;
}
