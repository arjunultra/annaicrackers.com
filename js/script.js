// gsap used with swiper to create custom animations
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof Swiper === "undefined") {
    console.warn("GSAP or Swiper is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const homeCarouselSwiper = new Swiper(".home-carousel-swiper", {
    loop: true,
    speed: 2000, // Increased speed for the rotation effect
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    allowTouchMove: true,
    effect: "slide",
    on: {
      init: function () {
        const activeSlide = document.querySelector(
          ".home-carousel .swiper-slide-active"
        );
        if (activeSlide) {
          gsap.set(activeSlide, {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
            zIndex: 2,
          });
        }
      },
      beforeTransition: function () {
        const slides = document.querySelectorAll(
          ".home-carousel .swiper-slide"
        );
        gsap.set(slides, { clearProps: "all" });
      },
      slideChangeTransitionStart: function () {
        const activeSlide = this.slides[this.activeIndex];
        const prevSlide = this.slides[this.previousIndex];

        gsap.killTweensOf([activeSlide, prevSlide]);

        // 🔄 Exit animation for previous slide - Spin out and shrink
        if (prevSlide) {
          gsap.to(prevSlide, {
            autoAlpha: 0,
            rotation: 1080, // 3 full rotations (360 × 3)
            scale: 0.2,
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(prevSlide, {
                visibility: "hidden",
                rotation: 0,
                scale: 1,
              });
            },
          });
        }

        // 🌀 Entry animation for active slide - Spin in from small to big
        gsap.fromTo(
          activeSlide,
          {
            autoAlpha: 0,
            // rotation: -1080, // Start with 3 full rotations in opposite direction
            scale: 2,
            visibility: "visible",
            zIndex: 2,
          },
          {
            autoAlpha: 1,
            rotation: 0, // End at normal rotation
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          }
        );

        // ✨ Image enhancement animation
        const image = activeSlide.querySelector("img");
        if (image) {
          gsap.fromTo(
            image,
            {
              scale: 0.5,
              filter: "blur(8px) brightness(1.5)",
              rotation: 45,
            },
            {
              scale: 1,
              filter: "blur(0px) brightness(1)",
              rotation: 0,
              duration: 1.8,
              ease: "back.out(2)",
            }
          );
        }

        // 🌟 Optional background glow effect
        const slideContent = activeSlide.querySelector(".slide-content");
        if (slideContent) {
          gsap.fromTo(
            slideContent,
            {
              backgroundColor: "rgba(255,255,255,0.8)",
              boxShadow: "0 0 0 rgba(255,215,0,0)",
            },
            {
              backgroundColor: "rgba(255,255,255,0)",
              boxShadow: "0 0 30px rgba(255,215,0,0.7)",
              duration: 1.2,
              ease: "power2.out",
              repeat: 1,
              yoyo: true,
            }
          );
        }
      },
    },
  });
});
// safety page GSAP
document.addEventListener("DOMContentLoaded", function () {
  // Load required GSAP plugins
  gsap.registerPlugin(SplitText, ScrollTrigger, MotionPathPlugin);

  // Split text animations
  const splitTitles = document.querySelectorAll(".split-text");
  splitTitles.forEach((title) => {
    const split = new SplitText(title, { type: "lines,chars" });
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      rotationX: 90,
      duration: 0.6,
      stagger: 0.02,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // Motion path for icons
  const motionPathIcons = document.querySelectorAll(".motion-path");
  motionPathIcons.forEach((icon) => {
    gsap.from(icon, {
      duration: 1.5,
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 0, y: -20 },
          { x: 0, y: 0 },
        ],
        curviness: 1.5,
      },
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: icon,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // Card animations
  const cards = document.querySelectorAll(".safety-guidelines-card");
  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Hover effect enhancement
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Section entrance animation
  gsap.from(".safety-guidelines-column", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".safety-guidelines",
      start: "top 70%",
      toggleActions: "play none none none",
    },
  });

  // CTA button animation
  gsap.from(".safety-guidelines-btn", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "elastic.out(1, 0.5)",
    scrollTrigger: {
      trigger: ".safety-guidelines-cta",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
});

// contact page GSAP animations
// Fireworks Contact Page Animations
document.addEventListener("DOMContentLoaded", function () {
  // Only run if we're on the contact page
  if (document.querySelector(".fireworks-contact")) {
    const contactSection = document.querySelector(".fireworks-contact");

    // Set up the GSAP timeline
    const contactTL = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: contactSection,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // Animate the badge and header elements
    contactTL
      .from(".fireworks-contact-badge", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
      .from(
        ".fireworks-contact-title",
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.4"
      )
      .from(
        ".fireworks-contact-subtitle",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3"
      )
      .from(
        ".fireworks-contact-subtitle::before, .fireworks-contact-subtitle::after",
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.3"
      );

    // Animate the contact cards in a staggered fashion
    contactTL.from(
      ".fireworks-contact-card",
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1)",
      },
      "-=0.3"
    );

    // Animate card icons separately for more impact
    gsap.from(".fireworks-contact-card-icon-wrapper", {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: ".fireworks-contact-card",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate card decorations on hover
    document.querySelectorAll(".fireworks-contact-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card.querySelector(".fireworks-contact-card-decoration"), {
          backgroundColor: "rgba(220, 53, 69, 1)",
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card.querySelector(".fireworks-contact-card-decoration"), {
          backgroundColor: "rgba(220, 53, 69, 0.1)",
          duration: 0.3,
        });
      });
    });

    // Map section animation
    const mapTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".fireworks-contact-map-container",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    mapTL
      .from(".fireworks-contact-map-overlay", {
        y: -50,
        opacity: 0,
        duration: 0.7,
      })
      .from(
        ".fireworks-contact-map-embed",
        {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

    // Visit info section animation
    gsap.from(".fireworks-contact-visit-info", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".fireworks-contact-visit-info",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".fireworks-contact-visit-detail", {
      x: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".fireworks-contact-visit-details",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Safety section animation
    gsap.from(".fireworks-contact-safety-icon", {
      rotation: -90,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: ".fireworks-contact-safety",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".fireworks-contact-safety-content", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: ".fireworks-contact-safety",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Link arrow animations
    document
      .querySelectorAll(".fireworks-contact-link-arrow")
      .forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link.querySelector("i"), {
            x: 5,
            duration: 0.3,
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link.querySelector("i"), {
            x: 0,
            duration: 0.3,
          });
        });
      });

    // Button hover animations
    document.querySelectorAll(".fireworks-contact-visit-btn").forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          y: -2,
          boxShadow: "0 10px 25px rgba(111, 66, 193, 0.5)",
          duration: 0.3,
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          y: 0,
          boxShadow: "0 5px 15px rgba(111, 66, 193, 0.3)",
          duration: 0.3,
        });
      });
    });

    // Special hour item pulsing animation
    gsap.to(".fireworks-contact-hour-special", {
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: "sine.inOut",
      css: {
        boxShadow: "0 0 0 5px rgba(111, 66, 193, 0.1)",
      },
      scrollTrigger: {
        trigger: ".fireworks-contact-hour-special",
        start: "top 80%",
        toggleActions: "play pause resume pause",
      },
    });
  }
});
// footer GSAP animations
document.addEventListener("DOMContentLoaded", function () {
  // Only animate if not on mobile
  if (window.innerWidth > 767.98) {
    const footer = document.querySelector(".pyro-footer");

    if (footer) {
      // Set initial state for animation
      gsap.set(footer.querySelectorAll(".footer-link"), { x: -10, opacity: 0 });
      gsap.set(footer.querySelectorAll(".list-unstyled li"), {
        y: 20,
        opacity: 0,
      });
      gsap.set(footer.querySelector("h3"), { y: 20, opacity: 0 });
      gsap.set(footer.querySelectorAll("h5"), { y: 20, opacity: 0 });

      // Create scroll trigger for footer animations
      gsap
        .timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
        .to(footer.querySelector("h3"), {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          footer.querySelectorAll("h5"),
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          footer.querySelectorAll(".list-unstyled li"),
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          footer.querySelectorAll(".footer-link"),
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }

    // Add hover effect GSAP animations for desktop
    const footerLinks = document.querySelectorAll(".pyro-footer .footer-link");

    footerLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }
});
// index products gsap
// Product Section GSAP Animations
document.addEventListener("DOMContentLoaded", function () {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Animate section title and subtitle
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".product-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })
    .from(".product-section .product-section-title", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power2.out",
    })
    .from(
      ".product-section .product-section-subtitle",
      {
        duration: 0.6,
        y: 20,
        opacity: 0,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .from(
      ".product-section .product-section-divider",
      {
        duration: 0.8,
        scaleX: 0,
        transformOrigin: "left center",
        ease: "power2.out",
      },
      "-=0.3"
    );

  // Animate product cards with stagger effect
  gsap.from(".product-section .product-card", {
    duration: 0.8,
    y: 60,
    opacity: 0,
    scale: 0.9,
    stagger: {
      amount: 0.6,
      from: "start",
    },
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".product-section .row",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate product images on hover
  const productCards = document.querySelectorAll(
    ".product-section .product-card"
  );

  productCards.forEach((card) => {
    const image = card.querySelector(".product-image");
    const overlay = card.querySelector(".product-overlay");
    const button = card.querySelector(".product-btn");

    // Mouse enter animation
    card.addEventListener("mouseenter", function () {
      gsap.to(image, {
        duration: 0.6,
        scale: 1.08,
        ease: "power2.out",
      });

      gsap.to(overlay, {
        duration: 0.4,
        opacity: 1,
        ease: "power2.out",
      });

      gsap.to(button, {
        duration: 0.3,
        y: -2,
        ease: "power2.out",
      });
    });

    // Mouse leave animation
    card.addEventListener("mouseleave", function () {
      gsap.to(image, {
        duration: 0.6,
        scale: 1,
        ease: "power2.out",
      });

      gsap.to(overlay, {
        duration: 0.4,
        opacity: 0,
        ease: "power2.out",
      });

      gsap.to(button, {
        duration: 0.3,
        y: 0,
        ease: "power2.out",
      });
    });
  });

  // Animate view all button
  gsap.from(".product-section .view-all-btn", {
    duration: 0.8,
    y: 30,
    opacity: 0,
    scale: 0.95,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".product-section .view-all-btn",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });

  // Add floating animation to preview icons
  gsap.to(".product-section .product-preview-icon", {
    duration: 2,
    y: -5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    stagger: {
      amount: 0.5,
      repeat: -1,
    },
  });

  // Button click animation
  const productButtons = document.querySelectorAll(
    ".product-section .product-btn, .product-section .view-all-btn"
  );

  productButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple-effect");

      button.appendChild(ripple);

      // Animate ripple
      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 0.6,
        },
        {
          duration: 1,
          scale: 2,
          opacity: 0,
          ease: "power2.out",
          onComplete: function () {
            ripple.remove();
          },
        }
      );

      // Button press animation
      gsap.to(button, {
        duration: 1,
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    });
  });

  // Add dynamic gradient animation to divider
  gsap.to(".product-section .product-section-divider", {
    duration: 3,
    backgroundPosition: "200% center",
    repeat: -1,
    ease: "power2.inOut",
    yoyo: true,
  });

  // Animate product titles on scroll
  gsap.from(".product-section .product-title", {
    duration: 0.6,
    x: -20,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".product-section .product-title",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });

  // Animate product descriptions
  gsap.from(".product-section .product-description", {
    duration: 0.8,
    y: 15,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".product-section .product-description",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
  .product-section .product-btn,
  .product-section .view-all-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    z-index: 10;
  }
`;
document.head.appendChild(style);
// index parallax gsap
document.addEventListener("DOMContentLoaded", function () {
  // Check if parallax section exists
  const parallaxSection = document.querySelector(".parallax-section");
  if (!parallaxSection) return;

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // 1. PARALLAX IMAGE SETUP
  const parallaxImg = parallaxSection.querySelector(".parallax-img");
  if (parallaxImg) {
    new SimpleParallax(parallaxImg, {
      scale: 1.5,
      delay: 0.5,
      transition: "cubic-bezier(0,0,0,1)",
      orientation: "up",
    });
  }

  // 2. SPLIT TEXT ANIMATION (Fixed Version)
  const heading = document.querySelector(".parallax-gradient-text");
  if (heading) {
    console.log("Heading element found:", heading);

    // Make sure the element is visible before splitting
    gsap.set(heading, { visibility: "visible" });

    try {
      // Split the text into lines first
      const splitLines = new SplitText(heading, {
        type: "lines",
        linesClass: "split-line",
      });

      console.log("Lines split successfully:", splitLines.lines);

      // Then split each line into characters
      splitLines.lines.forEach((line, index) => {
        const splitChars = new SplitText(line, {
          type: "chars",
          charsClass: "char-" + index,
        });

        console.log(`Characters for line ${index}:`, splitChars.chars);

        // Initial state for characters
        gsap.set(splitChars.chars, {
          opacity: 0,
          y: -40,
          rotationX: -90,
          display: "inline-block",
        });

        // Create animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            toggleActions: "play none none none",
            markers: false, // Enable for debugging
          },
        });

        // Animate characters
        tl.to(splitChars.chars, {
          duration: 0.8,
          opacity: 1,
          y: 0,
          rotationX: 0,
          ease: "back.out(1.7)",
          stagger: 0.05,
        });
      });
    } catch (error) {
      console.error("SplitText error:", error);
    }
  } else {
    console.warn("Heading element not found");
  }

  // Refresh ScrollTrigger after setup
  ScrollTrigger.refresh();

  // 3. SPARKLE ANIMATION
  const sparkles = parallaxSection.querySelectorAll(".sparkle-animation i");
  if (sparkles.length) {
    // Initial state
    gsap.set(sparkles, { opacity: 0, scale: 0.5 });

    // Entrance animation
    gsap.to(sparkles, {
      duration: 1,
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.1,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: parallaxSection,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // Continuous rotation
    gsap.to(sparkles, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
    });
  }

  // 4. BUTTON ANIMATION
  const glowBtn = parallaxSection.querySelector(".btn-glowing");
  if (glowBtn) {
    // Initial state
    gsap.set(glowBtn, { opacity: 0, y: 20 });

    // Entrance animation
    gsap.to(glowBtn, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: parallaxSection,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // Hover effects
    glowBtn.addEventListener("mouseenter", () => {
      gsap.to(glowBtn, {
        duration: 0.3,
        y: -3,
        boxShadow: "0 5px 20px rgba(220, 53, 69, 0.6)",
        ease: "power2.out",
      });
    });

    glowBtn.addEventListener("mouseleave", () => {
      gsap.to(glowBtn, {
        duration: 0.3,
        y: 0,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        ease: "power2.in",
      });
    });
  }

  // Refresh ScrollTrigger after all animations are set up
  ScrollTrigger.refresh();
});
// index counter section gsap
document.addEventListener("DOMContentLoaded", function () {
  // Check if counter section exists
  const counterSection = document.querySelector(".index-counter");
  if (!counterSection) return;

  // Load Odometer if not already loaded
  if (typeof Odometer === "undefined") {
    console.warn("Odometer not loaded - counters will not animate");
    return;
  }

  // Initialize SplitText for headings
  const counterHeading = document.querySelector(".counter-heading");
  const counterSubtitle = document.querySelector(".counter-subtitle");

  if (counterHeading && typeof SplitText !== "undefined") {
    const splitHeading = new SplitText(counterHeading, {
      type: "lines,words,chars",
    });
    gsap.from(splitHeading.chars, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.02,
      scrollTrigger: {
        trigger: counterSection,
        start: "top 75%",
      },
    });
  }

  if (counterSubtitle && typeof SplitText !== "undefined") {
    const splitSubtitle = new SplitText(counterSubtitle, { type: "lines" });
    gsap.from(splitSubtitle.lines, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.3,
      scrollTrigger: {
        trigger: counterSection,
        start: "top 75%",
      },
    });
  }

  // Initialize counters with GSAP animations
  const counters = document.querySelectorAll(".odometer");
  const odometers = [];

  counters.forEach((counter, index) => {
    // Set initial state
    gsap.set(counter, { opacity: 0, y: 30 });

    // Create ScrollTrigger for each counter
    ScrollTrigger.create({
      trigger: counter,
      start: "top 80%",
      onEnter: () => {
        // Animate counter entry
        gsap.to(counter, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out",
          delay: index * 0.1,
        });

        // Initialize Odometer
        const od = new Odometer({
          el: counter,
          value: 0,
          format: "(,ddd)",
          theme: "minimal",
          duration: 2000,
        });

        // Set target value
        od.update(counter.getAttribute("data-target"));
        odometers.push(od);
      },
      once: true,
    });
  });

  // ===== ADDED PROPER MOTION PATH FLOATING EFFECTS =====
  // ===== MODIFIED MOTION PATH WITH CONTROLLED 45° ROTATION =====
  if (typeof gsap !== "undefined" && typeof MotionPathPlugin !== "undefined") {
    const counterItems = document.querySelectorAll(
      ".index-counter .counter-item"
    );

    counterItems.forEach((item, index) => {
      // Set initial transform origin
      gsap.set(item, { transformOrigin: "50% 50%", rotation: 0 });

      // Create floating parameters
      const floatIntensity = 3 + (index % 3);
      const floatDuration = 4 + index * 0.2;

      // Create motion path
      const path = [
        { x: 0, y: 0 },
        { x: floatIntensity * 0.5, y: -floatIntensity * 0.2 },
        { x: 0, y: -floatIntensity * 0.3 },
        { x: -floatIntensity * 0.5, y: -floatIntensity * 0.2 },
        { x: 0, y: 0 },
      ];

      // Rotation animation (separate from floating)
      const rotationTween = gsap.to(item, {
        rotation: 45, // Target rotation
        duration: floatDuration * 0.8, // Slightly faster than floating
        ease: "sine.inOut",
        yoyo: true, // Makes it rotate back and forth
        repeat: -1, // Infinite loop
        delay: index * 0.2,
      });

      // Floating animation (no rotation)
      const floatTween = gsap.to(item, {
        motionPath: {
          path: path,
          type: "cubic",
        },
        duration: floatDuration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
      });

      // Hover effects
      item.addEventListener("mouseenter", () => {
        rotationTween.pause();
        floatTween.pause();
        gsap.to(item, {
          rotation: 0, // Reset to straight on hover
          scale: 1.03,
          duration: 0.3,
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          onComplete: () => {
            rotationTween.restart();
            floatTween.restart();
          },
        });
      });
    });
  }
});
// index welcome section gsap
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const welcomeSection = document.querySelector(".welcome-section");

  if (!welcomeSection) return;

  const title = welcomeSection.querySelector(".welcome-section-title");
  const subtitle = welcomeSection.querySelector(
    ".welcome-section-subtitle-text"
  );
  const description = welcomeSection.querySelector(
    ".welcome-section-description"
  );
  const badge = welcomeSection.querySelector(".welcome-section-badge");
  const stats = welcomeSection.querySelector(".welcome-section-stats");
  const ctaButtons = welcomeSection.querySelector(
    ".welcome-section-cta-buttons"
  );
  const heroImage = welcomeSection.querySelector(".welcome-section-main-image");
  const particles = welcomeSection.querySelectorAll(
    ".welcome-section-particle"
  );
  const scrollIndicator = welcomeSection.querySelector(
    ".welcome-section-scroll-indicator"
  );
  const heroImageContainer = welcomeSection.querySelector(
    ".welcome-section-hero-image"
  );

  // Heartbeat animation (common for all)
  function setupHeartbeatAnimation() {
    gsap.to(heroImage, {
      scale: 1.05,
      duration: 0.8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
    });

    gsap.to(heroImageContainer, {
      filter: "drop-shadow(0 0 50px rgba(255, 193, 7, 0.6))",
      duration: 0.8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
    });
  }

  // Desktop animations
  function setupDesktopAnimations() {
    const titleSplit = new SplitText(title, {
      type: "lines,words,chars",
      linesClass: "welcome-section-title-line",
    });

    const subtitleSplit = new SplitText(subtitle, {
      type: "lines,words,chars",
      linesClass: "welcome-section-subtitle-line",
    });

    const descSplit = new SplitText(description, {
      type: "lines,words",
      linesClass: "welcome-section-desc-line",
    });

    gsap.set(titleSplit.chars, {
      opacity: 0,
      y: 30,
      rotationX: 90,
      transformOrigin: "50% 50% -50",
    });

    gsap.set(subtitleSplit.chars, {
      opacity: 0,
      y: 20,
      scale: 0.8,
    });

    gsap.set(descSplit.lines, {
      opacity: 0,
      y: 30,
    });

    gsap.to(titleSplit.chars, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      rotationX: 0,
      ease: "back.out(1.7)",
      stagger: 0.03,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.to(subtitleSplit.chars, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "power3.out",
      stagger: 0.02,
      scrollTrigger: {
        trigger: subtitle,
        start: "top 80%",
        toggleActions: "play none none none",
        delay: 0.2,
      },
    });

    gsap.to(descSplit.lines, {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: description,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  // Element animations
  function setupScrollTriggeredElementAnimations() {
    gsap.from(badge, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      scale: 0.9,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: badge,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(welcomeSection.querySelectorAll(".welcome-section-stat-item"), {
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: stats,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(particles, {
      duration: 1.5,
      opacity: 0,
      scale: 0.5,
      y: 40,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: welcomeSection,
        start: "top 60%",
        toggleActions: "play none none none",
      },
    });
  }

  // Motion path animation
  function setupImageMotionPath() {
    const pathPoints = [
      { x: 0, y: -50 },
      { x: 20, y: -30 },
      { x: -10, y: 40 },
      { x: 15, y: 20 },
      { x: 0, y: 30 },
      { x: -20, y: 10 },
      { x: 0, y: 0 },
    ];

    gsap.to(heroImage, {
      motionPath: {
        path: pathPoints,
        autoRotate: false,
        curviness: 1.5,
      },
      scrollTrigger: {
        trigger: welcomeSection,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
      ease: "none",
    });
  }

  // Mobile fallback animations
  function setupMobileAnimations() {
    gsap.from(title, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(subtitle, {
      duration: 0.6,
      opacity: 0,
      y: 20,
      ease: "power3.out",
      scrollTrigger: {
        trigger: subtitle,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(description, {
      duration: 0.8,
      opacity: 0,
      y: 20,
      ease: "power3.out",
      scrollTrigger: {
        trigger: description,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  // Main responsive logic using ScrollTrigger.matchMedia
  ScrollTrigger.matchMedia({
    // Desktop (min-width: 768px)
    "(min-width: 768px)": function () {
      setupDesktopAnimations();
      setupScrollTriggeredElementAnimations();
      setupImageMotionPath();
    },

    // Mobile (max-width: 767.98px)
    "(max-width: 767.98px)": function () {
      setupMobileAnimations();
      setupScrollTriggeredElementAnimations(); // Still needed on mobile
    },
  });

  // Run global animation
  setupHeartbeatAnimation();
});

// event section gsap
document.addEventListener("DOMContentLoaded", function () {
  const packagesSection = document.querySelector(".event-packages");
  if (!packagesSection) return;

  gsap.registerPlugin(ScrollTrigger);

  // Set initial state for all animatable elements
  gsap.set(".package-card, .comparison-table", {
    y: -1000, // Start above the viewport
    opacity: 0,
  });

  // Free fall animation for package cards
  gsap.to(".package-card", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: "bounce.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: packagesSection,
      start: "top 90%",
      end: "top 60%",
      scrub: 1,
      markers: false, // Set to true for debugging
      onEnter: () => {
        // Reset position when scrolling back up
        gsap.fromTo(
          ".package-card",
          { y: -1000, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "bounce.out", stagger: 0.15 }
        );
      },
      onLeaveBack: () => {
        // Return to original position when scrolling past
        gsap.to(".package-card", {
          y: -1000,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
      },
    },
  });

  // Free fall animation for comparison table
  gsap.to(".comparison-table", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "bounce.out",
    delay: 0.3,
    scrollTrigger: {
      trigger: ".comparison-table",
      start: "top 90%",
      end: "top 60%",
      scrub: 1,
      markers: false,
      onEnter: () => {
        gsap.fromTo(
          ".comparison-table",
          { y: -1000, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "bounce.out" }
        );
      },
      onLeaveBack: () => {
        gsap.to(".comparison-table", {
          y: -1000,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
      },
    },
  });

  // Button hover effects (unchanged)
  document.querySelectorAll(".btn-customize").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        y: -2,
        duration: 0.2,
        ease: "power2.out",
      });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });
});

// index why choose us section gsap
document.addEventListener("DOMContentLoaded", function () {
  // Cache the section first
  const section = document.querySelector(".index-why-choose");

  // Exit early if the section is not present (avoids error on other pages)
  if (!section) return;

  // Register GSAP plugins
  gsap.registerPlugin(SplitText, ScrollTrigger, MotionPathPlugin);

  // Cache selectors inside section
  const heading = section.querySelector(".index-why-choose-title");
  const subtitle = section.querySelector(".index-why-choose-subtitle");
  const cards = gsap.utils.toArray(".index-why-choose-card");
  const cta = section.querySelector(".index-why-choose-cta");
  const decorations = gsap.utils.toArray(".rotate-slowly");

  // Split text animations for headings
  const splitHeading = new SplitText(heading, {
    type: "chars,words,lines",
    linesClass: "split-line",
  });

  const splitSubtitle = new SplitText(subtitle, {
    type: "chars",
    charsClass: "split-char",
  });

  // Heading animation timeline
  const headingTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  headingTl
    .from(splitSubtitle.chars, {
      y: 20,
      opacity: 0,
      stagger: 0.05,
      ease: "back.out(1.7)",
      duration: 0.5,
    })
    .from(
      splitHeading.chars,
      {
        y: 40,
        opacity: 0,
        stagger: 0.03,
        ease: "power3.out",
        duration: 0.8,
      },
      "-=0.3"
    )
    .from(
      ".index-why-choose-divider",
      {
        scaleX: 0,
        transformOrigin: "left center",
        ease: "power3.inOut",
        duration: 1.2,
      },
      "-=0.5"
    );

  // Card animations with motion paths
  cards.forEach((card, i) => {
    const icon = card.querySelector(".index-why-choose-card-icon");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.from(card, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(
        icon,
        {
          y: -30,
          rotation: -30,
          opacity: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.4"
      )
      .from(
        card.querySelector("h3"),
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.3"
      )
      .from(
        card.querySelector("p"),
        {
          y: 10,
          opacity: 0,
          duration: 0.3,
        },
        "-=0.2"
      );

    // Hover animation
    card.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        y: -5,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(card, {
        y: -10,
        boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        duration: 0.4,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.to(card, {
        y: 0,
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        duration: 0.6,
      });
    });
  });

  // CTA section animation
  const ctaTl = gsap.timeline({
    scrollTrigger: {
      trigger: cta,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  ctaTl
    .from(cta, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })
    .from(
      cta.querySelector("h3"),
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
      },
      "-=0.6"
    )
    .from(
      cta.querySelector("p"),
      {
        y: 15,
        opacity: 0,
        duration: 0.4,
      },
      "-=0.4"
    )
    .from(
      cta.querySelector("a"),
      {
        y: 10,
        opacity: 0,
        duration: 0.3,
      },
      "-=0.3"
    );

  // Decoration animations (rotating and floating)
  decorations.forEach((el, i) => {
    gsap.to(el, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center",
    });

    gsap.to(el, {
      y: 20,
      duration: 3 + i,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  });

  // Background sparkle animation
  const sparkles = [];
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    section.appendChild(sparkle);
    sparkles.push(sparkle);

    gsap.set(sparkle, {
      x: gsap.utils.random(0, window.innerWidth),
      y: gsap.utils.random(0, section.offsetHeight),
      opacity: 0,
      scale: gsap.utils.random(0.3, 0.8),
    });

    animateSparkle(sparkle);
  }

  function animateSparkle(el) {
    const tl = gsap.timeline({
      delay: gsap.utils.random(0, 5),
    });

    tl.to(el, {
      opacity: gsap.utils.random(0.4, 0.8),
      duration: 0.5,
      ease: "power1.in",
    })
      .to(el, {
        x: "+=50",
        y: "+=30",
        rotation: gsap.utils.random(-180, 180),
        duration: gsap.utils.random(3, 6),
        ease: "none",
      })
      .to(el, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(el, {
            x: gsap.utils.random(0, window.innerWidth),
            y: gsap.utils.random(0, section.offsetHeight),
          });
          animateSparkle(el);
        },
      });
  }
});

// about first gsap
// GSAP Animations for About Us Section
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText);

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Floating sparks animation
  gsap.to(".pyro-heritage-spark", {
    y: -30,
    x: 15,
    rotation: 360,
    scale: 1.2,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    stagger: {
      each: 0.5,
      from: "random",
    },
  });

  // Badge entrance animation
  gsap.fromTo(
    ".pyro-heritage-badge",
    {
      scale: 0,
      rotation: -180,
      opacity: 0,
    },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      delay: 0.3,
    }
  );

  // Main title SplitText animation
  const titleElement = document.querySelector(".pyro-heritage-title");
  if (titleElement) {
    // Split by lines (already structured in your HTML)
    const titleLines = titleElement.querySelectorAll(".title-line");

    titleLines.forEach((line, index) => {
      // Split each line into characters
      const splitLine = new SplitText(line, {
        type: "chars,words",
        charsClass: "char",
        wordsClass: "word",
      });

      gsap.from(splitLine.chars, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.03,
        delay: 0.8 + index * 0.2,
      });
    });
  }

  // Subtitle animation
  const subtitleElement = document.querySelector(".pyro-heritage-subtitle");
  if (subtitleElement) {
    const splitSubtitle = new SplitText(subtitleElement, {
      type: "lines,words",
      linesClass: "line",
      wordsClass: "word",
    });

    gsap.from(splitSubtitle.words, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.05,
      delay: 1.8,
    });
  }

  // Story lead text animation
  ScrollTrigger.create({
    trigger: ".pyro-story-lead",
    start: "top 80%",
    onEnter: () => {
      const storyElement = document.querySelector(".pyro-story-lead");
      if (storyElement) {
        const splitStory = new SplitText(storyElement, {
          type: "words",
          wordsClass: "word",
        });

        gsap.from(splitStory.words, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.03,
        });
      }
    },
  });

  // Timeline items animation
  const timelineItems = document.querySelectorAll(".pyro-timeline-item");

  timelineItems.forEach((item, index) => {
    // Year animation
    const yearElement = item.querySelector(".pyro-timeline-year");
    if (yearElement) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          const splitYear = new SplitText(yearElement, {
            type: "chars",
            charsClass: "char",
          });

          gsap.from(splitYear.chars, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.05,
          });
        },
      });
    }

    // Title animation
    const titleElement = item.querySelector(".pyro-timeline-title");
    if (titleElement) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          const splitTitle = new SplitText(titleElement, {
            type: "words",
            wordsClass: "word",
          });

          gsap.from(splitTitle.words, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.04,
            delay: 0.2,
          });
        },
      });
    }

    // Description animation
    const descElement = item.querySelector(".pyro-timeline-desc");
    if (descElement) {
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          const splitDesc = new SplitText(descElement, {
            type: "words",
            wordsClass: "word",
          });

          gsap.from(splitDesc.words, {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.02,
            delay: 0.4,
          });
        },
      });
    }

    // Timeline item slide in
    gsap.fromTo(
      item,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Timeline line animation
  gsap.fromTo(
    ".pyro-timeline-line",
    {
      scaleY: 0,
      transformOrigin: "top",
    },
    {
      scaleY: 1,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".pyro-heritage-timeline",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Image animations with MotionPath
  const mainImage = document.querySelector(".pyro-heritage-main-image");
  if (mainImage) {
    // Floating motion for main image
    gsap.to(mainImage, {
      motionPath: {
        path: "M0,0 Q10,-5 20,0 T40,0",
        autoRotate: false,
      },
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Scale animation on scroll
    gsap.fromTo(
      mainImage,
      {
        scale: 0.8,
        opacity: 0,
        rotationY: -15,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mainImage,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Floating image animation
  const floatingImage = document.querySelector(".pyro-heritage-floating-image");
  if (floatingImage) {
    // Circular motion path
    gsap.to(floatingImage, {
      motionPath: {
        path: "M0,0 Q-15,-10 -30,0 T-60,0",
        autoRotate: false,
      },
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Entrance animation
    gsap.fromTo(
      floatingImage,
      {
        scale: 0.5,
        opacity: 0,
        rotation: -45,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: floatingImage,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        delay: 0.3,
      }
    );
  }

  // Values title animation
  const valuesTitleElement = document.querySelector(".pyro-values-title");
  if (valuesTitleElement) {
    ScrollTrigger.create({
      trigger: valuesTitleElement,
      start: "top 80%",
      onEnter: () => {
        const splitTitle = new SplitText(valuesTitleElement, {
          type: "chars",
          charsClass: "char",
        });

        gsap.from(splitTitle.chars, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.03,
        });
      },
    });
  }

  // Value cards animation
  const valueCards = document.querySelectorAll(".pyro-value-card");

  valueCards.forEach((card, index) => {
    // Card entrance animation
    gsap.fromTo(
      card,
      {
        y: 80,
        opacity: 0,
        rotationX: -45,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      }
    );

    // Icon floating animation
    const icon = card.querySelector(".pyro-value-icon");
    if (icon) {
      gsap.to(icon, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.2,
      });
    }

    // Title and description animation
    const title = card.querySelector(".pyro-value-title");
    const desc = card.querySelector(".pyro-value-desc");

    if (title) {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          const splitTitle = new SplitText(title, {
            type: "words",
            wordsClass: "word",
          });

          gsap.from(splitTitle.words, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.03,
            delay: 0.3 + index * 0.1,
          });
        },
      });
    }

    if (desc) {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          const splitDesc = new SplitText(desc, {
            type: "words",
            wordsClass: "word",
          });

          gsap.from(splitDesc.words, {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.02,
            delay: 0.5 + index * 0.1,
          });
        },
      });
    }
  });

  // The rest of your animations (parallax, hover interactions, etc.) remain the same
  // ...

  console.log(
    "Pyro Masters About animations with GSAP SplitText initialized successfully!"
  );
});
// second about section gsap
// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Animation for the parallax section
document.addEventListener("DOMContentLoaded", function () {
  // Split text animations
  const parallaxHeading = document.querySelector(".about-parallax-heading");
  if (parallaxHeading) {
    const splitHeading = new SplitText(parallaxHeading, {
      type: "words,chars",
      wordsClass: "word",
      charsClass: "char",
    });

    gsap.from(splitHeading.chars, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.03,
      scrollTrigger: {
        trigger: parallaxHeading,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  const parallaxText = document.querySelector(".about-parallax-text");
  if (parallaxText) {
    const splitText = new SplitText(parallaxText, {
      type: "lines,words",
      linesClass: "line",
      wordsClass: "word",
    });

    gsap.from(splitText.words, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.02,
      scrollTrigger: {
        trigger: parallaxText,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  // Button animation
  const parallaxButton = document.querySelector(
    ".about-parallax-button-wrapper"
  );
  if (parallaxButton) {
    gsap.from(parallaxButton, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: parallaxButton,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  // Interactive sparks on hover
  const parallaxSection = document.querySelector(".about-parallax");
  if (parallaxSection) {
    parallaxSection.addEventListener("mousemove", (e) => {
      createInteractiveSpark(e.clientX, e.clientY);
    });
  }

  function createInteractiveSpark(x, y) {
    const spark = document.createElement("div");
    spark.className = "interactive-spark";
    spark.style.position = "fixed";
    spark.style.left = x + "px";
    spark.style.top = y + "px";
    spark.style.width = "4px";
    spark.style.height = "4px";
    spark.style.background = "#f7ad45";
    spark.style.borderRadius = "50%";
    spark.style.boxShadow = "0 0 15px #f7ad45";
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "9999";

    document.body.appendChild(spark);

    gsap.to(spark, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        document.body.removeChild(spark);
      },
    });
  }

  // Parallax effect for the section
  gsap.to(".about-parallax::before", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".about-parallax",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
