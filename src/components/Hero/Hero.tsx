import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { HiArrowDown, HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { easeCustom } from '../../utils/motionVariants';
import type { MousePosition } from '../../types';
import './Hero.css';

interface Particle {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  duration: number;
  delay: number;
}

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    []
  );

  const titleWords: string[] = ['Crafting', 'Digital', 'Experiences'];

  // ✅ Variants مصلحة بـ typed ease tuples
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.8,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 80, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: easeCustom,
      },
    },
  };

  const handleScrollToSection = (selector: string): void => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats: { number: string; label: string }[] = [
    { number: '3+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Delivered' },
    { number: '170+', label: 'Teams Served' },
  ];

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero__bg">
        <motion.div
          className="hero__orb hero__orb--1"
          animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="hero__orb hero__orb--2"
          animate={{ x: mousePosition.x * -1.5, y: mousePosition.y * -1.5 }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="hero__orb hero__orb--3"
          animate={{ x: mousePosition.x, y: mousePosition.y }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />

        <div className="hero__grid" />

        {particles.map((particle: Particle) => (
          <motion.div
            key={particle.id}
            className="hero__particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.width,
              height: particle.height,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="hero__container container">
        {/* Social Links */}
        <motion.div
          className="hero__socials"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.8, duration: 0.6 }}
        >
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="mailto:ibrahimrefaat047@gmail.com" aria-label="Email">
            <HiOutlineMail />
          </a>
          <div className="hero__socials-line" />
        </motion.div>

        {/* Main Content */}
        <div className="hero__content">
          {/* Status Badge */}
          <motion.div
            className="hero__status"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.2, ease: easeCustom }}
          >
            <span className="hero__status-dot" />
            <span>Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.p
            className="hero__name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.3, ease: easeCustom }}
          >
            Ibrahim Refaat
          </motion.p>

          {/* Title */}
          <motion.h1
            className="hero__title"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word: string, index: number) => (
              <motion.span
                key={index}
                className={`hero__title-word ${
                  index === 1 ? 'hero__title-word--gradient' : ''
                }`}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.7, ease: easeCustom }}
          >
            Frontend Developer specializing in building exceptional digital
            experiences. I architect scalable React applications with TypeScript,
            delivering production-grade systems that serve real users at
            national-level events.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.9, ease: easeCustom }}
          >
            <motion.button
              className="hero__btn hero__btn--primary"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(108, 99, 255, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollToSection('#projects')}
            >
              <span>View My Work</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.button>

            <motion.a
              href="/Ibrahim_Refaat_CV.pdf"
              download="Ibrahim_Refaat_CV.pdf"
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Download CV</span>
              <HiArrowDown />
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.1, ease: easeCustom }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                {index > 0 && <div className="hero__stat-divider" />}
                <div className="hero__stat">
                  <span className="hero__stat-number">{stat.number}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 0.6 }}
        >
          <span>Scroll</span>
          <motion.div
            className="hero__scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;