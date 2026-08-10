import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Hero section
# Replace existing hero with horizontal side-by-side hero matching Bryllim
hero_pattern = r'<!-- HERO -->.*?<!-- FOCUS AREAS -->'
new_hero = '''<!-- HERO -->
  <section class="hero bryl-section">
    <div class="hero-media">
      <img src="images/ManicarPic.JPG" alt="Jaimes Manicar" />
    </div>
    <div class="hero-content">
      <h1>Jaimes Manicar</h1>
      <p class="lede">I'm a full-stack developer. I build modern web & mobile apps, and these days I'm focused on cloud architecture.</p>
      <p class="lede">Right now I'm building tools and figuring out system operations. I love turning rough ideas into things people actually use.</p>
      <div class="hero-links">
        <a href="https://github.com/h4yme" target="_blank">github ↗</a> /
        <a href="https://linkedin.com/in/jmanicar" target="_blank">linkedin ↗</a> /
        <a href="mailto:manicar.jaimesaldrich.trecero@gmail.com">email ↗</a>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="bryl-section">
    <div class="status-strip" data-reveal>
      <div class="stat">
        <div class="num"><span class="mono-num" data-count="6">0</span>+</div>
        <div class="label">YEARS LEARNING</div>
      </div>
      <div class="stat">
        <div class="num"><span class="mono-num" data-count="300">0</span>+</div>
        <div class="label">HOURS DEV</div>
      </div>
      <div class="stat">
        <div class="num"><span class="mono-num" data-count="1">0</span></div>
        <div class="label">RESEARCH AWARD</div>
      </div>
      <div class="stat">
        <div class="num"><span class="mono-num" data-count="5">0</span></div>
        <div class="label">SYSTEMS SHIPPED</div>
      </div>
    </div>
  </section>

  <!-- WORK -->'''

html = re.sub(hero_pattern, new_hero, html, flags=re.DOTALL)

# 2. Update Section Headers
def replace_header(match):
    num = match.group(1)
    title = match.group(2)
    link = match.group(3) if match.group(3) else 'ALL ↗'
    return f'''<div class="bryl-section-header" data-reveal>
        <span class="title">0{num} &mdash; {title}</span>
        <a href="#" class="view-all">{link}</a>
      </div>'''

# Work
html = re.sub(r'<div class="section-head" data-reveal>\s*<span class="eyebrow">selected work</span>\s*<h2>Systems, shipped\.</h2>\s*<p.*?</p>\s*</div>', 
              r'<div class="bryl-section-header" data-reveal><span class="title">01 &mdash; projects</span><a href="#" class="view-all">ALL PROJECTS ↗</a></div>', html, flags=re.DOTALL)

# Experience
html = re.sub(r'<div class="section-head" data-reveal>\s*<span class="eyebrow">journey</span>\s*<h2>Build log\.</h2>\s*</div>', 
              r'<div class="bryl-section-header" data-reveal><span class="title">02 &mdash; experience</span><a href="#" class="view-all">FULL HISTORY ↗</a></div>', html, flags=re.DOTALL)

# Achievements
html = re.sub(r'<div class="section-head" data-reveal>\s*<span class="eyebrow">achievements</span>\s*<h2>Proof of work\.</h2>\s*</div>', 
              r'<div class="bryl-section-header" data-reveal><span class="title">03 &mdash; certifications</span><a href="#" class="view-all">ALL CERTIFICATIONS ↗</a></div>', html, flags=re.DOTALL)

# Toolkit
html = re.sub(r'<div class="section-head" data-reveal>\s*<span class="eyebrow">toolkit</span>.*?<h2>.*?</h2>.*?<p.*?</p>\s*</div>', 
              r'<div class="bryl-section-header" data-reveal><span class="title">04 &mdash; stack</span><a href="#" class="view-all">VIEW ALL ↗</a></div>', html, flags=re.DOTALL)

# Testimonials
html = re.sub(r'<div class="section-head" data-reveal>\s*<span class="eyebrow">peer feedback</span>\s*<h2>Recommendations\.</h2>\s*</div>', 
              r'<div class="bryl-section-header" data-reveal><span class="title">05 &mdash; recommendations</span><a href="#" class="view-all">ALL RECOMMENDATIONS ↗</a></div>', html, flags=re.DOTALL)

# Contact (Affiliations style)
html = re.sub(r'<div class="section-head" data-reveal>\s*<span class="eyebrow">contact</span>\s*<h2>Reach out\.</h2>\s*<p.*?</p>\s*</div>', 
              r'<div class="bryl-section-header" data-reveal><span class="title">06 &mdash; contact</span><a href="#" class="view-all">GET IN TOUCH ↗</a></div>', html, flags=re.DOTALL)


# 3. Rewrite Experience into Table
old_log = r'<div class="log" data-reveal>.*?</div>\s*</div>\s*</section>'
new_log = '''<div class="bryl-table" data-reveal>
        <div class="bryl-row">
          <div class="bryl-col date">2026</div>
          <div class="bryl-col role">Mobile App Developer</div>
          <div class="bryl-col company">SYNERGY Conference</div>
        </div>
        <div class="bryl-row">
          <div class="bryl-col date">2025</div>
          <div class="bryl-col role">Software Developer Intern</div>
          <div class="bryl-col company">Excellence Appliance Tech</div>
        </div>
        <div class="bryl-row">
          <div class="bryl-col date">2023</div>
          <div class="bryl-col role">IT Student</div>
          <div class="bryl-col company">Quezon City University</div>
        </div>
      </div>
    </div>
  </section>'''
html = re.sub(old_log, new_log, html, flags=re.DOTALL)


# 4. Remove About Strip
html = re.sub(r'<!-- ABOUT STRIP -->.*?(?=<!-- ACHIEVEMENTS -->)', '', html, flags=re.DOTALL)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
