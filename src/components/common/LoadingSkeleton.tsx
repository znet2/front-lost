export const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card">
          <div className="flex gap-4">
            <div className="skeleton w-24 h-24 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="card">
      <div className="skeleton h-48 rounded-lg mb-4" />
      <div className="skeleton h-6 w-3/4 mb-2" />
      <div className="skeleton h-4 w-1/2 mb-4" />
      <div className="skeleton h-4 w-full" />
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="skeleton h-16 rounded-lg" />
      ))}
    </div>
  );
};
