const initAdvantagesScroll = (() => {
  let initialized = false;
  let viewport = null;
  let track = null;
  let progressBar = null;

  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  let originalWidth = 0;
  let cardsOriginal = [];

  const onTouchStart = (event) => {
    startX = event.touches[0].clientX;
    track.style.transition = "none";
  };

  const onTouchMove = (event) => {
    const currentX = event.touches[0].clientX;
    const diff = currentX - startX;

    currentTranslate = prevTranslate + diff;

    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
  };

  const onTouchEnd = () => {
    track.style.transition = "transform 0.3s ease-out";
    checkInfinite();
    prevTranslate = currentTranslate;
  };

  const checkInfinite = () => {
    if (currentTranslate <= -originalWidth * 2) {
      currentTranslate += originalWidth;
    }

    if (currentTranslate >= -originalWidth) {
      currentTranslate -= originalWidth;
    }

    prevTranslate = currentTranslate;

    track.style.transition = "none";
    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
  };

  const updateProgress = () => {
    if (!progressBar) return;

    const raw = Math.abs(currentTranslate + originalWidth) % originalWidth;
    const progress = raw / originalWidth;

    progressBar.style.width = `${Math.min(Math.max(progress * 100, 0), 100)}%`;
  };

  const update = () => {
    updateProgress();
    requestAnimationFrame(update);
  };

  const destroy = () => {
    if (!viewport) return;

    viewport.removeEventListener("touchstart", onTouchStart);
    viewport.removeEventListener("touchmove", onTouchMove);
    viewport.removeEventListener("touchend", onTouchEnd);

    const clones = track.querySelectorAll("[data-clone]");
    clones.forEach((clone) => clone.remove());
    initialized = false;
    cardsOriginal = [];
    track.style.transform = "";
    track.style.transition = "";
  };

  const setupClones = () => {
    const items = Array.from(cardsOriginal);

    items.forEach((item) => {
      const after = item.cloneNode(true);
      after.dataset.clone = "after";
      track.appendChild(after);
    });

    items.forEach((item) => {
      const before = item.cloneNode(true);
      before.dataset.clone = "before";
      track.insertBefore(before, track.firstChild);
    });
  };

  const calculate = () => {
    if (!cardsOriginal.length) return;
    const cardWidth = cardsOriginal[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 0;

    originalWidth = (cardWidth + gap) * cardsOriginal.length;
  };

  const init = () => {
    const section = document.querySelector(".advantages");
    track = document.querySelector(".advantages__track");
    viewport = document.querySelector(".advantages__slider-viewport");
    progressBar = document.querySelector(".advantages__progress-bar");

    if (!section || !track || !viewport) return;

    const isDesktop = window.innerWidth > 1024;

    if (isDesktop) {
      destroy();
      return;
    }

    cardsOriginal = track.querySelectorAll(".adv:not([data-clone])");

    if (!cardsOriginal.length) return;
    if (cardsOriginal[0].offsetWidth === 0) {
      setTimeout(init, 150);
      return;
    }

    if (!initialized) {
      setupClones();
      initialized = true;
    }

    calculate();

    track.style.transition = "none";

    currentTranslate = -originalWidth;
    prevTranslate = currentTranslate;

    track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;

    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd);

    requestAnimationFrame(() => {
      update();
    });
  };

  let resizeTimer = null;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      init();
    }, 200);
  });

  window.addEventListener("load", () => {
    init();
  });

  return init;
})();
