import { type HealthIndicatorDetails } from './health-indicator-details.type';

export type HealthIndicatorResult = {
  [key: string]: HealthIndicatorDetails;
};
