import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiTailwindcss,
  SiFirebase,
  SiGit,
  SiVuedotjs,
  SiVite,
  SiJest,
  SiPython,
  SiHtml5,
  SiCss,        // ✅ الاسم الصح
  SiBootstrap,
  SiMysql,
} from 'react-icons/si';
import { TbBrandFramerMotion, TbApi } from 'react-icons/tb';
import { HiOutlineDeviceMobile, HiOutlineCog } from 'react-icons/hi';
import { easeCustom } from '../../utils/motionVariants';
import './Skills.css';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  level: number;
  color: string;
}

interface SkillCategoryData {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: SkillItem[];
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories: SkillCategoryData[] = [
    {
      id: 'frontend',
      title: 'Frontend',
      icon: <SiReact size={20} />,
      description: 'Core technologies I use to build modern, performant user interfaces.',
      skills: [
        { name: 'React.js', icon: <SiReact />, level: 95, color: '#61DAFB' },
        { name: 'TypeScript', icon: <SiTypescript />, level: 90, color: '#3178C6' },
        { name: 'Next.js 14', icon: <SiNextdotjs />, level: 85, color: '#FFFFFF' },
        { name: 'JavaScript', icon: <SiJavascript />, level: 95, color: '#F7DF1E' },
        { name: 'Vue.js', icon: <SiVuedotjs />, level: 70, color: '#4FC08D' },
        { name: 'HTML5', icon: <SiHtml5 />, level: 98, color: '#E34F26' },
        { name: 'CSS3', icon: <SiCss />, level: 95, color: '#1572B6' },   // ✅ مصلح
        { name: 'Redux Toolkit', icon: <SiRedux />, level: 90, color: '#764ABC' },
      ],
    },
    {
      id: 'styling',
      title: 'Styling & UI',
      icon: <HiOutlineDeviceMobile size={20} />,
      description: 'Design systems and styling tools I work with daily.',
      skills: [
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 92, color: '#06B6D4' },
        { name: 'Framer Motion', icon: <TbBrandFramerMotion />, level: 88, color: '#FF0050' },
        { name: 'Bootstrap', icon: <SiBootstrap />, level: 85, color: '#7952B3' },
        { name: 'Responsive Design', icon: <HiOutlineDeviceMobile />, level: 95, color: '#00D4AA' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      icon: <TbApi size={20} />,
      description: 'Server-side technologies and data management.',
      skills: [
        { name: 'Firebase', icon: <SiFirebase />, level: 88, color: '#FFCA28' },
        { name: 'REST APIs', icon: <TbApi />, level: 90, color: '#6C63FF' },
        { name: 'MySQL', icon: <SiMysql />, level: 70, color: '#4479A1' },
        { name: 'Python', icon: <SiPython />, level: 75, color: '#3776AB' },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Workflow',
      icon: <HiOutlineCog size={20} />,
      description: 'Development tools and practices I rely on.',
      skills: [
        { name: 'Git & GitHub', icon: <SiGit />, level: 92, color: '#F05032' },
        { name: 'Vite', icon: <SiVite />, level: 90, color: '#646CFF' },
        { name: 'Jest & RTL', icon: <SiJest />, level: 78, color: '#C21325' },
        { name: 'CI/CD', icon: <HiOutlineCog />, level: 75, color: '#00D4AA' },
      ],
    },
  ];

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory);

  // ✅ Variants مصلحة
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const skillVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: easeCustom },
    },
    exit: { opacity: 0, x: 30, transition: { duration: 0.2 } },
  };

  return (
    <section className="skills section" id="skills">
      <div className="skills__orb skills__orb--1" />
      <div className="skills__orb skills__orb--2" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="section__label">// Tech Arsenal</span>
          <h2 className="section__title">Skills & Technologies</h2>
          <p className="section__subtitle">
            The tools and technologies I wield to transform ideas into production-ready applications.
          </p>
        </motion.div>

        {/* Content */}
        <div className="skills__content" ref={contentRef}>
          {/* Category Tabs */}
          <motion.div
            className="skills__tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category: SkillCategoryData) => (
              <motion.button
                key={category.id}
                className={`skills__tab ${
                  activeCategory === category.id ? 'skills__tab--active' : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="skills__tab-icon">{category.icon}</span>
                <span className="skills__tab-text">{category.title}</span>
                {activeCategory === category.id && (
                  <motion.div
                    className="skills__tab-indicator"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="skills__grid-wrapper">
            {activeCategoryData && (
              <motion.p
                className="skills__category-desc"
                key={`desc-${activeCategory}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeCategoryData.description}
              </motion.p>
            )}

            <AnimatePresence mode="wait">
              {activeCategoryData && (
                <motion.div
                  className="skills__grid"
                  key={activeCategory}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {activeCategoryData.skills.map(
                    (skill: SkillItem, index: number) => (
                      <motion.div
                        key={`${activeCategory}-${skill.name}`}
                        className="skill-item"
                        variants={skillVariants}
                        whileHover={{
                          y: -5,
                          borderColor: `${skill.color}40`,
                          boxShadow: `0 8px 30px ${skill.color}15`,
                        }}
                      >
                        {/* Skill Header */}
                        <div className="skill-item__header">
                          <div
                            className="skill-item__icon"
                            style={{
                              color: skill.color,
                              background: `${skill.color}12`,
                            }}
                          >
                            {skill.icon}
                          </div>
                          <div className="skill-item__info">
                            <span className="skill-item__name">{skill.name}</span>
                            <span
                              className="skill-item__level-text"
                              style={{ color: skill.color }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="skill-item__bar-container">
                          <motion.div
                            className="skill-item__bar"
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + index * 0.1,
                              ease: easeCustom,
                            }}
                          />
                          <motion.div
                            className="skill-item__bar-glow"
                            style={{
                              background: skill.color,
                              boxShadow: `0 0 10px ${skill.color}`,
                            }}
                            initial={{ left: '0%' }}
                            animate={{ left: `${skill.level - 1}%` }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + index * 0.1,
                              ease: easeCustom,
                            }}
                          />
                        </div>

                        {/* Proficiency */}
                        <div className="skill-item__proficiency">
                          <span>
                            {skill.level >= 90
                              ? 'Expert'
                              : skill.level >= 80
                              ? 'Advanced'
                              : skill.level >= 70
                              ? 'Proficient'
                              : 'Intermediate'}
                          </span>
                        </div>
                      </motion.div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Marquee */}
          <motion.div
            className="skills__marquee"
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="skills__marquee-label">
              <span>Also experienced with</span>
            </div>
            <div className="skills__marquee-track">
              <motion.div
                className="skills__marquee-content"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {[
                  'React Query', 'React Router v6', 'React Hook Form', 'Zod',
                  'EmailJS', 'html5-qrcode', 'react-qr-code', 'Agile/Scrum',
                  'OOP', 'Component Architecture', 'Custom Hooks', 'Performance Optimization',
                  'React Query', 'React Router v6', 'React Hook Form', 'Zod',
                  'EmailJS', 'html5-qrcode', 'react-qr-code', 'Agile/Scrum',
                  'OOP', 'Component Architecture', 'Custom Hooks', 'Performance Optimization',
                ].map((tech: string, index: number) => (
                  <span key={index} className="skills__marquee-item">
                    {tech}
                    <span className="skills__marquee-dot">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;