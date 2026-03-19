import { useState, useEffect } from 'react';
import { Smartphone, MapPin, Languages, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import type { Zone, Platform, Language } from '../../types';

const PLATFORMS: Platform[] = ['Zepto', 'Swiggy', 'Blinkit', 'Zomato'];
const LANGUAGES: Language[] = ['Tamil', 'English'];

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [zone, setZone] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('Tamil');
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchZones = async () => {
      const { data } = await supabase
        .from('zones')
        .select('*')
        .order('name');
      if (data) setZones(data);
    };
    fetchZones();
  }, []);

  const handleComplete = async () => {
    if (!platform || !zone) return;

    setLoading(true);
    try {
      await updateUser({
        platform,
        zone_id: zone,
        language,
      });
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full mx-1 ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {step} of 3
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Your Platform
              </h2>
              <p className="text-gray-600">
                Which gig platform do you work on?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`p-4 border-2 rounded-xl font-semibold transition-all ${
                    platform === p
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {platform === p && (
                    <Check className="w-5 h-5 ml-auto mb-2" />
                  )}
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!platform}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Your Zone
              </h2>
              <p className="text-gray-600">
                Where do you primarily work?
              </p>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {zones.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setZone(z.id)}
                  className={`w-full p-4 border-2 rounded-xl font-semibold transition-all text-left flex items-center justify-between ${
                    zone === z.id
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{z.name}</div>
                    <div className="text-sm opacity-70">{z.city}</div>
                  </div>
                  {zone === z.id && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!zone}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Languages className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choose Language
              </h2>
              <p className="text-gray-600">
                Select your preferred language
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`p-4 border-2 rounded-xl font-semibold transition-all ${
                    language === lang
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {language === lang && (
                    <Check className="w-5 h-5 ml-auto mb-2" />
                  )}
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Get Started'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
