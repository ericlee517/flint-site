/**
 * 导航交互：滚动状态 + 移动端抽屉。
 * 刻意不依赖 GSAP —— 即使动效脚本加载失败，导航依然完全可用。
 */
function initNavScroll() {
  const shell = document.querySelector('.nav-shell');
  if (!shell) return;

  let ticking = false;
  const apply = () => {
    shell.classList.toggle('scrolled', window.scrollY > 24);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    },
    { passive: true }
  );

  apply();
}

function initDrawer() {
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-mobile');
  if (!toggle || !drawer) return;

  const setOpen = (open) => {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const isOpen = () => drawer.classList.contains('open');

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  /* 视口回到桌面宽度时复位，避免滚动被锁死 */
  window.matchMedia('(min-width: 821px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

function init() {
  initNavScroll();
  initDrawer();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
