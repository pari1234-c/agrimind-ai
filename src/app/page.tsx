'use client';

import React, { useState } from 'react';
import { Leaf, Droplets, Thermometer, FlaskConical, CloudRain, RotateCcw, Activity } from 'lucide-react';

interface Recommendation {
  rank: number;
  crop: string;
  suitability: number;
}

interface ApiResponse {
  recommendations?: Recommendation[];
  explanation?: string;
  trace?: string[];
  error?: string;
}

const InputField = ({ 
  label, 
  name, 
  icon, 
  unit, 
  placeholder,
  value,
  error,
  onChange
}: { 
  label: string, 
  name: string, 
  icon: React.ReactNode, 
  unit: string, 
  placeholder: string,
  value: string,
  error?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <div className="flex flex-col mb-4">
    <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
      {icon} {label}
    </label>
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:outline-none transition-all ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200 focus:border-green-500'}`}
      />
      <span className="absolute right-4 top-3.5 text-gray-400 text-sm">{unit}</span>
    </div>
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export default function Home() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'];
    
    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (value === '') {
        newErrors[field] = 'This field is required';
      } else if (isNaN(Number(value))) {
        newErrors[field] = 'Must be a valid number';
      }
    });

    // Specific range validations (general reasonable limits)
    if (formData.ph !== '' && (Number(formData.ph) < 0 || Number(formData.ph) > 14)) {
      newErrors.ph = 'pH must be between 0 and 14';
    }
    
    if (formData.humidity !== '' && (Number(formData.humidity) < 0 || Number(formData.humidity) > 100)) {
      newErrors.humidity = 'Humidity must be 0-100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData({
      N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: ''
    });
    setResult(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setResult(null);

    try {
      const payload = {
        N: Number(formData.N),
        P: Number(formData.P),
        K: Number(formData.K),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        ph: Number(formData.ph),
        rainfall: Number(formData.rainfall),
      };

      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to connect to the recommendation agent. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6f4] text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-green-700 text-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-3">
          <Leaf size={32} />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AgriMind AI</h1>
            <p className="text-green-100 text-sm">Intelligent Crop Recommendation Agent</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <FlaskConical className="text-green-600" /> Soil & Environment
            </h2>
            <p className="text-gray-500 text-sm mt-1">Enter your agricultural parameters</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <InputField label="Nitrogen (N)" name="N" icon={<Leaf size={16} className="text-emerald-500" />} unit="mg/kg" placeholder="e.g. 90" value={formData.N} error={errors.N} onChange={handleInputChange} />
              <InputField label="Phosphorus (P)" name="P" icon={<Leaf size={16} className="text-emerald-500" />} unit="mg/kg" placeholder="e.g. 42" value={formData.P} error={errors.P} onChange={handleInputChange} />
              <InputField label="Potassium (K)" name="K" icon={<Leaf size={16} className="text-emerald-500" />} unit="mg/kg" placeholder="e.g. 43" value={formData.K} error={errors.K} onChange={handleInputChange} />
              <InputField label="Temperature" name="temperature" icon={<Thermometer size={16} className="text-orange-500" />} unit="°C" placeholder="e.g. 25" value={formData.temperature} error={errors.temperature} onChange={handleInputChange} />
              <InputField label="Humidity" name="humidity" icon={<Droplets size={16} className="text-blue-400" />} unit="%" placeholder="e.g. 80" value={formData.humidity} error={errors.humidity} onChange={handleInputChange} />
              <InputField label="Soil pH" name="ph" icon={<Activity size={16} className="text-purple-500" />} unit="" placeholder="e.g. 6.5" value={formData.ph} error={errors.ph} onChange={handleInputChange} />
            </div>
            <InputField label="Rainfall" name="rainfall" icon={<CloudRain size={16} className="text-blue-600" />} unit="mm" placeholder="e.g. 200" value={formData.rainfall} error={errors.rainfall} onChange={handleInputChange} />

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-1/3 font-medium"
              >
                <RotateCcw size={18} /> Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all font-medium flex items-center justify-center gap-2 disabled:bg-green-400"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </span>
                ) : (
                  <>Recommend Crops</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Agent Trace Panel */}
          {(loading || result?.trace) && (
            <div className="bg-gray-900 rounded-2xl p-5 shadow-lg font-mono text-sm border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 mb-3 border-b border-gray-700 pb-2">
                <Activity size={16} /> <span>Agent Execution Trace</span>
              </div>
              <div className="text-green-400 flex flex-col gap-1.5 min-h-[100px]">
                {loading ? (
                  <>
                    <p className="animate-pulse">&gt; Initializing AgriMind Agent...</p>
                    <p className="animate-pulse delay-75">&gt; Receiving user input...</p>
                  </>
                ) : result?.trace ? (
                  result.trace.map((step, idx) => (
                    <p key={idx}>&gt; {step}</p>
                  ))
                ) : null}
              </div>
            </div>
          )}

          {/* Results Panel */}
          {result?.error ? (
            <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200 shadow-sm">
              <p className="font-medium">Error processing request</p>
              <p className="text-sm mt-1">{result.error}</p>
            </div>
          ) : result?.recommendations && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Output Explanation */}
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 text-green-900 prose prose-green max-w-none">
                {result.explanation?.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('###')) {
                    return <h3 key={i} className="text-xl font-bold text-green-800 mt-0">{paragraph.replace('###', '').trim()}</h3>;
                  }
                  if (paragraph.startsWith('**Important:**')) {
                    return (
                      <div key={i} className="mt-4 p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 text-sm rounded-r flex items-start gap-3">
                        <p className="m-0">{paragraph.replace('**Important:**', '').trim()}</p>
                      </div>
                    );
                  }
                  return <p key={i} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                })}
              </div>

              {/* Table */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Suitability Ranking</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-y border-gray-200">
                        <th className="py-3 px-4 text-gray-600 font-medium text-sm">Rank</th>
                        <th className="py-3 px-4 text-gray-600 font-medium text-sm">Recommended Crop</th>
                        <th className="py-3 px-4 text-gray-600 font-medium text-sm">Confidence / Suitability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.recommendations.map((rec) => (
                        <tr key={rec.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${rec.rank === 1 ? 'bg-yellow-100 text-yellow-700' : rec.rank === 2 ? 'bg-gray-200 text-gray-600' : 'bg-orange-100 text-orange-700'}`}>
                              #{rec.rank}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold text-gray-800">{rec.crop}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-24">
                                <div 
                                  className="h-full bg-green-500 rounded-full" 
                                  style={{ width: `${Math.min(rec.suitability, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">{rec.suitability.toFixed(1)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {!result && !loading && (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 flex-col gap-4 py-20 bg-gray-50/50">
              <Leaf size={48} className="text-gray-300" />
              <p>Enter parameters and click recommend to see AI analysis.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
