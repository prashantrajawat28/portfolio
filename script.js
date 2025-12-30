(() => {
  "use strict";

  // -----------------------------
  // Helpers
  // -----------------------------
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isMobileUA = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const lockBodyScroll = (lock) => {
    document.body.style.overflow = lock ? "hidden" : "";
  };

  const stopAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  };

  // -----------------------------
  // Spotlight cursor background
  // -----------------------------
  document.addEventListener(
    "mousemove",
    (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mx", `${x}%`);
      document.documentElement.style.setProperty("--my", `${y}%`);
    },
    { passive: true }
  );

  // -----------------------------
  // Smooth scroll for sidebar anchors
  // -----------------------------
  document.querySelectorAll('.sidebar-nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // -----------------------------
  // Active sidebar highlight on scroll (RAF-throttled)
  // -----------------------------
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".sidebar-nav .nav-item"));

  let ticking = false;

  function updateActiveNav() {
    ticking = false;
    if (!sections.length || !navLinks.length) return;

    let currentId = "";
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) currentId = section.id;
    }

    navLinks.forEach((link, idx) => {
      const match = currentId && link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", match);
      if (!currentId) link.classList.toggle("active", idx === 0);
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateActiveNav);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", updateActiveNav);
  updateActiveNav();

  // -----------------------------
  // Project Modal Data (KEEP YOURS HERE ONCE)
  // -----------------------------
  (() => {
  // ----------------------------
  // Project Data (add more later)
  // ----------------------------
  const PROJECTS = {
  project1: {
    title: "StudyNotion-Edtech Platform",
    desc:
      "StudyNotion is a full-stack EdTech platform where students can buy and learn courses while instructors can create and manage educational content. It includes secure user authentication, real-time payments, role-based dashboards, and a scalable backend powered by Node.js, Express, and MongoDB.",
    stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    features: [
      "User authentication with JWT and role-based access (student/instructor/admin)",
      "Course creation, management, and structured content delivery",
      "Razorpay payment integration with real-time order tracking",
      "Dynamic dashboards for students and instructors",
      "Progress tracking for enrolled courses",
      "Responsive UI built with React & TailwindCSS",
      "Optimized backend with caching and efficient MongoDB queries",
      "Secure API design for payments, user data, and content management",
    ],
    github: "https://github.com/YOUR_USERNAME/YOUR_REPO",
    live: "https://studynotion-frontend-iota-three.vercel.app/",
    images: [
      "assets/project-1.png",
      "assets/project-1(2).png",
      "assets/project-1(3).png",
      "assets/project-1(4).png",
      "assets/project-1(5).png",
    ],
  },

  project2: {
    title: "Web Development / Backend API & CRUD Operations",
    desc:
      "This project is a simple yet structured CRUD web application built using Express.js to demonstrate RESTful API design, data management, and interaction between backend routes and a dynamic frontend interface.",
    stack: ["Node.js", "Express", "PostgreSQL"],
    features: [
      "CRUD operations (Create, Read, Update, Delete) with Express.js",
      "RESTful API architecture with structured routes",
      "Server-side data handling and validation",
      "Dynamic frontend integrated with backend APIs",
      "Lightweight UI using HTML & CSS",
      "Modular, clean folder structure for scalability",
    ],
    github: "https://github.com/YOUR_USERNAME/YOUR_REPO",
    live: "https://express-crud-hj5j.onrender.com/posts",
    images: [
      "assets/project-2.png",
      "assets/project-2(2).png",
      "assets/project-2(3).png",
    ],
  },

  project3: {
    title: "SmartCallReg",
    desc:
      "This project is a real-time AI voice assistant built using Twilio, FastAPI, and WebSockets, enabling users to interact through natural voice conversations.",
    stack: ["FastAPI", "Python", "Twilio", "WebSockets"],
    features: [
      "Real-time voice interaction using Twilio",
      "Speech-to-Text (STT) for understanding user queries",
      "LLM-based dynamic response generation",
      "Text-to-Speech (TTS) for natural voice replies",
      "WebSocket-based bi-directional communication",
      "Automated voice workflow (e.g., test booking)",
      "Built using FastAPI for fast, scalable backend",
    ],
    github: "https://github.com/prashantrajawat28",
    live: "", // not hosted
    images: ["assets/smartreg-2.jpeg", "assets/smartreg-1.jpeg", "assets/smartreg-3.jpeg"],
  },

  project4: {
    title: "Travel Landing Page UI (Design Showcase)",
    desc:
      "A modern travel landing page UI built as a design showcase. Focused on clean hero layout, strong typography, CTA placement, and responsive spacing. (UI Preview — Not Hosted)",
    stack: ["UI/UX", "HTML/CSS"],
    features: [
      "Full-screen hero section with strong typography and CTA",
      "Clean navbar and section layout structure",
      "Featured content card UI ('best places to visit')",
      "Responsive layout for desktop/tablet/mobile",
      "Consistent spacing, alignment, and visual hierarchy",
      "Smooth hover + modern glass UI styling",
    ],
    github: "https://github.com/prashantrajawat28",
    live: "",
    images: ["assets/ui-travel-1.png"],
  },

  project5: {
    title: "Spotify Web Player UI Clone (Design Showcase)",
    desc:
      "A Spotify-inspired web player dashboard UI clone. Built to practice layout systems, sidebar navigation, card grids, and dark theme consistency. (UI Preview — Not Hosted)",
    stack: ["UI/UX", "HTML/CSS"],
    features: [
      "Sidebar navigation layout (Home / Search / Library)",
      "Trending & Featured sections with card grid UI",
      "Dark theme styling with consistent contrast",
      "Hover states and polished spacing system",
      "Responsive dashboard layout structure",
    ],
    github: "https://github.com/prashantrajawat28",
    live: "",
    images: ["assets/ui-spotify-1.png"],
  },

  project6: {
    title: "Netflix Landing Page UI Clone (Design Showcase)",
    desc:
      "A Netflix-inspired landing page UI clone featuring hero banner, email CTA, and feature section layout. Built to practice modern responsive sections and typography. (UI Preview — Not Hosted)",
    stack: ["UI/UX", "HTML/CSS"],
    features: [
      "Hero banner + email capture CTA UI",
      "Feature sections (TV / Download / Watch anywhere layout)",
      "Dark theme with strong typography hierarchy",
      "Responsive section spacing and grid alignment",
      "Button and header styling inspired by Netflix UI",
    ],
    github: "https://github.com/prashantrajawat28",
    live: "",
    images: ["assets/ui-netflix-1.png", "assets/ui-netflix-2.png"],
  },
};


  // ----------------------------
  // Elements
  // ----------------------------
  const modal = document.getElementById("projectModal");
  const titleEl = document.getElementById("pmTitle");
  const descEl = document.getElementById("pmDesc");
  const stackEl = document.getElementById("pmStack");
  const featuresEl = document.getElementById("pmFeatures");
  const githubEl = document.getElementById("pmGithub");
  const liveEl = document.getElementById("pmLive");

  const imgEl = document.getElementById("pmImg");
  const dots = document.getElementById("pmDots");
  const prevBtn = document.getElementById("pmPrev");
  const nextBtn = document.getElementById("pmNext");

  let currentImages = [];
  let index = 0;

  if (!modal) {
    console.error("❌ #projectModal not found in DOM");
    return;
  }

  // ----------------------------
  // Helpers
  // ----------------------------
  function lockBody(lock) {
    document.body.style.overflow = lock ? "hidden" : "";
  }

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    lockBody(true);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    lockBody(false);
  }

function renderSlider(images) {
  currentImages = images || [];
  index = 0;

  dots.innerHTML = "";

  if (!imgEl) return;

  if (!currentImages.length) {
    imgEl.src = "";
    imgEl.alt = "No images";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    return;
  }

  // dots
  currentImages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "pm-slider__dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Go to image ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dots.appendChild(dot);
  });

  prevBtn.style.display = currentImages.length > 1 ? "" : "none";
  nextBtn.style.display = currentImages.length > 1 ? "" : "none";

  updateSlider(true);
}

