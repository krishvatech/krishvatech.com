import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Bot, Cpu, MessageSquareText, Camera, Layers } from "lucide-react";

const logoSrc = "/logo.png";

/* ---------- small UI ---------- */
const Container = ({ children, className = "" }) => (
  <div className={`container ${className}`}>{children}</div>
);
const KButton = ({ as = "a", href = "#", children, className = "", ...rest }) => {
  const Comp = as;
  return (
    <Comp href={href} className={`btn btn-primary ${className}`} {...rest}>
      {children}
    </Comp>
  );
};
const ChatBubble = ({ from = "ai", text = "" }) => (
  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${from==="ai" ? "bg-white/10 border border-white/15 text-white ml-0" : "bg-emerald-400/10 border border-emerald-400/30 text-emerald-100 ml-auto"}`}>
    {text}
  </div>
);

/* ---------- Anim helpers ---------- */
const CursorGlow = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e) => { const x = e.clientX, y = e.clientY; el.style.transform = `translate3d(${x-200}px, ${y-200}px, 0)`; };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div ref={ref}
      className="pointer-events-none fixed z-[5] h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
      style={{ background: "radial-gradient(200px 200px at center, rgba(56,189,248,0.35), rgba(167,139,250,0.25), rgba(52,211,153,0.2), transparent)" }}
    />
  );
};
const ParticleCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, rafId; const DPR = window.devicePixelRatio || 1;
    const resize = () => { w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w*DPR; canvas.height = h*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); };
    resize(); const onResize = () => resize(); window.addEventListener("resize", onResize);
    const dots = new Array(70).fill(0).map(()=>({ x: Math.random()*w, y: Math.random()*h, vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25, r:1+Math.random()*1.5 }));
    const tick = () => {
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      dots.forEach(d=>{ d.x+=d.vx; d.y+=d.vy;
        if(d.x<-8) d.x=w+8; if(d.x>w+8) d.x=-8; if(d.y<-8) d.y=h+8; if(d.y>h+8) d.y=-8;
        ctx.globalAlpha = .25; ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI*2); ctx.fill();
      });
      rafId = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
};
const NebulaCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, id; const DPR = window.devicePixelRatio || 1;
    const resize = () => { w = c.clientWidth; h = c.clientHeight; c.width = w*DPR; c.height = h*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); };
    resize(); const stars = new Array(120).fill(0).map(()=>({x:Math.random()*w,y:Math.random()*h,z:0.2+Math.random()*0.8}));
    const tick = () => {
      ctx.clearRect(0,0,w,h);
      stars.forEach(s=>{ s.x += (s.z-0.5)*0.6; s.y += (s.z-0.5)*0.6;
        if (s.x<0) s.x=w; if (s.x>w) s.x=0; if (s.y<0) s.y=h; if (s.y>h) s.y=0;
        ctx.globalAlpha = 0.3*s.z; ctx.fillStyle="#ffffff"; ctx.fillRect(s.x,s.y,1.2*s.z,1.2*s.z);
      });
      id = requestAnimationFrame(tick);
    };
    tick(); return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
};
const MorphBlob = () => (<div className="blob" aria-hidden />);

/* ---------- Vision Gallery ---------- */
const scenes = [
  { key: "fire1", label: "Fire", src: "/vision/fire1.png" },
  { key: "ppe", label: "PPE", src: "/vision/ppe.png" },
  { key: "fire2", label: "Fire (alt)", src: "/vision/fire2.png" },
  { key: "fall", label: "Fall", src: "/vision/fall.png" },
];
const VisionGallery = ({ className = "" }) => {
  const [i, setI] = useState(0);
  useEffect(()=>{ const id = setInterval(()=> setI(p => (p+1) % scenes.length), 4000); return () => clearInterval(id); },[]);
  return (
    <div className={className}>
      <div className="relative h-44 overflow-hidden rounded-xl border border-white/10 bg-black hud-grid">
        <AnimatePresence mode="wait">
          <motion.img
            key={scenes[i].key}
            src={scenes[i].src}
            alt={scenes[i].label}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-cyan-400/0 scanline" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {scenes.map((s, idx) => (
          <button key={s.key} onClick={()=>setI(idx)}
            className={`rounded-full border px-3 py-1 text-xs ${idx===i ? "border-white bg-white text-gray-900" : "border-white/20 bg-white/5 text-white/80 hover:border-white/40"}`}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ---------- Navbar ---------- */
const Navbar = () => (
  <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
    <Container className="flex h-14 items-center justify-between">
      <a href="#" className="flex items-center gap-2 text-white">
        <img src={logoSrc} alt="KrishvaTech" className="h-8 w-8 rounded" />
        <span className="text-sm font-medium">KrishvaTech</span>
      </a>
      <nav className="hidden gap-6 text-sm text-white/80 sm:flex">
        <a href="#solutions" className="hover:text-white">Solutions</a>
        <a href="#demos" className="hover:text-white">Demos</a>
        <a href="#tech" className="hover:text-white">Tech</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </nav>
      <KButton href="#contact" className="hidden sm:inline-flex"><PhoneCall className="h-4 w-4" /> Talk to us</KButton>
    </Container>
  </header>
);

/* ---------- Hero ---------- */
const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-950 to-[#0b1020] py-20 md:py-28">
    <div className="absolute inset-0 opacity-50"><NebulaCanvas /></div>
    <div className="absolute -top-24 -left-10 md:-top-32 md:left-1/4"><MorphBlob /></div>
    <div className="absolute bottom-[-180px] right-[-120px] md:right-0"><MorphBlob /></div>
    <div className="absolute inset-0 opacity-60"><ParticleCanvas /></div>
    <Container className="relative">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            <span className="shimmer">AI that answers, sees & understands</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/75">
            Voice agents, WhatsApp chatbots, real-time computer vision (fire, PPE, fall),
            and ThingsBoard IoT dashboards — shipped fast for your business.
          </p>
          <div className="mt-6 flex gap-3">
            <KButton href="#contact">Start a project</KButton>
            <a href="#demos" className="btn btn-ghost">See demos</a>
          </div>
        </div>
        <div className="card glow-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Camera className="h-5 w-5 text-white"/></div>
            <div>
              <h3 className="text-white">Computer Vision</h3>
              <p className="text-sm text-white/70">Fire / PPE / Fall detection</p>
            </div>
          </div>
          <VisionGallery className="mt-4" />
        </div>
      </div>
    </Container>
  </section>
);

/* ---------- Solutions ---------- */
const Solutions = () => (
  <section id="solutions" className="bg-[#0a0f1c] py-16">
    <Container>
      <h2 className="text-2xl font-semibold text-white">Solutions</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2 text-white"><Bot className="h-5 w-5"/><span className="font-medium">AI Voice Agent</span></div>
          <p className="text-white/75 text-sm">24/7 inbound voice agent: lead capture, FAQs, booking, payment links.</p>
        </div>
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2 text-white"><MessageSquareText className="h-5 w-5"/><span className="font-medium">WhatsApp Chatbot</span></div>
          <p className="text-white/75 text-sm">Retail rental/buy flow, catalog browsing, stock checks, reservations.</p>
        </div>
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2 text-white"><Cpu className="h-5 w-5"/><span className="font-medium">Computer Vision</span></div>
          <p className="text-white/75 text-sm">On-edge detection for fire, PPE compliance, and fall — low-latency alerts.</p>
        </div>
      </div>
    </Container>
  </section>
);

/* ---------- Voice Agent (Textile) ---------- */
const VoiceAgentDemo = () => {
  const [stage, setStage] = useState("listening"); // listening | thinking | speaking
  const [msgs, setMsgs] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const script = [
      { from: "user", text: "Hi, do you have cotton poplin 60×60 (58\") in maroon?", stage: "listening", wait: 1100 },
      { from: "ai", text: "Yes — GSM 120. In stock in maroon & navy. MOQ 50m. Need a sample or place order?", stage: "speaking", wait: 1500 },
      { from: "user", text: "Price for 200 meters and dispatch time?", stage: "listening", wait: 1200 },
      { from: "ai", text: "₹145/m ex‑warehouse. Dispatch in 2–3 days. Ship to your address or pickup from mill?", stage: "speaking", wait: 1600 },
      { from: "user", text: "Ship to Bengaluru. GST: 29ABCDE1234F2Z5.", stage: "listening", wait: 1300 },
      { from: "ai", text: "Got it. Holding 200m maroon poplin. Proforma invoice sent on WhatsApp with GST. UPI or bank transfer works.", stage: "speaking", wait: 2000 },
    ];

    setMsgs([]);
    setStage("listening");
    setTimer(0);

    const timeouts = [];
    const intervalId = setInterval(() => setTimer(t => t + 1), 1000);
    let acc = 600;
    script.forEach((s) => {
      const id = setTimeout(() => {
        setMsgs(m => [...m, { from: s.from, text: s.text }]);
        setStage(s.stage);
      }, acc);
      timeouts.push(id);
      acc += s.wait;
    });

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(intervalId);
    };
  }, []);

  const active = stage !== "idle";
  const entities = [
    { k: "Fabric", v: "Cotton Poplin 60×60" },
    { k: "Width", v: '58"' },
    { k: "Color", v: "Maroon" },
    { k: "Qty", v: "200 m" },
    { k: "City", v: "Bengaluru" },
    { k: "GST", v: "29ABCDE1234F2Z5" },
    { k: "Price", v: "₹145/m" },
  ];

  return (
    <div className="card p-4 glow-border">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white">Voice AI Agent — Textile</h3>
            <p className="text-sm text-white/70">Wholesale ordering • Pricing • GST • Dispatch</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/70">
          <div className="voice-bars">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} style={{ "--i": i, opacity: active ? 1 : 0.35 }} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className={`rounded-full px-2 py-0.5 ${stage==='listening'?'bg-cyan-400/10 text-cyan-200 border border-cyan-400/30': stage==='speaking'?'bg-emerald-400/10 text-emerald-200 border border-emerald-400/30':'bg-white/5 text-white/60'}`}>
          {stage === 'listening' ? 'Listening' : stage === 'speaking' ? 'Speaking' : 'Thinking'}
        </span>
        <span className="text-white/60">AI auto‑plays a sample textile call</span>
      </div>

      <div className="mt-3 space-y-2">
        {msgs.map((m, i) => <ChatBubble key={i} from={m.from === 'ai' ? 'ai' : 'user'} text={m.text} />)}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {entities.map((e, i) => (
          <span key={i} className="pill">{e.k}: <span className="text-white/90">{e.v}</span></span>
        ))}
      </div>
    </div>
  );
};

/* ---------- Demos ---------- */
const WhatsAppDemo = () => {
  const chat = [
    { from: "user", text: "Looking to rent a red lehenga (Size M) for 12 Nov. Budget ≤ ₹6k." },
    { from: "ai", text: "Got it. I have 7 options. Prefer designer picks or budget-friendly?" },
    { from: "user", text: "Budget-friendly." },
    { from: "ai", text: "Sharing 3 options with photos, all in M (₹3.5k–₹5.8k). Want me to hold one for trial?" },
    { from: "user", text: "Hold style #L-203 for pickup." },
    { from: "ai", text: "Reserved #L-203 for 12 Nov. Pickup 11 Nov, 6pm (Ring Rd). Deposit ₹1k. Need alterations?" },
  ];
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Bot className="h-5 w-5 text-white"/></div>
        <div>
          <h3 className="text-white">WhatsApp Chat Demo</h3>
          <p className="text-sm text-white/70">Retail rental / buy flow</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {chat.map((m,i)=><ChatBubble key={i} from={m.from==="ai"?"ai":"user"} text={m.text} />)}
      </div>
      <div className="mt-4 flex justify-end"><KButton href="#contact">Request live link</KButton></div>
    </div>
  );
};

const Demos = () => (
  <section id="demos" className="bg-gradient-to-b from-[#0b1020] to-black py-16">
    <Container>
      <h2 className="text-2xl font-semibold text-white">Product Demos</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <VoiceAgentDemo />
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Camera className="h-5 w-5 text-white"/></div>
            <div>
              <h3 className="text-white">Vision Detection Demo</h3>
              <p className="text-sm text-white/70">Flip between Fire, PPE, Fall</p>
            </div>
          </div>
          <VisionGallery className="mt-4" />
        </div>
        <WhatsAppDemo />
      </div>
    </Container>
  </section>
);

/* ---------- Tech ---------- */
const SkillPills = () => {
  const items = [
    "AI/ML","GenAI","LLMs","RAG","CV","Voice AI",
    "Django","FastAPI","Flask","React",
    "Google STT/TTS","Whisper","Sarvam","FastText","MCP (Model Context Protocol)"
  ];
  return (
    <div className="marquee mt-8">
      <div className="marquee-track">
        {items.concat(items).map((t,i)=>(<span key={i} className="pill mx-2">{t}</span>))}
      </div>
    </div>
  );
};
const Tech = () => (
  <section id="tech" className="bg-[#0a0f1c] py-16 relative overflow-hidden">
    <Container>
      <h2 className="text-2xl font-semibold text-white">Skills & Stack</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="card p-5 text-white/80">AI/ML • GenAI • LLMs • RAG • CV • Voice AI</div>
        <div className="card p-5 text-white/80">Django • FastAPI • Flask • React</div>
        <div className="card p-5 text-white/80">Google STT/TTS • Whisper • Sarvam • FastText • MCP (Model Context Protocol)</div>
      </div>
      <SkillPills />
    </Container>
  </section>
);

/* ---------- About ---------- */
const About = () => (
  <section className="bg-gradient-to-b from-black to-[#070b15] py-16">
    <Container>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-white">We ship AI that works</h2>
          <p className="mt-3 text-white/75">We build voice agents, chatbots, and computer vision systems tailored to your process — not the other way around.</p>
        </div>
        <div className="flex items-start justify-end">
          <img src={logoSrc} alt="logo" className="h-16 w-16 rounded" />
        </div>
      </div>
    </Container>
  </section>
);

/* ---------- Contact ---------- */
const Contact = () => {
  const [form, setForm] = useState({ name:"", email:"", company:"", phone:"", message:"" });
  const [status, setStatus] = useState({ sending:false, ok:null, msg:"" });
  const onChange = (e) => setForm(s => ({...s, [e.target.name]: e.target.value}));
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, msg: "" });
    try {
      const fsId = import.meta.env.VITE_FORMSPREE_ID || "";
      if (fsId) {
        const res = await fetch(`https://formspree.io/f/${fsId}`, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Formspree error");
        setStatus({ sending:false, ok:true, msg:"Thanks! We’ll get back within a day." });
        setForm({ name:"", email:"", company:"", phone:"", message:"" });
        return;
      }
      const wa = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/[^0-9]/g, "");
      const text = `New inquiry (KrishvaTech)\nName: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`;
      if (wa) {
        const url = `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
        setStatus({ sending:false, ok:true, msg:"Opening WhatsApp… Message pre-filled." });
      } else {
        setStatus({ sending:false, ok:false, msg:"No submission backend configured. Set VITE_FORMSPREE_ID or VITE_WHATSAPP_NUMBER in .env." });
      }
    } catch (err) {
      setStatus({ sending:false, ok:false, msg:"Couldn’t send. Please try again." });
    }
  };
  return (
    <section id="contact" className="relative bg-gradient-to-b from-[#090d19] to-black py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Let’s build your AI, fast</h2>
          <p className="mt-2 text-white/75">Tell us about your use-case. We’ll reply within a day.</p>
        </div>
        <div className="card mx-auto mt-8 max-w-3xl p-5">
          <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
            <div><label className="mb-1 block text-sm text-white/70">Name</label>
              <input name="name" required value={form.name} onChange={onChange} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" placeholder="Your name" />
            </div>
            <div><label className="mb-1 block text-sm text-white/70">Email</label>
              <input name="email" type="email" required value={form.email} onChange={onChange} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" placeholder="you@company.com" />
            </div>
            <div><label className="mb-1 block text-sm text-white/70">Company</label>
              <input name="company" value={form.company} onChange={onChange} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" placeholder="Company name" />
            </div>
            <div><label className="mb-1 block text-sm text-white/70">Phone / WhatsApp</label>
              <input name="phone" value={form.phone} onChange={onChange} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" placeholder="+91…" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-white/70">What do you want to build?</label>
              <textarea name="message" rows={5} value={form.message} onChange={onChange} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none" placeholder="Voice agent, WhatsApp bot, fire/PPE/fall detection…" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <div className="text-sm text-white/60">We’ll never share your info.</div>
              <button type="submit" className={`btn btn-primary ${status.sending ? "opacity-70" : ""}`} disabled={status.sending}>
                {status.sending ? "Sending…" : "Send message"}
              </button>
            </div>
            {status.msg && (
              <div className={`md:col-span-2 rounded-xl border px-4 py-2 text-sm ${status.ok ? "border-emerald-400/40 text-emerald-300/90 bg-emerald-400/5" : "border-rose-400/40 text-rose-300/90 bg-rose-400/5"}`}>
                {status.msg}
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
};

/* ---------- Footer ---------- */
const Footer = () => (
  <footer className="border-t border-white/10 bg-black/60 py-8 text-white/70">
    <Container className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <div className="flex items-center gap-2">
        <img src={logoSrc} alt="KrishvaTech" className="h-6 w-6 rounded" />
        <span className="text-sm">© {new Date().getFullYear()} KrishvaTech</span>
      </div>
      <div className="text-sm">AI voice • Chatbot • Vision • IoT</div>
    </Container>
  </footer>
);

export default function App() {
  return (
    <>
      <CursorGlow />
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <Hero />
        <Solutions />
        <Demos />
        <Tech />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
