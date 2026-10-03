import { useEffect, useRef, useState } from "react";

/**
 * DrawFloat
 * A canvas the user can draw on with their mouse/finger. Finished strokes
 * detach and drift/bob around gently. On top of that, an invisible
 * "visitor" periodically sketches a lopsided, single-line heart or star —
 * like a quick hand doodle, not a geometric shape — which then joins the
 * floating pool too.
 *
 * Mobile note: on touch, the first ~8px of movement is used to decide
 * whether the gesture is a scroll (mostly vertical) or a draw (more
 * horizontal/diagonal). Only once it's decided to be a draw do we
 * preventDefault, so vertical swipes still scroll the page normally.
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

  // tracks an in-progress touch gesture before we've decided scroll vs draw
  const touchState = useRef({ active: false, decided: false, isDraw: false, startX: 0, startY: 0 });

  const [hasDrawn, setHasDrawn] = useState(false);
  const rafRef = useRef(null);

  const MAX_STROKES = 20;
  const STROKE_COLOR = "#111111";
  const LINE_WIDTH = 2.2;
  const DECIDE_THRESHOLD = 8; // px of movement before we commit to scroll or draw

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

    // ---------- shared helpers ----------
    function getPoint(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
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

    // ---------- mouse drawing (desktop) ----------
    function mouseDown(e) {
      isDrawing.current = true;
      currentStroke.current = [getPoint(e.clientX, e.clientY)];
      setHasDrawn(true);
    }
    function mouseMove(e) {
      if (!isDrawing.current) return;
      currentStroke.current.push(getPoint(e.clientX, e.clientY));
    }
    function mouseUp() {
      if (!isDrawing.current) return;
      isDrawing.current = false;
      finalizeStroke(currentStroke.current);
      currentStroke.current = [];
    }
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    // ---------- touch drawing (mobile) ----------
    // The first bit of movement decides intent: mostly vertical -> let the
    // page scroll normally; more horizontal/diagonal -> commit to drawing
    // and prevent the page from scrolling for the rest of this gesture.
    function touchStart(e) {
      const t = e.touches[0];
      touchState.current = {
        active: true,
        decided: false,
        isDraw: false,
        startX: t.clientX,
        startY: t.clientY,
      };
    }
    function touchMove(e) {
      const ts = touchState.current;
      if (!ts.active) return;
      const t = e.touches[0];
      const p = getPoint(t.clientX, t.clientY);

      if (!ts.decided) {
        const dx = t.clientX - ts.startX;
        const dy = t.clientY - ts.startY;
        const dist = Math.hypot(dx, dy);
        if (dist < DECIDE_THRESHOLD) return; // not enough movement yet to tell

        ts.decided = true;
        ts.isDraw = Math.abs(dx) >= Math.abs(dy);

        if (ts.isDraw) {
          isDrawing.current = true;
          currentStroke.current = [getPoint(ts.startX, ts.startY), p];
          setHasDrawn(true);
          e.preventDefault();
        }
        // else: predominantly vertical -> treat as a scroll, do nothing
        // and let the browser handle it natively
        return;
      }

      if (ts.isDraw) {
        currentStroke.current.push(p);
        e.preventDefault();
      }
      // if decided as a scroll, do nothing for the rest of the gesture
    }
    function touchEnd() {
      const ts = touchState.current;
      if (ts.isDraw) {
        isDrawing.current = false;
        finalizeStroke(currentStroke.current);
        currentStroke.current = [];
      }
      touchState.current = { active: false, decided: false, isDraw: false, startX: 0, startY: 0 };
    }
    canvas.addEventListener("touchstart", touchStart, { passive: true });
    canvas.addEventListener("touchmove", touchMove, { passive: false });
    canvas.addEventListener("touchend", touchEnd);
    canvas.addEventListener("touchcancel", touchEnd);

    // ---------- lopsided, single-line doodle hearts + stars ----------
    function heartDoodle(cx, cy, scale, rotation) {
      const leftW = scale * (9 + Math.random() * 3);
      const rightW = scale * (9 + Math.random() * 3);
      const lobeH = scale * (7 + Math.random() * 2);
      const dipDepth = scale * (2 + Math.random() * 2);
      const bottomY = scale * (16 + Math.random() * 3);
      const bottomXOffset = scale * (Math.random() - 0.5) * 4;

      const raw = [
        { x: 0, y: -dipDepth },
        { x: -leftW * 0.4, y: -lobeH * 1.3 },
        { x: -leftW, y: -lobeH * 0.4 },
        { x: -leftW * 0.75, y: lobeH * 0.6 },
        { x: bottomXOffset, y: bottomY },
        { x: rightW * 0.8, y: lobeH * 0.55 },
        { x: rightW, y: -lobeH * 0.35 },
        { x: rightW * 0.35, y: -lobeH * 1.25 },
        { x: rightW * 0.05, y: -dipDepth * 0.9 },
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
          rotation + (i / spikes) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
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
      pts.push({ x: pts[0].x, y: pts[0].y });
      return pts.map((p) => ({
        x: p.x + (Math.random() - 0.5) * 2,
        y: p.y + (Math.random() - 0.5) * 2,
      }));
    }

    function makeDoodleShape(cx, cy, isHeart) {
      const rotation = (Math.random() - 0.5) * 0.4;
      return isHeart
        ? heartDoodle(cx, cy, 3.2 + Math.random() * 1.2, rotation)
        : starDoodle(cx, cy, 24 + Math.random() * 10, 9 + Math.random() * 4, rotation);
    }

    function easeInOutQuad(x) {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

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
        duration: total * (7 + Math.random() * 3),
      };
    }

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

      if (isDrawing.current && currentStroke.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentStroke.current[0].x, currentStroke.current[0].y);
        for (let i = 1; i < currentStroke.current.length; i++) {
          ctx.lineTo(currentStroke.current[i].x, currentStroke.current[i].y);
        }
        ctx.stroke();
      }

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
      canvas.removeEventListener("mousedown", mouseDown);
      canvas.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      canvas.removeEventListener("touchstart", touchStart);
      canvas.removeEventListener("touchmove", touchMove);
      canvas.removeEventListener("touchend", touchEnd);
      canvas.removeEventListener("touchcancel", touchEnd);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(simTimeoutRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
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