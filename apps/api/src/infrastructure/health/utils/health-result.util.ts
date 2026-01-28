import {
  HEALTH_STATUS,
  type HealthIndicatorResult,
} from '@infrastructure/health/types';

export function up(key: string): HealthIndicatorResult {
  return {
    [key]: {
      status: HEALTH_STATUS.UP,
    },
  };
}

export function down(key: string, message?: string): HealthIndicatorResult {
  return {
    [key]: {
      status: HEALTH_STATUS.DOWN,
      ...(message ? { message } : {}),
    },
  };
}
