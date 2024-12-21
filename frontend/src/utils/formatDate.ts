export function formatDate(timestamp: number){
    const date = new Date(parseInt(timestamp.toString()));
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "2-digit" };
    
    return date.toLocaleDateString("en-US", options);
};
