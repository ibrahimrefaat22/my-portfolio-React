import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineExternalLink,
  HiOutlineCode,
  HiOutlineLightBulb,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { easeCustom } from '../../utils/motionVariants';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
  stats: { label: string; value: string }[];
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filters: { id: string; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'production', label: 'Production' },
    { id: 'personal', label: 'Personal' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'GRC Real-Time Scoring System',
      subtitle: 'National Robotics Championship Platform',
      description:
        'A comprehensive real-time scoring platform built for the Global Robotics Challenge Egypt 2026, serving live judges and spectators throughout the national event.',
      problem:
        "The original scoring system was built in Vanilla JavaScript and couldn't scale to handle 13 competitions across 38 categories with real-time updates and role-based access control.",
      solution:
        'Rebuilt from scratch using React + TypeScript with Redux Toolkit for global score state management, React Router v6 for protected role-based routes (Admin/Judge/Public), and React Query for real-time Firestore synchronization with optimistic updates.',
      techStack: ['React', 'TypeScript', 'Redux Toolkit', 'Firebase', 'React Query', 'React Router v6', 'Vite'],
      liveUrl: 'https://grc-live-score.web.app',
      githubUrl: 'https://github.com/ibrahimrefaat22/grc-live-score',
      category: 'production',
      featured: true,
      stats: [
        { label: 'Competitions', value: '13' },
        { label: 'Categories', value: '38' },
        { label: 'Real-time', value: 'Yes' },
        { label: 'Roles', value: '3' },
      ],
    },
    {
      id: 2,
      title: 'GRC QR Attendance System',
      subtitle: 'Automated Event Check-in Platform',
      description:
        'A QR-based attendance management system that automated the check-in process for 170+ teams at the national robotics championship.',
      problem:
        'Manual check-in for 170+ teams was taking too long and causing delays at the event entrance, with no reliable way to track attendance in real-time.',
      solution:
        'Migrated to React + TypeScript with react-qr-code for generation, html5-qrcode for camera scanning, React Hook Form + Zod for validated team registration, and Framer Motion for animated scan feedback. EmailJS handles automated QR delivery.',
      techStack: ['React', 'TypeScript', 'Firebase', 'react-qr-code', 'html5-qrcode', 'Zod', 'EmailJS', 'Framer Motion'],
      liveUrl: 'https://grc-attendance-3a712.web.app',
      githubUrl: 'https://github.com/ibrahimrefaat22/QR-Code-React',
      category: 'production',
      featured: true,
      stats: [
        { label: 'Teams Served', value: '170+' },
        { label: 'Time Saved', value: '80%' },
        { label: 'QR Scans', value: '1000+' },
        { label: 'Automated', value: 'Yes' },
      ],
    },
    {
      id: 3,
      title: 'E-Commerce Store',
      subtitle: 'Full-Featured Online Shopping Platform',
      description:
        'A modern, fully responsive e-commerce web application with product browsing, cart management, user authentication, and a seamless checkout experience.',
      problem:
        'Building a scalable online store that handles product catalogs, shopping cart state, user sessions, and a smooth UX across all devices.',
      solution:
        'Developed a React-based e-commerce platform with dynamic product listing, persistent cart using Context API / Redux, responsive design with modern CSS, and deployed on Vercel for fast global delivery.',
      techStack: ['React', 'JavaScript', 'CSS', 'React Router', 'Context API', 'Vercel'],
      liveUrl: 'https://e-commerce-eta-snowy.vercel.app',
      githubUrl: 'https://github.com/ibrahimrefaat22/E-commerce',
      category: 'personal',
      featured: false,
      stats: [
        { label: 'Pages', value: '10+' },
        { label: 'Responsive', value: 'Yes' },
        { label: 'Cart System', value: 'Yes' },
        { label: 'Deployed', value: 'Vercel' },
      ],
    },
    {
      id: 4,
      title: 'Admin Dashboard',
      subtitle: 'Interactive Data Management Panel',
      description:
        'A feature-rich admin dashboard with data tables, charts, analytics views, and a clean modern UI — built to manage and visualize business data efficiently.',
      problem:
        'Needed a centralized dashboard to manage data, visualize key metrics, and provide an intuitive admin interface with responsive layout and interactive charts.',
      solution:
        'Built a responsive admin panel using React with dynamic charts, data tables, sidebar navigation, and theme-ready components. Deployed on Vercel for instant access.',
      techStack: ['React', 'JavaScript', 'CSS', 'Chart.js', 'React Router', 'Vercel'],
      liveUrl: 'https://admin-dashboard-snowy-ten-79.vercel.app',
      githubUrl: 'https://github.com/ibrahimrefaat22/admin-dashboard',
      category: 'personal',
      featured: false,
      stats: [
        { label: 'Components', value: '15+' },
        { label: 'Charts', value: '5+' },
        { label: 'Responsive', value: 'Yes' },
        { label: 'Deployed', value: 'Vercel' },
      ],
    },
  ];

  const filteredProjects: Project[] =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const projectVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeCustom },
    },
  };

  return (
    <section className="projects section" id="projects">
      <div className="projects__orb projects__orb--1" />
      <div className="projects__orb projects__orb--2" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <span className="section__label">// Portfolio</span>
          <h2 className="section__title">Featured Projects</h2>
          <p className="section__subtitle">
            Real-world systems I've built and deployed — each solving genuine problems for real users.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`projects__filter ${activeFilter === filter.id ? 'projects__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {filter.label}
              {activeFilter === filter.id && (
                <motion.div
                  className="projects__filter-bg"
                  layoutId="activeFilter"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="projects__grid"
            ref={projectsRef}
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? 'visible' : 'hidden'}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {filteredProjects.map((project: Project, index: number) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'project-card--featured' : ''} ${
                  expandedProject === project.id ? 'project-card--expanded' : ''
                }`}
                variants={projectVariants}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                layout
              >
                {/* Card Header */}
                <div className="project-card__header">
                  <div className="project-card__header-top">
                    <div className="project-card__dots">
                      <span className="project-card__dot project-card__dot--red" />
                      <span className="project-card__dot project-card__dot--yellow" />
                      <span className="project-card__dot project-card__dot--green" />
                    </div>
                    <span className="project-card__category">
                      {project.category === 'production'
                        ? '🚀 Production'
                        : '💼 Personal'}
                    </span>
                  </div>

                  <motion.div
                    className="project-card__gradient"
                    animate={{
                      background:
                        hoveredProject === project.id
                          ? [
                              'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,170,0.15))',
                              'linear-gradient(225deg, rgba(108,99,255,0.2), rgba(255,107,107,0.15))',
                              'linear-gradient(315deg, rgba(0,212,170,0.15), rgba(108,99,255,0.15))',
                            ]
                          : 'linear-gradient(135deg, rgba(108,99,255,0.05), rgba(0,212,170,0.05))',
                    }}
                    transition={{ duration: 3, repeat: hoveredProject === project.id ? Infinity : 0 }}
                  >
                    <span className="project-card__number">{String(index + 1).padStart(2, '0')}</span>
                  </motion.div>
                </div>

                {/* Card Body */}
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__subtitle">{project.subtitle}</p>
                  <p className="project-card__description">{project.description}</p>

                  {/* Stats */}
                  <div className="project-card__stats">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="project-card__stat">
                        <span className="project-card__stat-value">{stat.value}</span>
                        <span className="project-card__stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        className="project-card__expanded"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: easeCustom }}
                      >
                        <div className="project-card__section">
                          <div className="project-card__section-header">
                            <HiOutlineLightBulb className="project-card__section-icon" size={18} />
                            <span>The Problem</span>
                          </div>
                          <p className="project-card__section-text">{project.problem}</p>
                        </div>
                        <div className="project-card__section">
                          <div className="project-card__section-header">
                            <HiOutlineCheckCircle
                              className="project-card__section-icon project-card__section-icon--green"
                              size={18}
                            />
                            <span>The Solution</span>
                          </div>
                          <p className="project-card__section-text">{project.solution}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tech Stack */}
                  <div className="project-card__tech">
                    {project.techStack.map((tech: string, i: number) => (
                      <motion.span
                        key={i}
                        className="project-card__tech-tag"
                        whileHover={{
                          y: -2,
                          background: 'rgba(108, 99, 255, 0.15)',
                          borderColor: 'rgba(108, 99, 255, 0.4)',
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="project-card__actions">
                    <motion.button
                      className="project-card__expand-btn"
                      onClick={() =>
                        setExpandedProject(expandedProject === project.id ? null : project.id)
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiOutlineCode size={16} />
                      <span>{expandedProject === project.id ? 'Show Less' : 'Case Study'}</span>
                    </motion.button>

                    <div className="project-card__links">
                      {/* GitHub Link */}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-card__link project-card__link--github"
                          aria-label="View Source Code"
                          whileHover={{ y: -3 }}
                          title="💻 Source Code"
                        >
                          <FaGithub size={16} />
                          <span>Code</span>
                        </motion.a>
                      )}

                      {/* Live Demo Link */}
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-card__link project-card__link--live"
                          aria-label="View Live Demo"
                          whileHover={{ y: -3 }}
                          title="🔴 Live Demo"
                        >
                          <span className="project-card__live-dot" />
                          <span>Live</span>
                          <HiOutlineExternalLink size={14} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                <motion.div
                  className="project-card__glow"
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;