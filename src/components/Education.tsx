import React from 'react';
import { ShieldAlert, UserX, AlertTriangle } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Protect Against Fake Profiles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article className="group">
          <div className="aspect-video mb-4 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
              alt="Detecting Fake Profiles"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Identifying Fake Accounts</h3>
          <p className="text-slate-400">Learn the key warning signs of fake profiles and how to protect yourself from social media fraud.</p>
        </article>

        <article className="group">
          <div className="aspect-video mb-4 rounded-xl overflow-hidden">
            <img
              src="https://www.niceactimize.com/blog/wp-content/uploads/2021/12/sam_682_325_2.jpg"
              alt="Online Safety"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Report Suspicious Activity</h3>
          <p className="text-slate-400">Understanding when and how to report suspicious profiles to authorities and platform administrators.</p>
        </article>

        <article className="group">
          <div className="aspect-video mb-4 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
              alt="Cybersecurity"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Stay Protected</h3>
          <p className="text-slate-400">Best practices for maintaining your social media security and avoiding scams.</p>
        </article>
      </div>
    </section>
  );
};

export default Education;