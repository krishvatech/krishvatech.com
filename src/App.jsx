import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  MessageSquare,
  Camera,
  UserCheck,
  Gauge,
  Brain,
  ArrowRight,
  Sun,
  Moon,
  PlayCircle,
  Mic,
  Bot,
  Radar,
  Sparkles,
} from "lucide-react";

// Tailwind is assumed available.

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const KButton = ({ as: Tag = "button", href, size = "lg", variant = "primary", className = "", children, ...props }) => {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };
  const variants = {
    primary: "bg-white text-gray-900 hover:bg-gray-100 shadow-sm border border-white/20",
    dark: "bg-gray-900 text-white hover:bg-gray-800 border border-white/10",
    outline: "bg-transparent text-white border border-white/30 hover:border-white",
  };
  const cls = `inline-flex items-center gap-2 rounded-2xl transition ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) return (
    <a href={href} className={cls} {...props}>{children}</a>
  );
  return (
    <Tag className={cls} {...props}>{children}</Tag>
  );
};

const KCard = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-sm ${className}`}>{children}</div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/90">
    <Sparkles className="h-3 w-3" /> {children}
  </span>
);

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark"); else root.classList.remove("dark");
  }, [dark]);
  return (
    <button
      onClick={() => setDark(d => !d)}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

const FloatingOrbs = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      initial={{ opacity: 0.2, y: 40 }}
      animate={{ opacity: 0.6, y: -40 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 12 }}
      className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl"
      style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.35), transparent)" }}
    />
    <motion.div
      initial={{ opacity: 0.15, x: -20 }}
      animate={{ opacity: 0.5, x: 20 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 10 }}
      className="absolute top-1/3 -right-24 h-96 w-96 rounded-full blur-3xl"
      style={{ background: "radial-gradient(closest-side, rgba(167,139,250,0.35), transparent)" }}
    />
    <motion.div
      initial={{ opacity: 0.2, y: 30 }}
      animate={{ opacity: 0.6, y: -30 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 14 }}
      className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full blur-3xl"
      style={{ background: "radial-gradient(closest-side, rgba(52,211,153,0.3), transparent)" }}
    />
  </div>
);

const Navbar = () => (
  <header className="relative z-20 border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent">
    <Container className="flex h-16 items-center justify-between">
      <a href="#" className="flex items-center gap-3">
        <img src="/logo.png" alt="KrishvaTech" className="h-8 w-auto" />
        <span className="text-lg font-semibold tracking-tight text-white">KrishvaTech</span>
      </a>
      <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
        <a href="#solutions" className="hover:text-white">Solutions</a>
        <a href="#demos" className="hover:text-white">Demos</a>
        <a href="#tech" className="hover:text-white">Tech</a>
        <a href="#about" className="hover:text-white">About</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <KButton href="#contact" size="md" variant="primary" className="hidden md:inline-flex">
          Book a demo <ArrowRight className="h-4 w-4" />
        </KButton>
      </div>
    </Container>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-950 to-[#0b1020] py-20 md:py-28">
    <FloatingOrbs />
    <Container>
      <div className="mx-auto max-w-3xl text-center">
        <Badge>AI that answers, sees & understands</Badge>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Supercharge your business with real‑time AI —
          <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent"> voice, chat, vision</span>, and more.
        </h1>
        <p className="mt-5 text-lg text-white/80">
          We build production‑ready AI: Voice Agents, Chatbots, Computer Vision (real‑time object detection), Interview Copilots, ThingsBoard IoT dashboards, and Sentiment Analysis.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <KButton href="#contact" variant="primary">
            Start a project <ArrowRight className="h-4 w-4" />
          </KButton>
          <KButton href="#demos" variant="outline">
            See live demos <PlayCircle className="h-4 w-4" />
          </KButton>
        </div>
      </div>
      <div className="relative mx-auto mt-14 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <KCard>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Mic className="h-5 w-5 text-white"/></div>
                <div>
                  <h3 className="text-white">AI Voice Agent</h3>
                  <p className="text-sm text-white/70">Natural, multilingual, latency‑tuned.</p>
                </div>
              </div>
              <VoiceWave className="mt-5" />
              <ChatStrip className="mt-4" left="AI" right="User"/>
            </KCard>
            <KCard>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Camera className="h-5 w-5 text-white"/></div>
                <div>
                  <h3 className="text-white">Computer Vision</h3>
                  <p className="text-sm text-white/70">Real‑time detection with on‑edge or cloud.</p>
                </div>
              </div>
              <VisionPanel kind="demo" className="mt-5" />
            </KCard>
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

const VoiceWave = ({ className = "" }) => {
  const bars = new Array(36).fill(0);
  return (
    <div className={`flex h-16 items-end gap-[6px] overflow-hidden rounded-xl bg-black/40 p-3 ${className}`}>
      {bars.map((_, i) => (
        <motion.span
          key={i}
          initial={{ height: 8 }}
          animate={{ height: [8, 36, 12, 28, 10, 22, 8] }}
          transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.02 }}
          className="w-[5px] rounded-full bg-white/70"
        />
      ))}
    </div>
  );
};

