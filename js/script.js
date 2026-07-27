(function () {
  "use strict";

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
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
  var revealEls = document.querySelectorAll("[data-reveal]");
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
      { threshold: 0.2 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    runCounters();
  }

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
          // bring back into flow, start from faded state, then transition in
          card.classList.remove("is-hidden");
          card.classList.add("is-fading");
          void card.offsetWidth; // force reflow so the transition actually runs
          requestAnimationFrame(function () {
            card.classList.remove("is-fading");
          });
        } else if (!show && !isHidden) {
          // fade out, then remove from flow once the transition finishes
          card.classList.add("is-fading");
          setTimeout(function () {
            card.classList.add("is-hidden");
          }, FADE_MS);
        }
      });
    });
  });

  /* Simple lightbox for cert images */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  document.querySelectorAll("[data-lightbox]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      lbImg.src = link.getAttribute("href");
      lbImg.alt = link.querySelector("img") ? link.querySelector("img").alt : "";
      lb.classList.add("is-open");
    });
  });
  function closeLb() { lb.classList.remove("is-open"); lbImg.src = ""; }
  if (lbClose) lbClose.addEventListener("click", closeLb);
  if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLb();
  });

  /* Toast Helper */
  function showToast(type, title, message) {
    var container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
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
      '<button class="toast-close">&times;</button>';

    container.appendChild(toast);
    void toast.offsetWidth; // Trigger reflow
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

      var name = document.getElementById("name2").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();

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
})();