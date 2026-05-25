import { useState, useEffect, useRef } from "react";

const data = {
  name: ["Md. Saifur", "Rahman Antor"],
  tagline: "Applied Mathematics · Data Science · Aspiring Actuary",
  description:
    "Second-year BSc student at the University of Dhaka. I bridge rigorous mathematical theory with data-driven decision-making — on a deliberate path toward Actuarial Data Science.",
  email: "saifurrahmanantor.du.amth@gmail.com",
  whatsapp: "https://wa.me/8801927460217",
  linkedin: "https://www.linkedin.com/in/md-saifur-rahman-antor-7a1281305",
  github: "https://github.com/saifurrahmanantor",
  stats: [
    { val: "3.51", label: "1st Year CGPA" },
    { val: "5.00", label: "HSC GPA" },
    { val: "4.89", label: "SSC GPA" },
    { val: "5+", label: "Certifications" },
  ],
  about: [
    "I'm a <b>second-year BSc student in Applied Mathematics</b> at the University of Dhaka, drawn to the power of mathematical reasoning to solve real-world problems.",
    "My interests converge at <b>statistical modelling, machine learning, and data science</b> — translating abstract theory into actionable insight using Python and its ecosystem.",
    "Long-term, I'm building toward <b>Actuarial Data Science</b> — rigorous in probability, fluent in financial mathematics, precise in risk. Currently preparing for <em>SOA Exam P</em> (November 2026).",
    "Open to <b>internships, research collaborations, and data science projects</b> — in Dhaka or remote.",
  ],
  skills: [
    {
      group: "Mathematics & Statistics",
      tags: ["Applied Mathematics", "Statistical Modelling", "Probability Theory", "Linear Algebra", "Numerical Methods", "Mathematical Statistics", "Real Analysis", "Calculus"],
    },
    {
      group: "Data Science & Analysis",
      tags: ["Data Analysis", "Excel", "Power BI", "SQL", "Pandas", "NumPy", "Data Visualisation", "Data Literacy"],
    },
    {
      group: "Programming & Computation",
      tags: ["Python", "C++", "Fortran", "Mathematica", "Matlab", "scikit-learn", "matplotlib", "seaborn", "LangChain"],
    },
    {
      group: "Machine Learning & AI",
      tags: ["Machine Learning", "Decision Trees", "k-NN", "LLMs & Prompt Eng.", "AI Fundamentals", "AI Governance"],
    },
    {
      group: "Tools & Platforms",
      tags: ["Jupyter Notebook", "GitHub", "Kaggle", "Google Colab", "LaTeX", "VS Code"],
    },
    {
      group: "Domain & Soft Skills",
      tags: ["Actuarial Science", "Financial Mathematics", "Risk Modelling", "Problem Solving", "Leadership", "Debate"],
    },
  ],
  education: [
    {
      year: "Sep 2024 – Sep 2027",
      sub: "2nd Year, Current",
      degree: "BSc — Applied Mathematics",
      school: "University of Dhaka",
      grade: "CGPA 3.51 / 4.00",
      note: "Coursework: Mathematical modelling, numerical analysis, statistical inference. Languages: Fortran, C++, Mathematica, Matlab.",
    },
    {
      year: "Mar 2021 – Nov 2023",
      degree: "HSC — Science",
      school: "Govt. Goalanda Kamrul Islam College",
      grade: "GPA 5.00 / 5.00",
    },
    {
      year: "Jan 2019 – Nov 2021",
      degree: "SSC — Science",
      school: "Goalanda Nazir Uddin Pilot Govt High School",
      grade: "GPA 4.89 / 5.00",
      note: "Activities: Leadership, Communication",
    },
  ],
  projects: [
    {
      idx: "01",
      date: "May 2026",
      title: "Capstone — Palmer Penguins Classification",
      desc: "Compared k-Nearest Neighbors and Decision Tree classifiers to identify penguin species (Adelie, Chinstrap, Gentoo) from physical measurements — bill dimensions, flipper length, and body mass.",
      insight: "Decision Tree ~98% accuracy vs. kNN 82% — practical illustration of the bias-variance tradeoff.",
      stack: ["Python", "scikit-learn", "pandas", "matplotlib", "seaborn"],
      link: "https://github.com/saifurrahmanantor/palmer-penguins-classification",
    },
  ],
  experience: [
    {
      role: "Mathematics & Physics Tutor",
      org: "Freelance / Private Instruction · 2024 – Present",
      active: true,
      points: [
        "Tutored <b>15+ students</b> from SSC to undergraduate level in Mathematics and Physics.",
        "Developed customised study plans tailored to individual learning styles and exam requirements.",
        "Delivered <b>problem-solving workshops</b> focused on analytical reasoning and conceptual depth.",
      ],
    },
  ],
  certs: [
    { name: "Data Science & Analytics", org: "HP LIFE · May 2026" },
    { name: "AI for Social Impact", org: "ADB Institute (ADBI) · May 2026" },
    { name: "Python for Data Science, AI & Dev", org: "IBM · May 2026" },
    { name: "Data Science Math Skills", org: "Duke University · May 2026" },
    { name: "বাংলা বিতর্ক (Debate)", org: "10 Minute School · Apr 2026" },
  ],
};

