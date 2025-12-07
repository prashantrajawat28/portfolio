(() => {
  "use strict";

  // -----------------------------
  // Helpers
  // -----------------------------
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Premium spotlight cursor background (moved inside IIFE; same behavior)
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty("--mx", `${x}%`);
    document.documentElement.style.setProperty("--my", `${y}%`);
  });

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
  // Project Modal Data
  // -----------------------------
  const projectData = {
    project1: {
      title: "StudyNotion-Edtech Platform",
      desc:
        "StudyNotion is a full-stack EdTech platform where students can buy and learn courses while instructors can create and manage educational content. It includes secure user authentication, real-time payments, role-based dashboards, and a scalable backend powered by Node.js, Express, and MongoDB.",
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
      images: ["assets/project-2.png", "assets/project-2(2).png", "assets/project-2(3).png"],
    },

    project3: {
      title: "SmartCallReg",
      desc:
        "This project is a real-time AI voice assistant built using Twilio, FastAPI, and WebSockets, enabling users to interact through natural voice conversations.",
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
      live: "https://YOUR-LIVE-LINK.com",
      images: ["assets/smartreg-2.jpeg", "assets/smartreg-1.jpeg", "assets/smartreg-3.jpeg"],
    },

    project4: {
      title: "Travel Landing Page UI (Design Showcase)",
      desc:
        "A modern travel landing page UI built as a design showcase. Focused on clean hero layout, strong typography, CTA placement, and responsive spacing. (UI Preview — Not Hosted)",
      features: [
        "Full-screen hero section with strong typography and CTA",
        "Clean navbar and section layout structure",
        "Featured content card UI ('best places to visit')",
        "Responsive layout for desktop/tablet/mobile",
        "Consistent spacing, alignment, and visual hierarchy",
        "Smooth hover + modern glass UI styling",
      ],
      github: "",
      live: "",
      images: ["assets/ui-travel-1.png", "assets/ui-travel-2.png"],
    },

    project5: {
      title: "Spotify Web Player UI Clone (Design Showcase)",
      desc:
        "A Spotify-inspired web player dashboard UI clone. Built to practice layout systems, sidebar navigation, card grids, and dark theme consistency. (UI Preview — Not Hosted)",
      features: [
        "Sidebar navigation layout (Home / Search / Library)",
        "Trending & Featured sections with card grid UI",
        "Dark theme styling with consistent contrast",
        "Hover states and polished spacing system",
        "Responsive dashboard layout structure",
      ],
      github: "",
      live: "",
      images: ["assets/ui-spotify-1.png"],
    },

    project6: {
      title: "Netflix Landing Page UI Clone (Design Showcase)",
      desc:
        "A Netflix-inspired landing page UI clone featuring hero banner, email CTA, and feature section layout. Built to practice modern responsive sections and typography. (UI Preview — Not Hosted)",
      features: [
        "Hero banner + email capture CTA UI",
        "Feature sections (TV / Download / Watch anywhere layout)",
        "Dark theme with strong typography hierarchy",
        "Responsive section spacing and grid alignment",
        "Button and header styling inspired by Netflix UI",
      ],
      github: "",
      live: "",
      images: ["assets/ui-netflix-1.png", "assets/ui-netflix-2.png"],
    },
  };

  // -----------------------------
  // Modal Elements
  // -----------------------------
  const modal = document.getElementById("projectModal");
  const pmTitle = document.getElementById("pmTitle");
  const pmDesc = document.getElementById("pmDesc");
  const pmFeatures = document.getElementById("pmFeatures");
  const pmGithub = document.getElementById("pmGithub");
  const pmLive = document.getElementById("pmLive");

  // Slider elements
  const pmTrack = document.getElementById("pmTrack");
  const pmDots = document.getElementById("pmDots");
  const pmPrev = document.getElementById("pmPrev");
  const pmNext = document.getElementById("pmNext");

  let pmImages = [];
  let pmIndex = 0;

  function updateSliderUI() {
    pmTrack.style.transform = `translateX(${-(pmIndex * 100)}%)`;

    pmDots.querySelectorAll(".pm-slider__dot").forEach((d, idx) => {
      d.classList.toggle("is-active", idx === pmIndex);
    });

    const showControls = pmImages.length > 1;
    pmDots.style.display = showControls ? "flex" : "none";
    pmPrev.style.display = showControls ? "grid" : "none";
    pmNext.style.display = showControls ? "grid" : "none";
  }

  function renderSlider(images) {
    pmImages = Array.isArray(images) ? images : [];
    pmIndex = 0;

    pmTrack.innerHTML = "";
    pmImages.forEach((src) => {
      const slide = document.createElement("div");
      slide.className = "pm-slider__slide";
      slide.innerHTML = `<img src="${src}" alt="Project preview" draggable="false" />`;
      pmTrack.appendChild(slide);
    });

    pmDots.innerHTML = "";
    pmImages.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "pm-slider__dot" + (i === 0 ? " is-active" : "");
      dot.dataset.index = String(i);
      pmDots.appendChild(dot);
    });

    updateSliderUI();
  }

  function goToSlide(i) {
    if (!pmImages.length) return;
    pmIndex = Math.max(0, Math.min(i, pmImages.length - 1));
    updateSliderUI();
  }

  function stopAll(e) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  }

  pmPrev?.addEventListener("click", (e) => { stopAll(e); goToSlide(pmIndex - 1); }, true);
  pmNext?.addEventListener("click", (e) => { stopAll(e); goToSlide(pmIndex + 1); }, true);
  pmDots?.addEventListener("click", (e) => {
    const btn = e.target.closest(".pm-slider__dot");
    if (!btn) return;
    stopAll(e);
    goToSlide(Number(btn.dataset.index));
  }, true);

  function openProjectModal(projectKey) {
    const p = projectData[projectKey];
    if (!p || !modal) return;

    pmTitle.textContent = p.title || "";
    pmDesc.textContent = p.desc || "";

    const hasGithub = !!(p.github && p.github.trim() && !p.github.includes("YOUR_USERNAME"));
    const hasLive = !!(p.live && p.live.trim() && !p.live.includes("YOUR-LIVE-LINK"));

    pmGithub.href = hasGithub ? p.github : "#";
    pmGithub.style.display = hasGithub ? "flex" : "none";

    pmLive.href = hasLive ? p.live : "#";
    pmLive.style.display = hasLive ? "flex" : "none";

    renderSlider(p.images || []);

    pmFeatures.innerHTML = "";
    (p.features || []).forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      pmFeatures.appendChild(li);
    });

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".js-open-project");
    if (openBtn) {
      e.preventDefault();
      openProjectModal(openBtn.dataset.project);
      return;
    }
    if (e.target?.hasAttribute?.("data-close-modal")) closeProjectModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) closeProjectModal();
  });

  // Contact cards: active glow (does not block navigation)
  document.querySelectorAll(".contact-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".contact-link").forEach((a) => a.classList.remove("is-active"));
      link.classList.add("is-active");
    });
  });

  // Resume: open + download
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
  // 3D Tilt (lightweight, no libs)
  // -----------------------------
  if (!prefersReducedMotion) {
    const tiltEls = document.querySelectorAll("[data-tilt]");
    tiltEls.forEach((el) => {
      const max = Number(el.getAttribute("data-tilt-max") || 10);
      let raf = null;

      function setTransform(x, y) {
        const rx = ((y - 0.5) * -2) * max;
        const ry = ((x - 0.5) * 2) * max;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      }

      function reset() {
        el.style.transform = "";
      }

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
  // Hire Me Modal (deduped, same final behavior)
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
    document.body.style.overflow = "hidden";

    // Email -> Gmail compose (your later intended behavior)
   // Email button: Desktop -> Gmail compose, Mobile -> mailto (works everywhere)
if (hmEmail) {
  const gmailUrl =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(EMAIL)}` +
    `&su=${encodeURIComponent(SUBJECT)}` +
    `&body=${encodeURIComponent(BODY)}`;

  const mailtoUrl =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(SUBJECT)}` +
    `&body=${encodeURIComponent(BODY)}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  hmEmail.href = isMobile ? mailtoUrl : gmailUrl;
  hmEmail.target = isMobile ? "_self" : "_blank";
  hmEmail.rel = "noopener noreferrer";
}

    // WhatsApp button (pre-filled)
    if (hmWhatsApp) {
      const waMsg = encodeURIComponent(
        "Hi Prashant, I saw your portfolio and would like to connect regarding a role. " +
        "Company: ____ | Role: ____ | Location: ____"
      );
      hmWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER_INTERNATIONAL}?text=${waMsg}`;
      hmWhatsApp.target = "_blank";
      hmWhatsApp.rel = "noopener noreferrer";
    }

    // Call button: mobile -> tel, desktop -> WhatsApp (your final intended logic)
    if (hmCalendly) {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        hmCalendly.href = `tel:${PHONE_NUMBER_TEL}`;
        hmCalendly.target = "_self";
      } else {
        hmCalendly.href = `https://wa.me/${PHONE_NUMBER_TEL.replace("+", "")}`;
        hmCalendly.target = "_blank";
        hmCalendly.rel = "noopener noreferrer";
      }
    }

    // focus close button (fixed: previously could target backdrop)
    const closeBtn = hireModal.querySelector(".hire-modal__close");
    closeBtn?.focus?.();
  }

  function closeHireModal() {
    if (!hireModal) return;
    hireModal.classList.remove("is-open");
    hireModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    hireOpenBtn?.focus?.();
  }

  hireOpenBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openHireModal();
  });

  document.addEventListener("click", (e) => {
    if (!hireModal?.classList.contains("is-open")) return;
    if (e.target?.hasAttribute?.("data-close-hire")) closeHireModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!hireModal?.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      closeHireModal();
      return;
    }

    // focus trap
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
