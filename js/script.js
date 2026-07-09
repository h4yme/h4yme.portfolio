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
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-cats") || "").split(" ");
        var show = filter === "all" || cats.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
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

  /* Contact form -> EmailJS (same service already public in the site's repo) */
  var form = document.getElementById("contactForm");
  if (form && window.emailjs) {
    emailjs.init({ publicKey: "RgDxuPfshgy24B846" });
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name2").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();
      var submitBtn = document.getElementById("submitBtn");

      if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
      }
      if (!window.emailjs) {
        alert("Message form isn't connected yet — email jaimesbusiness2004@gmail.com directly.");
        return;
      }

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      emailjs.send("service_1q30jux", "template_tzkku8c", { name: name, email: email, message: message }).then(
        function () {
          submitBtn.textContent = "Message sent";
          form.reset();
          setTimeout(function () {
            submitBtn.textContent = "Send message";
            submitBtn.disabled = false;
          }, 2200);
        },
        function (error) {
          console.error("EmailJS error:", error);
          alert("Couldn't send right now — email jaimesbusiness2004@gmail.com directly.");
          submitBtn.textContent = "Send message";
          submitBtn.disabled = false;
        }
      );
    });
  }
})();