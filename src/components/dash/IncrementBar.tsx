import React from 'react'

interface StyleProps {
    anchoBarra : string;
}

export const IncrementBar:React.FC<StyleProps> = ({
    anchoBarra,
}) => {
  return (
<div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
        <div className="relative h-1 flex items-center justify-center">
        <div style={{ width: anchoBarra }} className="absolute top-0 bottom-0 left-0 rounded-lg bg-blue-600 transition-width duration-500 ease-in-out"></div>
    </div>
</div>
  )
}

