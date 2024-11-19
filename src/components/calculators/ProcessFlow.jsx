import React from 'react';

const ProcessFlow = () => {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full h-full"
      style={{ backgroundColor: '#000033' }}
    >
      {/* Feed (F) */}
      <text x="50" y="100" fill="#FFFF00" fontSize="36" fontWeight="bold">F</text>
      
      {/* First horizontal arrow */}
      <line x1="80" y1="95" x2="200" y2="95" stroke="white" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* First separator box */}
      <path
        d="M 200,50 L 400,50 L 450,150 L 150,150 Z"
        fill="#FFA500"
        stroke="#FFA500"
      />
      
      {/* Second separator box */}
      <path
        d="M 500,50 L 700,50 L 750,150 L 450,150 Z"
        fill="#FFA500"
        stroke="#FFA500"
      />
      
      {/* Middle horizontal arrow */}
      <line x1="400" y1="95" x2="500" y2="95" stroke="white" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Final horizontal arrow (to T) */}
      <line x1="700" y1="95" x2="780" y2="95" stroke="white" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Tails (T) */}
      <text x="780" y="100" fill="#FFFF00" fontSize="36" fontWeight="bold">T</text>
      
      {/* Vertical arrows */}
      <line x1="300" y1="150" x2="300" y2="200" stroke="white" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <line x1="600" y1="150" x2="600" y2="200" stroke="white" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* C1 and C2 labels */}
      <text x="285" y="230" fill="#FFFF00" fontSize="36" fontWeight="bold">C₁</text>
      <text x="585" y="230" fill="#FFFF00" fontSize="36" fontWeight="bold">C₂</text>
      
      {/* Arrow definitions */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="white" />
        </marker>
      </defs>
    </svg>
  );
};

export default ProcessFlow;