const ChatBubble = ({ from = "ai", text }) => (
  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${from === "ai" ? "bg-white/10 text-white" : "bg-white text-gray-900 ml-auto"}`}>
    {text}
  </div>
);

const ChatStrip = ({ left = "AI", right = "User", className = "", variant = "voice" }) => {
  const voiceMsgs = [
    { from: "user", text: "Hi! Do you have a red lehenga for rental on 12 Nov?" },
    { from: "ai", text: "12 Nov is booked. Next free: 13 or 14 Nov. Want me to hold one?" },
    { from: "user", text: "13 works. Budget under ₹6k." },
    { from: "ai", text: "Got it. I’ll shortlist 3 picks under ₹6k and share images + sizes." },
  ];
  const chatMsgs = [
    { from: "user", text: "Looking for a cotton kurta set (Size L), navy blue. Budget ≤ ₹2k." },
    { from: "ai", text: "Saved. Want trending or budget-friendly? Also, delivery today or pickup?" },
    { from: "user", text: "Budget-friendly, pickup." },
    { from: "ai", text: "Cool. Adding 3 options with images, price, and store stock. Want me to reserve one for 6pm?" },
  ];
  const msgs = variant === "chatbot" ? chatMsgs : voiceMsgs;
  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 p-3 ${className}`}>
      <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-wide text-white/60">
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <div className="space-y-2">
        {msgs.map((m, i) => (
          <ChatBubble key={i} from={m.from === "ai" ? "ai" : "user"} text={m.text} />
        ))}
      </div>
    </div>
  );
};

const VisionPreview = ({ className = "", src="/vision/real1.png" }) => (
  <div className={`relative h-40 overflow-hidden rounded-xl border border-white/10 bg-black ${className}`}>
    <img src={src} alt="Computer vision demo frame" className="h-full w-full object-cover opacity-95"/>
  </div>
);

const VisionPanel = ({ kind = "computerVision", className = "" }) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/vision/vision_boxes.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);
  if (!data || !data[kind]) {
    return <VisionPreview className={className} />;
  }
  const { image, boxes } = data[kind];
  return (
    <div className={`relative h-40 overflow-hidden rounded-xl border border-white/10 bg-black ${className}`}>
      <img src={image} alt="Vision frame" className="h-full w-full object-cover" />
      <div className="absolute inset-0">
        {boxes.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-xl border-2 border-fuchsia-400/80"
            style={{ left: `${b.x*100}%`, top: `${b.y*100}%`, width: `${b.w*100}%`, height: `${b.h*100}%` }}
          >
            <div className="absolute -top-6 left-0 rounded-md border border-fuchsia-400/60 bg-black/70 px-2 py-0.5 text-xs text-white">
              {b.label}
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-cyan-400/0 animate-[scan_4s_linear_infinite]"></div>
      <style>{`@keyframes scan { 0% { transform: translateY(-4px); opacity: 0;} 50% {opacity: 0.8;} 100% { transform: translateY(160px); opacity: 0;} }`}</style>
    </div>
  );
};


