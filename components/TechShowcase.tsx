import React, { useEffect, useRef, useState } from 'react';
import { Brain, Cpu, Wifi, MessageSquare, Mic, Eye, Database, Zap, Globe, Monitor } from 'lucide-react';
import styles from './TechShowcase.module.css';

export const TechShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className={styles.techShowcase} ref={containerRef}>
      {/* Background Circuit Pattern */}
      <div className={styles.circuitPattern}></div>
      
      {/* Gradient Orbs */}
      <div className={styles.gradientOrb1}></div>
      <div className={styles.gradientOrb2}></div>
      <div className={styles.gradientOrb3}></div>

      {/* Neural Network */}
      <div className={styles.neuralNetwork}>
        {[...Array(12)].map((_, i) => (
          <div
            key={`node-${i}`}
            className={`${styles.neuralNode} ${styles[`node${i + 1}` as keyof typeof styles]}`}
            style={{
              animationDelay: `${i * 0.2}s`,
              transform: `translate(${mousePosition.x * 10 - 5}px, ${mousePosition.y * 10 - 5}px)`,
            }}
          >
            <div className={styles.nodeCore}></div>
            <div className={styles.nodePulse}></div>
          </div>
        ))}
        
        {/* Neural Connections */}
        <svg className={styles.connections} viewBox="0 0 400 300">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[
            { x1: 50, y1: 50, x2: 150, y2: 80 },
            { x1: 150, y1: 80, x2: 250, y2: 120 },
            { x1: 250, y1: 120, x2: 350, y2: 100 },
            { x1: 80, y1: 150, x2: 180, y2: 180 },
            { x1: 180, y1: 180, x2: 280, y2: 200 },
            { x1: 120, y1: 250, x2: 220, y2: 220 },
            { x1: 220, y1: 220, x2: 320, y2: 240 },
          ].map((line, i) => (
            <line
              key={`connection-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              className={styles.connectionLine}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Tech Icons */}
      <div className={styles.floatingIcons}>
        <div className={`${styles.floatingIcon} ${styles.icon1}`} 
             style={{ transform: `translate(${mousePosition.x * 15 - 7.5}px, ${mousePosition.y * 15 - 7.5}px)` }}>
          <Brain size={24} />
        </div>
        <div className={`${styles.floatingIcon} ${styles.icon2}`}
             style={{ transform: `translate(${mousePosition.x * -10 + 5}px, ${mousePosition.y * 12 - 6}px)` }}>
          <Cpu size={20} />
        </div>
        <div className={`${styles.floatingIcon} ${styles.icon3}`}
             style={{ transform: `translate(${mousePosition.x * 8 - 4}px, ${mousePosition.y * -8 + 4}px)` }}>
          <Wifi size={18} />
        </div>
        <div className={`${styles.floatingIcon} ${styles.icon4}`}
             style={{ transform: `translate(${mousePosition.x * -12 + 6}px, ${mousePosition.y * 10 - 5}px)` }}>
          <MessageSquare size={22} />
        </div>
        <div className={`${styles.floatingIcon} ${styles.icon5}`}
             style={{ transform: `translate(${mousePosition.x * 14 - 7}px, ${mousePosition.y * -6 + 3}px)` }}>
          <Eye size={20} />
        </div>
        <div className={`${styles.floatingIcon} ${styles.icon6}`}
             style={{ transform: `translate(${mousePosition.x * -8 + 4}px, ${mousePosition.y * 14 - 7}px)` }}>
          <Database size={18} />
        </div>
        <div className={`${styles.floatingIcon} ${styles.icon7}`}
             style={{ transform: `translate(${mousePosition.x * 10 - 5}px, ${mousePosition.y * -10 + 5}px)` }}>
          <Globe size={19} />
        </div>
        <div className={`${styles.floatingIcon} ${styles.icon8}`}
             style={{ transform: `translate(${mousePosition.x * -6 + 3}px, ${mousePosition.y * 8 - 4}px)` }}>
          <Monitor size={21} />
        </div>
      </div>

      {/* Data Flow Particles */}
      <div className={styles.dataFlow}>
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`${styles.dataParticle} ${styles[`particle${(i % 4) + 1}` as keyof typeof styles]}`}
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>

      {/* Chatbot Bubbles */}
      <div className={styles.chatBubbles}>
        <div className={`${styles.chatBubble} ${styles.bubble1}`}>
          <div className={styles.bubbleText}>Hello! How can I help?</div>
          <div className={styles.bubbleTyping}></div>
        </div>
        <div className={`${styles.chatBubble} ${styles.bubble2}`}>
          <div className={styles.bubbleText}>AI Analysis Complete</div>
        </div>
        <div className={`${styles.chatBubble} ${styles.bubble3}`}>
          <div className={styles.bubbleText}>नमस्ते! मैं आपकी सहायता कैसे कर सकता हूँ?</div>
        </div>
      </div>

      {/* Voice Wave Animation */}
      <div className={styles.voiceWave}>
        <div className={styles.waveContainer}>
          {[...Array(8)].map((_, i) => (
            <div
              key={`wave-${i}`}
              className={styles.waveBar}
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
        <Mic className={styles.micIcon} size={20} />
      </div>

      {/* Code Stream */}
      <div className={styles.codeStream}>
        <div className={styles.codeLines}>
          <div className={styles.codeLine}>const ai = new Intelligence();</div>
          <div className={styles.codeLine}>ai.process(data);</div>
          <div className={styles.codeLine}>return result;</div>
        </div>
        <div className={styles.binaryStream}>
          10110100101010110100101011010010101
        </div>
      </div>

      {/* IoT Connections */}
      <div className={styles.iotNetwork}>
        <div className={`${styles.iotDevice} ${styles.device1}`}>
          <Zap size={14} />
        </div>
        <div className={`${styles.iotDevice} ${styles.device2}`}>
          <Wifi size={12} />
        </div>
        <div className={`${styles.iotDevice} ${styles.device3}`}>
          <Database size={13} />
        </div>
        <div className={styles.iotConnections}>
          <div className={styles.iotConnection1}></div>
          <div className={styles.iotConnection2}></div>
          <div className={styles.iotConnection3}></div>
        </div>
      </div>

      {/* Floating Binary */}
      <div className={styles.binaryFloat}>
        {['01010011', '11010010', '00101011', '10110100', '01011010'].map((binary, i) => (
          <div
            key={`binary-${i}`}
            className={`${styles.binaryGroup} ${styles[`binary${i + 1}` as keyof typeof styles]}`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            {binary}
          </div>
        ))}
      </div>
    </div>
  );
};