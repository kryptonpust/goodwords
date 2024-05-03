import {
    ActivityType,
    GetActivitiesByActivityTypeQuery,
} from "../__generated__/graphql";

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function convertISOToCustomFormat(isoDate: Date) {
  const date = new Date(isoDate);
  const monthNames = MONTH_NAMES;
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

export function generateActivityLabel(
  activity: GetActivitiesByActivityTypeQuery["getActivityLogs"][0]["activity"],
  createdAt: Date
) {
  const convertedDate = convertISOToCustomFormat(createdAt);
  switch (activity) {
    case ActivityType.Like:
      return `You liked a post on ${convertedDate}`;
    case ActivityType.Comment:
      return `You commented on a post on ${convertedDate}`;
    case ActivityType.Create:
      return `You made a post on ${convertedDate}`;
    default:
      return "";
  }
}
