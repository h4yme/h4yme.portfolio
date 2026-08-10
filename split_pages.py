import re

# Read original index.html
with open('index.html', 'r', encoding='utf-8') as f:
    full_html = f.read()

# Define the boilerplate wrapper
# Everything before <main ...> and including it
header_match = re.search(r'^(.*<main id="top" class="bryl-main">)', full_html, re.DOTALL)
header_html = header_match.group(1) if header_match else ''

# Fix navigation links in header to point to html files
header_html = header_html.replace('href="#work"', 'href="work.html"')
header_html = header_html.replace('href="#achievements"', 'href="achievements.html"')
header_html = header_html.replace('href="#toolkit"', 'href="toolkit.html"')
header_html = header_html.replace('href="#journey"', 'href="experience.html"')
header_html = header_html.replace('href="#testimonials"', 'href="recommendations.html"')
header_html = header_html.replace('href="#contact"', 'href="contact.html"')
# And for top link
header_html = header_html.replace('href="#top"', 'href="index.html"')

# Everything from </main> to the end
footer_match = re.search(r'(</main>.*)$', full_html, re.DOTALL)
footer_html = footer_match.group(1) if footer_match else ''

# Extract sections
sections = {
    'work': re.search(r'(<!-- WORK -->.*?)</section>', full_html, re.DOTALL),
    'achievements': re.search(r'(<!-- ACHIEVEMENTS -->.*?)</section>', full_html, re.DOTALL),
    'toolkit': re.search(r'(<!-- TOOLKIT -->.*?)</section>', full_html, re.DOTALL),
    'journey': re.search(r'(<!-- JOURNEY / BUILD LOG -->.*?)</section>', full_html, re.DOTALL),
    'testimonials': re.search(r'(<!-- TESTIMONIALS -->.*?)</section>', full_html, re.DOTALL),
    'contact': re.search(r'(<!-- CONTACT -->.*?)</section>', full_html, re.DOTALL),
    'github': re.search(r'(<!-- GITHUB ACTIVITY \(BRYL MINIMAL\) -->.*?</div>\s*</div>\s*</section>)', full_html, re.DOTALL),
}

def write_page(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(header_html + "\n" + content + "\n" + footer_html)

# Create Pages
if sections['work']: write_page('work.html', sections['work'].group(1) + "</section>")
if sections['achievements']: write_page('achievements.html', sections['achievements'].group(1) + "</section>")
if sections['toolkit']: write_page('toolkit.html', sections['toolkit'].group(1) + "</section>")
if sections['journey']: write_page('experience.html', sections['journey'].group(1) + "</section>")
if sections['testimonials']: write_page('recommendations.html', sections['testimonials'].group(1) + "</section>")
if sections['contact']: write_page('contact.html', sections['contact'].group(1) + "</section>")

# Generate new Hero for index.html
new_hero = """
  <!-- HERO (BRYLLIM LAYOUT) -->
  <section class="hero">
    <div class="hero-media">
      <img src="images/ManicarPic.JPG" alt="Jaimes Manicar" />
    </div>
    <div class="hero-content">
      <h1>Jaimes Manicar</h1>
      <p class="lede">IT graduate at Quezon City University, interned as a Software Developer at Excellence Appliance Technologies. I build things like LiteRise — an award-winning adaptive reading app piloted in real classrooms.</p>
      <p class="lede">Right now I'm building tools and figuring out cloud architecture. I love turning rough ideas into systems people actually use.</p>
      <div class="hero-links">
        <a href="https://github.com/h4yme" target="_blank">github ↗</a> /
        <a href="https://linkedin.com/in/jmanicar" target="_blank">linkedin ↗</a> /
        <a href="mailto:manicar.jaimesaldrich.trecero@gmail.com">email ↗</a>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section>
    <div class="status-strip" data-reveal>
      <div class="stat">
        <div class="num"><span class="mono-num" data-count="6">0</span></div>
        <div class="label">years of learning</div>
      </div>
      <div class="stat">
        <div class="num"><span class="mono-num" data-count="300">0</span>+</div>
        <div class="label">hours logged</div>
      </div>
      <div class="stat">
        <div class="num"><span class="mono-num" data-count="1">0</span></div>
        <div class="label">research award</div>
      </div>
      <div class="stat">
        <div class="num"><span class="mono-num" data-count="5">0</span></div>
        <div class="label">systems shipped</div>
      </div>
    </div>
  </section>
"""

github_html = sections['github'].group(1) if sections['github'] else ""

# Write new index.html
write_page('index.html', new_hero + "\n" + github_html)

print("Split pages successfully.")
