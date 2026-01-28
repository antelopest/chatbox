import { type HealthStatus } from './health-status.type';

export type HealthIndicatorDetails = {
  status: HealthStatus;
  message?: string;
};
