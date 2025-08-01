import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ArrowRight, Bot, Mic, Users, Smile, Eye, Languages, BrainCircuit, Code, Wifi, Cloud, Sparkles, MessageSquare, Search, Server, Zap, Atom, Headphones, Volume2, Database, Rocket } from 'lucide-react';
import { TechShowcase } from '../components/TechShowcase';
import styles from './_index.module.css';

const services = [
  {
    icon: <Bot size={28} className={styles.serviceIcon} />,
    title: 'AI-Powered Chatbots',
    description: 'Engage customers with intelligent, human-like chatbots that provide instant support and drive conversions.',
  },
  {
    icon: <Mic size={28} className={styles.serviceIcon} />,
    title: 'Multilingual Voice Agents',
    description: 'Deploy sophisticated voice agents that communicate fluently in English, Hindi, Gujarati, and more.',
  },
  {
    icon: <Users size={28} className={styles.serviceIcon} />,
    title: 'Interview Copilot',
    description: 'Get instant, GPT-based answers and feedback for tech, HR, or manager interviews. Practice with smart responses and crack your next interview stress-free!',
  },
  {
    icon: <Smile size={28} className={styles.serviceIcon} />,
    title: 'Sentiment Analysis',
    description: 'Gain deep insights from customer feedback, social media, and internal communications at any scale.',
  },
  {
    icon: <Eye size={28} className={styles.serviceIcon} />,
    title: 'Computer Vision',
    description: 'Unlock the power of visual data with custom solutions for image recognition, object detection, and analysis.',
  },
  {
    icon: <Wifi size={28} className={styles.serviceIcon} />,
    title: 'IoT Cloud Integration & ThingsBoard',
    description: 'Build scalable IoT solutions with ThingsBoard deployment, email alarm plugins, rule setup, and custom widget development.',
  },
];

const expertiseAreas = [
  { icon: <BrainCircuit size={20} />, name: 'Machine Learning' },
  { icon: <Languages size={20} />, name: 'Natural Language Processing' },
  { icon: <Code size={20} />, name: 'Deep Learning' },
  { icon: <Bot size={20} />, name: 'Agentic AI' },
  { icon: <Eye size={20} />, name: 'Computer Vision' },
  { icon: <Smile size={20} />, name: 'Sentiment Analysis' },
  { icon: <Wifi size={20} />, name: 'IoT Solutions' },
  { icon: <Cloud size={20} />, name: 'ThingsBoard Platform' },
  { icon: <Code size={20} />, name: 'Python' },
  { icon: <Sparkles size={20} />, name: 'Generative AI' },
  { icon: <MessageSquare size={20} />, name: 'Large Language Models' },
  { icon: <Search size={20} />, name: 'RAG Systems' },
  { icon: <Mic size={20} />, name: 'Voice AI' },
  { icon: <Server size={20} />, name: 'Django' },
  { icon: <Zap size={20} />, name: 'FastAPI' },
  { icon: <Atom size={20} />, name: 'React' },
  { icon: <Headphones size={20} />, name: 'Whisper AI' },
  { icon: <Volume2 size={20} />, name: 'Google STT/TTS' },
  { icon: <Database size={20} />, name: 'Vector Databases' },
  { icon: <Rocket size={20} />, name: 'Edge AI' },
];