// ── Styles ──────────────────────────────────────────────────────────────────
const G = {
  // inject google fonts
  fonts: `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500;600&family=Inconsolata:wght@300;400&display=swap');`,

  // colour palette
  cream: "#faf9f7",
  parchment: "#f3f1ec",
  border: "#e4e0d8",
  border2: "#ccc8c0",
  text: "#1a1916",
  text2: "#5a5750",
  text3: "#9a9690",
  accent: "#2d6a4f",   // forest green
  accentL: "#eaf3ee",
  accentB: "#b7d9c6",
  amber: "#b85c00",
  amberL: "#fff4e8",
  amberB: "#f5c99a",
  blue: "#1e4d8c",
  blueL: "#edf2fb",
};

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${G.cream}; color: ${G.text}; font-family: 'Jost', sans-serif; font-weight: 300; overflow-x: hidden; }
  ::selection { background: ${G.accentL}; color: ${G.accent}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${G.parchment}; }
  ::-webkit-scrollbar-thumb { background: ${G.border2}; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes drawLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  .fade-up { animation: fadeUp .7s ease both; }
  .d1{animation-delay:.1s} .d2{animation-delay:.25s} .d3{animation-delay:.4s}
  .d4{animation-delay:.55s} .d5{animation-delay:.7s}

  .reveal { opacity:0; transform:translateY(18px); transition: opacity .65s ease, transform .65s ease; }
  .reveal.in { opacity:1; transform:none; }

  a { color: inherit; text-decoration: none; }
`;

// ── Tiny helpers ─────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, style }) {
  const ref = useReveal();
  return <div ref={ref} className="reveal" style={style}>{children}</div>;
}

function HTML({ s, tag: Tag = "span", style }) {
  return <Tag dangerouslySetInnerHTML={{ __html: s }} style={style} />;
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const navItems = ["About", "Skills", "Education", "Projects", "Experience", "Certifications", "Contact"];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.1rem clamp(1.5rem,5vw,5rem)",
      background: scrolled ? "rgba(250,249,247,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${G.border}` : "1px solid transparent",
      transition: "all .35s ease",
    }}>
      <a href="#hero" style={{
        fontFamily: "'Inconsolata', monospace", fontSize: 12, fontWeight: 400,
        color: G.accent, letterSpacing: "0.12em", textTransform: "uppercase",
      }}>
        SRA · 2026
      </a>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
        {navItems.map(n => (
          <li key={n}>
            <a href={`#${n.toLowerCase()}`} style={{
              fontFamily: "'Inconsolata', monospace", fontSize: 11,
              color: G.text3, letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "color .2s",
            }}
              onMouseEnter={e => e.target.style.color = G.accent}
              onMouseLeave={e => e.target.style.color = G.text3}
            >{n}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 clamp(1.5rem,5vw,5rem)",
      background: `radial-gradient(ellipse 70% 60% at 80% 30%, ${G.accentL} 0%, transparent 65%),
                   radial-gradient(ellipse 50% 50% at 10% 80%, ${G.amberL} 0%, transparent 60%),
                   ${G.cream}`,
      position: "relative", overflow: "hidden",
    }}>
      {/* decorative large letter */}
      <div style={{
        position: "absolute", right: "clamp(1rem,6vw,6rem)", top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(10rem,20vw,20rem)",
        fontWeight: 400, fontStyle: "italic",
        color: "transparent",
        WebkitTextStroke: `1px ${G.border}`,
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>∫</div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
        <div className="fade-up d1" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontFamily: "'Inconsolata', monospace", fontSize: 11,
          color: G.accent, letterSpacing: "0.18em", textTransform: "uppercase",
          marginBottom: "2rem",
          padding: "5px 0",
        }}>
          <span style={{ width: 28, height: 1, background: G.accent, display: "inline-block" }} />
          Applied Mathematics · University of Dhaka
        </div>

        <h1 className="fade-up d2" style={{
          fontFamily: "'Libre Baskerville', serif", fontWeight: 400,
          fontSize: "clamp(3.5rem,8vw,7.5rem)", lineHeight: 1,
          color: G.text, letterSpacing: "-0.02em", marginBottom: "1.4rem",
        }}>
          {data.name[0]}<br />
          <em style={{ color: G.accent, fontStyle: "italic" }}>{data.name[1]}</em>
        </h1>

        <p className="fade-up d3" style={{
          fontSize: "clamp(0.95rem,1.5vw,1.1rem)", color: G.text2,
          maxWidth: 500, lineHeight: 1.9, fontWeight: 300, marginBottom: "2.8rem",
        }}>
          {data.description}
        </p>

        <div className="fade-up d4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <BtnSolid href="#projects">View Projects</BtnSolid>
          <BtnOutline href="#contact">Get in Touch</BtnOutline>
        </div>
      </div>
    </section>
  );
}

