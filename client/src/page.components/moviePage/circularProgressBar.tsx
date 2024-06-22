function CircularProgress({percentage}: {percentage: number}) {
  const progressRating = percentage * 10;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressRating / 100) * circumference;
  const rating = progressRating / 10

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 100 100">
      <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="20%" stopColor="#800080" />
            <stop offset="100%" stopColor="#FFC0CB" />
          </linearGradient>
        </defs>
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="5"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        />
       <circle
          stroke='url(#gradient)'
          strokeWidth="5"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
        <text fontWeight={600} x="50" y="50"fontSize="16" fill='white' textAnchor="middle" alignmentBaseline="middle">
          {rating.toFixed(1)}
        </text>
      </svg>
    </div>
  );
}

export default CircularProgress;
