const initPartnersScroll = () => {
  const grid = document.querySelector(".partners__grid");
  const wrapper = document.querySelector(".partners__wrapper");

  if (!grid || !wrapper) return;

  let x = 0;
  let speed = window.innerWidth <= 767 ? 0.75 : 0.4;
  let animationId = null;

  const clone = grid.innerHTML;
  grid.innerHTML += clone;

  const animate = () => {
    x -= speed;

    if (Math.abs(x) >= grid.scrollWidth / 2) {
      x = 0;
    }

    grid.style.transform = `translateX(${x}px)`;
    animationId = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const isMobileOrTablet = window.innerWidth <= 1024;

    if (isMobileOrTablet && !animationId) {
      speed = window.innerWidth <= 767 ? 0.75 : 0.4;
      animate();
    } else if (!isMobileOrTablet && animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
      grid.style.transform = "translateX(0)";
    }
  };

  if (window.innerWidth <= 1024) {
    animate();
  }

  window.addEventListener("resize", handleResize);
};

window.addEventListener("DOMContentLoaded", initPartnersScroll);
