import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  const nameChars: string[] = 'Ibrahim'.split('');

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
        >
          <motion.div className="loader__content">
            {/* Animated Name */}
            <motion.div className="loader__logo">
              {nameChars.map((char: string, i: number) => (
                <motion.span
                  key={i}
                  className="loader__char"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="loader__role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Frontend Developer
            </motion.p>

            {/* Loading Bar */}
            <motion.div className="loader__bar-container">
              <motion.div
                className="loader__bar"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 1.8,
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </motion.div>

            <motion.p
              className="loader__text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading Experience...
            </motion.p>
          </motion.div>

          {/* Reveal Panels */}
          <motion.div
            className="loader__panel loader__panel--left"
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="loader__panel loader__panel--right"
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;