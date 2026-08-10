css = """
/* =========================================================
   JAIMES MANICAR — PORTFOLIO (BRYL MINIMAL DESIGN)
   ========================================================= */

:root {
  /* Monochrome Palette (Dark Theme by default) */
  --bg: #0c0c0f;
  --ink: #f4f4f5;
  
  --gray-50: #18181b;
  --gray-100: #1e1e22;
  --gray-200: #2a2a30;
  --gray-300: #3a3a42;
  --gray-400: #8a8a92;
  --gray-500: #a0a0a8;
  
  /* Font Roles */
  --font-ui: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
  
  --radius-l: 16px;
  --radius-m: 12px;
  --radius-s: 8px;
  --radius-xs: 6px;
  
  --shadow-rest: 0 8px 22px -14px rgba(0,0,0,0.25);
  --shadow-hover: 0 18px 36px -20px rgba(0,0,0,0.40);
}

/* ---------- Reset & Base ---------- */
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; background: var(--bg); }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--ink); color: var(--bg); }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; border-radius: var(--radius-xs); }
button { font-family: inherit; cursor: pointer; border: none; background: none; }

/* Halftone Texture */
.halftone-bg {
  position: relative;
}
.halftone-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--gray-300) 1px, transparent 1px);
  background-size: 9px 9px;
  opacity: 0.15;
  pointer-events: none;
  z-index: -1;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}

/* ---------- Typography ---------- */
h1, h2, h3, h4 { font-weight: 500; line-height: 1.2; letter-spacing: -0.02em; }
h1 { font-size: 2.2rem; margin-bottom: 1rem; }
h2 { font-size: 1.6rem; margin-bottom: 0.8rem; }
h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }

p { color: var(--gray-500); margin-bottom: 1rem; }
p.lede { font-size: 1.0625rem; color: var(--gray-500); max-width: 50ch; line-height: 1.75; }

.micro-label {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-400);
}

.section-title {
  font-family: var(--font-mono);
  font-size: 13px;
  text-transform: lowercase;
  color: var(--gray-400);
  margin-bottom: 2rem;
}

/* ---------- Layout: Sidebar & Main ---------- */
.bryl-layout {
  display: flex;
  min-height: 100vh;
}

.bryl-sidebar {
  width: 14rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--gray-200);
  background: var(--bg);
  z-index: 100;
}

.brand {
  font-size: 1.1rem;
  font-weight: 500;
  display: block;
  margin-bottom: 3rem;
  line-height: 1.2;
}

.bryl-nav ul { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
.bryl-nav a {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--gray-500);
  transition: color 0.2s ease;
}
.bryl-nav a:hover, .bryl-nav a.active { color: var(--ink); }

.bryl-contact-links { display: flex; flex-direction: column; gap: 0.75rem; }
.bryl-contact-links a {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--gray-500);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease;
}
.bryl-contact-links a:hover { color: var(--ink); }

.bryl-main {
  margin-left: 14rem;
  flex: 1;
  max-width: 56rem;
  padding: 4rem 3rem 6rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .bryl-layout { flex-direction: column; }
  .bryl-sidebar {
    width: 100%;
    position: relative;
    height: auto;
    padding: 1.5rem;
    border-right: none;
    border-bottom: 1px solid var(--gray-200);
  }
  .sidebar-bottom { display: none; }
  .bryl-nav ul { flex-direction: row; flex-wrap: wrap; gap: 1.5rem; }
  .bryl-main { margin-left: 0; padding: 2rem 1.5rem; }
}

/* ---------- Components ---------- */
section { margin-bottom: 6rem; }
.wrap { max-width: 42rem; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-ui);
  font-size: 13px;
  border-radius: var(--radius-xs);
  padding: 0.5rem 1rem;
  transition: opacity 0.2s ease, transform 0.2s ease;
  font-weight: 500;
}
.btn-primary { background: var(--ink); color: var(--bg); }
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-ghost { background: transparent; color: var(--ink); border: 1px solid var(--gray-200); }
.btn-ghost:hover { background: var(--gray-50); }

/* Tags */
.tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-500);
  border: 1px solid var(--gray-300);
  border-radius: 99px;
  padding: 3px 8px;
}

/* Hero */
.hero { display: flex; flex-direction: column; gap: 2rem; }
.hero-media { 
  width: 120px; height: 120px; 
  border-radius: var(--radius-m); 
  overflow: hidden; 
  margin-bottom: 1rem;
  border: 1px solid var(--gray-200);
}
.hero-media img { width: 100%; height: 100%; object-fit: cover; }
.hero-cta { display: flex; gap: 1rem; margin-top: 2rem; }

.status-strip {
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
  flex-wrap: wrap;
}
.stat .num { font-family: var(--font-mono); font-size: 1.2rem; color: var(--ink); line-height: 1; margin-bottom: 4px; }
.stat .label { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; color: var(--gray-400); letter-spacing: 0.5px; }

/* Focus Cards */
.focus-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.focus-card {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-m);
  padding: 1.5rem;
  background: var(--gray-50);
}
.focus-card svg { color: var(--ink); margin-bottom: 1rem; width: 24px; height: 24px; }

/* Project Cards */
.project-grid { display: flex; flex-direction: column; gap: 2rem; margin-top: 2rem; }
.project-card {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-l);
  background: var(--gray-50);
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-rest);
}
.project-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}
.project-thumb { width: 100%; height: 240px; background: var(--gray-100); border-bottom: 1px solid var(--gray-200); overflow: hidden; position: relative;}
.project-thumb img { width: 100%; height: 100%; object-fit: cover; border-radius: 0; transition: transform 0.5s ease; }
.project-card:hover .project-thumb img { transform: scale(1.04); }

.project-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
.project-body h3 { font-size: 1.1rem; margin-bottom: 0; }
.project-body p { font-size: 0.95rem; margin-bottom: 1rem; }
.tag-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto; }

/* Build Log / Timeline */
.log { display: flex; flex-direction: column; border-left: 1px solid var(--gray-200); margin-left: 3rem; padding-left: 2rem; margin-bottom: 3rem; }
.log-group-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; color: var(--gray-400); margin-left: -3rem; margin-bottom: 1rem; letter-spacing: 1px; }
.log-entry { position: relative; padding-bottom: 2.5rem; }
.log-tag { position: absolute; left: -5.5rem; font-family: var(--font-mono); font-size: 11px; color: var(--gray-500); }
.log-node { position: absolute; left: -2.25rem; top: 0.2rem; width: 9px; height: 9px; border-radius: 50%; background: var(--gray-200); border: 2px solid var(--bg); }
.is-current .log-node { background: var(--ink); }
.log-body .range { display: block; font-family: var(--font-mono); font-size: 10px; color: var(--gray-400); margin-bottom: 4px; text-transform: uppercase; }
.log-body h4 { font-size: 1.05rem; margin-bottom: 2px; }
.log-body .org { font-size: 0.9rem; color: var(--gray-500); margin-bottom: 8px; }
.log-body .desc { font-size: 0.95rem; line-height: 1.6; }

/* Toolkit */
.tk-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1.5rem; }
.tk-category { margin-bottom: 2.5rem; }
.tk-category h4 { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; color: var(--gray-400); margin-bottom: 1rem; letter-spacing: 1px; }

/* Testimonials / Quotes */
.quote-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 2rem; }
.quote-card {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-m);
  padding: 1.5rem;
  background: var(--gray-50);
}
.quote-card .approve {
  display: block;
  font-family: var(--font-mono);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-400);
  margin-bottom: 1rem;
}
.quote-card .quote { font-size: 0.95rem; color: var(--ink); font-style: italic; margin-bottom: 1.5rem; }
.quote-card .who { font-size: 0.85rem; }
.quote-card .who b { color: var(--ink); }
.quote-card .who span { color: var(--gray-400); font-family: var(--font-mono); font-size: 10px; display: block; margin-top: 2px; text-transform: uppercase;}

/* Contact Form */
.field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.field label { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; color: var(--gray-400); letter-spacing: 1px; }
input, textarea {
  width: 100%;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xs);
  padding: 0.75rem 1rem;
  color: var(--ink);
  font-family: var(--font-ui);
  font-size: 14px;
}
input:focus, textarea:focus { outline: none; border-color: var(--gray-500); }

/* GitHub Matrix (Preserved) */
.bryl-github-card {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  padding: 2.5rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-l);
  margin-top: 4rem;
}
.bryl-header, .bryl-footer {
  display: flex; justify-content: space-between; align-items: center;
  font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-400);
}
.bryl-link { transition: color 0.2s ease; }
.bryl-link:hover { color: var(--ink); }
.bryl-graph-wrapper {
  width: 100%; overflow-x: auto; scrollbar-width: none;
}
.bryl-graph-wrapper::-webkit-scrollbar { display: none; }
#github-matrix { width: 100%; min-width: 624px; }
#github-matrix svg { display: block; width: 100%; height: auto; margin: 0 auto; }

/* Utilities */
.hidden { display: none; }
"""

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Wrote new Bryl Minimal style.css")
