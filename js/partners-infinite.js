const initPartnersScroll = () => {
  const grid = document.querySelector(".partners__grid");
  const wrapper = document.querySelector(".partners__wrapper");

  if (!grid || !wrapper) return;

  let x = 0;
  let speed = window.innerWidth <= 767 ? 0.75 : 0.4;
  let animationId = null;
  let originalWidth = 0;

  const items = [...grid.children];

  items.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.classList.add("partners__logo--clone");
    grid.appendChild(clone);
  });

  const updateWidth = () => {
    originalWidth = grid.scrollWidth / 2;
  };

  const animate = () => {
    x -= speed;

    if (Math.abs(x) >= originalWidth) {
      x += originalWidth;
    }

    grid.style.transform = `translate3d(${x}px, 0, 0)`;

    animationId = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const isMobileOrTablet = window.innerWidth <= 1024;

    speed = window.innerWidth <= 767 ? 0.75 : 0.4;

    updateWidth();

    if (isMobileOrTablet && !animationId) {
      animate();
    } else if (!isMobileOrTablet && animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
      x = 0;
      grid.style.transform = "translate3d(0, 0, 0)";
    }
  };

  window.addEventListener("load", updateWidth);

  updateWidth();
  handleResize();

  window.addEventListener("resize", handleResize);
};

window.addEventListener("DOMContentLoaded", initPartnersScroll);
