/**
 * GSAP Plugin Registration
 *
 * Import this file once at the top level of your app (e.g. in layout.tsx or a
 * client-side entry component) to ensure all plugins are registered globally
 * before any animation code runs.
 *
 * ⚠️  Club / Premium plugins (marked below) require a GSAP membership.
 *     https://gsap.com/pricing/
 *     Without a valid license, these will either throw or silently no-op.
 *
 * Free plugins bundled with gsap:
 *   CustomEase, Draggable, EasePack (RoughEase, ExpoScaleEase, SlowMo),
 *   EaselPlugin, Flip, MotionPathPlugin, Observer, PixiPlugin,
 *   ScrollToPlugin, TextPlugin
 *
 * Club / Premium plugins (require membership):
 *   CustomBounce, CustomWiggle, DrawSVGPlugin, GSDevTools, InertiaPlugin,
 *   MotionPathHelper, MorphSVGPlugin, Physics2DPlugin, PhysicsPropsPlugin,
 *   ScrambleTextPlugin, ScrollSmoother, SplitText
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// ── EasePack (free) ───────────────────────────────────────────────────────────
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

// ── Free plugins ──────────────────────────────────────────────────────────────
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Observer } from "gsap/Observer";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// ── Club / Premium plugins ────────────────────────────────────────────────────
// Requires CustomEase to be registered first
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
// Requires ScrollTrigger to be registered first
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

// ── Register everything with GSAP ─────────────────────────────────────────────
gsap.registerPlugin(
  useGSAP,

  // Eases
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce, // depends on CustomEase
  CustomWiggle, // depends on CustomEase

  // Free plugins
  Draggable,
  EaselPlugin,
  Flip,
  MotionPathPlugin,
  Observer,
  PixiPlugin,
  ScrollTrigger,
  ScrollToPlugin,
  TextPlugin,

  // Club plugins
  DrawSVGPlugin,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MorphSVGPlugin,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  ScrambleTextPlugin,
  ScrollSmoother, // depends on ScrollTrigger
  SplitText
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
