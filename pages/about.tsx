import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Target, Lightbulb, ShieldCheck, Handshake, BrainCircuit } from 'lucide-react';
import styles from './about.module.css';

const values = [
  {
    icon: <Lightbulb size={24} className={styles.valueIcon} />,
    title: 'Innovation',
    description: 'We are relentless in our pursuit of the next breakthrough, constantly exploring new technologies to solve tomorrow\'s problems.'
  },
  {
    icon: <Handshake size={24} className={styles.valueIcon} />,
    title: 'Client Partnership',
    description: 'Your success is our success. We work as an extension of your team to deliver solutions that create real, measurable value.'
  },
  {
    icon: <ShieldCheck size={24} className={styles.valueIcon} />,
    title: 'Ethical AI',
    description: 'We are committed to building responsible, fair, and transparent AI systems that benefit society and build trust.'
  },
  {
    icon: <BrainCircuit size={24} className={styles.valueIcon} />,
    title: 'Deep Expertise',
    description: 'Our strength lies in our profound understanding of AI. We combine academic rigor with practical, real-world application.'
  }
];



export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | KRISHVATECH PRIVATE LIMITED</title>
        <meta
          name="description"
          content="Learn about KRISHVATECH's mission to revolutionize industries with advanced AI, our commitment to building ethical and innovative solutions, and how to get in touch with our team."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.heroBreadcrumb}>About Us</p>
            <h1 className={styles.heroTitle}>Leading AI Innovation & Excellence</h1>
            <p className={styles.heroSubtitle}>
              KRISHVATECH PRIVATE LIMITED specializes in developing cutting-edge AI solutions that transform businesses through intelligent automation, multilingual communication, and advanced analytics. We deliver bespoke artificial intelligence systems that solve complex challenges and drive measurable growth.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className={styles.missionSection}>
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <Target size={32} className={styles.missionIcon} />
              <h2 className={styles.missionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                To empower businesses of all sizes with bespoke, intelligent AI solutions that enhance efficiency, deepen customer engagement, and unlock transformative insights from data.
              </p>
            </div>
            <div className={styles.missionCard}>
              <Lightbulb size={32} className={styles.missionIcon} />
              <h2 className={styles.missionTitle}>Our Vision</h2>
              <p className={styles.missionText}>
                To be a global leader in applied AI, creating a future where intelligent technology is an accessible, ethical, and powerful force for good in every industry.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <p className={styles.sectionSubtitle}>
              The principles that guide our work, our partnerships, and our innovations.
            </p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <div key={value.title} className={styles.valueCard}>
                {value.icon}
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </section>


      </div>
    </>
  );
}