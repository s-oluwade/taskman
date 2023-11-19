'use client';

import React, {useEffect, useState} from 'react';
import Lottie from 'lottie-react';
import { animations } from '@/animations/animationMapping';

interface AnimatingIconProps {
  animationTag: string | null | undefined;
}

const AnimatingIcon = ({animationTag}: AnimatingIconProps) => {
  const [animation, setAnimation] = useState<{[key: string]: any}>(animations['shooting-stars']);

  useEffect(() => {
    if (animationTag && Object.keys(animations).includes(animationTag)) {
      setAnimation((animations as {[key: string]: any})[animationTag]);
    }
    else {
      setAnimation(animations['shooting-stars']);
    }

  }, [animationTag]);

  return <Lottie className='h-10' animationData={animation} loop={false} />;
};

export default AnimatingIcon;
