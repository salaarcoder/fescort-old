const getCurrentTime = () => {
  const now = Date.now();
  return now;
};

const getCurrentEpochTimestamp = (): number => {
  return +getCurrentTime();
};

const getSecondsUntilMidnight = (): number => {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - Date.now()) / 1000);
}

const convertTimestampIntoISTDateTime = (timestamp: number | string) => {
  timestamp = parseInt(timestamp.toString())
  return new Date(new Date(timestamp).getTime() + (330 * 60 * 1000)).toISOString().slice(0, -1);
}
const getCurrentMonthYear = (): string => {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString();
  return `${month}${year}`
}

const getFormattedDateTime = (timestamp: string | number): string => {
  const date = new Date(timestamp);
  const getTimeInTwoDigitFormat = (value: number): string => {
    const _value = value.toString();
    return _value.length < 2 ? '0' + _value : _value;
  }
  return `${date.getUTCFullYear()}-${getTimeInTwoDigitFormat(date.getMonth() + 1)}-${getTimeInTwoDigitFormat(date.getDate())} ${getTimeInTwoDigitFormat(date.getUTCHours())}:${getTimeInTwoDigitFormat(date.getUTCMinutes())}:${getTimeInTwoDigitFormat(date.getUTCSeconds())}`;
}

const getTimestampForNDaysAgo = (days: number): number => {
  const nDaysInMilliseconds = days * 24 * 60 * 60 * 1000;
  const now = getCurrentTime(); // current time in milliseconds
  const timestampForNDaysAgo = now - nDaysInMilliseconds;
  return timestampForNDaysAgo;
}

export { getCurrentTime, getCurrentEpochTimestamp, getSecondsUntilMidnight, convertTimestampIntoISTDateTime, getCurrentMonthYear, getFormattedDateTime, getTimestampForNDaysAgo };
