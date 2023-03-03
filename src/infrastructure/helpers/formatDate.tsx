import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

export function formatDate(date: string | undefined) {
  const formattedDate = dayjs(date).format('DD.MM, H:mm');
  return formattedDate;
}
