import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineChevronDown,
} from 'react-icons/hi';
import { easeCustom } from '../../utils/motionVariants';
import './Experience.css';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  technologies: string[];
  icon: 'work' | 'education';
  color: string;
}

interface CertificationItem {
  id: number;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [certRef, certInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: 'Programming Competitions Manager',
      company: 'Global Robotics Challenge (GRC) — Egypt 2026',
      location: 'Cairo, Egypt',
      period: '2025',
      type: 'Full-time',
      description: [
        'Architected and deployed a React + TypeScript real-time scoring system using Redux Toolkit, React Router v6, and Firebase Firestore — supporting 13 competitions across 38 categories with live score updates.',
        'Implemented role-based access control (Admin, Judge, Public Viewer) via React Context + Firebase Auth, with mission-based criteria scoring, audit logging, and protected route guards.',
        'Built a React QR attendance system using react-qr-code and html5-qrcode for 170+ teams — with automated QR generation, EmailJS delivery, and real-time Firestore check-in tracking, cutting manual check-in time by ~80%.',
        'Leveraged React Query for server-state caching and optimistic UI updates; deployed both apps on Firebase Hosting with CI/CD pipeline and Vite build tooling.',
        'Managed full event programming track: competition structure, task design, and all technical logistics for the national robotics and coding segments.',
      ],
      technologies: ['React', 'TypeScript', 'Redux Toolkit', 'Firebase', 'React Query', 'Vite', 'CI/CD'],
      icon: 'work',
      color: '#6C63FF',
    },
    {
      id: 2,
      role: 'Team Leader & Technical Supervisor — Programming',
      company: 'Discovery Academy for Science & Technology',
      location: 'Cairo, Egypt',
      period: '2024 – Present',
      type: 'Full-time',
      description: [
        'Promoted within one year from Instructor to Team Leader, overseeing programming education operations and a team of instructors across the branch.',
        'Standardized React.js and JavaScript curriculum roadmaps, improving student project completion rates by ~40%.',
        'Mentored junior instructors through code reviews and project-based pedagogy, increasing student retention and satisfaction across all cohorts.',
        'Delivered programming courses (HTML, CSS, JavaScript, Python, OOP) to students aged 12+, consistently receiving high satisfaction ratings.',
      ],
      technologies: ['React.js', 'JavaScript', 'Python', 'HTML/CSS', 'OOP', 'Curriculum Design'],
      icon: 'work',
      color: '#00D4AA',
    },
    {
      id: 3,
      role: 'Programming Instructor (Part-time)',
      company: 'Zoser Institute',
      location: 'Cairo, Egypt',
      period: 'Jul 2023 – Feb 2024',
      type: 'Part-time',
      description: [
        'Designed and delivered hands-on web development courses using a project-first approach, helping students ship real websites within the course timeline.',
        'Produced structured lesson plans that reduced curriculum preparation time by ~30% for future cohorts.',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Curriculum Design'],
      icon: 'work',
      color: '#FF6B6B',
    },
    {
      id: 4,
      role: 'Front-End Developer Intern',
      company: 'Sphinx Company',
      location: 'Cairo, Egypt',
      period: 'Apr 2023 – Oct 2023',
      type: 'Internship',
      description: [
        'Built 3+ interactive React.js web applications from design spec to deployment within an Agile team, participating in sprint planning and code reviews.',
        'Optimized component re-renders and implemented lazy loading, improving estimated page load speed by ~25% on targeted modules.',
      ],
      technologies: ['React.js', 'JavaScript', 'Agile/Scrum', 'Performance Optimization', 'Lazy Loading'],
      icon: 'work',
      color: '#FFCA28',
    },
    {
      id: 5,
      role: 'B.Sc. in Computer Science',
      company: 'Benha University',
      location: 'Cairo, Egypt',
      period: '2018 – 2022',
      type: 'Education',
      description: [
        'Completed a comprehensive Computer Science curriculum covering algorithms, data structures, OOP, databases, and software engineering.',
        'Graduation Project: Sign Language Detection System using Python, TensorFlow, and OpenCV with ~20% accuracy improvement.',
      ],
      technologies: ['Computer Science', 'Algorithms', 'Data Structures', 'Python', 'TensorFlow'],
      icon: 'education',
      color: '#6C63FF',
    },
  ];