// ── Buttons ───────────────────────────────────────────────────────────────────
function BtnSolid({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "0.8rem 2rem",
      background: h ? "#236040" : G.accent,
      color: "#fff",
      fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 500,
      letterSpacing: "0.04em",
      borderRadius: 2,
      transition: "all .2s",
      transform: h ? "translateY(-1px)" : "none",
      boxShadow: h ? `0 6px 20px rgba(45,106,79,.25)` : "none",
    }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >{children} →</a>
  );
}

function BtnOutline({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center",
      padding: "0.8rem 2rem",
      background: "transparent",
      color: h ? G.accent : G.text2,
      border: `1px solid ${h ? G.accentB : G.border2}`,
      fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 400,
      letterSpacing: "0.04em",
      borderRadius: 2,
      transition: "all .2s",
    }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >{children}</a>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, bg, children }) {
  return (
    <section id={id} style={{
      padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)",
      background: bg || G.cream,
    }}>
      {children}
    </section>
  );
}

function Eyebrow({ num, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      fontFamily: "'Inconsolata', monospace", fontSize: 10.5,
      color: G.accent, letterSpacing: "0.18em", textTransform: "uppercase",
      marginBottom: "0.9rem",
    }}>
      <span style={{ color: G.text3, fontSize: 9 }}>{num}</span>
      {label}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <Reveal>
      <h2 style={{
        fontFamily: "'Libre Baskerville', serif", fontWeight: 400,
        fontSize: "clamp(2.2rem,4vw,3.4rem)", color: G.text,
        letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "3rem",
      }}>{children}</h2>
    </Reveal>
  );
}

