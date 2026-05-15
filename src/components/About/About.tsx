import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlineGlobe,
  HiOutlineAcademicCap,
} from 'react-icons/hi';
import { easeCustom } from '../../utils/motionVariants';
import './About.css';

interface InfoCard {
  icon: React.ReactNode;
  title: string;
  value: string;
}

interface Highlight {
  number: string;
  label: string;
  description: string;
}

const About: React.FC = () => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [cardsRef, cardsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const infoCards: InfoCard[] = [
    { icon: <HiOutlineCode size={24} />, title: 'Specialization', value: 'Frontend Development' },
    { icon: <HiOutlineLightningBolt size={24} />, title: 'Experience', value: '1+ Years' },
    { icon: <HiOutlineGlobe size={24} />, title: 'Location', value: 'Cairo, Egypt' },
    { icon: <HiOutlineAcademicCap size={24} />, title: 'Degree', value: 'B.Sc. Computer Science' },
  ];

  const highlights: Highlight[] = [
    {
      number: '02',
      label: 'Production Systems',
      description: 'Deployed real-time scoring & QR attendance platforms for a national robotics championship serving 170+ teams.',
    },
    {
      number: '13',
      label: 'Competitions Managed',
      description: 'Architected a scoring system spanning 13 competitions across 38 categories with live updates and role-based access.',
    },
    {
      number: '80%',
      label: 'Efficiency Boost',
      description: 'Reduced manual event check-in time by ~80% through automated QR generation and real-time Firestore tracking.',
    },
    {
      number: '40%',
      label: 'Curriculum Impact',
      description: 'Standardized React.js and JavaScript roadmaps as Team Leader, improving student project completion rates by ~40%.',
    },
  ];

  // ✅ Variants مصلحة
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeCustom,
      },
    },
  };

  return (
    <section className="about section" id="about">
      <div className="about__orb about__orb--1" />
      <div className="about__orb about__orb--2" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="section__label">// About Me</span>
          <h2 className="section__title">Turning Vision Into Reality</h2>
          <p className="section__subtitle">
            More than just code — I build systems that solve real problems and serve real users at scale.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="about__grid" ref={contentRef}>
          {/* Left - Story */}
          <motion.div
            className="about__story"
            initial={{ opacity: 0, x: -50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeCustom }}
          >
            <div className="about__story-badge">
              <span className="about__story-badge-dot" />
              My Journey
            </div>

            <h3 className="about__story-title">
              I don't just write code.
              <br />
              <span className="about__story-title--accent">I engineer solutions.</span>
            </h3>

            <div className="about__story-text">
              <p>
                I'm Ibrahim Refaat — a Frontend Developer based in Cairo, Egypt, with over 1 years of
                hands-on experience building production-grade web applications. My journey started with
                curiosity about how the web works and evolved into a passion for crafting performant,
                scalable interfaces that real people use every day.
              </p>
              <p>
                My defining moment came when I was entrusted to architect and deploy{' '}
                <strong>two mission-critical systems</strong> for the Global Robotics Challenge (GRC)
                Egypt 2026 — a real-time scoring platform and a QR-based attendance system. Both were
                migrated from Vanilla JS to React + TypeScript, and served live judges, teams, and
                spectators throughout the national event.
              </p>
              <p>
                Beyond development, I lead a programming education team at Discovery Academy, where I've
                standardized curriculum roadmaps, mentored junior instructors, and consistently driven
                student project completion rates upward. I believe that teaching makes you a better
                engineer — it forces clarity of thought.
              </p>
            </div>

            {/* Info Cards */}
            <motion.div
              className="about__info-cards"
              variants={containerVariants}
              initial="hidden"
              animate={contentInView ? 'visible' : 'hidden'}
            >
              {infoCards.map((card: InfoCard, index: number) => (
                <motion.div
                  key={index}
                  className="about__info-card"
                  variants={itemVariants}
                  whileHover={{ y: -5, borderColor: 'rgba(108, 99, 255, 0.3)' }}
                >
                  <div className="about__info-card-icon">{card.icon}</div>
                  <div className="about__info-card-content">
                    <span className="about__info-card-title">{card.title}</span>
                    <span className="about__info-card-value">{card.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Highlights */}
          <motion.div
            className="about__highlights"
            ref={cardsRef}
            variants={containerVariants}
            initial="hidden"
            animate={cardsInView ? 'visible' : 'hidden'}
          >
            <div className="about__highlights-label">
              <span className="about__highlights-line" />
              Key Achievements
            </div>

            {highlights.map((highlight: Highlight, index: number) => (
              <motion.div
                key={index}
                className="about__highlight-card"
                variants={itemVariants}
                whileHover={{
                  x: 8,
                  borderColor: 'rgba(108, 99, 255, 0.4)',
                  background: 'rgba(255, 255, 255, 0.04)',
                }}
              >
                <div className="about__highlight-number">{highlight.number}</div>
                <div className="about__highlight-content">
                  <h4 className="about__highlight-title">{highlight.label}</h4>
                  <p className="about__highlight-desc">{highlight.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div className="about__philosophy" variants={itemVariants}>
              <div className="about__philosophy-icon">"</div>
              <p className="about__philosophy-text">
                I believe great frontend engineering is where performance meets empathy — building
                interfaces that are not just fast and scalable, but genuinely intuitive for the people
                who use them.
              </p>
              <span className="about__philosophy-author">— Ibrahim Refaat</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;