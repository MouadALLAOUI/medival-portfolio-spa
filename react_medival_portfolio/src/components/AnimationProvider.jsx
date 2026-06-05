import { MotionConfig } from 'framer-motion';
import { useSettings } from '../lib/useSettings';

const AnimationProvider = ({ children }) => {
  const { animationLevel } = useSettings();
  const reduced = animationLevel === 'light';

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  );
};

export default AnimationProvider;
