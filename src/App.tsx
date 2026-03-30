/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Info, Activity, Scale, Ruler, ChevronRight, AlertCircle } from 'lucide-react';

type BMICategory = '體重過輕' | '正常範圍' | '異常範圍 (過重)' | '肥胖' | null;

export default function App() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const bmiData = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return null;

    let bmiValue = 0;
    if (unit === 'metric') {
      // Height in cm, weight in kg
      bmiValue = w / ((h / 100) * (h / 100));
    } else {
      // Height in inches, weight in lbs
      bmiValue = (w / (h * h)) * 703;
    }

    let category: BMICategory = null;
    let color = '';

    if (bmiValue < 18.5) {
      category = '體重過輕';
      color = 'text-blue-500';
    } else if (bmiValue < 24) {
      category = '正常範圍';
      color = 'text-green-500';
    } else if (bmiValue < 27) {
      category = '異常範圍 (過重)';
      color = 'text-yellow-500';
    } else {
      category = '肥胖';
      color = 'text-red-500';
    }

    return {
      value: bmiValue.toFixed(1),
      category,
      color,
    };
  }, [weight, height, unit]);

  const handleExample = (w: string, h: string, u: 'metric' | 'imperial') => {
    setWeight(w);
    setHeight(h);
    setUnit(u);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200"
          >
            <Calculator className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4"
          >
            BMI 計算機
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            快速計算您的身體質量指數，並了解其對您健康的意義。
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Calculator Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="h-8 w-1 bg-indigo-600 rounded-full" />
              <h2 className="text-xl font-semibold">您的數據</h2>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
              <button
                onClick={() => setUnit('metric')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  unit === 'metric' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                公制 (kg/cm)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  unit === 'imperial' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                英制 (lb/in)
              </button>
            </div>

            <div className="space-y-6 relative">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-slate-400" />
                  體重 ({unit === 'metric' ? '公斤' : '磅'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'metric' ? '例如：70' : '例如：154'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-3 relative z-10">
                <button
                  onClick={() => {
                    const temp = weight;
                    setWeight(height);
                    setHeight(temp);
                  }}
                  className="p-2 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:bg-slate-50 transition-all text-slate-400 hover:text-indigo-600 group"
                  title="交換數值"
                >
                  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    <Activity className="w-4 h-4 rotate-90" />
                  </motion.div>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-slate-400" />
                  身高 ({unit === 'metric' ? '公分' : '英吋'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === 'metric' ? '例如：175' : '例如：69'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {bmiData ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-10 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center"
                >
                  <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mb-1">您的 BMI</p>
                  <h3 className="text-5xl font-bold text-slate-900 mb-2">{bmiData.value}</h3>
                  <p className={`text-xl font-semibold ${bmiData.color}`}>{bmiData.category}</p>
                  
                  {parseFloat(bmiData.value) > 50 && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-xs text-amber-600 flex items-center justify-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      數值異常偏高，請確認身高體重是否填反？
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-10 p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center"
                >
                  <p className="text-slate-400">輸入您的體重和身高以查看您的 BMI 結果。</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Info & Examples Section */}
          <div className="space-y-8">
            {/* Explanation */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">什麼是 BMI？</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  身體質量指數 (BMI) 是一個簡單的體重與身高的比例指標，常用於對成年人的體重不足、過重和肥胖進行分類。
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-sm font-mono flex items-center gap-2">
                    <span className="font-bold text-indigo-600">公式：</span>
                    體重 (kg) / [身高 (m)]²
                  </p>
                </div>
                <p className="text-sm italic">
                  注意：BMI 是衡量過重和肥胖的有用指標，但它僅是一個估計值，並未考慮身體組成（肌肉與脂肪的比例）。
                </p>
              </div>
            </motion.section>

            {/* Examples */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">試試範例</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleExample('70', '175', 'metric')}
                  className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all text-left"
                >
                  <div>
                    <p className="font-medium text-slate-900">一般成年人</p>
                    <p className="text-sm text-slate-500">70公斤, 175公分</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>
                <button
                  onClick={() => handleExample('180', '70', 'imperial')}
                  className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all text-left"
                >
                  <div>
                    <p className="font-medium text-slate-900">英制範例</p>
                    <p className="text-sm text-slate-500">180磅, 5呎10吋 (70英吋)</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>
              </div>
            </motion.section>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 text-sm"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>
                在進行任何健康管理或體重調整前，請務必諮詢醫療專業人員以獲得全面的健康評估。
              </p>
            </motion.div>
          </div>
        </div>

        {/* Categories Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <h2 className="text-xl font-semibold mb-6">BMI 分類標準</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 font-semibold text-slate-900">BMI 範圍</th>
                  <th className="pb-4 font-semibold text-slate-900">分類</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="py-4 text-slate-600">小於 18.5</td>
                  <td className="py-4 font-medium text-blue-600">體重過輕</td>
                </tr>
                <tr>
                  <td className="py-4 text-slate-600">18.5 – 24.0</td>
                  <td className="py-4 font-medium text-green-600">正常範圍</td>
                </tr>
                <tr>
                  <td className="py-4 text-slate-600">24.0 – 27.0</td>
                  <td className="py-4 font-medium text-yellow-600">異常範圍 (過重)</td>
                </tr>
                <tr>
                  <td className="py-4 text-slate-600">27.0 以上</td>
                  <td className="py-4 font-medium text-red-600">肥胖</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
