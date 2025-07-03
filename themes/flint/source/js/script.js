/*
 * the main javascript
 * lastest update: 2025/07/02
 * author: ericlee517
 * description: basic for the tags to comfirm with tailwindcss.
 */

const headings = document.querySelectorAll(
  "h1, h2, h3, h4, h5, h6, p, ul, li, table",
  "a"
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
  a: "text-4xl",
};

headings.forEach((heading) => {
  const tagName = heading.tagName.toLowerCase();
  if (!heading.classList.length && tailwindClasses[tagName]) {
    heading.classList.add(...tailwindClasses[tagName].split(" "));
  }
});

window.addEventListener("load", function () {
  const tooltip = document.getElementById("tooltip");
  tooltip.classList.add("tooltip-open");
  setTimeout(() => {
    tooltip.classList.remove("tooltip-open");
  }, 7000);

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