const DetectBox = ({ x, y, w, h, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="absolute rounded-xl border-2 p-1 text-[11px] font-medium text-white/90 border-fuchsia-400"
    style={{
      left: x,
      top: y,
      width: w,
      height: h,
      boxShadow: "0 0 0 9999px inset rgba(0,0,0,0.15)",
    }}
  >
    <span className="rounded-md bg-black/60 px-2 py-0.5">{label}</span>
  </motion.div>
);

const SolutionCard = ({ icon: Icon, title, subtitle, points }) => (
  <KCard className="group h-full">
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="text-white">{title}</h3>
        <p className="text-sm text-white/70">{subtitle}</p>
      </div>
    </div>
    <ul className="mt-4 space-y-2 text-sm text-white/80">
      {points.map((p, i) => (
        <li key={i} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60"></span>{p}</li>
      ))}
    </ul>
  </KCard>
);

const Solutions = () => (
  <section id="solutions" className="relative bg-[#0b1020] py-20">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">What we build</h2>
        <p className="mt-3 text-white/75">End‑to‑end AI systems, tailored to your workflows.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SolutionCard
          icon={PhoneCall}
          title="AI Voice Agent"
          subtitle="Call center automation that feels human"
          points={["Real‑time STT/TTS (Hindi, Gujarati, English)", "Exotel/Meta/Telephony ready", "Latency‑tuned barge‑in and silence handling"]}
        />
        <SolutionCard
          icon={MessageSquare}
          title="AI Chatbot"
          subtitle="WhatsApp, Web, Instagram"
          points={["Retrieval‑augmented answers", "Multi‑tenant for franchises", "Order/booking flows"]}
        />
        <SolutionCard
          icon={Camera}
          title="Computer Vision"
          subtitle="Real‑time object & event detection"
          points={["Fire, fall, person, PPE, intrusion", "Edge (Jetson) or Cloud", "Alerting via WhatsApp/voice"]}
        />
        <SolutionCard
          icon={UserCheck}
          title="Interview Copilot"
          subtitle="Structured, bias‑aware interview assistant"
          points={["Live transcribe & summarize", "Skill/rubric scoring", "ATS export"]}
        />
        <SolutionCard
          icon={Gauge}
          title="ThingsBoard IoT"
          subtitle="Industrial dashboards & alerts"
          points={["Custom widgets & rules", "Device telemetry & commands", "Role‑based access"]}
        />
        <SolutionCard
          icon={Brain}
          title="Sentiment Analysis"
          subtitle="Understand customer intent & mood"
          points={["Multi‑lingual classification", "Ticket triage & routing", "NPS/CSAT insights"]}
        />
      </div>
    </Container>
  </section>
);

const Demos = () => (
  <section id="demos" className="relative bg-gradient-to-b from-[#0b1020] to-[#0a0f1c] py-20">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">See it in action</h2>
        <p className="mt-3 text-white/75">Interactive mockups of our voice and vision systems.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <KCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Bot className="h-5 w-5 text-white"/></div>
            <div>
              <h3 className="text-white">WhatsApp Chat Demo</h3>
              <p className="text-sm text-white/70">Retail rental / buy flow</p>
            </div>
          </div>
          <ChatStrip className="mt-5" />
          <div className="mt-4 flex justify-end"><KButton href="#contact" size="md" variant="primary">Request live link</KButton></div>
        </KCard>
        <KCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Radar className="h-5 w-5 text-white"/></div>
            <div>
              <h3 className="text-white">Vision Detection Demo</h3>
              <p className="text-sm text-white/70">Fire / PPE / Fall detection</p>
            </div>
          </div>
          <VisionPanel kind="computerVision" className="mt-5" />
          <div className="mt-4 flex justify-end"><KButton href="#contact" size="md" variant="primary">Book a walkthrough</KButton></div>
        </KCard>
      </div>
    </Container>
  </section>
);

const TechPill = ({ label }) => (
  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80">{label}</span>
);

const Tech = () => (
  <section id="tech" className="relative bg-[#0a0f1c] py-20">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Engineered for production</h2>
        <p className="mt-3 text-white/75">Modern, scalable stack — tuned for speed, cost, and reliability.</p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "Python",
          "FastAPI",
          "Django",
          "PostgreSQL",
          "Redis",
          "YOLOv8",
          "OpenCV",
          "Whisper / Google STT/TTS",
          "Pinecone",
          "LangChain",
          "React",
          "Tailwind",
          "ThingsBoard",
          "Docker",
          "Kubernetes",
        ].map((t) => (
          <TechPill key={t} label={t} />
        ))}
      </div>
      <KCard className="mx-auto mt-8 max-w-4xl">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-white">Low‑latency voice pipeline</h3>
            <p className="mt-2 text-sm text-white/75">Streaming STT → intent → tools → TTS, with barge‑in, silence VAD, and retry logic. Designed for real‑world telephony.</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>• Token‑aware prompts & memory</li>
              <li>• Multi‑lingual fallback routing</li>
              <li>• Observability & cost controls</li>
            </ul>
          </div>
          <VoiceWave className="md:ml-auto" />
        </div>
      </KCard>
    </Container>
  </section>
);

