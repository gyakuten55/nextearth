import React from 'react';

interface SectionHeadingProps {
  number: string;
  eyebrow: string;
  title: string;
}

const GRADIENT_NUMBER = {
  background: 'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const SectionHeading: React.FC<SectionHeadingProps> = ({ number, eyebrow, title }) => {
  return (
    <div className="mb-12 md:mb-16 flex items-center gap-5">
      <span className="text-5xl md:text-6xl font-bold leading-none" style={GRADIENT_NUMBER}>
        {number}
      </span>
      <div>
        <p className="text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase mb-1">
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide">{title}</h2>
      </div>
    </div>
  );
};

export default SectionHeading;
