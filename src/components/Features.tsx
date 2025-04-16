import React from 'react';
import { Brain, Shield, Clock, Database, AlertTriangle, UserX } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Advanced Detection Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-red-500/50 transition-colors">
          <div className="p-3 bg-red-500/20 rounded-lg w-fit mb-4">
            <UserX className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Fake Profile Detection</h3>
          <p className="text-slate-400">
            Advanced algorithms analyze profile patterns, behavior, and network connections to identify suspicious accounts.
          </p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-orange-500/50 transition-colors">
          <div className="p-3 bg-orange-500/20 rounded-lg w-fit mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Threat Assessment</h3>
          <p className="text-slate-400">
            Evaluate potential risks and threats posed by suspicious accounts with detailed risk analysis.
          </p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
          <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4">
            <Shield className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Instant Reporting</h3>
          <p className="text-slate-400">
            Direct integration with CERT-In for immediate reporting and action against malicious profiles.
          </p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
          <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-4">
            <Brain className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
          <p className="text-slate-400">
            Machine learning algorithms trained on millions of profiles to detect sophisticated impersonation attempts.
          </p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-green-500/50 transition-colors">
          <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-4">
            <Clock className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
          <p className="text-slate-400">
            Continuous scanning and analysis of social media activities to detect suspicious behavior patterns.
          </p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-yellow-500/50 transition-colors">
          <div className="p-3 bg-yellow-500/20 rounded-lg w-fit mb-4">
            <Database className="w-6 h-6 text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Threat Database</h3>
          <p className="text-slate-400">
            Access to an extensive database of known fake accounts and emerging deception patterns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;