const bg = document.querySelector(".advantages");

const swiper = new Swiper(".advantages__slider", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 20,
  on: {
    progress() {
      if (window.innerWidth <= 1024) {
        bg.style.backgroundPosition = `${50 + this.progress * 10}% center`;

        this.slides.forEach((slide) => {
          const progress = slide.progress;
          const distance = Math.abs(progress);

          const scale = Math.max(0.8, 1 - distance * 0.5);
          const opacity = Math.max(0.5, 1 - distance * 0.8);

          slide.style.transform = `scale(${scale})`;
          slide.style.opacity = opacity;
          slide.style.zIndex = distance < 0.1 ? "10" : "1";
        });
      } else {
        bg.style.backgroundPosition = "";

        this.slides.forEach((slide) => {
          slide.style.transform = "";
          slide.style.opacity = "";
          slide.style.zIndex = "";
        });
      }
    },
  },
});

window.addEventListener("resize", () => swiper.update());