export default function IndexPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up intersection observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeInVisible);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`.${styles.fadeInUp}, .${styles.fadeInLeft}, .${styles.fadeInRight}`);
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector(`.${styles.heroTitle}`);
    if (heroTitle) {
      heroTitle.classList.add(styles.typewriterAnimation);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>KRISHVATECH PRIVATE LIMITED | Advanced AI Solutions</title>
        <meta
          name="description"
          content="KRISHVATECH PRIVATE LIMITED - Expert developers of AI-powered chatbots, multilingual voice agents, interview copilots, and computer vision solutions. Transform your business with our advanced AI expertise."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        {/* Animated Background Pattern */}
        <div className={styles.backgroundPattern}>
          <div className={styles.patternDot}></div>
          <div className={styles.patternDot}></div>
          <div className={styles.patternDot}></div>
          <div className={styles.patternDot}></div>
          <div className={styles.patternDot}></div>
        </div>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroGradientOverlay}></div>
          <div className={`${styles.heroContent} ${styles.fadeInUp}`}>
            <div className={styles.heroLogo}>
              <img 
                src="https://assets.floot.app/6bcce8aa-7f32-4573-a4b4-bdb405c912d4/c9aa2c79-57c5-4cfb-88cd-6552563764f7.png" 
                alt="KRISHVATECH PRIVATE LIMITED Logo" 
                className={styles.heroLogoImage}
              />
            </div>
            <Badge variant="secondary" className={`${styles.heroBadge} ${styles.floating}`}>
              <BrainCircuit size={14} className={styles.pulsing} />
              <span>Pioneering Advanced AI Solutions</span>
            </Badge>
            <h1 className={styles.heroTitle}>
              Building the Future of AI
            </h1>
            <p className={styles.heroSubtitle}>
              KRISHVATECH PRIVATE LIMITED crafts bespoke AI solutions—from multilingual chatbots and voice agents to advanced computer vision—that understand, engage, and solve complex challenges.
            </p>
            <div className={styles.heroActions}>
              <Button asChild size="lg" className={styles.bounceButton}>
                <Link to="#contact">Start Your AI Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className={styles.bounceButton}>
                <Link to="#services">Explore Services <ArrowRight size={16} /></Link>
              </Button>
            </div>
          </div>
          <div className={styles.heroVisualization}>
            <TechShowcase />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={`${styles.section} ${styles.fadeInUp}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Core AI Services</h2>
            <p className={styles.sectionSubtitle}>
              Tailored solutions designed to meet your unique business needs.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={service.title} className={`${styles.serviceCard} ${styles.fadeInUp}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.serviceCardIconWrapper}>{service.icon}</div>
                <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                <p className={styles.serviceCardDescription}>{service.description}</p>
                <div className={styles.serviceCardProgress}>
                  <div className={styles.progressBar}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Multi-language Section */}
        <section className={`${styles.languageSection} ${styles.fadeInLeft}`}>
          <div className={styles.languageContent}>
            <h2 className={styles.sectionTitle}>Global Reach, Local Understanding</h2>
            <p className={styles.sectionSubtitle}>
              Our AI agents communicate fluently in the languages that matter most to your audience, ensuring natural and effective interactions.
            </p>
            <div className={styles.languageBadges}>
              <Badge className={`${styles.languageBadge} ${styles.slideIn}`}>English</Badge>
              <Badge className={`${styles.languageBadge} ${styles.slideIn}`} style={{ animationDelay: '0.1s' }}>हिन्दी</Badge>
              <Badge className={`${styles.languageBadge} ${styles.slideIn}`} style={{ animationDelay: '0.2s' }}>ગુજરાતી</Badge>
              <Badge variant="outline" className={`${styles.languageBadge} ${styles.slideIn}`} style={{ animationDelay: '0.3s' }}>+ More</Badge>
            </div>
          </div>
          <div className={styles.languageGlobe}>
            <Languages size={120} className={`${styles.globeIcon} ${styles.rotating}`} />
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className={`${styles.section} ${styles.fadeInRight}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Powered by Cutting-Edge Expertise</h2>
            <p className={styles.sectionSubtitle}>
              We leverage the latest advancements in AI to build robust and scalable solutions.
            </p>
          </div>
          <div className={styles.expertiseGrid}>
            {expertiseAreas.map((area, index) => (
              <div key={area.name} className={`${styles.expertiseItem} ${styles.scaleIn}`} style={{ animationDelay: `${index * 0.1}s` }}>
                {area.icon}
                <span>{area.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className={`${styles.ctaSection} ${styles.fadeInUp}`}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Business?</h2>
            <p className={styles.ctaText}>
              Let's discuss how our AI expertise can help you innovate, automate, and grow. Schedule a free consultation with our experts today.
            </p>
            <Button asChild size="lg" className={styles.ctaButton}>
              <Link to="/contact">Get a Free Consultation <ArrowRight size={16} /></Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}