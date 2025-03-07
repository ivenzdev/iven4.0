import React from 'react';
import { animated, useSpring } from 'react-spring';

interface FilledBarProps {
  item: {
    name: string;
    level: number;
  };
  id: number;
  appear: boolean;
}

function FilledBar({ item, appear }: FilledBarProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const widthSpring = useSpring({
    from: { width: '0%' },
    to: { width: appear ? `${item.level}%` : '0%' },
    config: {
      tension: 1000,
      friction: 500,
      mass: 50,
    },
    onChange: (props) => {
      // Extract the width percentage and update display value
      const width = props.value.width;
      const percentage = parseInt(width as string);
      setDisplayValue(percentage);
    },
  });

  return (
    <div className='skill-bar'>
      <span className='skill-bar-name'>{item.name}</span>
      <div className='skill-bar-body'>
        <animated.div style={widthSpring}></animated.div>
        <span className='percentage-text'>{`${displayValue}%`}</span>
      </div>
    </div>
  );
}

export default FilledBar;
