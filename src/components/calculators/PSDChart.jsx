import React from 'react';

const PSDChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        Enter size fraction data to generate chart
      </div>
    );
  }

  // Chart dimensions
  const width = 600;
  const height = 400;
  const padding = 40;

  // Calculate chart area
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  // Extract size values and passing percentages
  const points = data.map(row => ({
    size: parseFloat(row.sizeRange.split('-')[0]),
    passing: parseFloat(row.cumulativePassing)
  }));

  // Calculate scales
  const maxSize = Math.max(...points.map(p => p.size));
  const minSize = Math.min(...points.map(p => p.size));

  const scaleX = (size) => {
    const logSize = Math.log10(size);
    const logMin = Math.log10(minSize);
    const logMax = Math.log10(maxSize);
    return padding + (chartWidth * (logSize - logMin) / (logMax - logMin));
  };

  const scaleY = (passing) => {
    return height - padding - (chartHeight * passing / 100);
  };

  // Generate path
  const pathData = points
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(point.size)} ${scaleY(point.passing)}`)
    .join(' ');

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="white"
        strokeWidth="1"
      />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="white"
        strokeWidth="1"
      />

      {/* Data line */}
      <path
        d={pathData}
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2"
      />

      {/* Data points */}
      {points.map((point, i) => (
        <circle
          key={i}
          cx={scaleX(point.size)}
          cy={scaleY(point.passing)}
          r="4"
          fill="#FF6B00"
        />
      ))}

      {/* Axis labels */}
      <text
        x={width / 2}
        y={height - 10}
        textAnchor="middle"
        fill="white"
        fontSize="12"
      >
        Particle Size (μm)
      </text>
      <text
        x={15}
        y={height / 2}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        transform={`rotate(-90 15 ${height / 2})`}
      >
        Cumulative % Passing
      </text>
    </svg>
  );
};

export default PSDChart;