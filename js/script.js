(function () {
  "use strict";

  /* Mobile Navigation Drawer Toggle */
  var navToggle = document.getElementById('mobileNavToggle');
  var sidebar = document.querySelector('.sidebar');
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', function() {
      sidebar.classList.toggle('is-open');
      document.body.classList.toggle('mobile-nav-open');
      var isOpen = sidebar.classList.contains('is-open');
      var hamburger = navToggle.querySelector('.icon-hamburger');
      var close = navToggle.querySelector('.icon-close');
      if (hamburger && close) {
        if (isOpen) {
          hamburger.classList.add('hidden');
          close.classList.remove('hidden');
        } else {
          hamburger.classList.remove('hidden');
          close.classList.add('hidden');
        }
      }
    });

    sidebar.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        /* Disable transition on link click to prevent stutter during page navigation */
        sidebar.style.transition = 'none';
        sidebar.classList.remove('is-open');
        document.body.classList.remove('mobile-nav-open');
        var hamburger = navToggle.querySelector('.icon-hamburger');
        var close = navToggle.querySelector('.icon-close');
        if (hamburger && close) {
          hamburger.classList.remove('hidden');
          close.classList.add('hidden');
        }
        setTimeout(function() {
          sidebar.style.transition = '';
        }, 150);
      });
    });
  }

  /* Animated stat counters */
  var counters = document.querySelectorAll(".mono-num[data-count]");
  var countersDone = false;
  function runCounters() {
    if (countersDone) return;
    countersDone = true;
    counters.forEach(function (el) {
      var end = parseInt(el.getAttribute("data-count"), 10);
      var start = 0;
      var duration = 900;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = Math.floor(start + (end - start) * progress);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = end;
      }
      requestAnimationFrame(step);
    });
  }

  /* Scroll reveal */
  var revealSelector = ".reveal, [data-reveal], .home-section, .feat-card, .project-list-row, .tl-item, .stack-group, .ach-hero-card, .ach-cert-card, .reco-card-page, .reco-card";
  var revealEls = document.querySelectorAll(revealSelector);
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.classList.contains("status-strip")) runCounters();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    runCounters();
  }

  /* Immediately unveil top visible elements on load */
  setTimeout(function() {
    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("is-visible");
      }
    });
  }, 50);

  /* Project filters */
  var filterBtns = document.querySelectorAll(".filters button");
  var cards = document.querySelectorAll(".project-card");
  var FADE_MS = 260;
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");

      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-cats") || "").split(" ");
        var show = filter === "all" || cats.indexOf(filter) !== -1;
        var isHidden = card.classList.contains("is-hidden");

        if (show && isHidden) {
          card.classList.remove("is-hidden");
          card.classList.add("is-fading");
          void card.offsetWidth;
          requestAnimationFrame(function () {
            card.classList.remove("is-fading");
          });
        } else if (!show && !isHidden) {
          card.classList.add("is-fading");
          setTimeout(function () {
            card.classList.add("is-hidden");
          }, FADE_MS);
        }
      });
    });
  });

  /* Lightbox Modal */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  if (lb && lbImg) {
    document.querySelectorAll("[data-lightbox]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var targetSrc = link.getAttribute("href");
        if (targetSrc) {
          lbImg.src = targetSrc;
          lbImg.alt = link.querySelector("img") ? link.querySelector("img").alt : "Certification Preview";
          lb.classList.add("is-open");
          lb.classList.add("active");
        }
      });
    });

    function closeLb() {
      lb.classList.remove("is-open");
      lb.classList.remove("active");
      lbImg.src = "";
    }

    if (lbClose) lbClose.addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target === lbClose) closeLb();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
    });
  }

  /* Toast Helper */
  function showToast(type, title, message) {
    var container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Max stacked toasts: 3
    var activeToasts = container.querySelectorAll('.toast:not(.hiding)');
    if (activeToasts.length >= 3) {
      var oldest = activeToasts[0];
      oldest.classList.remove('show');
      oldest.classList.add('hiding');
      setTimeout(function() {
        if (oldest.parentNode) oldest.parentNode.removeChild(oldest);
      }, 300);
    }

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;

    var iconSvg = type === 'success' 
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
      : type === 'warning'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';

    toast.innerHTML = 
      '<div class="toast-icon">' + iconSvg + '</div>' +
      '<div class="toast-content">' +
        '<div class="toast-title">' + title + '</div>' +
        '<div class="toast-message">' + message + '</div>' +
      '</div>' +
      '<button class="toast-close">&times;</button>' +
      '<div class="toast-progress"></div>';

    container.appendChild(toast);
    void toast.offsetWidth;
    toast.classList.add('show');

    function removeToast() {
      toast.classList.remove('show');
      toast.classList.add('hiding');
      setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }

    toast.querySelector('.toast-close').addEventListener('click', removeToast);
    setTimeout(removeToast, 5000);
  }

  /* Contact form -> EmailJS */
  var form = document.getElementById("contactForm");
  if (form) {
    form.setAttribute('novalidate', 'novalidate');
    if (window.emailjs) {
      emailjs.init({ publicKey: "EFAIax4PAVF6BJK5B" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = document.getElementById("submitBtn");

      var nameInput = document.getElementById("name2");
      var emailInput = document.getElementById("email");
      var messageInput = document.getElementById("message");

      var name = nameInput ? nameInput.value.trim() : "";
      var email = emailInput ? emailInput.value.trim() : "";
      var message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !message) {
        showToast('warning', 'Missing Information', 'Please fill out all fields before sending.');
        return;
      }

      if (!window.emailjs) {
        showToast('error', 'Configuration Missing', 'EmailJS is not loaded.');
        return;
      }

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      emailjs.sendForm("service_om1e8rp", "template_j5psi1t", form)
        .then(function () {
          submitBtn.textContent = "Message sent!";
          form.reset();
          showToast('success', 'Message Sent Successfully', 'I will get back to you shortly.');
          
          setTimeout(function () {
            submitBtn.textContent = "Send message";
            submitBtn.disabled = false;
          }, 3000);
        }, function (error) {
          console.error("EmailJS error:", error);
          showToast('error', 'Connection Failed', 'Please check your internet & try again.');
          submitBtn.textContent = "Send message";
          submitBtn.disabled = false;
        });
    });
  }

  /* GitHub Matrix (Bryl Minimal) */
  async function renderGitHubMatrix() {
    var container = document.getElementById('github-matrix-container');
    if (!container) return;
    
    var matrixEl = document.getElementById('github-matrix');
    var totalEl = document.getElementById('github-total-contributions');
    var username = container.getAttribute('data-username') || 'h4yme';
    
    try {
      var data;
      try {
        var res = await fetch('/api/github?username=' + username);
        if (!res.ok) throw new Error('Primary API failed');
        data = await res.json();
      } catch (e) {
        var res2 = await fetch('https://github-contributions.vercel.app/api/v1/' + username);
        if (!res2.ok) throw new Error('Proxy API failed');
        var rawData = await res2.json();
        var today = new Date();
        var validDays = rawData.contributions.filter(function(d) { return new Date(d.date) <= today; });
        var pastYearDays = validDays.slice(0, 364);
        pastYearDays.reverse();
        var total = pastYearDays.reduce(function(sum, d) { return sum + d.count; }, 0);
        data = { total: total, contributions: pastYearDays };
      }
      
      var pastYearDays = data.contributions;
      if (pastYearDays.length > 364) {
        pastYearDays = pastYearDays.slice(-364);
      }
      
      totalEl.textContent = (data.total || 0).toLocaleString() + ' CONTRIBUTIONS IN THE LAST YEAR';
      
      var cellSize = 18;
      var svgWidth = 52 * cellSize;
      var svgHeight = 7 * cellSize;
      
      var svg = '<svg width="100%" viewBox="0 0 ' + svgWidth + ' ' + svgHeight + '" fill="var(--ink)" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; overflow: visible; display: block;">';
      
      for (var col = 0; col < 52; col++) {
        for (var row = 0; row < 7; row++) {
          var index = col * 7 + row;
          var day = pastYearDays[index];
          if (!day) continue;
          
          var cx = col * cellSize + (cellSize / 2);
          var cy = row * cellSize + (cellSize / 2);
          
          var r = 2.2;
          var opacity = 0.12;
          var level = day.intensity !== undefined ? parseInt(day.intensity) : null;
          
          if (level !== null) {
             if (level === 1) { r = 4.2; opacity = 0.6; }
             else if (level === 2) { r = 6.0; opacity = 0.85; }
             else if (level === 3) { r = 7.8; opacity = 1.0; }
             else if (level === 4) { r = 9.2; opacity = 1.0; }
          } else {
             var count = day.count || 0;
             if (count > 0 && count <= 3) { r = 4.2; opacity = 0.6; }
             else if (count > 3 && count <= 6) { r = 6.0; opacity = 0.85; }
             else if (count > 6 && count <= 12) { r = 7.8; opacity = 1.0; }
             else if (count > 12) { r = 9.2; opacity = 1.0; }
          }
          
          svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" opacity="'+opacity+'" />';
        }
      }
      svg += '</svg>';
      matrixEl.innerHTML = svg;
      
    } catch (error) {
      console.error("GitHub Graph error:", error);
      matrixEl.innerHTML = '<span style="font-family: var(--mono); font-size: 11px; color: var(--text-dim);">Unable to load contributions</span>';
    }
  }
  
  renderGitHubMatrix();

  /* Deck Carousel */
  (function () {
    var deck = document.getElementById('projectDeck');
    if (!deck) return;

    var cards = Array.from(deck.querySelectorAll('.deck-card'));
    var total = cards.length;
    var activeIndex = 0;

    function posFor(cardIndex) {
      var diff = cardIndex - activeIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return diff;
    }

    function applyPositions() {
      cards.forEach(function (card, i) {
        var pos = posFor(i);
        card.setAttribute('data-pos', String(pos));
      });
    }

    applyPositions();

    cards.forEach(function (card, i) {
      card.addEventListener('click', function (e) {
        var pos = parseInt(card.getAttribute('data-pos'), 10);
        if (pos === 0) return;
        e.preventDefault();
        activeIndex = i;
        applyPositions();
      });
    });
  })();

  /* Theme Switcher with Circular Pop Animation */
  (function () {
    var themeBtns = document.querySelectorAll('.theme-btn');
    var savedTheme = localStorage.getItem('theme') || 'system';

    function applyThemeState(theme) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      }

      themeBtns.forEach(function (btn) {
        if (btn.getAttribute('data-theme-val') === theme) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });
    }

    applyThemeState(savedTheme);

    function triggerCircularPop(clickEvt, targetTheme) {
      var rect = clickEvt.currentTarget.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;

      var endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      if (document.startViewTransition) {
        var transition = document.startViewTransition(function () {
          applyThemeState(targetTheme);
        });

        transition.ready.then(function () {
          var clipPath = [
            'circle(0px at ' + x + 'px ' + y + 'px)',
            'circle(' + endRadius + 'px at ' + x + 'px ' + y + 'px)'
          ];

          document.documentElement.animate(
            {
              clipPath: clipPath
            },
            {
              duration: 550,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          );
        });
      } else {
        applyThemeState(targetTheme);
      }
    }

    themeBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var val = btn.getAttribute('data-theme-val');
        if ((localStorage.getItem('theme') || 'system') === val) return;
        localStorage.setItem('theme', val);
        triggerCircularPop(e, val);
      });
    });

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function () {
        if ((localStorage.getItem('theme') || 'system') === 'system') {
          applyThemeState('system');
        }
      });
    }
  })();

})();