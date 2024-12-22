export function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp.toString()));
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return date.toLocaleDateString("en-US", options);
}
;
