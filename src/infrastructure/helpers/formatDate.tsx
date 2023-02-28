import dayjs from "dayjs";
import calendar from 'dayjs/plugin/calendar'
export function formatDate(date: string) {
    const formattedDate = dayjs(date).calendar().toLowerCase()
    return formattedDate
}