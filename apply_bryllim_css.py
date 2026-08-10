import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update bryl-main to be strictly constrained to ~640px and centered
css = re.sub(
    r'\.bryl-main \{ margin-left: 14rem; flex: 1; max-width: 56rem; padding: 4rem 3rem 6rem; \}',
    '.bryl-main { margin-left: 14rem; flex: 1; display: flex; flex-direction: column; align-items: center; padding: 4rem 1.5rem 6rem; }',
    css
)

# Replace all section margins
css = re.sub(r'section \{ margin-bottom: 6rem; \}', 'section { margin-bottom: 4rem; width: 100%; max-width: 640px; }', css)

# 2. Add Bryllim 1:1 CSS Classes
bryllim_css = '''
/* Bryllim 1:1 Layout Classes */

/* Section Headers */
.bryl-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px dotted var(--gray-300);
  padding-bottom: 0.5rem;
}
.bryl-section-header .title, .bryl-section-header .view-all {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--gray-400);
}
.bryl-section-header .view-all:hover { color: var(--ink); }

/* Table for Experience */
.bryl-table {
  display: flex;
  flex-direction: column;
}
.bryl-row {
  display: grid;
  grid-template-columns: 80px 1fr 1fr;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-200);
  align-items: center;
}
.bryl-row:last-child { border-bottom: none; }
.bryl-col { font-size: 13px; }
.bryl-col.date { font-family: var(--font-mono); color: var(--gray-400); }
.bryl-col.role { color: var(--ink); font-weight: 500; }
.bryl-col.company { color: var(--gray-500); text-align: right; }

@media (max-width: 640px) {
  .bryl-row { grid-template-columns: 60px 1fr; gap: 0.5rem; }
  .bryl-col.company { grid-column: 2; text-align: left; font-size: 12px; }
}

/* Stats */
.status-strip {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat .num { font-family: var(--font-ui); font-size: 1.1rem; color: var(--ink); font-weight: 600; }
.stat .label { font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-500); }

/* Hero */
.hero.bryl-section { display: flex; flex-direction: row; gap: 2.5rem; align-items: center; margin-top: 2rem; margin-bottom: 3rem; border: none;}
.hero-media { width: 140px; height: 140px; border-radius: 4px; overflow: hidden; filter: grayscale(100%); transition: filter 0.3s;}
.hero-media:hover { filter: grayscale(0%); }
.hero-content h1 { font-size: 1.5rem; font-weight: 500; margin-bottom: 0.5rem; }
.hero-content p.lede { font-size: 13px; color: var(--gray-400); line-height: 1.6; max-width: 44ch; margin-bottom: 0.75rem;}
.hero-links { font-family: var(--font-mono); font-size: 10px; color: var(--gray-500); }
.hero-links a { margin-right: 4px; }

@media (max-width: 640px) {
  .hero.bryl-section { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
}
'''

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css + bryllim_css)

