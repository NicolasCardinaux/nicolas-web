import React from 'react';
import { education } from '../data/education';

const Education = () => {
  return (
    <section id="education" className="py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Educación</h2>
        </div>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="rounded-md border border-border bg-card p-5 shadow-sm">
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <h4 className="text-sm text-muted-foreground">{edu.institution}</h4>
              <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
              {edu.extra && <p className="mt-2 text-sm font-medium">{edu.extra}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;