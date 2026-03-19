import { getDSIStatus } from '../utils/simulation';

interface DSIScoreProps {
  score: number;
}

export default function DSIScore({ score }: DSIScoreProps) {
  const { label, color } = getDSIStatus(score);
  const percentage = score;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Disruption Score Index
        </h3>
        <span className={`text-sm font-medium ${color}`}>{label}</span>
      </div>

      <div className="relative">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-40 h-40">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * percentage) / 100}
                className={`${
                  score <= 30
                    ? 'text-green-500'
                    : score <= 60
                    ? 'text-yellow-500'
                    : 'text-red-500'
                } transition-all duration-1000 ease-out`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">{score}</div>
                <div className="text-sm text-gray-500">DSI</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-600">0-30</span>
          </div>
          <div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-600">31-60</span>
          </div>
          <div>
            <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-600">61-100</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Updates every 5 seconds
      </p>
    </div>
  );
}
