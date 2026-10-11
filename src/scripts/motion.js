import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* 移动端地址栏收放会触发 resize，忽略它以减少 refresh 开销 */
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * 把标题拆成逐字遮罩结构，供 stagger 进场使用。
 * 仅在 JS 环境运行；无 JS 时保持原始文本节点。
 */
function splitTitle(el) {
  const text = el.textContent ?? '';
  const chars = Array.from(text);
  if (!chars.length) return [];

  el.textContent = '';
  return chars.map((char) => {
    const mask = document.createElement('span');
    mask.className = 'hero-char';

    const inner = document.createElement('span');
    inner.textContent = char;
    mask.appendChild(inner);
    el.appendChild(mask);
    return inner;
  });
}

function initHero(motionOK) {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const titleEl = hero.querySelector('[data-split]');
  const chars = titleEl && motionOK ? splitTitle(titleEl) : [];
  const glows = hero.querySelectorAll('.hero-glow');
  const subtext = hero.querySelector('.hero-subtext');
  const actions = hero.querySelector('.hero-actions');
  const scroller = hero.querySelector('.hero-scroll');

  if (!motionOK) {
    gsap.set([titleEl, subtext, actions, scroller].filter(Boolean), { clearProps: 'all' });
    return;
  }

  /* 标题在拆分完成前由 CSS 保持隐藏，避免逐字进场前的一次闪现 */
  if (titleEl) gsap.set(titleEl, { autoAlpha: 1 });

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  if (glows.length) {
    tl.fromTo(
      glows,
      { autoAlpha: 0, scale: 0.72 },
      { autoAlpha: 0.2, scale: 1, duration: 2.4, stagger: 0.18, ease: 'power2.out' },
      0
    );
  }

  if (chars.length) {
    tl.fromTo(chars, { yPercent: 118 }, { yPercent: 0, duration: 1.5, stagger: 0.09 }, 0.15);
  }

  if (subtext) tl.fromTo(subtext, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.62);

  if (actions) {
    tl.fromTo(
      actions.querySelectorAll('.btn'),
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
      0.78
    );
  }

  if (scroller) tl.fromTo(scroller, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.15);

  /* 滚动联动：内容向上退场，两团光晕反向漂移 */
  const content = hero.querySelector('.hero-content');
  if (content) {
    gsap.to(content, {
      yPercent: -14,
      autoAlpha: 0.15,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.4 }
    });
  }

  if (glows.length > 1) {
    gsap.to(glows[0], {
      xPercent: 26,
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 }
    });
    gsap.to(glows[1], {
      xPercent: -22,
      yPercent: -14,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 }
    });
  }
}

function initReveals(motionOK) {
  const items = gsap.utils.toArray('[data-reveal]');
  if (!items.length) return;

  if (!motionOK) {
    gsap.set(items, { clearProps: 'all' });
    return;
  }

  gsap.set(items, { autoAlpha: 0, y: 28 });

  /* 同一批进入视口的元素一次性错峰进场 */
  ScrollTrigger.batch(items, {
    start: 'top 88%',
    once: true,
    interval: 0.08,
    batchMax: 6,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
        /* 交还 transform 控制权，卡片悬停位移才能生效 */
        onComplete: () => gsap.set(batch, { clearProps: 'transform' })
      })
  });
}

/** 眉标下的发丝线随区块入场“画”出来（站点签名细节） */
function initEyebrowRules(motionOK) {
  const rules = gsap.utils.toArray('.section-eyebrow');
  if (!rules.length) return;

  if (!motionOK) {
    gsap.set(rules, { clearProps: 'all' });
    return;
  }

  rules.forEach((rule) => {
    gsap.fromTo(
      rule,
      { '--rule-scale': 0 },
      {
        '--rule-scale': 1,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: rule, start: 'top 94%', once: true }
      }
    );
  });
}

/** 桌面端指针视差：光晕轻微跟随光标 */
function initPointerParallax() {
  const glows = document.querySelectorAll('.hero .hero-glow');
  if (glows.length < 2) return;

  const xTo = gsap.quickTo(glows[0], 'xPercent', { duration: 1.1, ease: 'power3' });
  const yTo = gsap.quickTo(glows[0], 'yPercent', { duration: 1.1, ease: 'power3' });
  const xTo2 = gsap.quickTo(glows[1], 'xPercent', { duration: 1.3, ease: 'power3' });
  const yTo2 = gsap.quickTo(glows[1], 'yPercent', { duration: 1.3, ease: 'power3' });

  const onMove = (e) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    xTo(nx * 6);
    yTo(ny * 5);
    xTo2(nx * -7);
    yTo2(ny * -5);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
}

/** 按钮磁吸 + 悬停放大，克制到几乎察觉不到 */
function initMagneticButtons() {
  const cleanups = gsap.utils.toArray('.hero-actions .btn').map((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3' });

    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      xTo(((e.clientX - r.left) / r.width - 0.5) * 14);
      yTo(((e.clientY - r.top) / r.height - 0.5) * 10);
    };
    const onEnter = () => gsap.to(btn, { scale: 1.04, duration: 0.4, ease: 'power3.out' });
    const onLeave = () =>
      gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });

    btn.addEventListener('pointermove', onMove);
    btn.addEventListener('pointerenter', onEnter);
    btn.addEventListener('pointerleave', onLeave);

    return () => {
      btn.removeEventListener('pointermove', onMove);
      btn.removeEventListener('pointerenter', onEnter);
      btn.removeEventListener('pointerleave', onLeave);
      gsap.set(btn, { clearProps: 'transform' });
    };
  });

  return () => cleanups.forEach((fn) => fn());
}

function boot() {
  const root = document.documentElement;
  const mm = gsap.matchMedia();

  mm.add(
    {
      reduceMotion: '(prefers-reduced-motion: reduce)',
      finePointer: '(min-width: 821px) and (pointer: fine)'
    },
    (context) => {
      const { reduceMotion, finePointer } = context.conditions ?? {};
      const motionOK = !reduceMotion;

      initHero(motionOK);
      initReveals(motionOK);
      initEyebrowRules(motionOK);

      if (motionOK) {
        if (finePointer) {
          initPointerParallax();
          initMagneticButtons();
        }
      }

      /* 初始态已由 GSAP 接管，解除 CSS 的「待接管」隐藏 */
      root.dataset.motion = motionOK ? 'on' : 'reduced';
    }
  );

  /* 字体 / 图片加载完成后重算触发点，避免位置偏移 */
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