function updateSlider(skipAnim = false) {
  if (!imgEl || !currentImages.length) return;

  // fade like Code-1 (clean swap)
  if (!skipAnim) imgEl.classList.add("is-fade");

  const nextSrc = currentImages[index];

  const apply = () => {
    imgEl.src = nextSrc;
    imgEl.alt = `Project image ${index + 1}`;

    // update dots
    [...dots.children].forEach((d, i) =>
      d.classList.toggle("is-active", i === index)
    );

    if (!skipAnim) {
      requestAnimationFrame(() => imgEl.classList.remove("is-fade"));
    } else {
      imgEl.classList.remove("is-fade");
    }
  };

  if (skipAnim) {
    apply();
  } else {
    setTimeout(apply, 120);
  }
}

function goTo(i) {
  if (!currentImages.length) return;
  index = (i + currentImages.length) % currentImages.length;
  updateSlider(false);
}

function next() {
  goTo(index + 1);
}

function prev() {
  goTo(index - 1);
}


  function renderProject(projectKey) {
    const p = PROJECTS[projectKey];
    if (!p) {
      console.warn("⚠️ Project not found for key:", projectKey);
      return;
    }

    titleEl.textContent = p.title || "";
    descEl.textContent = p.desc || "";

    // stack chips
    stackEl.innerHTML = "";
    (p.stack || []).forEach((s) => {
      const chip = document.createElement("span");
      chip.className = "pm-chip";
      chip.textContent = s;
      stackEl.appendChild(chip);
    });

    // features list
    featuresEl.innerHTML = "";
    (p.features || []).forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      featuresEl.appendChild(li);
    });

    // links
    githubEl.href = p.github || "#";
    liveEl.href = p.live || "#";
    githubEl.style.display = p.github ? "" : "none";
    liveEl.style.display = p.live && p.live !== "#" ? "" : "none";

    // slider
    renderSlider(p.images || []);
  }

  // ----------------------------
  // Open modal on "View Details"
  // ----------------------------
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-open-project");
    if (!btn) return;

    const key = btn.getAttribute("data-project");
    renderProject(key);
    openModal();
  });

  // ----------------------------
  // Close modal (close button or backdrop)
  // ----------------------------
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) closeModal();
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Slider buttons
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
})();

  // -----------------------------
  // Contact cards: active glow
  // -----------------------------
  document.querySelectorAll(".contact-link").forEach((link) => {
    link.addEventListener("click", () => {
      document
        .querySelectorAll(".contact-link")
        .forEach((a) => a.classList.remove("is-active"));
      link.classList.add("is-active");
    });
  });

  // -----------------------------
  // Resume: open + download
  // -----------------------------
  document.querySelectorAll(".js-resume").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const url = btn.getAttribute("href");
      if (!url) return;

      window.open(url, "_blank", "noopener,noreferrer");

      const a = document.createElement("a");
      a.href = url;
      a.download = "PrashantRajawat_resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  });

  // -----------------------------
  // 3D Tilt (lightweight)
  // -----------------------------
  if (!prefersReducedMotion) {
    const tiltEls = document.querySelectorAll("[data-tilt]");
    tiltEls.forEach((el) => {
      const max = Number(el.getAttribute("data-tilt-max") || 10);
      let raf = null;

      const setTransform = (x, y) => {
        const rx = (y - 0.5) * -2 * max;
        const ry = (x - 0.5) * 2 * max;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      };

      const reset = () => {
        el.style.transform = "";
      };

      el.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => setTransform(x, y));
      });

      el.addEventListener("pointerleave", () => {
        if (raf) cancelAnimationFrame(raf);
        reset();
      });
    });
  }

  // -----------------------------
  // Hire Me Modal
  // -----------------------------
  const hireOpenBtn = document.querySelector(".js-hire-open");
  const hireModal = document.getElementById("hireModal");
  const hmEmail = document.getElementById("hmEmail");
  const hmWhatsApp = document.getElementById("hmWhatsApp");
  const hmCalendly = document.getElementById("hmCalendly");

  const WHATSAPP_NUMBER_INTERNATIONAL = "917690052088"; // no +, no spaces
  const PHONE_NUMBER_TEL = "+917690052088";

  const EMAIL = "prashantrajawat1628@gmail.com";
  const SUBJECT = "Hiring Inquiry - Prashant Rajawat";
  const BODY = `Hi Prashant,

I saw your portfolio and would like to connect regarding a role.

Company:
Role:
Location:

Thanks,
[Your Name]`;

  function openHireModal() {
    if (!hireModal) return;

    hireModal.classList.add("is-open");
    hireModal.setAttribute("aria-hidden", "false");
    lockBodyScroll(true);

    // Email
    if (hmEmail) {
      const gmailWebUrl =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        `&to=${encodeURIComponent(EMAIL)}` +
        `&su=${encodeURIComponent(SUBJECT)}` +
        `&body=${encodeURIComponent(BODY)}`;

      const mailtoUrl =
        `mailto:${EMAIL}` +
        `?subject=${encodeURIComponent(SUBJECT)}` +
        `&body=${encodeURIComponent(BODY)}`;

      const mobile = isMobileUA();

      if (!mobile) {
        hmEmail.href = gmailWebUrl;
        hmEmail.target = "_blank";
        hmEmail.rel = "noopener noreferrer";
        hmEmail.onclick = null;
      } else {
        hmEmail.href = "#";
        hmEmail.target = "_self";
        hmEmail.rel = "noopener noreferrer";

        hmEmail.onclick = (e) => {
          e.preventDefault();

          const gmailAppUrl =
            `googlegmail://co?to=${encodeURIComponent(EMAIL)}` +
            `&subject=${encodeURIComponent(SUBJECT)}` +
            `&body=${encodeURIComponent(BODY)}`;

          let didHide = false;

          window.addEventListener(
            "pagehide",
            () => {
              didHide = true;
            },
            { once: true }
          );
          document.addEventListener(
            "visibilitychange",
            () => {
              if (document.hidden) didHide = true;
            },
            { once: true }
          );

          window.location.href = gmailAppUrl;

          setTimeout(() => {
            if (!didHide) window.location.href = mailtoUrl;
          }, 700);
        };
      }
    }

    // WhatsApp
    if (hmWhatsApp) {
      const waMsg = encodeURIComponent(
        "Hi Prashant, I saw your portfolio and would like to connect regarding a role. " +
          "Company: ____ | Role: ____ | Location: ____"
      );
      hmWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER_INTERNATIONAL}?text=${waMsg}`;
      hmWhatsApp.target = "_blank";
      hmWhatsApp.rel = "noopener noreferrer";
    }

    // Call button (id says Calendly but you use it for call/WA)
    if (hmCalendly) {
      const mobile = isMobileUA();
      if (mobile) {
        hmCalendly.href = `tel:${PHONE_NUMBER_TEL}`;
        hmCalendly.target = "_self";
        hmCalendly.rel = "";
      } else {
        hmCalendly.href = `https://wa.me/${PHONE_NUMBER_TEL.replace("+", "")}`;
        hmCalendly.target = "_blank";
        hmCalendly.rel = "noopener noreferrer";
      }
    }

    hireModal.querySelector(".hire-modal__close")?.focus?.();
  }

  function closeHireModal() {
    if (!hireModal) return;
    hireModal.classList.remove("is-open");
    hireModal.setAttribute("aria-hidden", "true");
    lockBodyScroll(false);
    hireOpenBtn?.focus?.();
  }

  hireOpenBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openHireModal();
  });

  document.addEventListener("click", (e) => {
    if (!hireModal?.classList.contains("is-open")) return;
    if (e.target.closest("[data-close-hire]")) closeHireModal();
  });

  // ESC + focus trap (Tab)
  document.addEventListener("keydown", (e) => {
    if (!hireModal?.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      closeHireModal();
      return;
    }

    if (e.key === "Tab") {
      const focusables = hireModal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
