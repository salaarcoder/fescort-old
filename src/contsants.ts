import moment from 'moment';

export const ALL_MONTHS = [
  { index: 1, monthname: 'January' },
  { index: 2, monthname: 'February' },
  { index: 3, monthname: 'March' },
  { index: 4, monthname: 'April' },
  { index: 5, monthname: 'May' },
  { index: 6, monthname: 'June' },
  { index: 7, monthname: 'July' },
  { index: 8, monthname: 'August' },
  { index: 9, monthname: 'September' },
  { index: 10, monthname: 'October' },
  { index: 11, monthname: 'November' },
  { index: 12, monthname: 'December' },
];

export const ALL_YEAR = () => {
  const currentYear = new Date().getFullYear(),
    years = [];
  let startYear = 2021;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

export enum LoaderTypes {
  TRIANGLE,
  THREE_DOTS,
  THREE_CIRCLES,
}

export enum LOADER_COLORS {
  BUTTON_PRIMARY = '#ffffff',
  BUTTON_SECONDARY = '#131415',
  APP_PRIMARY = '#963BF9',
  APP_SECONDARY = '#02CBBC',
}

export const downloadCSV = (fileURL: string) => {
  const link = document.createElement('a');
  const fileName = "users.csv"
  link.style.display = 'none';
  link.href = fileURL;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  // Cleanup: remove the link after the download is initiated
  document.body.removeChild(link);
};

export const momentFromNow = (date: Date) => {
  moment.updateLocale('en', {
    relativeTime: {
      future: '%s remaining',
      past: '%s ago',
      s: function (number) {
        return '00:' + (number < 10 ? '0' : '') + number + ' minutes';
      },
      m: 'a minute',
      mm: function (number) {
        return (number < 10 ? '0' : '') + number + ':00' + ' minutes';
      },
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  });
  return moment(date).fromNow();
};

export const DEFAULT_ROWS_PER_PAGE = 10;
export const NO_OF_ROWS = [10, 20, 30, 40, 50];

export const CURRENT_DATE = new Date();
export const MIN_DATE = moment('2020-01-01T00:00:00.928Z').toDate();
export const MAX_DATE = moment('2030-01-01T00:00:00.928Z').toDate();

export const DAYS_IN_DIFFERENCE = (startDate: string, endDate: string) => {
  const differenceInTime = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.trunc(differenceInTime / (1000 * 3600 * 24));
};

export const MILLISECONDS_TO_HOURS_MINUTES_AND_SECONDS = (milliseconds: number) => {
  const sec = Math.floor((milliseconds / 1000) % 60);
  const min = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hour = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  const hours = (hour < 10 ? '0' : '') + hour;
  const minutes = (min < 10 ? '0' : '') + min;
  const seconds = (sec < 10 ? '0' : '') + sec;

  if (Number(hours) > 1) {
    return hours + ':' + minutes + ':' + seconds + ' h';
  } else {
    return minutes + ':' + seconds + ' m';
  }
};

export const GET_TIME_DIFFERENCE = (primaryDate: Date, secondaryDate: Date) => {
  const primaryTime = primaryDate.getTime();
  const secondaryTime = secondaryDate.getTime();
  return MILLISECONDS_TO_HOURS_MINUTES_AND_SECONDS(Math.abs(secondaryTime - primaryTime));
};

export enum PAGE_TABS {
  ONE,
  TWO,
  THREE
}

export const MODAL_STYLE = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0rem',
    borderRadius: '0.8rem',
  },
  overlay: { zIndex: 6 },
};

export const INT_MAX = 2147483647;

export const A_DAY_DIFFERENCE = (startDate: string, endDate: string) => {
  const primaryDate = new Date(startDate);
  const secondaryDate = new Date(endDate);
  const Difference_In_Time = secondaryDate.getTime() - primaryDate.getTime();
  return Difference_In_Time < 1000 * 3600 * 24;
};

export enum EXPLORE_FEED_SCREENS {
  CONTENT,
  CREATE,
  EDIT,
}

export enum ExploreFeedCreatePageTabs {
  CREATE,
  PREVIEW,
}

export enum CAMPAIGN_TABS {
  ALL_CAMPAIGNS
}

export enum LIST_PAGES {
  BEST = 'dfvdfvd',
  TREN = 'dfv',
  MAD = 'vdfv'
}

export const STATUS = ['published', 'unpublished']

export enum ModerationStatus {
  normal = 'normal',
  unmoderated = 'unmoderated',
  rejected = 'rejected',
  requested = 'requested',
  suspended = 'suspended'
}
export const NO_OF_DAYS_FILTER_OPTIONS: any[] = [
  // export const NO_OF_DAYS_FILTER_OPTIONS: INoOfDaysFilter[] = [
  { id: 1, title: 'Last 7 days', value: 7 },
  { id: 2, title: 'Last 30 days', value: 30 },
  { id: 3, title: 'Last 90 days', value: 90 },
  { id: 4, title: 'Last 180 days', value: 180 },
  { id: 5, title: 'Last 365 days', value: 365 },
];

export const APP_MODULES = [
  'create',
  'home',
  'favorites',
];

export const getUTCTimestampFromDate = (date: string): number => {
  const utcDate = new Date(date);
  const timestamp = utcDate.getTime();
  return timestamp;
}

export const arraysEqualWithIndex = (arr1: any, arr2: any): boolean => {
  if (arr1?.length !== arr2?.length) {
    return false;
  }
  for (let i = 0; i < arr1?.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
