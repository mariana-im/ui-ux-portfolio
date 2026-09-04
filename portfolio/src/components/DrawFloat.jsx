import { useEffect, useRef, useState } from "react";

/**
 * DrawFloat
 * A canvas the user can draw on with their mouse/finger. Finished strokes
 * detach and drift/bob around gently. On top of that, an invisible
 * "visitor" periodically sketches a lopsided, single-line heart or star —
 * like a quick hand doodle, not a geometric shape — which then joins the
 * floating pool too.
 *
 * DrawFloat's own root is `relative` (needed for its internal canvas/hint).
 * To use as a full-bleed background layer, wrap it rather than passing
 * `absolute` into className directly:
 *
 *   <div className="relative h-screen overflow-hidden">
 *     <div className="absolute inset-0 z-0">
 *       <DrawFloat className="h-full w-full" />
 *     </div>
 *     <div className="pointer-events-none relative z-10">Your Name</div>
 *   </div>
 */
export default function DrawFloat({ className = "" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const currentStroke = useRef([]);
  const isDrawing = useRef(false);
  const floatingStrokes = useRef([]);

  const simStroke = useRef(null);
  const simTimeoutRef = useRef(null);

  const [hasDrawn, setHasDrawn] = useState(false);
  const rafRef = useRef(null);

  const MAX_STROKES = 20;
  const STROKE_COLOR = "#111111";
  const LINE_WIDTH = 2.2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resize() {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // ---------- manual drawing ----------
    function getPoint(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function pointerDown(e) {
      isDrawing.current = true;
      currentStroke.current = [getPoint(e)];
      setHasDrawn(true);
    }
    function pointerMove(e) {
      if (!isDrawing.current) return;
      currentStroke.current.push(getPoint(e));
    }
    function finalizeStroke(points) {
      if (points.length < 2) return;
      const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
      const cy = points.reduce((s, p) => s + p.y, 0) / points.length;
      const localPts = points.map((p) => ({ x: p.x - cx, y: p.y - cy }));
      floatingStrokes.current.push({
        points: localPts,
        baseX: cx,
        baseY: cy,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        ampX: 12 + Math.random() * 18,
        ampY: 12 + Math.random() * 18,
        freqX: 0.15 + Math.random() * 0.15,
        freqY: 0.15 + Math.random() * 0.15,
        angle: 0,
        angleSpeed: (Math.random() - 0.5) * 0.15,
        born: performance.now(),
      });
      if (floatingStrokes.current.length > MAX_STROKES) {
        floatingStrokes.current.shift();
      }
    }
    function pointerUp() {
      if (!isDrawing.current) return;
      isDrawing.current = false;
      finalizeStroke(currentStroke.current);
      currentStroke.current = [];
    }

    canvas.addEventListener("mousedown", pointerDown);
    canvas.addEventListener("mousemove", pointerMove);
    window.addEventListener("mouseup", pointerUp);
    canvas.addEventListener("touchstart", pointerDown, { passive: true });
    canvas.addEventListener("touchmove", pointerMove, { passive: true });
    canvas.addEventListener("touchend", pointerUp);

    // ---------- lopsided, single-line doodle hearts + stars ----------
    // Instead of a perfectly symmetric formula, each lobe/point gets its
    // own randomized size and angle — like a quick freehand doodle, not
    // a geometric shape. Rendered with quadratic smoothing so the line
    // is a fluid pen stroke rather than a jagged polyline.

    function heartDoodle(cx, cy, scale, rotation) {
      // asymmetric two-lobe heart: left/right humps independently sized,
      // bottom point offset sideways, top dip uneven
      const leftW = scale * (9 + Math.random() * 3);
      const rightW = scale * (9 + Math.random() * 3);
      const lobeH = scale * (7 + Math.random() * 2);
      const dipDepth = scale * (2 + Math.random() * 2);
      const bottomY = scale * (16 + Math.random() * 3);
      const bottomXOffset = scale * (Math.random() - 0.5) * 4;

      // key anchor points, hand-drawn order: start at top dip, go around
      // left lobe, down to bottom point, up right lobe, back near start
      const raw = [
        { x: 0, y: -dipDepth }, // top-center dip
        { x: -leftW * 0.4, y: -lobeH * 1.3 }, // left hump peak
        { x: -leftW, y: -lobeH * 0.4 }, // left outer widest
        { x: -leftW * 0.75, y: lobeH * 0.6 }, // left curve down
        { x: bottomXOffset, y: bottomY }, // bottom point
        { x: rightW * 0.8, y: lobeH * 0.55 }, // right curve up
        { x: rightW, y: -lobeH * 0.35 }, // right outer widest
        { x: rightW * 0.35, y: -lobeH * 1.25 }, // right hump peak
        { x: rightW * 0.05, y: -dipDepth * 0.9 }, // back near top dip (slight gap, not perfectly closed)
      ];

      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      return raw.map((p) => ({
        x: cx + p.x * cos - p.y * sin + (Math.random() - 0.5) * scale * 0.6,
        y: cy + p.x * sin + p.y * cos + (Math.random() - 0.5) * scale * 0.6,
      }));
    }

    function starDoodle(cx, cy, baseOuter, baseInner, rotation) {
      const spikes = 5;
      const pts = [];
      for (let i = 0; i < spikes; i++) {
        const outerAngle =
          rotation +
          (i / spikes) * Math.PI * 2 +
          (Math.random() - 0.5) * 0.35;
        const outerR = baseOuter * (0.65 + Math.random() * 0.6);
        pts.push({
          x: cx + Math.cos(outerAngle) * outerR,
          y: cy + Math.sin(outerAngle) * outerR,
        });

        const innerAngle =
          rotation +
          ((i + 0.5) / spikes) * Math.PI * 2 +
          (Math.random() - 0.5) * 0.35;
        const innerR = baseInner * (0.6 + Math.random() * 0.7);
        pts.push({
          x: cx + Math.cos(innerAngle) * innerR,
          y: cy + Math.sin(innerAngle) * innerR,
        });
      }
      // close the loop: return to the starting point so the stroke connects
      pts.push({ x: pts[0].x, y: pts[0].y });

      // small per-point jitter for hand tremor, not a smooth wobble
      return pts.map((p) => ({
        x: p.x + (Math.random() - 0.5) * 2,
        y: p.y + (Math.random() - 0.5) * 2,
      }));
    }

    function makeDoodleShape(cx, cy, isHeart) {
      const rotation = (Math.random() - 0.5) * 0.4;
      return isHeart
        ? heartDoodle(cx, cy, 3.2 + Math.random() * 1.2, rotation)
        : starDoodle(
            cx,
            cy,
            24 + Math.random() * 10,
            9 + Math.random() * 4,
            rotation
          );
    }

    function easeInOutQuad(x) {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    // A person's pen doesn't move at constant speed: it glides fast on
    // straight stretches and slows/pauses at sharp turns (a star's tip,
    // a heart's peak). We model that by giving each segment a "cost" —
    // its pixel length, plus extra cost proportional to how sharp the
    // turn is at its far end — and reveal the stroke at a constant rate
    // through cost-space rather than through point-index-space.
    const PAUSE_WEIGHT = 22;

    function computeSegmentCosts(points) {
      const segs = [];
      for (let i = 0; i < points.length - 1; i++) {
        const dx = points[i + 1].x - points[i].x;
        const dy = points[i + 1].y - points[i].y;
        const moveCost = Math.hypot(dx, dy);
        let pauseCost = 0;
        if (i + 2 < points.length) {
          const dx2 = points[i + 2].x - points[i + 1].x;
          const dy2 = points[i + 2].y - points[i + 1].y;
          const a1 = Math.atan2(dy, dx);
          const a2 = Math.atan2(dy2, dx2);
          let diff = Math.abs(a2 - a1);
          if (diff > Math.PI) diff = 2 * Math.PI - diff;
          pauseCost = diff * PAUSE_WEIGHT;
        }
        segs.push({ moveCost, pauseCost, total: moveCost + pauseCost });
      }
      return segs;
    }

    function pointsAtCost(points, segs, targetCost) {
      let acc = 0;
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        if (acc + seg.total >= targetCost || i === segs.length - 1) {
          const local = targetCost - acc;
          if (local <= seg.moveCost) {
            const frac = seg.moveCost > 0 ? Math.max(0, local) / seg.moveCost : 1;
            const x = points[i].x + (points[i + 1].x - points[i].x) * frac;
            const y = points[i].y + (points[i + 1].y - points[i].y) * frac;
            // tiny tremor on the live pen tip only
            return points
              .slice(0, i + 1)
              .concat([{ x: x + (Math.random() - 0.5) * 0.6, y: y + (Math.random() - 0.5) * 0.6 }]);
          }
          return points.slice(0, i + 2);
        }
        acc += seg.total;
      }
      return points.slice();
    }

    function scheduleNextAutoDraw() {
      const delay = 2800 + Math.random() * 3200;
      simTimeoutRef.current = setTimeout(startAutoDraw, delay);
    }

    // first drawing appears sooner so the page doesn't feel empty on load
    const firstDelay = 400 + Math.random() * 400;
    simTimeoutRef.current = setTimeout(startAutoDraw, firstDelay);

    function startAutoDraw() {
      const rect = container.getBoundingClientRect();
      if (rect.width < 40 || rect.height < 40) {
        scheduleNextAutoDraw();
        return;
      }
      const margin = 80;
      const cx = margin + Math.random() * Math.max(rect.width - margin * 2, 1);
      const cy = margin + Math.random() * Math.max(rect.height - margin * 2, 1);
      const isHeart = Math.random() < 0.5;
      const points = makeDoodleShape(cx, cy, isHeart);

      if (prefersReducedMotion) {
        finalizeStroke(points);
        scheduleNextAutoDraw();
        return;
      }

      const segs = computeSegmentCosts(points);
      const total = segs.reduce((s, seg) => s + seg.total, 0);

      simStroke.current = {
        points,
        segs,
        total,
        start: performance.now(),
        // ms per unit cost, with a little natural variance in "handwriting speed"
        duration: total * (7 + Math.random() * 3),
      };
    }

    // ---------- smooth rendering (quadratic curve through midpoints) ----------
    function strokeSmoothPath(points, count) {
      const n = Math.min(count, points.length);
      if (n < 2) return;
      if (n === 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.stroke();
        return;
      }
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      let i;
      for (i = 1; i < n - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      // last segment
      ctx.lineTo(points[n - 1].x, points[n - 1].y);
      ctx.stroke();
    }

    function frame(t) {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = LINE_WIDTH;
      ctx.strokeStyle = STROKE_COLOR;
      ctx.globalAlpha = 1;

      // floating strokes
      for (const s of floatingStrokes.current) {
        const time = (t - s.born) / 1000;
        let x = s.baseX;
        let y = s.baseY;
        if (!prefersReducedMotion) {
          x += Math.sin(time * s.freqX + s.phaseX) * s.ampX;
          y += Math.cos(time * s.freqY + s.phaseY) * s.ampY;
          s.angle += s.angleSpeed * 0.01;
        }
        const margin = 60;
        if (x < -margin) s.baseX += rect.width + margin * 2;
        if (x > rect.width + margin) s.baseX -= rect.width + margin * 2;
        if (y < -margin) s.baseY += rect.height + margin * 2;
        if (y > rect.height + margin) s.baseY -= rect.height + margin * 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(prefersReducedMotion ? 0 : s.angle);
        strokeSmoothPath(s.points, s.points.length);
        ctx.restore();
      }

      // live manual stroke
      if (isDrawing.current && currentStroke.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentStroke.current[0].x, currentStroke.current[0].y);
        for (let i = 1; i < currentStroke.current.length; i++) {
          ctx.lineTo(currentStroke.current[i].x, currentStroke.current[i].y);
        }
        ctx.stroke();
      }

      // simulated visitor stroke being "drawn" progressively — speed
      // follows the shape's geometry (slows at corners, glides on
      // straights) rather than a constant points-per-second rate
      if (simStroke.current) {
        const s = simStroke.current;
        const progress = Math.min((t - s.start) / s.duration, 1);
        const eased = easeInOutQuad(progress);
        const visible = pointsAtCost(s.points, s.segs, eased * s.total);
        strokeSmoothPath(visible, visible.length);

        if (progress >= 1) {
          finalizeStroke(s.points);
          simStroke.current = null;
          scheduleNextAutoDraw();
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", pointerDown);
      canvas.removeEventListener("mousemove", pointerMove);
      window.removeEventListener("mouseup", pointerUp);
      canvas.removeEventListener("touchstart", pointerDown);
      canvas.removeEventListener("touchmove", pointerMove);
      canvas.removeEventListener("touchend", pointerUp);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(simTimeoutRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        style={{
          cursor:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4-14 14-5 1 1-5Z"/><path d="m14.5 5.5 4 4"/></svg>\') 2 22, crosshair',
        }}
      />
      {!hasDrawn && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="text-sm text-[rgb(178,178,178)]">
            draw something
          </span>
        </div>
      )}
    </div>
  );
}