  const certifications: CertificationItem[] = [
    {
      id: 1,
      title: 'Pro Frontend Engineer: React.js + TypeScript + Redux Toolkit',
      issuer: 'Udemy — Muhammad Naga',
      year: '2025',
      description: 'Jest, RTL, CI/CD, scalable architecture & testing',
    },
    {
      id: 2,
      title: 'Vue.js',
      issuer: 'Route Academy',
      year: '2026',
      description: 'Vue.js core concepts, component architecture & reactive UI development',
    },
    {
      id: 3,
      title: 'Web Development Diploma',
      issuer: 'Russian Culture Center, Cairo',
      year: '2023',
      description: 'Full-stack fundamentals, responsive design, UX principles',
    },
  ];

  // ✅ Variants مصلحة
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeCustom },
    },
  };

  const certVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeCustom },
    },
  };

  const toggleExpand = (id: number): void => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="experience section" id="experience">
      <div className="experience__orb experience__orb--1" />
      <div className="experience__orb experience__orb--2" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="section__label">// Career Path</span>
          <h2 className="section__title">Experience & Education</h2>
          <p className="section__subtitle">
            A journey from curious learner to engineering leader — building, teaching, and shipping along the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="experience__timeline"
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          animate={timelineInView ? 'visible' : 'hidden'}
        >
          <div className="experience__timeline-line">
            <motion.div
              className="experience__timeline-line-fill"
              initial={{ height: 0 }}
              animate={timelineInView ? { height: '100%' } : {}}
              transition={{ duration: 2, ease: easeCustom }}
            />
          </div>

          {experiences.map((exp: ExperienceItem) => (
            <motion.div
              key={exp.id}
              className={`experience__item ${expandedId === exp.id ? 'experience__item--expanded' : ''}`}
              variants={itemVariants}
            >
              <motion.div
                className="experience__dot"
                style={{ borderColor: exp.color, boxShadow: `0 0 15px ${exp.color}40` }}
                whileHover={{ scale: 1.3, boxShadow: `0 0 25px ${exp.color}60` }}
              >
                <div className="experience__dot-inner" style={{ background: exp.color }} />
              </motion.div>

              <motion.div
                className="experience__card"
                whileHover={{ borderColor: `${exp.color}30`, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
                onClick={() => toggleExpand(exp.id)}
              >
                <div className="experience__card-top">
                  <div className="experience__card-meta">
                    <div className="experience__card-period">
                      <HiOutlineCalendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    <span
                      className="experience__card-type"
                      style={{ color: exp.color, background: `${exp.color}12`, borderColor: `${exp.color}30` }}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <motion.div
                    className="experience__card-chevron"
                    animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiOutlineChevronDown size={18} />
                  </motion.div>
                </div>

                <h3 className="experience__card-role">{exp.role}</h3>
                <div className="experience__card-company">
                  {exp.icon === 'education' ? <HiOutlineAcademicCap size={16} /> : <HiOutlineBriefcase size={16} />}
                  <span>{exp.company}</span>
                </div>
                <div className="experience__card-location">
                  <HiOutlineLocationMarker size={14} />
                  <span>{exp.location}</span>
                </div>

                <AnimatePresence>
                  {expandedId === exp.id && (
                    <motion.div
                      className="experience__card-expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: easeCustom }}
                    >
                      <ul className="experience__card-list">
                        {exp.description.map((item: string, i: number) => (
                          <motion.li
                            key={i}
                            className="experience__card-list-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                          >
                            <span className="experience__card-list-bullet" style={{ background: exp.color }} />
                            {item}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="experience__card-techs">
                        {exp.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="experience__card-tech"
                            style={{ borderColor: `${exp.color}25`, color: exp.color, background: `${exp.color}08` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="experience__certifications"
          ref={certRef}
          initial={{ opacity: 0, y: 40 }}
          animate={certInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="experience__cert-header">
            <HiOutlineAcademicCap size={22} />
            <h3>Certifications & Courses</h3>
          </div>

          <motion.div
            className="experience__cert-grid"
            variants={containerVariants}
            initial="hidden"
            animate={certInView ? 'visible' : 'hidden'}
          >
            {certifications.map((cert: CertificationItem) => (
              <motion.div
                key={cert.id}
                className="experience__cert-card"
                variants={certVariants}
                whileHover={{ y: -4, borderColor: 'rgba(108, 99, 255, 0.3)', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
              >
                <div className="experience__cert-year">{cert.year}</div>
                <h4 className="experience__cert-title">{cert.title}</h4>
                <p className="experience__cert-issuer">{cert.issuer}</p>
                <p className="experience__cert-desc">{cert.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;