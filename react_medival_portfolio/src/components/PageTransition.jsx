import { motion } from 'framer-motion';
import { useSettings } from '../lib/useSettings';

const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.25,
};

const PageTransition = ({ children }) => {
  const { animationLevel } = useSettings();
  const disabled = animationLevel === 'light';

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <MotionDiv
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </MotionDiv>
  );
};

export default PageTransition;
