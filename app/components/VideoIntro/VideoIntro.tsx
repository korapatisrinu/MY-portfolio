"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CinematicLayer from "../CinematicLayer/CinematicLayer";
import styles from "./VideoIntro.module.css";

const INTRO_VIDEO = "/videos/intro.mp4";
const INTRO_FINAL_IMAGE = "/images/intro-final.jpeg";
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Profile", href: "#profile" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#craft" },
  { label: "Education", href: "#education" }
];

export default function VideoIntro() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const hintTimeoutRef = useRef<number | null>(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const mainVideo = mainVideoRef.current;

    if (!hero || !content || !mainVideo) return;

    const context = gsap.context(() => {
      gsap.set(hero, { opacity: 1 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(mainVideo, {
          opacity: 0,
          scale: 1.06,
          y: 28,
          filter: "blur(18px)",
          duration: 2.1
        })
        .from(
          content.querySelectorAll("[data-hero-reveal]"),
          {
            opacity: 0,
            y: 44,
            duration: 1.25,
            stagger: 0.13
          },
          "-=1.45"
        )
        .from(
          "[data-hero-control]",
          {
            opacity: 0,
            y: 18,
            duration: 0.9,
            stagger: 0.08
          },
          "-=0.9"
        );
    }, hero);

    hintTimeoutRef.current = window.setTimeout(() => {
      setShowHint(false);
    }, 5200);

    return () => {
      context.revert();

      if (hintTimeoutRef.current) {
        window.clearTimeout(hintTimeoutRef.current);
      }
    };
  }, []);

  const syncPlaying = useCallback(async (shouldPlay: boolean) => {
    const videos = [mainVideoRef.current, ambientVideoRef.current].filter(Boolean);

    if (shouldPlay) {
      if (videoEnded && mainVideoRef.current) {
        mainVideoRef.current.currentTime = 0;
        setVideoEnded(false);
      }

      await Promise.all(
        videos.map((video) => video?.play().catch(() => undefined))
      );
    } else {
      videos.forEach((video) => video?.pause());
    }

    setPlaying(shouldPlay);
  }, [videoEnded]);

  const togglePlay = () => {
    void syncPlaying(videoEnded || !playing);
  };

  const toggleMute = () => {
    const nextMuted = !muted;

    if (mainVideoRef.current) {
      mainVideoRef.current.muted = nextMuted;
    }

    setMuted(nextMuted);
    setShowHint(false);
  };

  const scrollNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  const handleVideoEnded = () => {
    ambientVideoRef.current?.pause();
    setPlaying(false);
    setVideoEnded(true);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className={styles.hero}
      aria-label="Portfolio introduction"
    >
      <nav className={styles.siteNav} aria-label="Portfolio sections" data-hero-control>
        <a className={styles.navMark} href="#home" aria-label="Go to home">
          KS
        </a>

        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className={styles.ambientWrap} aria-hidden="true">
        <video
          ref={ambientVideoRef}
          className={styles.ambientVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={INTRO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className={styles.lightWash} aria-hidden="true" />
      <div className={styles.readabilityOverlay} aria-hidden="true" />

      <div className={styles.particleLayer}>
        <CinematicLayer />
      </div>

      <div className={styles.videoStage} data-hero-reveal>
        <div className={styles.videoHalo} aria-hidden="true" />
        <video
          ref={mainVideoRef}
          className={`${styles.mainVideo} ${videoEnded ? styles.videoHidden : ""}`}
          autoPlay
          muted={muted}
          onEnded={handleVideoEnded}
          playsInline
          preload="metadata"
        >
          <source src={INTRO_VIDEO} type="video/mp4" />
        </video>

        <Image
          className={`${styles.finalImage} ${videoEnded ? styles.finalImageVisible : ""}`}
          src={INTRO_FINAL_IMAGE}
          alt="Korapati Srinivasulu cinematic portrait"
          fill
          priority
          sizes="(max-width: 980px) 82vw, 28vw"
        />
      </div>

      <div ref={contentRef} className={styles.content}>
        <span className={styles.tagline} data-hero-reveal>
          AI & Data Science Engineer
        </span>

        <h1 className={styles.title} data-hero-reveal>
          <span>Korapati</span>
          <span>Srinivasulu</span>
        </h1>

        <p className={styles.subtitle} data-hero-reveal>
          I build intelligent web products with Python, Flask, machine learning,
          and clean frontend systems, turning problem-solving practice into
          useful digital experiences.
        </p>

        <div className={styles.actions} data-hero-reveal>
          <a href="#projects">View projects</a>
          <a href="/resume/korapati-srinivasulu-resume.pdf">Resume</a>
        </div>
      </div>

      {showHint && muted && (
        <button
          className={styles.soundHint}
          type="button"
          onClick={toggleMute}
          data-hero-control
        >
          <span className={styles.soundDot} aria-hidden="true" />
          Tap for sound
        </button>
      )}

      <div className={styles.controls} data-hero-control>
        <button
          className={styles.controlButton}
          type="button"
          onClick={togglePlay}
          aria-label={
            videoEnded ? "Replay intro video" : playing ? "Pause intro video" : "Play intro video"
          }
        >
          <span aria-hidden="true">{videoEnded ? "Replay" : playing ? "Pause" : "Play"}</span>
        </button>

        <button
          className={styles.controlButton}
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute intro video" : "Mute intro video"}
        >
          <span aria-hidden="true">{muted ? "Sound" : "Mute"}</span>
        </button>
      </div>

      <button
        className={styles.scrollIndicator}
        type="button"
        onClick={scrollNext}
        aria-label="Scroll to next section"
        data-hero-control
      >
        <span />
      </button>
    </section>
  );
}