const About = () => (
  <section id="about" className="relative bg-[#090d19] py-20">
    <Container>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Built by practitioners</h2>
        <p className="mt-4 text-white/80">
          We’re an engineering‑first team shipping voice, chat, and computer‑vision systems for real businesses. From retail & textiles to smart facilities, we deliver end‑to‑end solutions that actually run in production.
        </p>
      </div>
    </Container>
  </section>
);

const Contact = () => (
  <section id="contact" className="relative bg-gradient-to-b from-[#090d19] to-black py-20">
    <Container>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Let’s build your AI, fast</h2>
        <p className="mt-3 text-white/75">Tell us about your use‑case. We’ll reply within a day.</p>
      </div>
      <KCard className="mx-auto mt-10 max-w-3xl">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="md:col-span-1">
            <label className="mb-1 block text-sm text-white/70">Name</label>
            <input type="text" placeholder="Your name" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-sm text-white/70">Email</label>
            <input type="email" placeholder="you@company.com" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-sm text-white/70">Company</label>
            <input type="text" placeholder="Company name" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-sm text-white/70">Phone / WhatsApp</label>
            <input type="text" placeholder="+91…" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm text-white/70">What do you want to build?</label>
            <textarea placeholder="Voice agent for inbound sales, WhatsApp chatbot for rentals, fall detection for care homes…" rows={5} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" />
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <div className="text-sm text-white/60">We’ll never share your info.</div>
            <KButton variant="primary">Send message <ArrowRight className="h-4 w-4" /></KButton>
          </div>
        </form>
      </KCard>
    </Container>
  </section>
);

const Footer = () => (
  <footer className="relative border-t border-white/10 bg-black py-10 text-white/70">
    <Container className="grid items-start gap-8 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="KrishvaTech" className="h-7 w-auto" />
          <span className="text-white">KrishvaTech Pvt Ltd</span>
        </div>
        <p className="mt-3 max-w-md text-sm">AI Voice Agents, Chatbots, Computer Vision, Interview Copilot, ThingsBoard IoT, and Sentiment Analysis. Built in India, delivered worldwide.</p>
      </div>
      <div>
        <div className="text-white">Links</div>
        <ul className="mt-3 space-y-2 text-sm">
          <li><a className="hover:text-white" href="#solutions">Solutions</a></li>
          <li><a className="hover:text-white" href="#demos">Demos</a></li>
          <li><a className="hover:text-white" href="#tech">Tech</a></li>
          <li><a className="hover:text-white" href="#contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <div className="text-white">Contact</div>
        <ul className="mt-3 space-y-2 text-sm">
          <li>hello@krishvatech.com</li>
          <li>Surat • Gujarat • India</li>
        </ul>
      </div>
    </Container>
    <Container className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50">
      © {new Date().getFullYear()} KrishvaTech Pvt Ltd. All rights reserved.
    </Container>
  </footer>
);

export default function KrishvaTechSite() {
  return (
    <main className="min-h-screen bg-black text-white [--tw-cyan:rgb(56,189,248)] [--tw-fuchsia:rgb(217,70,239)] [--tw-emerald:rgb(52,211,153)]">
      <Navbar />
      <Hero />
      <Solutions />
      <Demos />
      <Tech />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
