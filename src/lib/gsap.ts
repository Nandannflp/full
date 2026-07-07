/**
 * GSAP Plugin Registration
 *
 * Import this file once at the top level of your app (e.g. in layout.tsx or a
 * client-side entry component) to ensure all plugins are registered globally
 * before any animation code runs.
 *
 * All GSAP plugins are free as of 2024. https://gsap.com/pricing/
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// ── EasePack ──────────────────────────────────────────────────────────────────
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

// ── Custom Eases (CustomBounce & CustomWiggle depend on CustomEase) ────────────
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";

// ── Plugins ───────────────────────────────────────────────────────────────────
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother"; // depends on ScrollTrigger
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

// ── Register everything with GSAP ─────────────────────────────────────────────
gsap.registerPlugin(
  useGSAP,

  // Eases
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle,

  // Plugins
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin
);

// Re-export gsap and commonly used plugins for convenience
export {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  Draggable,
  Observer,
  MotionPathPlugin,
  MorphSVGPlugin,
  DrawSVGPlugin,
  TextPlugin,
  ScrambleTextPlugin,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  GSDevTools,
};
