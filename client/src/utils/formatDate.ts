import dayjs from "dayjs"

export const formatReleaseYear = (date: string) => {
    return dayjs(date).format('YYYY')
}