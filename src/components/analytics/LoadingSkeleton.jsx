import React from 'react';

const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm animate-pulse ${className}`}>
    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
    <div className="h-8 bg-slate-200 rounded w-1/2"></div>
  </div>
);

const SkeletonChart = ({ className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm animate-pulse ${className}`}>
    <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
    <div className="h-48 bg-slate-100 rounded w-full"></div>
  </div>
);

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonChart />
        <SkeletonChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonChart />
        <SkeletonChart />
      </div>
    </div>
  );
};

export default React.memo(LoadingSkeleton);
