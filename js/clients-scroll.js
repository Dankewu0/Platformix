document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".clients__scroll-container");
  if (!scrollContainer) return;

  let animationId = null;
  let currentPos = 0;
  const speed = 1;

  const isMobile = () => window.innerWidth <= 768;

  const startAnimation = () => {
    cancelAnimationFrame(animationId);
    currentPos = 0;
    scrollContainer.style.transform = "none";

    if (!isMobile()) return;

    if (!scrollContainer.dataset.cloned) {
      const children = Array.from(scrollContainer.children);
      children.forEach((item) => {
        const clone = item.cloneNode(true);
        scrollContainer.appendChild(clone);
      });
      scrollContainer.dataset.cloned = "true";
    }

    const animate = () => {
      currentPos -= speed;

      const firstChild = scrollContainer.firstElementChild;
      const gap = 10;
      const itemWidth = firstChild.offsetWidth + gap;
      const totalWidth = itemWidth * (scrollContainer.children.length / 2);

      if (Math.abs(currentPos) >= totalWidth) {
        currentPos = 0;
      }

      scrollContainer.style.transform = `translateX(${currentPos}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
  };

  startAnimation();

  window.addEventListener("resize", () => {
    startAnimation();
  });
});
