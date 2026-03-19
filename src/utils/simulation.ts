import { DisruptionEvent } from '../types';

export const generateDSI = (): number => {
  return Math.floor(Math.random() * 100);
};

export const getDSIStatus = (score: number): { label: string; color: string } => {
  if (score <= 30) return { label: 'Low Risk', color: 'text-green-600' };
  if (score <= 60) return { label: 'Medium Risk', color: 'text-yellow-600' };
  return { label: 'High Risk', color: 'text-red-600' };
};

export const getDisruptionEvents = (): DisruptionEvent[] => [
  {
    type: 'rain',
    message: 'Heavy rain detected in your area',
    payout: 200,
    icon: '🌧️'
  },
  {
    type: 'flood',
    message: 'Flood alert in your zone',
    payout: 400,
    icon: '🌊'
  },
  {
    type: 'heat',
    message: 'Extreme heat warning',
    payout: 150,
    icon: '☀️'
  },
  {
    type: 'app_crash',
    message: 'Platform outage detected',
    payout: 300,
    icon: '📉'
  }
];

export const shouldTriggerDisruption = (): boolean => {
  return Math.random() < 0.15;
};

export const getRandomDisruption = (): DisruptionEvent => {
  const events = getDisruptionEvents();
  return events[Math.floor(Math.random() * events.length)];
};
