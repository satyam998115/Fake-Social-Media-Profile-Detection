import React from 'react';
import { UserX, ShieldAlert, BarChart3 } from 'lucide-react';

const Statistics = () => {
  return (
    <section id="statistics" className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <UserX className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold">7.50K+</h3>
          </div>
          <p className="text-slate-400">Fake Profiles Detected</p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold">89.7%</h3>
          </div>
          <p className="text-slate-400">Detection Accuracy</p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">13.2K+</h3>
          </div>
          <p className="text-slate-400">Profiles Analyzed</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;