export type DisruptionType = 'rain' | 'flood' | 'heat' | 'app_crash';

export interface Transaction {
  id: string;
  date: Date;
  event: string;
  amount: number;
  icon: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface DisruptionEvent {
  type: DisruptionType;
  message: string;
  payout: number;
  icon: string;
}
