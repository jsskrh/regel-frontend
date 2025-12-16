
export enum GroupBy {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export interface MessageActivityDto {
  startDate: string; // Using string for dates to be compatible with URL params
  endDate: string;
  groupBy?: GroupBy;
}
