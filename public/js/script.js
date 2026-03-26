/*
 * the main javascript
 * lastest update: 2025/07/02
 * author: ericlee517
 * description: basic for the tags to comfirm with tailwindcss.
 */

gsap.registerPlugin(SplitText, ScrollToPlugin);

console.clear();

document.fonts.ready.then(() => {
  gsap.set(".hero-text-introduce", { opacity: 1 });

  let split;
  SplitText.create(".hero-text-introduce", {
    type: "words,lines",
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      split = gsap.from(self.lines, {
        duration: 1.5,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });
      return split;
    }
  });

  const btn = document.querySelector("button");
  if (btn) {
    btn.addEventListener("click", (e) => {
      split.timeScale(0.2).play(0);
    });
  }
});


let textRevealRadius = 100;
const textRevealPercent = 0.17; // percent of the viewport width, used to size textRevealRadius

const randomTextEl = document.querySelector('.random-text');
if (randomTextEl) {
  const st = new SplitText(randomTextEl, { type: 'chars', charsClass: 'char' });
  st.chars.forEach((char) => (char.orig = char.textContent));

  const upperAndLowerCase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const getRandomLetter = () =>
    upperAndLowerCase[Math.round(upperAndLowerCase.length * Math.random())];

  let pageX = 0;
  let pageY = 0;
  let scrollY = pageYOffset;
  let scrollX = pageXOffset;

  let charData;

  function handleResize() {
    textRevealRadius = innerWidth * textRevealPercent;
    updateCharData();
  }

  function updateCharData() {
    charData = st.chars.map(char => {
      const bounds = char.getBoundingClientRect(); // this operation is expensive, so just do it when we need to
      return {
        el: char,
        pageY: bounds.top + scrollY + bounds.height / 2,
        pageX: bounds.left + pageXOffset + bounds.width / 2,
        isVisible: false
      }
    });
  }

  function updateText(e) {
    if ("pageY" in e) {
      pageX = e.pageX;
      pageY = e.pageY;
    } else { // scrolling doesn't give us pageX/pageY, so we must calculate them based on the scroll delta
      let scrollYDif = pageYOffset - scrollY;
      let scrollXDif = pageXOffset - scrollX;
      scrollY += scrollYDif;
      scrollX += scrollXDif;
      pageY += scrollYDif;
      pageX += scrollXDif;
    }
    
    charData.forEach((data) => {
      const dx = pageX - data.pageX;
      const dy = pageY - data.pageY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isVisible = dist < textRevealRadius;
      
      if (isVisible !== data.isVisible || !isVisible) {
        data.isVisible = isVisible;
        gsap.to(data.el, {
          overwrite: true,
          duration: gsap.utils.clamp(0.5, 3, dist / textRevealRadius),
          scrambleText: {
            text: isVisible ? data.el.orig : getRandomLetter(),
            chars: 'upperAndLowerCase'
          }
        });
      }
    });
  };

  function init() {
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', updateText);
    window.addEventListener('scroll', updateText);
    
    handleResize();
    updateText({ pageX: 0, pageY: 0 });
  }

  init();
}


const headings = document.querySelectorAll(
  "h1, h2, h3, h4, h5, h6, p, ul, li, table, a"
);
const tailwindClasses = {
  h1: "text-4xl font-bold mt-10 mb-4",
  h2: "text-3xl font-semibold mt-10 mb-4",
  h3: "text-2xl font-medium mt-10 mb-4",
  h4: "text-xl font-medium mt-10 mb-4",
  h5: "text-lg font-normal mt-10 mb-4",
  h6: "text-base font-normal mt-10 mb-4",
  p: "text-lg font-normal",
  ul: "list-disc ml-15 mb-6 font-normal text-lg",
  table: "table text-lg mb-6",
};

headings.forEach((heading) => {
  const tagName = heading.tagName.toLowerCase();
  if (!heading.classList.length && tailwindClasses[tagName]) {
    heading.classList.add(...tailwindClasses[tagName].split(" "));
  }
});

window.addEventListener("load", function () {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.classList.add("tooltip-open");
    setTimeout(() => {
      tooltip.classList.remove("tooltip-open");
    }, 7000);
  }

  window.loadTime = Date.now();
});

document.addEventListener("DOMContentLoaded", function () {
  const timeElement = document.querySelector("[data-time]");
  if (!timeElement) {
    console.error("[turboflint]data-time is empty");
    return;
  }
  const convertTimeFormat = (timeStr) => {
    if (!timeStr) return null;
    return timeStr.replace(/-(\d{2}:\d{2}:\d{2})$/, "T$1");
  };
  const rawTime = timeElement.getAttribute("data-time");
  const targetDate = new Date(convertTimeFormat(rawTime));
  if (isNaN(targetDate.getTime())) {
    console.error("[turboflint]Unable to parse the incoming time format. Please ensure the format is YYYY-MM-DD-hh:mm:ss");
    return;
  }

  const updateCountdown = function () {
    const currentTime = new Date();
    if (targetDate < currentTime) {
      const daysElement = document.getElementById("countdown-days");
      const hoursElement = document.getElementById("countdown-hours");
      const minutesElement = document.getElementById("countdown-minutes");
      const secondsElement = document.getElementById("countdown-seconds");

      if (daysElement && hoursElement && minutesElement && secondsElement) {
        daysElement.textContent = 0;
        hoursElement.textContent = 0;
        minutesElement.textContent = 0;
        secondsElement.textContent = 0;
      }
      return;
    }

    const timespan = countdown(
      currentTime,
      targetDate,
      countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
    const daysElement = document.getElementById("countdown-days");
    const hoursElement = document.getElementById("countdown-hours");
    const minutesElement = document.getElementById("countdown-minutes");
    const secondsElement = document.getElementById("countdown-seconds");

    if (daysElement && hoursElement && minutesElement && secondsElement) {
      daysElement.textContent = timespan.days;
      hoursElement.textContent = timespan.hours;
      minutesElement.textContent = timespan.minutes;
      secondsElement.textContent = timespan.seconds;
    }
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

(function () {
  const nav = document.getElementById('floatNav');
  if (nav) {
    let scrollTimer = null; // 用于记录滚动停止的计时器

    window.addEventListener('scroll', function () {
      // 只要滚动就立即隐藏
      nav.style.opacity = '0';
      // 每次滚动时清除之前的计时器
      clearTimeout(scrollTimer);
      // 滚动停止后 300ms 显示导航
      scrollTimer = setTimeout(() => {
        nav.style.opacity = '1';
      }, 300);
    });
  }
})();

// Floating Glow Effect
const glowElement = document.getElementById('floatingGlow');
glowElement.classList.add('active');

function getRandomPosition() {
  const hero = document.querySelector('.heros');
  
  // Use offsetWidth/offsetHeight for more reliable dimensions
  const width = hero.offsetWidth;
  const height = hero.offsetHeight;
  
  // Ensure glow stays fully within bounds
  const x = Math.random() * (width - 200);
  const y = Math.random() * (height - 200);
  
  return { x, y };
}

function moveGlow() {
  const { x, y } = getRandomPosition();
  
  glowElement.style.transition = `top ${Math.random() * 3 + 2}s ease-in-out, left ${Math.random() * 3 + 2}s ease-in-out`;
  glowElement.style.top = `${y}px`;
  glowElement.style.left = `${x}px`;
  
  setTimeout(moveGlow, Math.random() * 2000 + 3000);
}

// Start the animation
moveGlow();