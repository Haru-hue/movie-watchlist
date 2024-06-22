import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const formatRuntime = (time) => {
    const formattedRuntime = dayjs.duration(time, "minutes");
    const movieRuntime = formattedRuntime.format("H[h] mm[mins]");
    return movieRuntime;
}

export const formatReleaseDate = (date) => {
    return dayjs(date).format("MMMM D, YYYY")
}