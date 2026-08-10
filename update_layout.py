import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace Fonts
font_orig = r'<link href=\"https://fonts.googleapis.com/css2\?family=Big\+Shoulders\+Display:wght@600;700;800&family=IBM\+Plex\+Mono:wght@400;500;600&family=IBM\+Plex\+Sans:wght@400;500;600&display=swap\" rel=\"stylesheet\">'
font_new = '<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">'
content = re.sub(font_orig, font_new, content)

# 2. Replace Header and Body
header_orig = r'<body>\s*<header class=\"site-header\">.*?</header>\s*<main id=\"top\">'
header_new = '''<body class="bryl-layout">

<aside class="bryl-sidebar">
  <div class="sidebar-top">
    <a href="#top" class="brand">jaimes<br>manicar</a>
    <nav class="bryl-nav">
      <ul id="navLinks">
        <li><a href="#work">01 &mdash; work</a></li>
        <li><a href="#achievements">02 &mdash; achievements</a></li>
        <li><a href="#toolkit">03 &mdash; toolkit</a></li>
        <li><a href="#journey">04 &mdash; experience</a></li>
        <li><a href="#testimonials">05 &mdash; recommendations</a></li>
        <li><a href="#contact">06 &mdash; contact</a></li>
      </ul>
    </nav>
  </div>
  <div class="sidebar-bottom">
    <div class="bryl-contact-links">
      <p class="micro-label" style="margin-bottom: 12px; color: var(--text-faint);">For work, collabs & everything else, reach me at</p>
      <a href="mailto:manicar.jaimesaldrich.trecero@gmail.com"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> manicar.jaimesaldrich.trecero@gmail.com</a>
    </div>
  </div>
</aside>

<main id="top" class="bryl-main">'''
content = re.sub(header_orig, header_new, content, flags=re.DOTALL)

# 3. Replace Footer
footer_orig = r'</main>\s*<footer class=\"site-footer surface-ink\">.*?</footer>'
footer_new = '''</main>

</div> <!-- End of bryl-layout -->'''
content = re.sub(footer_orig, footer_new, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated index.html layout')
