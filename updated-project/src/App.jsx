import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Phone, MessageSquare, Headphones, MapPin, Bell, BarChart3, Activity,
  ShieldCheck, Bot, Languages, LineChart, CreditCard, FileText, Workflow,
  ArrowRight, Sparkles, Building2, Landmark, Wallet, Briefcase,
  AlertTriangle, Layers, EyeOff, Users, Settings, TrendingUp, CheckCircle2,
  Quote, Mail, User, Phone as PhoneIcon, Twitter, Linkedin,
  Github, Menu, X, Zap, Target, Gauge, ChevronRight,
  BookOpen, Clock, ArrowLeft
} from "lucide-react";

/* ============================================================
   DEBT RECOVERY — hardened dark fintech theme.
   Critical colors are applied via INLINE STYLES and a global
   CSS block (not Tailwind arbitrary classes) so they can never
   be purged, overridden, or washed out by the renderer.
   Palette: #030712 / #0F172A / #111827
            blue #3B82F6  purple #8B5CF6
            text #F8FAFC  muted #94A3B8 / #CBD5E1
   ============================================================ */

const C = {
  bg: "#030712",
  bg2: "#0F172A",
  card: "rgba(17,24,39,0.72)",
  cardSolid: "#111827",
  border: "rgba(255,255,255,0.10)",
  borderHover: "rgba(59,130,246,0.55)",
  text: "#F8FAFC",
  muted: "#CBD5E1",
  faint: "#94A3B8",
  blue: "#3B82F6",
  purple: "#8B5CF6",
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = "", id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }) {
  return (
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
      style={{
        border: "1px solid rgba(59,130,246,0.30)",
        background: "linear-gradient(180deg,rgba(59,130,246,0.14),rgba(59,130,246,0.05))",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px -10px rgba(59,130,246,0.6)",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: C.blue, boxShadow: "0 0 14px 4px rgba(59,130,246,0.95)" }}
      />
      <span
        className="text-[12px] font-bold uppercase"
        style={{ color: "#A5C8FF", letterSpacing: "0.26em" }}
      >
        {children}
      </span>
    </motion.div>
  );
}

function GlassCard({ children, className = "", glow = false }) {
  const base = "0 12px 40px -12px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)";
  const hover = "0 30px 70px -16px rgba(59,130,246,0.45), inset 0 1px 0 rgba(255,255,255,0.10)";
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: "linear-gradient(180deg,rgba(20,28,46,0.78),rgba(13,18,32,0.78))",
        border: `1px solid ${C.border}`,
        boxShadow: base,
        backdropFilter: "blur(16px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `1px solid ${C.borderHover}`;
        e.currentTarget.style.boxShadow = hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `1px solid ${C.border}`;
        e.currentTarget.style.boxShadow = base;
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(560px circle at var(--mx,50%) var(--my,0%), rgba(99,102,241,0.20), transparent 45%)" }}
      />
      {glow && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg,#3B82F6,transparent 32%,transparent 68%,#8B5CF6)",
            padding: 1,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

function Ambience() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ background: C.bg }}>
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 100% 65% at 50% 0%, rgba(59,130,246,0.14), transparent 60%)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.07) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 75% 55% at 50% 0%,#000 35%,transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 0%,#000 35%,transparent 100%)",
        }}
      />
      <motion.div
        animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 left-1/4 h-[540px] w-[540px] rounded-full"
        style={{ background: "rgba(37,99,235,0.32)", filter: "blur(150px)", animation: "glowPulse 9s ease-in-out infinite" }}
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-0 h-[560px] w-[560px] rounded-full"
        style={{ background: "rgba(139,92,246,0.30)", filter: "blur(150px)" }}
      />
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full"
        style={{ background: "rgba(79,70,229,0.22)", filter: "blur(150px)" }}
      />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#solution");
  const lockRef = useRef(false); // briefly ignore scroll-spy right after a click

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Platform", "#solution"],
    ["How it works", "#how"],
    ["Features", "#features"],
    ["Customers", "#testimonials"],
    ["Blog", "#blog"],
    ["Jobs", "#jobs"],
    ["Contact", "#contact"],
  ];

  // Scroll-spy: track which tracked section is currently in view
  useEffect(() => {
    const ids = links.map(([, href]) => href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return; // a click just set the active state explicitly
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        if (visible.size) {
          // pick the most-visible tracked section
          let best = null;
          let bestRatio = -1;
          visible.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = id;
            }
          });
          if (best) setActive("#" + best);
        }
      },
      {
        // account for the fixed navbar so the section under it counts as active
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.3, 0.6, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Click: smooth-scroll to section and set active immediately
  const handleNav = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    setActive(href);
    const el = document.getElementById(href.slice(1));
    if (el) {
      lockRef.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // release the scroll-spy lock once the smooth scroll settles
      window.clearTimeout(handleNav._t);
      handleNav._t = window.setTimeout(() => {
        lockRef.current = false;
      }, 800);
    }
  };
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className="flex w-full max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
        style={{
          border: scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
          background: scrolled ? "rgba(3,7,18,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 14px 44px -14px rgba(0,0,0,0.95)" : "none",
        }}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <div
            className="grid h-9 w-9 place-items-center rounded-xl"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", boxShadow: "0 0 22px -2px rgba(59,130,246,0.9)" }}
          >
            <Activity className="h-5 w-5" style={{ color: "#fff" }} strokeWidth={2.6} />
          </div>
          <span className="text-[15px] font-bold tracking-tight" style={{ color: C.text }}>
            DEBT{" "}
            <span style={{ background: "linear-gradient(90deg,#60A5FA,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              RECOVERY
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => {
            const isActive = active === href;
            return (
              <a
                key={label}
                href={href}
                onClick={handleNav(href)}
                aria-current={isActive ? "true" : undefined}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300"
                style={{
                  color: isActive ? "#fff" : "#94A3B8",
                  background: isActive ? "rgba(59,130,246,0.16)" : "transparent",
                  boxShadow: isActive
                    ? "inset 0 0 0 1px rgba(59,130,246,0.45), 0 0 18px -6px rgba(59,130,246,0.7)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (active === href) return;
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (active === href) return;
                  e.currentTarget.style.color = "#94A3B8";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold transition-transform hover:scale-[1.04]"
            style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", color: "#fff", boxShadow: "0 0 28px -6px rgba(59,130,246,0.9)" }}
          >
            Book Demo
          </a>
        </div>
        <button className="md:hidden" style={{ color: "#fff" }} onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-4 right-4 top-20 rounded-2xl p-4 md:hidden"
            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(15,23,42,0.98)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col gap-1">
              {links.map(([label, href]) => {
                const isActive = active === href;
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={handleNav(href)}
                    aria-current={isActive ? "true" : undefined}
                    className="rounded-full px-4 py-3 text-sm font-semibold transition-all duration-300"
                    style={{
                      color: isActive ? "#fff" : "#94A3B8",
                      background: isActive ? "rgba(59,130,246,0.16)" : "transparent",
                      boxShadow: isActive
                        ? "inset 0 0 0 1px rgba(59,130,246,0.45)"
                        : "none",
                    }}
                  >
                    {label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-bold"
                style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", color: "#fff" }}
              >
                Book Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function FloatCard({ icon: Icon, title, value, sub, className, delay = 0, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute hidden xl:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-[214px] rounded-2xl p-4"
        style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(17,24,39,0.95)", boxShadow: "0 24px 60px -16px rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center justify-between">
          <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: accent }}>
            <Icon className="h-4 w-4" style={{ color: "#fff" }} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#34D399" }}>
            ● live
          </span>
        </div>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.faint }}>{title}</p>
        <p className="mt-0.5 text-xl font-bold" style={{ color: C.text }}>{value}</p>
        <p className="mt-1 text-[11px]" style={{ color: C.faint }}>{sub}</p>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const heroStats = [
    { v: "94%", l: "Avg. resolution rate" },
    { v: "3.2x", l: "Faster recovery cycles" },
    { v: "₹25KCr+", l: "Portfolio managed" },
    { v: "10M+", l: "Borrowers engaged" },
  ];
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center px-4 pt-32 pb-20">
      <div className="mx-auto w-full max-w-6xl text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2"
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                background: "linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))",
                backdropFilter: "blur(12px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: "#C4B5FD" }} />
              <span className="text-[12px] font-semibold tracking-wide" style={{ color: "#E2E8F0" }}>
                Trusted by 50+ banks, NBFCs &amp; fintech lenders
              </span>
            </div>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-5xl text-[3.1rem] font-extrabold leading-[0.98] sm:text-7xl md:text-[5.5rem]"
            style={{
              letterSpacing: "-0.035em",
              color: "#FFFFFF",
              textShadow: "0 0 40px rgba(99,102,241,0.25)",
            }}
          >
            AI-Powered Debt Recovery Infrastructure
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl"
            style={{ color: C.muted }}
          >
            Recover more, ethically and at scale. One intelligent platform unifying AI voice
            agents, omnichannel outreach, field collections and real-time analytics — built for
            modern lenders.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-11 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a
              href="#solution"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-9 py-4 text-[15px] font-bold tracking-tight transition-all hover:scale-[1.03] sm:w-auto"
              style={{ border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.05)", color: "#fff", backdropFilter: "blur(12px)" }}
            >
              Explore Platform <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4"
            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", boxShadow: "0 30px 80px -30px rgba(0,0,0,0.9)" }}
          >
            {heroStats.map((s, i) => (
              <div key={i} className="px-5 py-7" style={{ background: "rgba(15,23,42,0.7)" }}>
                <p
                  className="text-2xl font-extrabold sm:text-[2rem]"
                  style={{
                    background: "linear-gradient(180deg,#FFFFFF,#C7D2E4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.v}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: C.faint }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <FloatCard icon={Phone} title="AI Voice Agent" value="1,284 calls" sub="Resolved today · 71%" className="left-[1%] top-[34%]" delay={0.6} accent="#3B82F6" />
      <FloatCard icon={Wallet} title="Payments Today" value="₹4.2 Cr" sub="+18% vs yesterday" className="right-[1%] top-[30%]" delay={0.9} accent="#8B5CF6" />
      <FloatCard icon={MessageSquare} title="WhatsApp" value="38,402 sent" sub="62% read rate" className="left-[3%] bottom-[14%]" delay={1.1} accent="#10B981" />
      <FloatCard icon={TrendingUp} title="Recovery Rate" value="+12.4%" sub="QoQ improvement" className="right-[3%] bottom-[16%]" delay={1.3} accent="#6366F1" />
    </section>
  );
}

function SectionHead({ eyebrow, title, sub, center }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`${center ? "mx-auto text-center" : ""} ${center ? "max-w-3xl" : "max-w-3xl"} mb-16 sm:mb-20`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="mt-7 text-[2.15rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
        style={{
          color: C.text,
          letterSpacing: "-0.025em",
          background: "linear-gradient(180deg,#FFFFFF 30%,#C7D2E4 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 60px rgba(99,102,241,0.10)",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${center ? "mx-auto" : ""} max-w-2xl`}
          style={{ color: C.muted }}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

function TrustedBy() {
  const partners = [
    { icon: Landmark, label: "Tier-1 Banks" },
    { icon: Building2, label: "NBFCs" },
    { icon: Zap, label: "Fintech Lenders" },
    { icon: Briefcase, label: "Microfinance" },
    { icon: CreditCard, label: "Card Issuers" },
    { icon: Wallet, label: "Digital Lending" },
  ];
  return (
    <Section className="px-4 py-20 sm:py-24" id="trusted">
      <div className="mx-auto max-w-6xl">
        <motion.p variants={fadeUp} className="text-center text-xs font-bold uppercase tracking-[0.25em]" style={{ color: C.faint }}>
          Powering recovery for India&apos;s leading lending institutions
        </motion.p>
        <motion.div variants={stagger} className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group flex items-center justify-center gap-2.5 rounded-xl px-4 py-5 transition-colors duration-300"
              style={{ border: `1px solid ${C.border}`, background: "rgba(17,24,39,0.6)" }}
            >
              <Icon className="h-5 w-5 transition-colors" style={{ color: C.faint }} />
              <span className="text-sm font-semibold transition-colors" style={{ color: C.muted }}>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function Problems() {
  const problems = [
    { icon: Layers, title: "Fragmented collections", desc: "Disconnected vendors, spreadsheets and channels create blind spots across the recovery lifecycle." },
    { icon: ShieldCheck, title: "Compliance risk", desc: "Manual processes make RBI fair-practice adherence and audit trails nearly impossible to guarantee." },
    { icon: EyeOff, title: "Low visibility", desc: "No single source of truth means leadership can't see what's working or where money leaks." },
    { icon: Settings, title: "Manual operations", desc: "Agents waste hours on dialing, follow-ups and reconciliation instead of resolving accounts." },
    { icon: AlertTriangle, title: "Poor borrower experience", desc: "Aggressive, repetitive outreach damages brand trust and reduces long-term retention." },
  ];
  return (
    <Section className="px-4 py-28 sm:py-36" id="problems">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="The challenge"
          title="Collections is broken for modern lenders"
          sub="Recovery teams are stretched thin across tools, vendors and channels — bleeding margin and risking compliance at every step."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard className="h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: "rgba(244,63,94,0.16)", border: "1px solid rgba(251,113,133,0.3)" }}>
                  <p.icon className="h-5 w-5" style={{ color: "#FDA4AF" }} />
                </div>
                <h3 className="mt-5 text-lg font-bold" style={{ color: C.text }}>{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: C.faint }}>{p.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
          <motion.div variants={fadeUp}>
            <div className="flex h-full flex-col justify-center rounded-2xl p-6" style={{ border: "1px solid rgba(59,130,246,0.32)", background: "linear-gradient(135deg,rgba(37,99,235,0.28),rgba(139,92,246,0.28))" }}>
              <p className="text-2xl font-bold leading-snug" style={{ color: C.text }}>There&apos;s a better way.</p>
              <a href="#solution" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#93C5FD" }}>
                See the solution <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function Solution() {
  const items = [
    { icon: Bot, title: "AI calling", desc: "Human-like voice agents that negotiate, remind and resolve at massive scale." },
    { icon: MessageSquare, title: "WhatsApp automation", desc: "Conversational, compliant campaigns with payment links and smart nudges." },
    { icon: Headphones, title: "Telecalling", desc: "Augmented human teams with AI assist, scripts and live monitoring." },
    { icon: MapPin, title: "Field collections", desc: "Geo-optimized agent allocation, digital receipts and live tracking." },
    { icon: Bell, title: "Payment reminders", desc: "Behaviorally-timed, multi-channel reminders that maximize repayment." },
    { icon: BarChart3, title: "Analytics", desc: "Cohort, vintage and channel analytics to find every recovery lever." },
    { icon: Activity, title: "Real-time monitoring", desc: "Live dashboards across every account, agent and channel — 24/7." },
    { icon: ShieldCheck, title: "Compliance engine", desc: "Built-in RBI fair-practice guardrails, consent and full audit trails." },
  ];
  return (
    <Section className="px-4 py-28 sm:py-36" id="solution">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Recovery engine"
          title="One intelligent system for the entire recovery lifecycle"
          sub="DEBT RECOVERY unifies every channel and team into a single AI-orchestrated platform — so you recover more with less effort."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard glow className="h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.3),rgba(139,92,246,0.3))", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <it.icon className="h-5 w-5" style={{ color: "#93C5FD" }} />
                </div>
                <h3 className="mt-5 text-base font-bold" style={{ color: C.text }}>{it.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed" style={{ color: C.faint }}>{it.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: Target, title: "Identify", desc: "Ingest portfolios and segment accounts by risk, propensity and best channel using AI scoring models." },
    { n: "02", icon: Workflow, title: "Orchestrate", desc: "Auto-launch the optimal mix of AI calls, WhatsApp, telecalling and field visits per borrower." },
    { n: "03", icon: Gauge, title: "Optimize", desc: "Learn continuously from outcomes to improve timing, messaging and recovery rates over time." },
  ];
  return (
    <Section className="px-4 py-28 sm:py-36" id="how">
      <div className="mx-auto max-w-6xl">
        <SectionHead center eyebrow="How it works" title="From portfolio to payment in three steps" />
        <div className="relative">
          <div className="absolute left-1/2 top-12 hidden h-px w-[68%] -translate-x-1/2 lg:block" style={{ background: "linear-gradient(90deg,transparent,rgba(59,130,246,0.6),transparent)" }} />
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="relative text-center">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(17,24,39,0.9)" }}>
                  <div className="grid h-14 w-14 place-items-center rounded-xl" style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", boxShadow: "0 0 34px -6px rgba(59,130,246,0.9)" }}>
                    <s.icon className="h-6 w-6" style={{ color: "#fff" }} />
                  </div>
                </div>
                <span className="mt-5 block text-sm font-bold tracking-widest" style={{ background: "linear-gradient(90deg,#60A5FA,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  STEP {s.n}
                </span>
                <h3 className="mt-2 text-xl font-bold" style={{ color: C.text }}>{s.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed" style={{ color: C.faint }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Features() {
  const features = [
    { icon: Bot, title: "AI Voice Agents", desc: "Natural, multilingual voice bots that negotiate and resolve autonomously." },
    { icon: Languages, title: "Multi-language", desc: "11+ Indian languages with native, region-aware conversation flows." },
    { icon: MessageSquare, title: "WhatsApp Campaigns", desc: "Approved templates, payment links and 2-way conversational recovery." },
    { icon: LineChart, title: "Analytics Dashboard", desc: "Cohort, vintage, channel and agent analytics in one live view." },
    { icon: ShieldCheck, title: "Compliance Engine", desc: "RBI fair-practice guardrails, consent management and audit logs." },
    { icon: CreditCard, title: "Payment Tracking", desc: "Real-time reconciliation across UPI, cards, links and field cash." },
    { icon: FileText, title: "Real-time Reports", desc: "Scheduled and on-demand reporting for ops, risk and leadership." },
    { icon: Workflow, title: "CRM Integrations", desc: "Plug into LOS/LMS, CRMs and data warehouses via secure APIs." },
  ];
  return (
    <Section className="px-4 py-28 sm:py-36" id="features">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Platform features" title="Everything your recovery org needs" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard className="h-full p-6">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <f.icon className="h-5 w-5" style={{ color: "#93C5FD" }} />
                  </div>
                  <ArrowRight className="h-4 w-4 -translate-x-2 transition-all duration-300 group-hover:translate-x-0" style={{ color: "transparent" }} />
                </div>
                <h3 className="mt-5 text-base font-bold" style={{ color: C.text }}>{f.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed" style={{ color: C.faint }}>{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PlatformPreview() {
  const bars = [42, 65, 50, 78, 60, 88, 72, 95, 80];
  return (
    <Section className="px-4 py-28 sm:py-36" id="platform">
      <div className="mx-auto max-w-6xl">
        <SectionHead center eyebrow="Live analytics" title="A command center for recovery" />
        <motion.div variants={fadeUp}>
          <div className="relative rounded-3xl p-3" style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(17,24,39,0.9)", boxShadow: "0 50px 140px -30px rgba(59,130,246,0.5)" }}>
            <div className="rounded-2xl p-5 sm:p-7" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(3,7,18,0.92)" }}>
              <div className="flex items-center justify-between pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FB7185" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FBBF24" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#34D399" }} />
                  <span className="ml-3 text-xs font-medium" style={{ color: C.faint }}>Recovery Analytics</span>
                </div>
                <span className="rounded-md px-2.5 py-1 text-[10px] font-semibold" style={{ background: "rgba(255,255,255,0.08)", color: C.muted }}>Live · Q2 FY26</span>
              </div>
              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                <div className="space-y-3">
                  {[
                    { l: "Total recovered", v: "₹312.4 Cr", d: "+14.2%" },
                    { l: "Active accounts", v: "1.84 M", d: "+6.1%" },
                    { l: "AI resolution", v: "71.3%", d: "+9.0%" },
                  ].map((k, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
                      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.faint }}>{k.l}</p>
                      <div className="mt-1 flex items-end justify-between">
                        <p className="text-xl font-bold" style={{ color: C.text }}>{k.v}</p>
                        <span className="text-xs font-bold" style={{ color: "#34D399" }}>{k.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-4 lg:col-span-2" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold" style={{ color: C.text }}>Recovery trend</p>
                    <p className="text-xs" style={{ color: C.faint }}>Last 9 weeks</p>
                  </div>
                  <div className="mt-6 flex h-44 items-end gap-2 sm:gap-3">
                    {bars.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 rounded-t-md"
                        style={{ background: "linear-gradient(180deg,#A78BFA,rgba(37,99,235,0.5))" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Sparkles, l: "AI Insight", v: "Move 12% of dialer load to WhatsApp for +4.2% lift" },
                  { icon: Users, l: "Top team", v: "North Zone · 96% SLA adherence" },
                  { icon: CreditCard, l: "Payments today", v: "₹4.21 Cr across 18,402 txns" },
                ].map((c, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
                    <c.icon className="h-4 w-4" style={{ color: "#93C5FD" }} />
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.faint }}>{c.l}</p>
                    <p className="mt-1 text-[13px] font-medium" style={{ color: C.muted }}>{c.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Testimonials() {
  const data = [
    { quote: "We cut recovery costs by 38% in two quarters while improving borrower NPS. The AI agents are indistinguishable from our best telecallers.", name: "Ananya Rao", role: "Head of Collections, Tier-1 NBFC" },
    { quote: "Compliance used to keep us up at night. Now every interaction is logged, consented and audit-ready by default. Game changer for our risk team.", name: "Vikram Mehta", role: "Chief Risk Officer, Digital Bank" },
    { quote: "Onboarding our ₹4,000 Cr book took under three weeks. Recovery rates lifted 12% in the first vintage we ran through the platform.", name: "Priya Nair", role: "VP Operations, Fintech Lender" },
  ];
  return (
    <Section className="px-4 py-28 sm:py-36" id="testimonials">
      <div className="mx-auto max-w-6xl">
        <SectionHead center eyebrow="Customer stories" title="Loved by recovery & risk leaders" />
        <div className="grid gap-4 lg:grid-cols-3">
          {data.map((t, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard glow className="flex h-full flex-col p-7">
                <Quote className="h-7 w-7" style={{ color: "rgba(96,165,250,0.6)" }} />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed" style={{ color: "#E2E8F0" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold" style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", color: "#fff" }}>
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: C.text }}>{t.name}</p>
                    <p className="text-xs" style={{ color: C.faint }}>{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------- BLOG DATA ----------
// Long-form content sourced from the editorial brief; each post is a
// structured section list so it renders cleanly without dangerouslySetInnerHTML.
const BLOG_POSTS = [
  {
    slug: "dpdp-compliance-data-privacy-business-priority",
    title: "DPDP Compliance: Why Data Privacy is Becoming a Business Priority",
    excerpt:
      "The Digital Personal Data Protection Act, 2023 isn't just a legal box to tick — it's becoming a competitive advantage for organizations that handle customer data responsibly.",
    category: "Compliance",
    readTime: "6 min read",
    date: "Mar 12, 2026",
    accent: ShieldCheck,
    gradient: "linear-gradient(135deg,#3B82F6 0%,#1E40AF 100%)",
    image: "/blog/dpdp.jpg",
    imageAlt: "Digital Personal Data Protection (DPDP) Act illustration",
    sections: [
      {
        heading: "Introduction",
        body: [
          "In today's digital economy, businesses collect and process large amounts of personal data every day — from customer phone numbers and email addresses to payment information and employee records.",
          "With the introduction of the Digital Personal Data Protection Act, 2023, organizations are now expected to handle personal data with greater responsibility, transparency, and security.",
          "DPDP compliance is no longer just a legal requirement. It is becoming an important part of building customer trust, reducing business risks, and strengthening long-term credibility.",
        ],
      },
      {
        heading: "What is DPDP Compliance?",
        body: [
          "DPDP Compliance refers to following the guidelines of the Digital Personal Data Protection Act, 2023 while collecting, storing, processing, and protecting personal data. The law focuses on user consent, data security, transparent data usage, and responsible handling of personal information.",
          "Businesses must clearly explain why they collect data and how it will be used.",
        ],
      },
      {
        heading: "Why DPDP Compliance Matters",
        body: [
          "Builds customer trust. Customers today are more aware of data privacy and how companies use their information. Businesses that follow transparent privacy practices often build stronger customer confidence and long-term relationships.",
          "Reduces business risks. Weak data protection practices can lead to data breaches, financial penalties, legal complications, and reputational damage. Strong compliance frameworks help organizations reduce operational and security risks.",
          "Improves data security. DPDP compliance encourages businesses to strengthen access controls, secure data storage, cybersecurity practices, and internal monitoring systems.",
        ],
      },
      {
        heading: "Key Components of DPDP Compliance",
        body: [
          "Consent management. Businesses must obtain clear and informed consent before collecting personal data — transparent, specific, easy to understand, and freely given. Users must also have the ability to withdraw consent whenever they choose.",
          "Data minimization. Organizations should collect only the information that is necessary for a specific purpose. Excessive data collection increases both security risks and compliance challenges.",
          "Purpose limitation. Personal data should only be used for the purpose communicated to the user during collection.",
          "Data security. Strong measures are essential — access controls, encryption, secure storage, monitoring, and incident response procedures. Cybersecurity and compliance now go hand in hand.",
        ],
      },
      {
        heading: "User Rights Management",
        body: [
          "Under DPDP principles, individuals may have rights related to accessing their data, correcting inaccurate information, requesting deletion, withdrawing consent, and filing grievances. Organizations should establish proper systems to manage such requests efficiently.",
        ],
      },
      {
        heading: "Common Challenges Businesses Face",
        body: [
          "Many organizations still struggle with scattered customer data, manual consent tracking, poor documentation practices, limited employee awareness, and weak internal security controls. As businesses grow digitally, managing data responsibly becomes more challenging.",
        ],
      },
      {
        heading: "How Businesses Can Prepare",
        body: [
          "Conduct a data audit. Identify what data is collected, where it is stored, who can access it, and why it is being processed. A proper data inventory is the foundation of compliance.",
          "Update privacy policies. Privacy notices should be clear, transparent, and easy to understand. Simple communication helps customers feel more confident about sharing their information.",
          "Train employees. Employees should understand safe data handling, privacy responsibilities, security best practices, and phishing and cyber risks. Human error remains one of the leading causes of data breaches.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "DPDP compliance is not just about following regulations — it is about building a responsible and trustworthy digital business environment. Organizations that prioritize data privacy today will be better positioned to protect customer trust, strengthen security, and achieve sustainable growth.",
        ],
      },
    ],
  },
  {
    slug: "role-of-crm-in-debt-recovery",
    title: "Role of CRM in Debt Recovery: Improving Efficiency, Tracking & Results",
    excerpt:
      "Day-to-day efficiency in collections doesn't come from headcount — it comes from structured systems. Here's how CRM transforms recovery operations from chaotic to measurable.",
    category: "Operations",
    readTime: "5 min read",
    date: "Mar 04, 2026",
    accent: Workflow,
    gradient: "linear-gradient(135deg,#8B5CF6 0%,#6D28D9 100%)",
    image: "/blog/crm.jpg",
    imageAlt: "CRM system connecting people, analytics, and data in debt recovery",
    inlineImage: "/blog/crm-2.jpg",
    inlineImageAlt: "CRM ecosystem with communication, analytics, and team management modules",
    inlineImageAfter: 2,
    sections: [
      {
        heading: "Why CRM Matters in Debt Recovery",
        body: [
          "In today's fast-paced financial environment, debt recovery is no longer just about follow-ups and reminders. With increasing volumes of accounts and rising borrower expectations, collection processes must be organized, data-driven, and efficient.",
          "This is where a Customer Relationship Management (CRM) system becomes a critical tool in modern debt recovery.",
        ],
      },
      {
        heading: "What is CRM in Debt Recovery?",
        body: [
          "A CRM in debt recovery is a centralized system that helps organizations manage borrower data, track collection activities, automate follow-ups, and monitor agent performance.",
          "Instead of scattered spreadsheets and manual tracking, CRM provides a structured and transparent approach to collections.",
        ],
      },
      {
        heading: "Without a Proper System",
        body: [
          "Recovery teams often face missed follow-ups, poor communication tracking, lack of visibility on accounts, and inefficient team coordination. A CRM solves these issues by bringing everything into one unified platform — the result is better control, faster recovery, and improved efficiency.",
        ],
      },
      {
        heading: "Key Benefits of CRM",
        body: [
          "Centralized data management. All borrower information — contact details, loan status, payment history, interaction records — is stored in one place, ensuring easy access and no data loss.",
          "Automated follow-ups and reminders. CRM systems can automate SMS reminders, email notifications, and IVR calls, reducing manual effort and ensuring timely communication.",
          "Real-time tracking and monitoring. Managers can track collection progress, agent activity, and recovery performance, enabling better decision-making and accountability.",
          "Improved team productivity. With structured workflows, agents know their tasks clearly, follow-ups are consistent, and work duplication is reduced.",
          "Better customer communication. CRM keeps a record of all interactions, helping teams avoid repeated calls, maintain professionalism, and provide accurate information.",
          "Data-driven insights. Analytics on recovery rates, delinquency trends, and performance metrics enable smarter strategies and improved outcomes.",
        ],
      },
      {
        heading: "How CRM Transforms Operations",
        body: [
          "Traditional recovery methods are often time-consuming, error-prone, and difficult to scale. With CRM, operations become structured, automated, scalable, and measurable. This transformation is essential for handling large volumes efficiently.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "In a technology-driven financial landscape, relying on manual recovery processes is no longer sustainable. A CRM system brings structure, visibility, and efficiency to debt recovery operations. Organizations that adopt CRM not only improve recovery rates but also build a more professional and scalable collection system.",
        ],
      },
    ],
  },
  {
    slug: "ivr-bot-based-debt-recovery-automation",
    title: "IVR & Bot-Based Debt Recovery: How Automation is Transforming Collections",
    excerpt:
      "Timing and consistency define modern collections. IVR and bot-based automation deliver both at a scale no manual team can match — without losing the human touch.",
    category: "Automation",
    readTime: "7 min read",
    date: "Feb 24, 2026",
    accent: Bot,
    gradient: "linear-gradient(135deg,#06B6D4 0%,#1E40AF 100%)",
    image: "/blog/ivr.jpg",
    imageAlt: "IVR recovery system with smart interaction, voice recognition, and DTMF support",
    sections: [
      {
        heading: "The Execution Layer of Modern Collections",
        body: [
          "After understanding how NPAs impact the financial system, how AI is shaping the future of collections, and how CRM brings structure to operations, the next step is execution — and that's where IVR and bot-based automation truly make a difference.",
          "In the world of debt recovery, timing and consistency are everything. A missed follow-up can delay recovery, while inconsistent communication can reduce borrower responsiveness. Traditional methods, heavily dependent on manual calls, often struggle to keep up with the scale and speed required today.",
        ],
      },
      {
        heading: "What is IVR & Bot-Based Recovery?",
        body: [
          "IVR (Interactive Voice Response) and bots are automated communication systems designed to interact with borrowers without continuous human involvement. Instead of relying solely on agents, these systems can reach thousands of borrowers simultaneously, deliver consistent payment reminders, offer interactive repayment options, and capture borrower responses in real time.",
          "Think of them as a smart communication engine that works 24/7.",
        ],
      },
      {
        heading: "Why Traditional Methods Fall Short",
        body: [
          "Before automation, collection teams faced high dependency on manual calling, limited daily outreach capacity, inconsistent follow-ups, and difficulty tracking every interaction. As the number of accounts increases, these challenges multiply — leading to delays and inefficiencies.",
          "Automation solves this by ensuring every account gets timely attention without increasing workload.",
        ],
      },
      {
        heading: "How IVR & Bots Work in Collections",
        body: [
          "Intelligent automated reminders. IVR systems automatically call borrowers with personalized payment reminders, due date alerts, and outstanding balance details — on schedule, without fail.",
          "Interactive borrower engagement. Borrowers can confirm payments, request a callback, choose repayment timelines, and receive payment links instantly. This creates a two-way, frictionless experience.",
          "Multi-channel automation. Beyond voice calls, automation spans SMS reminders, WhatsApp and chatbots, and email notifications. Multiple touchpoints increase the chances of response and repayment.",
          "Smart escalation to human agents. Automation doesn't replace humans — it supports them. Non-responsive accounts are flagged and high-risk cases are escalated so agents focus on complex negotiations.",
          "Seamless CRM integration. Every interaction — call responses, payment confirmations, follow-up status — is tracked inside the CRM, creating a complete, data-driven recovery cycle.",
        ],
      },
      {
        heading: "Key Benefits",
        body: [
          "Consistency at scale — every borrower receives timely communication, with no missed follow-ups.",
          "Increased productivity — teams handle more accounts without increasing manpower.",
          "Cost efficiency — reduced dependency on large call center operations.",
          "Faster recovery cycles — quick reminders lead to faster borrower action.",
          "Improved borrower experience — less intrusive than repeated manual calls, with clear structured communication and easy payment options.",
        ],
      },
      {
        heading: "The Future of Recovery Automation",
        body: [
          "As technology evolves, IVR and bots are becoming more advanced — personalized communication based on behavior, predictive follow-up strategies, and deeper integration with analytics and AI. The future of collections is not just automated; it's intelligent and adaptive.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "IVR and bot-based automation are redefining how debt recovery operates — making it faster, smarter, and more scalable. When integrated with CRM systems and supported by skilled teams, they create a powerful ecosystem that drives consistent and efficient recovery outcomes. For organizations handling large volumes, adopting automation is no longer an option — it's a necessity.",
        ],
      },
    ],
  },
];

// ---------- BLOG CARD COVER ----------
// Renders the real PDF-sourced image when present, with a theme-matched
// gradient + icon as a graceful fallback if the image is missing or fails.
function BlogCover({ accent: Icon, gradient, image, imageAlt, tall = false }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = image && !imgFailed;

  return (
    <div
      className={`relative w-full overflow-hidden ${tall ? "h-64 sm:h-80" : "h-44"}`}
      style={{ background: gradient }}
    >
      {showImage && (
        <img
          src={image}
          alt={imageAlt || ""}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ display: "block" }}
        />
      )}

      {/* subtle theme tint so images blend with the rest of the site */}
      {showImage && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(3,7,18,0.18) 0%,rgba(3,7,18,0.05) 40%,rgba(13,18,32,0.85) 100%)",
          }}
        />
      )}

      {/* fallback decorative grid + icon when no image is available */}
      {!showImage && (
        <>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.18) 1px,transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 80% 70% at 50% 50%,#000 30%,transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 70% at 50% 50%,#000 30%,transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 70% 30%,rgba(255,255,255,0.22),transparent 55%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="grid h-16 w-16 place-items-center rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 12px 36px -8px rgba(0,0,0,0.5)",
              }}
            >
              <Icon className="h-8 w-8" style={{ color: "#fff" }} />
            </div>
          </div>
        </>
      )}

      {/* bottom fade for clean handoff to card body — applies to both modes */}
      <div
        className="absolute inset-x-0 bottom-0 h-14"
        style={{
          background: "linear-gradient(180deg,transparent,rgba(13,18,32,0.9))",
        }}
      />
    </div>
  );
}

// ---------- BLOG MODAL (full-article reader) ----------
function BlogModal({ post, onClose }) {
  // close on ESC + lock body scroll while open
  useEffect(() => {
    if (!post) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] overflow-y-auto"
          style={{ background: "rgba(3,7,18,0.78)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
        >
          <div className="flex min-h-full items-start justify-center p-4 py-10 sm:p-8">
            <motion.article
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl"
              style={{
                background: "linear-gradient(180deg,rgba(20,28,46,0.95),rgba(13,18,32,0.95))",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 50px 140px -30px rgba(0,0,0,0.95), 0 0 80px -20px rgba(99,102,241,0.4)",
              }}
            >
              {/* sticky close + back bar */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between gap-3 px-6 py-4 sm:px-10"
                style={{
                  background: "linear-gradient(180deg,rgba(13,18,32,0.95),rgba(13,18,32,0.6))",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors"
                  style={{ color: "#CBD5E1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#CBD5E1")}
                  aria-label="Back to blog list"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to blog
                </button>
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-lg transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#CBD5E1" }}
                  aria-label="Close article"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* hero */}
              <div className="relative">
                <BlogCover
                  accent={post.accent}
                  gradient={post.gradient}
                  image={post.image}
                  imageAlt={post.imageAlt}
                  tall
                />
              </div>

              {/* meta + body */}
              <div className="px-6 pb-12 pt-8 sm:px-10">
                <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#A5C8FF" }}>
                  <span
                    className="rounded-full px-3 py-1"
                    style={{
                      border: "1px solid rgba(59,130,246,0.30)",
                      background: "rgba(59,130,246,0.10)",
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5" style={{ color: "#94A3B8" }}>
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                  <span style={{ color: "#94A3B8" }}>{post.date}</span>
                </div>

                <h1
                  id="blog-modal-title"
                  className="mt-5 text-3xl font-extrabold leading-[1.12] sm:text-4xl"
                  style={{
                    letterSpacing: "-0.025em",
                    background: "linear-gradient(180deg,#FFFFFF 30%,#C7D2E4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {post.title}
                </h1>

                <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "#CBD5E1" }}>
                  {post.excerpt}
                </p>

                <div className="mt-8 space-y-8">
                  {post.sections.map((sec, i) => (
                    <React.Fragment key={i}>
                      <section>
                        <h2 className="text-xl font-bold sm:text-2xl" style={{ color: "#F8FAFC", letterSpacing: "-0.015em" }}>
                          {sec.heading}
                        </h2>
                        <div className="mt-3 space-y-3.5">
                          {sec.body.map((p, j) => (
                            <p key={j} className="text-[15px] leading-[1.75]" style={{ color: "#CBD5E1" }}>
                              {p}
                            </p>
                          ))}
                        </div>
                      </section>
                      {post.inlineImage && post.inlineImageAfter === i && (
                        <figure className="my-2">
                          <div
                            className="overflow-hidden rounded-2xl"
                            style={{
                              border: "1px solid rgba(255,255,255,0.10)",
                              boxShadow: "0 20px 60px -20px rgba(0,0,0,0.85)",
                            }}
                          >
                            <img
                              src={post.inlineImage}
                              alt={post.inlineImageAlt || ""}
                              loading="lazy"
                              decoding="async"
                              className="block h-auto w-full"
                            />
                          </div>
                          {post.inlineImageAlt && (
                            <figcaption className="mt-3 text-center text-xs" style={{ color: "#64748B" }}>
                              {post.inlineImageAlt}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* footer CTA */}
                <div
                  className="mt-12 rounded-2xl p-6 sm:p-7"
                  style={{
                    border: "1px solid rgba(59,130,246,0.28)",
                    background: "linear-gradient(135deg,rgba(37,99,235,0.14),rgba(139,92,246,0.14))",
                  }}
                >
                  <p className="text-lg font-bold" style={{ color: "#F8FAFC" }}>
                    Want to see this in action?
                  </p>
                  <p className="mt-1.5 text-sm" style={{ color: "#CBD5E1" }}>
                    Book a personalized demo of the DEBT RECOVERY platform.
                  </p>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-transform hover:scale-[1.03]"
                    style={{
                      background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
                      color: "#fff",
                      boxShadow: "0 0 30px -8px rgba(59,130,246,0.9)",
                    }}
                  >
                    Book a Demo <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- BLOG SECTION ----------
function Blog() {
  const [activePost, setActivePost] = useState(null);

  return (
    <>
      <Section className="px-4 py-28 sm:py-36" id="blog">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            center
            eyebrow="Insights"
            title="Ideas shaping modern collections"
            sub="Field-tested perspectives on compliance, automation, and the systems that drive ethical, scalable debt recovery."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <motion.article key={post.slug} variants={fadeUp}>
                <GlassCard className="flex h-full flex-col overflow-hidden">
                  <BlogCover
                    accent={post.accent}
                    gradient={post.gradient}
                    image={post.image}
                    imageAlt={post.imageAlt}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
                      <span style={{ color: "#A5C8FF" }}>{post.category}</span>
                      <span style={{ color: "#475569" }}>•</span>
                      <span className="inline-flex items-center gap-1" style={{ color: "#94A3B8" }}>
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    </div>
                    <h3
                      className="mt-3 text-lg font-bold leading-snug"
                      style={{ color: "#F8FAFC", letterSpacing: "-0.015em" }}
                    >
                      {post.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
                      {post.excerpt}
                    </p>
                    <button
                      onClick={() => setActivePost(post)}
                      aria-label={`Read full article: ${post.title}`}
                      className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-bold transition-all"
                      style={{ color: "#93C5FD" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.querySelector("svg").style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#93C5FD";
                        e.currentTarget.querySelector("svg").style.transform = "translateX(0)";
                      }}
                    >
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform" />
                    </button>
                  </div>
                </GlassCard>
              </motion.article>
            ))}
          </div>

          {/* small footer line under the grid for editorial polish */}
          <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-2 text-xs font-semibold" style={{ color: "#64748B" }}>
            <BookOpen className="h-4 w-4" />
            More articles publishing every two weeks
          </motion.div>
        </div>
      </Section>

      <BlogModal post={activePost} onClose={() => setActivePost(null)} />
    </>
  );
}

// ---------- JOBS DATA ----------
const JOB_OPENINGS = [
  {
    id: "social-media-executive",
    title: "Social Media Executive",
    experience: "2+ Years",
    type: "Full-time",
    department: "Marketing",
    summary:
      "Drive our brand voice across LinkedIn and beyond. Create campaigns, design content, and turn engagement data into smarter marketing decisions.",
    responsibilities: [
      "Manage LinkedIn and social media platforms",
      "Create engaging content and campaign ideas",
      "Design social media posts and coordinate branding",
      "Track engagement and performance metrics",
    ],
    skills: [
      "Canva / Adobe knowledge",
      "Content Writing",
      "LinkedIn Marketing",
      "Social Media Strategy",
      "Basic Analytics Understanding",
    ],
  },
];

// ---------- JOB APPLICATION MODAL ----------
function JobApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", portfolio: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (form.name && form.email) setSubmitted(true);
  };

  useEffect(() => {
    if (!job) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [job, onClose]);

  const fields = [
    { k: "name", label: "Full name", icon: User, type: "text", ph: "Jane Doe" },
    { k: "email", label: "Email", icon: Mail, type: "email", ph: "jane@example.com" },
    { k: "phone", label: "Phone", icon: PhoneIcon, type: "tel", ph: "+91 98765 43210" },
    { k: "portfolio", label: "Portfolio / LinkedIn URL", icon: Linkedin, type: "url", ph: "https://linkedin.com/in/..." },
  ];

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] overflow-y-auto"
          style={{ background: "rgba(3,7,18,0.78)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          <div className="flex min-h-full items-start justify-center p-4 py-10 sm:p-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl"
              style={{
                background: "linear-gradient(180deg,rgba(20,28,46,0.95),rgba(13,18,32,0.95))",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 50px 140px -30px rgba(0,0,0,0.95), 0 0 80px -20px rgba(99,102,241,0.4)",
              }}
            >
              <div
                className="flex items-center justify-between gap-3 px-6 py-4 sm:px-8"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#A5C8FF" }}>
                    Apply for
                  </p>
                  <h2 id="apply-modal-title" className="mt-0.5 text-lg font-bold" style={{ color: "#F8FAFC" }}>
                    {job.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-lg transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#CBD5E1" }}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <CheckCircle2 className="h-12 w-12" style={{ color: "#34D399" }} />
                      <h3 className="mt-4 text-xl font-bold" style={{ color: "#F8FAFC" }}>
                        Application received
                      </h3>
                      <p className="mt-2 text-sm" style={{ color: "#CBD5E1" }}>
                        Thanks, {form.name.split(" ")[0]} — we&apos;ll review your application and get back to you within 5 business days.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="space-y-4">
                      {fields.map((f) => (
                        <div key={f.k}>
                          <label className="mb-1.5 block text-xs font-semibold" style={{ color: "#CBD5E1" }}>
                            {f.label}
                          </label>
                          <div className="relative">
                            <f.icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#64748B" }} />
                            <input
                              type={f.type}
                              value={form[f.k]}
                              onChange={update(f.k)}
                              placeholder={f.ph}
                              className="w-full rounded-xl py-3 pl-10 pr-3 text-sm outline-none transition-colors"
                              style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(3,7,18,0.7)", color: "#fff" }}
                              onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(59,130,246,0.6)")}
                              onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)")}
                            />
                          </div>
                        </div>
                      ))}
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold" style={{ color: "#CBD5E1" }}>
                          Why are you a great fit?
                        </label>
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={update("message")}
                          placeholder="A few lines about your experience and what excites you about this role…"
                          className="w-full resize-none rounded-xl p-3 text-sm outline-none transition-colors"
                          style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(3,7,18,0.7)", color: "#fff" }}
                          onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(59,130,246,0.6)")}
                          onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)")}
                        />
                      </div>
                      <button
                        onClick={submit}
                        className="group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold transition-transform hover:scale-[1.02]"
                        style={{
                          background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
                          color: "#fff",
                          boxShadow: "0 0 30px -8px rgba(59,130,246,0.9)",
                        }}
                      >
                        Submit Application
                        <span className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)" }} />
                      </button>
                      <p className="text-center text-[11px]" style={{ color: "#64748B" }}>
                        By applying you agree to our privacy policy. We&apos;ll only use this info for hiring purposes.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- JOBS SECTION ----------
function Jobs() {
  const [activeJob, setActiveJob] = useState(null);

  return (
    <>
      <Section className="px-4 py-28 sm:py-36" id="jobs">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            center
            eyebrow="Jobs"
            title="Build the future of debt recovery"
            sub="We&rsquo;re a small, ambitious team scaling fast. If you care about craft, ethics, and shipping work that matters — we&rsquo;d love to hear from you."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {JOB_OPENINGS.map((job) => (
              <motion.article key={job.id} variants={fadeUp}>
                <GlassCard glow className="flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                        <span
                          className="rounded-full px-2.5 py-1"
                          style={{
                            border: "1px solid rgba(59,130,246,0.30)",
                            background: "rgba(59,130,246,0.10)",
                            color: "#A5C8FF",
                          }}
                        >
                          {job.department}
                        </span>
                        <span style={{ color: "#94A3B8" }}>{job.type}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-bold sm:text-[1.7rem]" style={{ color: "#F8FAFC", letterSpacing: "-0.02em" }}>
                        {job.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium" style={{ color: "#CBD5E1" }}>
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" style={{ color: "#93C5FD" }} /> {job.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-[14px] leading-relaxed" style={{ color: "#CBD5E1" }}>
                    {job.summary}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#A5C8FF" }}>
                      Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {job.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed" style={{ color: "#CBD5E1" }}>
                          <CheckCircle2 className="mt-[3px] h-4 w-4 shrink-0" style={{ color: "#60A5FA" }} />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#A5C8FF" }}>
                      Skills required
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((s, i) => (
                        <span
                          key={i}
                          className="rounded-full px-3 py-1 text-[12px] font-semibold"
                          style={{
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.04)",
                            color: "#E2E8F0",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                    <button
                      onClick={() => setActiveJob(job)}
                      className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-bold transition-transform hover:scale-[1.02]"
                      style={{
                        background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
                        color: "#fff",
                        boxShadow: "0 0 30px -8px rgba(59,130,246,0.9)",
                      }}
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                      <span className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)" }} />
                    </button>
                    <a
                      href="mailto:careers@debtrecovery.ai?subject=Application%20-%20Social%20Media%20Executive"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:scale-[1.02]"
                      style={{
                        border: "1px solid rgba(255,255,255,0.18)",
                        background: "rgba(255,255,255,0.04)",
                        color: "#fff",
                      }}
                    >
                      Submit Resume
                    </a>
                  </div>
                </GlassCard>
              </motion.article>
            ))}

            {/* "More roles coming" companion card to keep visual balance on 2-col grid */}
            <motion.div variants={fadeUp} className="hidden md:block">
              <div
                className="flex h-full flex-col justify-center rounded-2xl p-8 text-center"
                style={{
                  border: "1px dashed rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.18))",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <Sparkles className="h-6 w-6" style={{ color: "#A5C8FF" }} />
                </div>
                <h3 className="mt-5 text-xl font-bold" style={{ color: "#F8FAFC" }}>
                  More roles coming soon
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                  Don&rsquo;t see your role? We&rsquo;re always interested in exceptional people. Reach out and tell us what you&rsquo;d build here.
                </p>
                <a
                  href="mailto:careers@debtrecovery.ai"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-bold transition-colors"
                  style={{ color: "#93C5FD" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#93C5FD")}
                >
                  Get in touch <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      <JobApplyModal job={activeJob} onClose={() => setActiveJob(null)} />
    </>
  );
}

function WhyChooseUs() {
  const points = [
    { icon: ShieldCheck, title: "Ethical collections", desc: "Borrower-first outreach that protects your brand and builds long-term trust." },
    { icon: Bot, title: "AI automation", desc: "Resolve up to 70% of accounts with zero human effort, 24/7." },
    { icon: TrendingUp, title: "High recovery rate", desc: "Customers see 10–15% recovery uplift within the first vintage." },
    { icon: FileText, title: "RBI-compliant workflows", desc: "Fair-practice guardrails and audit trails baked into every action." },
    { icon: Users, title: "Better retention", desc: "Respectful resolution keeps good borrowers on your books." },
    { icon: Zap, title: "Fast onboarding", desc: "Go live in weeks, not quarters, with secure plug-and-play APIs." },
  ];
  return (
    <Section className="px-4 py-28 sm:py-36" id="why">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={fadeUp}>
            <Eyebrow>Why us</Eyebrow>
            <h2
              className="mt-7 text-[2.15rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.1rem]"
              style={{
                letterSpacing: "-0.025em",
                background: "linear-gradient(180deg,#FFFFFF 30%,#C7D2E4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Recover more — without compromising trust or compliance
            </h2>
            <p className="mt-5 text-base" style={{ color: C.muted }}>
              We pair frontier AI with deep collections expertise so you maximize recovery while
              treating every borrower with respect.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-transform hover:scale-[1.04]"
              style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", color: "#fff", boxShadow: "0 0 34px -8px rgba(59,130,246,0.9)" }}
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2">
            {points.map((p, i) => (
              <motion.div key={i} variants={fadeUp}>
                <GlassCard className="h-full p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.3),rgba(139,92,246,0.3))", border: "1px solid rgba(255,255,255,0.15)" }}>
                      <p.icon className="h-5 w-5" style={{ color: "#93C5FD" }} />
                    </div>
                    <h3 className="text-sm font-bold" style={{ color: C.text }}>{p.title}</h3>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed" style={{ color: C.faint }}>{p.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = () => { if (form.name && form.email) setSent(true); };
  const fields = [
    { k: "name", label: "Full name", icon: User, type: "text", ph: "Jane Doe" },
    { k: "company", label: "Company", icon: Building2, type: "text", ph: "Acme Capital" },
    { k: "phone", label: "Phone", icon: PhoneIcon, type: "tel", ph: "+91 98765 43210" },
    { k: "email", label: "Work email", icon: Mail, type: "email", ph: "jane@acme.com" },
  ];
  return (
    <Section className="px-4 py-28 sm:py-36" id="contact">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 rounded-3xl p-8 sm:p-12 lg:grid-cols-2" style={{ border: "1px solid rgba(59,130,246,0.28)", background: "linear-gradient(135deg,rgba(37,99,235,0.14),rgba(139,92,246,0.14))" }}>
          <motion.div variants={fadeUp}>
            <Eyebrow>Get a demo</Eyebrow>
            <h2
              className="mt-7 text-[2.15rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3rem]"
              style={{
                letterSpacing: "-0.025em",
                background: "linear-gradient(180deg,#FFFFFF 30%,#C7D2E4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Talk to our recovery experts
            </h2>
            <p className="mt-4 text-base" style={{ color: C.muted }}>
              See how DEBT RECOVERY can lift recovery rates on your portfolio. Book a personalized
              demo — we&apos;ll respond within one business day.
            </p>
            <div className="mt-8 space-y-4">
              {[
                [Mail, "partnerships@debtrecovery.ai"],
                [PhoneIcon, "+91 1800 200 4500"],
                [MapPin, "Bengaluru · Mumbai · Delhi NCR"],
              ].map(([Ic, t], i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: C.muted }}>
                  <Ic className="h-4 w-4" style={{ color: "#93C5FD" }} /> {t}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center rounded-2xl p-10 text-center"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(17,24,39,0.8)" }}
                >
                  <CheckCircle2 className="h-12 w-12" style={{ color: "#34D399" }} />
                  <h3 className="mt-4 text-xl font-bold" style={{ color: C.text }}>Thank you!</h3>
                  <p className="mt-2 text-sm" style={{ color: C.muted }}>
                    Our team will reach out to {form.name.split(" ")[0]} shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.map((f) => (
                      <div key={f.k}>
                        <label className="mb-1.5 block text-xs font-semibold" style={{ color: C.muted }}>{f.label}</label>
                        <div className="relative">
                          <f.icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#64748B" }} />
                          <input
                            type={f.type}
                            value={form[f.k]}
                            onChange={update(f.k)}
                            placeholder={f.ph}
                            className="w-full rounded-xl py-3 pl-10 pr-3 text-sm outline-none transition-colors"
                            style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(3,7,18,0.7)", color: "#fff" }}
                            onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(59,130,246,0.6)")}
                            onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)")}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold" style={{ color: C.muted }}>Message</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us about your portfolio & goals…"
                      className="w-full resize-none rounded-xl p-3 text-sm outline-none transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(3,7,18,0.7)", color: "#fff" }}
                      onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(59,130,246,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)")}
                    />
                  </div>
                  <button
                    onClick={submit}
                    className="group relative w-full overflow-hidden rounded-xl py-4 text-sm font-bold transition-transform hover:scale-[1.02]"
                    style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", color: "#fff", boxShadow: "0 0 34px -8px rgba(59,130,246,0.9)" }}
                  >
                    Request Demo
                    <span className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)" }} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  const cols = [
    { h: "Platform", links: ["AI Voice Agents", "WhatsApp", "Field Collections", "Analytics", "Compliance"] },
    { h: "Company", links: ["About", "Jobs", "Press", "Partners", "Contact"] },
    { h: "Resources", links: ["Blog", "Case Studies", "Documentation", "Security", "Status"] },
    { h: "Legal", links: ["Privacy Policy", "Terms of Service", "RBI Compliance", "Data Protection"] },
  ];
  return (
    <footer className="relative px-4 pt-16 pb-10" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(15,23,42,0.6)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}>
                <Activity className="h-5 w-5" style={{ color: "#fff" }} strokeWidth={2.6} />
              </div>
              <span className="text-[15px] font-bold" style={{ color: C.text }}>
                DEBT{" "}
                <span style={{ background: "linear-gradient(90deg,#60A5FA,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RECOVERY</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: C.faint }}>
              AI-powered debt recovery infrastructure for banks, NBFCs and fintech lenders —
              ethical, scalable and compliant by design.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Linkedin, Github].map((Ic, i) => (
                <a key={i} href="#top" className="grid h-9 w-9 place-items-center rounded-lg transition-colors" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: C.faint }}>
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: C.muted }}>{c.h}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => {
                  const anchorMap = { Blog: "#blog", Contact: "#contact", Jobs: "#jobs" };
                  const href = anchorMap[l] || "#top";
                  return (
                    <li key={l}>
                      <a href={href} className="text-sm transition-colors" style={{ color: C.faint }}>{l}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-xs" style={{ color: C.faint }}>© 2026 DEBT RECOVERY Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5 text-xs" style={{ color: C.faint }}>
            <a href="#top">Privacy Policy</a>
            <a href="#top">Terms</a>
            <a href="#top">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] grid place-items-center"
          style={{ background: C.bg }}
        >
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-5">
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", boxShadow: "0 0 44px -4px rgba(59,130,246,0.9)" }}>
              <Activity className="h-8 w-8" style={{ color: "#fff" }} strokeWidth={2.6} />
              <motion.div className="absolute inset-0 rounded-2xl" style={{ border: "2px solid rgba(255,255,255,0.4)" }} animate={{ scale: [1, 1.4], opacity: [0.7, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
            </div>
            <div className="h-0.5 w-40 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
              <motion.div className="h-full" style={{ background: "linear-gradient(90deg,#60A5FA,#8B5CF6)" }} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.4, ease: "easeInOut" }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const handler = (e) => {
      document.querySelectorAll(".group").forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter',system-ui,sans-serif" }} className="antialiased">
      <style>{`
        html,body,#root{background:#030712;color:#F8FAFC;}
        *{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
        body{font-family:'Inter','SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
        h1,h2,h3,h4{font-family:'Space Grotesk','SF Pro Display',-apple-system,'Segoe UI',sans-serif;font-feature-settings:'ss01','cv01';}
        ::-webkit-scrollbar{width:9px;}
        ::-webkit-scrollbar-track{background:#030712;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#3B82F6,#8B5CF6);border-radius:5px;}
        ::selection{background:rgba(99,102,241,0.45);color:#fff;}
        a{color:inherit;}
        @keyframes glowPulse{0%,100%{opacity:0.55}50%{opacity:0.95}}
        @media (max-width:640px){
          h1{font-size:3rem!important;line-height:1.02!important;}
          h2{font-size:2.05rem!important;line-height:1.1!important;}
        }
      `}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Loader done={loaded} />
      <Ambience />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Problems />
        <Solution />
        <HowItWorks />
        <Features />
        <PlatformPreview />
        <Testimonials />
        <Blog />
        <Jobs />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
