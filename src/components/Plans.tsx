import { Check } from 'lucide-react';
import { Plan } from '../types';

interface PlansProps {
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'SafeShield Basic',
    price: 29,
    features: [
      'Weather protection',
      'Up to ₹500/day payout',
      '24/7 monitoring',
      'Basic support'
    ]
  },
  {
    id: 'pro',
    name: 'SafeShield Pro',
    price: 59,
    features: [
      'All Basic features',
      'Platform outage cover',
      'Up to ₹1000/day payout',
      'Priority support',
      'Instant payouts'
    ]
  },
  {
    id: 'max',
    name: 'SafeShield Max',
    price: 99,
    features: [
      'All Pro features',
      'Vehicle breakdown cover',
      'Up to ₹2000/day payout',
      'Premium support',
      'Family coverage'
    ]
  }
];

export default function Plans({ selectedPlan, onSelectPlan }: PlansProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Protection Plans
      </h3>

      <div className="space-y-4">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan.id)}
              className={`border-2 rounded-xl p-4 cursor-pointer transition transform hover:scale-102 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{plan.price}
                    </span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
