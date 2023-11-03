'use client';

import React, {useEffect, useState} from 'react';
import Lottie from 'lottie-react';
import * as shootingstarsdark from '@/animations/wired-outline-1865-shooting-stars.json';
import * as shootingstarslight from '@/animations/wired-outline-1865-shooting-stars-light.json';

interface AnimatingIconProps {
  animationIndex: number;
}

const AnimatingIcon = ({animationIndex}: AnimatingIconProps) => {
  const [animation, setAnimation] = useState<{[key: string]: any}>(shootingstarslight);

  useEffect(() => {
    switch (animationIndex) {
      case 0:
        setAnimation(shootingstarslight);
        break;

      default:
        break;
    }
  }, [animationIndex]);

  return <Lottie className='h-10' animationData={animation} loop={false} />;
};

export default AnimatingIcon;
