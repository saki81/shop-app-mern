import { format as timeagoFormat } from 'timeago.js';

export const formatedDate = (date) => {
  if (!date) return "N/A"

  const parsedDate = new Date(date);

  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Berlin'
  }).format(parsedDate)

}

export const  formatTimeAgo =(date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "N/A"

  return timeagoFormat(parsedDate)
};

