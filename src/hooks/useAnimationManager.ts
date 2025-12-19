import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useAnimationManager = () => {
  function initWordReveals() {
    document.querySelectorAll(".cinematic-word").forEach((word, index) => {
      gsap.set(word, { y: 100, opacity: 0 });

      ScrollTrigger.create({
        trigger: word.closest(".section"),
        start: "top 80%",
        onEnter: () => {
          gsap.to(word, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
          });
        },
      });
    });
  }

  function initSectionEntrances() {
    document.querySelectorAll(".section").forEach((section) => {
      const content = section.querySelector(".section-content");
      if (!content) return;

      gsap.set(content, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          });
        },
      });
    });
  }

  function initProductReveal() {
    const productCanvas = document.getElementById("product-canvas-container");
    if (!productCanvas) return;

    ScrollTrigger.create({
      trigger: "#sprite",
      start: "top 60%",
      onEnter: () => {
        gsap.to(productCanvas, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
        });
      },
    });
  }

  function initAudioCardAnimations() {
    document.querySelectorAll(".audio-card").forEach((card) => {
      gsap.set(card, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: card,
        start: "top 90%",
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
      });
    });
  }

  function initQuizAnimations() {
    document.querySelectorAll(".quiz-option").forEach((option) => {
      const onEnter = () =>
        gsap.to(option, { scale: 1.05, duration: 0.3 });
      const onLeave = () =>
        gsap.to(option, { scale: 1, duration: 0.3 });

      option.addEventListener("mouseenter", onEnter);
      option.addEventListener("mouseleave", onLeave);
    });
  }

  function initScrollProgress() {
    gsap.to(".scroll-progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  function scrollToSection(sectionId: string, offsetY = 100) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: section, offsetY },
      ease: "power2.inOut",
    });
  }

  function initParallaxEffects() {
    gsap.to(".bg-layer", {
      y: () => ScrollTrigger.maxScroll(window) * 0.3,
      ease: "none",
      scrollTrigger: { scrub: true },
    });
  }

  // ✅ EFFECT COMES LAST
  useEffect(() => {
    initWordReveals();
    initSectionEntrances();
    initProductReveal();
    initAudioCardAnimations();
    initQuizAnimations();
    initScrollProgress();
    initParallaxEffects();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return { scrollToSection, initScrollProgress };
};