function Divider() {
  return <div style={{ height: 1, background: G.border, margin: "0 clamp(1.5rem,5vw,5rem)" }} />;
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <Section id="about">
      <Eyebrow num="01" label="About" />
      <SectionTitle>Who I <em style={{ fontStyle: "italic", color: G.accent }}>Am</em></SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr min(380px,40%)", gap: "5rem", alignItems: "start" }}>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {data.about.map((p, i) => (
              <HTML key={i} tag="p" s={p} style={{ fontSize: "1.05rem", color: G.text2, lineHeight: 1.9, fontWeight: 300 }} />
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: G.border, border: `1px solid ${G.border}`, borderRadius: 8, overflow: "hidden", boxShadow: `0 4px 24px rgba(0,0,0,0.05)` }}>
            {data.stats.map(s => <StatCard key={s.label} {...s} />)}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function StatCard({ val, label }) {
  const [h, setH] = useState(false);
  return (
    <div style={{
      background: h ? G.accentL : G.cream, padding: "1.6rem 1.4rem",
      textAlign: "center", transition: "background .2s", cursor: "default",
    }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "2.3rem", color: G.accent, lineHeight: 1, marginBottom: 6 }}>{val}</div>
      <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10, color: G.text3, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Section id="skills" bg={G.parchment}>
      <Eyebrow num="02" label="Skills & Tools" />
      <SectionTitle>Capabilities &amp; <em style={{ fontStyle: "italic", color: G.accent }}>Stack</em></SectionTitle>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {data.skills.map(s => <SkillCard key={s.group} {...s} />)}
        </div>
      </Reveal>
    </Section>
  );
}

function SkillCard({ group, tags }) {
  const [h, setH] = useState(false);
  return (
    <div style={{
      background: G.cream, border: `1px solid ${h ? G.border2 : G.border}`,
      borderRadius: 8, padding: "1.5rem",
      boxShadow: h ? `0 6px 24px rgba(0,0,0,0.07)` : `0 2px 8px rgba(0,0,0,0.03)`,
      transform: h ? "translateY(-2px)" : "none",
      transition: "all .25s",
    }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      <div style={{
        fontFamily: "'Inconsolata', monospace", fontSize: 10, color: G.accent,
        letterSpacing: "0.16em", textTransform: "uppercase",
        marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: `1px solid ${G.border}`,
      }}>{group}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  );
}

function Tag({ children }) {
  const [h, setH] = useState(false);
  return (
    <span style={{
      fontFamily: "'Inconsolata', monospace", fontSize: 11,
      color: h ? G.accent : G.text2,
      background: h ? G.accentL : G.parchment,
      border: `1px solid ${h ? G.accentB : G.border}`,
      borderRadius: 3, padding: "3px 9px",
      transition: "all .18s", cursor: "default",
    }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >{children}</span>
  );
}

// ── Education ────────────────────────────────────────────────────────────────
function Education() {
  return (
    <Section id="education">
      <Eyebrow num="03" label="Education" />
      <SectionTitle><em style={{ fontStyle: "italic", color: G.accent }}>Academic</em> History</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.education.map((e, i) => <EduRow key={i} {...e} last={i === data.education.length - 1} />)}
      </div>
    </Section>
  );
}

function EduRow({ year, sub, degree, school, grade, note, last }) {
  return (
    <Reveal>
      <div style={{
        display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem",
        padding: "2.2rem 0", borderBottom: last ? "none" : `1px solid ${G.border}`,
      }}>
        <div>
          <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, color: G.text3, lineHeight: 1.7, marginBottom: 8 }}>
            {year}{sub && <><br /><span style={{ color: G.accent }}>{sub}</span></>}
          </div>
          <span style={{
            display: "inline-block",
            fontFamily: "'Inconsolata', monospace", fontSize: 10.5,
            color: G.amber, background: G.amberL,
            border: `1px solid ${G.amberB}`, borderRadius: 2,
            padding: "3px 10px", letterSpacing: "0.06em",
          }}>{grade}</span>
        </div>
        <div>
          <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.6rem", fontWeight: 400, color: G.text, marginBottom: 4, lineHeight: 1.2 }}>{degree}</div>
          <div style={{ fontSize: 14, color: G.text2, marginBottom: note ? 8 : 0 }}>{school}</div>
          {note && <p style={{ fontSize: 13, color: G.text3, lineHeight: 1.7, fontWeight: 300 }}>{note}</p>}
        </div>
      </div>
    </Reveal>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <Section id="projects" bg={G.parchment}>
      <Eyebrow num="04" label="Selected Projects" />
      <SectionTitle>Work &amp; <em style={{ fontStyle: "italic", color: G.accent }}>Research</em></SectionTitle>
      {data.projects.map((p, i) => <ProjectCard key={i} {...p} />)}
    </Section>
  );
}

