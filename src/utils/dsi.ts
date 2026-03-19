import type { DisruptionType, RiskLevel } from '../types';

export function calculateDSI(
  weatherScore: number,
  trafficScore: number,
  platformScore: number
): number {
  const weights = {
    weather: 0.5,
    traffic: 0.3,
    platform: 0.2,
  };

  const dsi =
    weatherScore * weights.weather +
    trafficScore * weights.traffic +
    platformScore * weights.platform;

  return Math.round(Math.min(100, Math.max(0, dsi)));
}

export function getPayoutMultiplier(dsiScore: number): number {
  if (dsiScore < 30) return 0;
  if (dsiScore < 60) return 0.5;
  return 1.0;
}

export function getRiskLevel(dsiScore: number): RiskLevel {
  if (dsiScore < 30) return 'Low';
  if (dsiScore < 60) return 'Medium';
  return 'High';
}

export function generateRandomDisruption(): {
  type: DisruptionType;
  weatherScore: number;
  trafficScore: number;
  platformScore: number;
  dsiScore: number;
} {
  const types: DisruptionType[] = ['rain', 'flood', 'heat', 'app_crash', 'traffic'];
  const type = types[Math.floor(Math.random() * types.length)];

  let weatherScore = Math.floor(Math.random() * 40);
  let trafficScore = Math.floor(Math.random() * 40);
  let platformScore = Math.floor(Math.random() * 40);

  switch (type) {
    case 'rain':
      weatherScore = Math.floor(Math.random() * 30) + 50;
      trafficScore = Math.floor(Math.random() * 30) + 30;
      break;
    case 'flood':
      weatherScore = Math.floor(Math.random() * 20) + 80;
      trafficScore = Math.floor(Math.random() * 20) + 70;
      break;
    case 'heat':
      weatherScore = Math.floor(Math.random() * 30) + 60;
      break;
    case 'app_crash':
      platformScore = Math.floor(Math.random() * 20) + 80;
      break;
    case 'traffic':
      trafficScore = Math.floor(Math.random() * 30) + 60;
      break;
  }

  const dsiScore = calculateDSI(weatherScore, trafficScore, platformScore);

  return {
    type,
    weatherScore,
    trafficScore,
    platformScore,
    dsiScore,
  };
}

export function shouldTriggerClaim(
  dsiScore: number,
  planThreshold: number,
  fraudScore: number
): boolean {
  if (fraudScore > 70) return false;
  return dsiScore >= planThreshold;
}

export function calculateFraudScore(
  user: { is_active: boolean },
  claimCount: number,
  daysSinceLastClaim: number
): number {
  let score = 0;

  if (!user.is_active) score += 30;

  if (claimCount > 10) score += 20;

  if (daysSinceLastClaim < 1) score += 30;

  return Math.min(100, score);
}