function ProjectCard({ idx, date, title, desc, insight, stack, link }) {
  const [h, setH] = useState(false);
  return (
    <Reveal>
      <div style={{
        background: G.cream, border: `1px solid ${h ? G.border2 : G.border}`,
        borderRadius: 8, padding: "2.2rem 2.4rem",
        boxShadow: h ? `0 8px 32px rgba(0,0,0,0.07)` : `0 2px 10px rgba(0,0,0,0.04)`,
        transform: h ? "translateY(-3px)" : "none",
        transition: "all .28s", position: "relative", overflow: "hidden",
      }}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      >
        {/* top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: G.accent, transform: h ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left", transition: "transform .35s ease",
        }} />
        <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10, color: G.text3, letterSpacing: "0.1em", marginBottom: 8 }}>
          Project {idx} · {date}
        </div>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 400, fontSize: "1.7rem", color: G.text, marginBottom: 10, lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: 14, color: G.text2, lineHeight: 1.8, marginBottom: "1rem", fontWeight: 300 }}>{desc}</p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontFamily: "'Inconsolata', monospace", fontSize: 11.5, color: G.blue,
          background: G.blueL, border: `1px solid #c0d2ef`,
          borderRadius: 3, padding: "7px 14px", marginBottom: "1.1rem",
        }}>
          <span style={{ opacity: .6 }}>→</span> {insight}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.1rem" }}>
          {stack.map(t => (
            <span key={t} style={{
              fontFamily: "'Inconsolata', monospace", fontSize: 10.5,
              color: G.text2, background: G.parchment,
              border: `1px solid ${G.border}`, borderRadius: 3, padding: "3px 9px",
            }}>{t}</span>
          ))}
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          fontFamily: "'Inconsolata', monospace", fontSize: 11, color: G.text3,
          letterSpacing: "0.06em", textTransform: "uppercase", transition: "color .2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = G.accent}
          onMouseLeave={e => e.currentTarget.style.color = G.text3}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          GitHub Repository
        </a>
      </div>
    </Reveal>
  );
}

// ── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <Section id="experience">
      <Eyebrow num="05" label="Work Experience" />
      <SectionTitle>Professional <em style={{ fontStyle: "italic", color: G.accent }}>Record</em></SectionTitle>
      {data.experience.map((e, i) => <ExpCard key={i} {...e} />)}
    </Section>
  );
}

function ExpCard({ role, org, active, points }) {
  const [h, setH] = useState(false);
  return (
    <Reveal>
      <div style={{
        background: G.parchment, border: `1px solid ${h ? G.border2 : G.border}`,
        borderRadius: 8, padding: "2.2rem 2.4rem",
        transition: "all .25s",
        boxShadow: h ? `0 6px 24px rgba(0,0,0,0.06)` : "none",
      }}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.3rem" }}>
          <div>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.75rem", fontWeight: 400, color: G.text, marginBottom: 4 }}>{role}</div>
            <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, color: G.text3, letterSpacing: "0.06em" }}>{org}</div>
          </div>
          {active && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontFamily: "'Inconsolata', monospace", fontSize: 10,
              color: G.accent, background: G.accentL,
              border: `1px solid ${G.accentB}`, borderRadius: 100,
              padding: "4px 12px", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              <span style={{ width: 5, height: 5, background: G.accent, borderRadius: "50%", animation: "blink 2s infinite", display: "inline-block" }} />
              Active
            </div>
          )}
        </div>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {points.map((p, i) => (
            <li key={i} style={{ display: "flex", gap: "0.8rem", fontSize: 14, color: G.text2, lineHeight: 1.75, fontWeight: 300 }}>
              <span style={{ color: G.border2, flexShrink: 0, marginTop: 2 }}>—</span>
              <HTML s={p} />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

// ── Certifications ───────────────────────────────────────────────────────────
function Certifications() {
  return (
    <Section id="certifications" bg={G.parchment}>
      <Eyebrow num="06" label="Licenses & Certifications" />
      <SectionTitle>Credentials &amp; <em style={{ fontStyle: "italic", color: G.accent }}>Training</em></SectionTitle>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1rem" }}>
          {data.certs.map((c, i) => <CertCard key={i} num={String(i + 1).padStart(2, "0")} {...c} />)}
        </div>
      </Reveal>
    </Section>
  );
}

function CertCard({ num, name, org }) {
  const [h, setH] = useState(false);
  return (
    <div style={{
      background: G.cream, border: `1px solid ${h ? G.accentB : G.border}`,
      borderRadius: 7, padding: "1.4rem 1.6rem",
      display: "flex", gap: "1.2rem", alignItems: "flex-start",
      boxShadow: h ? `0 4px 20px rgba(45,106,79,0.08)` : `0 1px 6px rgba(0,0,0,0.04)`,
      transform: h ? "translateY(-2px)" : "none",
      transition: "all .22s",
    }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "2rem", fontWeight: 400, color: G.border2, lineHeight: 1, flexShrink: 0, width: "2.2rem", textAlign: "right" }}>{num}</span>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: G.text, marginBottom: 4, lineHeight: 1.4 }}>{name}</div>
        <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10.5, color: G.text3, letterSpacing: "0.05em" }}>{org}</div>
      </div>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
const contacts = [
  { label: "Email", href: `mailto:${data.email}`, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 7L2 7" /></svg> },
  { label: "WhatsApp", href: data.whatsapp, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
  { label: "LinkedIn", href: data.linkedin, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
  { label: "GitHub", href: data.github, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg> },
];

function Contact() {
  return (
    <Section id="contact">
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <Eyebrow num="07" label="Contact" />
        <Reveal>
          <h2 style={{
            fontFamily: "'Libre Baskerville', serif", fontWeight: 400,
            fontSize: "clamp(2.2rem,4vw,3.4rem)", color: G.text,
            letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "1rem",
          }}>Let's <em style={{ fontStyle: "italic", color: G.accent }}>Connect</em></h2>
        </Reveal>
        <Reveal>
          <p style={{ fontSize: "1.05rem", color: G.text2, lineHeight: 1.9, marginBottom: "2.5rem", fontWeight: 300 }}>
            Looking for internships, research collaborations, and data science projects. Whether you have an opportunity or just want to talk — my inbox is open.
          </p>
        </Reveal>
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.8rem" }}>
            {contacts.map(c => <ContactLink key={c.label} {...c} />)}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactLink({ label, href, icon }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "'Inconsolata', monospace", fontSize: 11.5,
        color: h ? G.accent : G.text2,
        border: `1px solid ${h ? G.accentB : G.border}`,
        background: h ? G.accentL : "transparent",
        borderRadius: 4, padding: "0.75rem 1.5rem",
        letterSpacing: "0.08em", textTransform: "uppercase",
        transition: "all .2s",
      }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      {icon} {label}
    </a>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "2rem clamp(1.5rem,5vw,5rem)",
      borderTop: `1px solid ${G.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "0.8rem",
      background: G.parchment,
    }}>
      <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10.5, color: G.text3, letterSpacing: "0.08em" }}>
        Md. Saifur Rahman Antor · Dhaka, Bangladesh
      </span>
      <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10.5, color: G.text3, letterSpacing: "0.08em" }}>
        © 2026 · Bridging theory &amp; data
      </span>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{G.fonts + css}</style>
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Education />
      <Divider />
      <Projects />
      <Divider />
      <Experience />
      <Divider />
      <Certifications />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
