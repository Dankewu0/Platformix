const slidesData = [
  {
    title: "ГК «Базовые Решения» – в топ-10 крупнейших ИТ-компаний России",
    desc: "Рейтинговое агентство RAEX подтвердило высокие позиции группы в ежегодном рэнкинге ИКТ-рынка",
    link: "#",
    bg: "video",
    videoSrc: "../public/background-main.mp4",
  },
  {
    title: "Инфраструктурная интеграция нового поколения",
    desc: "Мы внедряем передовые решения для обеспечения стабильности вашего бизнеса в цифровой среде",
    link: "#",
    bg: "url('../public/shatura.jpg')",
  },
  {
    title: "Информационная безопасность предприятий",
    desc: "Комплексная защита данных и предотвращение киберугроз любой сложности на всех уровнях",
    link: "#",
    bg: "url('../public/composition.jpg')",
  },
];

const heroSection = document.querySelector(".hero");
const sliderContainer = document.querySelector(".hero__slider");
const cards = Array.from(document.querySelectorAll(".slider-card"));
let currentIndex = 0;

let heroVideo = null;

function createHeroVideo() {
  if (heroVideo) return;
  heroVideo = document.createElement("video");
  heroVideo.src = slidesData.find((s) => s.bg === "video")?.videoSrc || "";
  heroVideo.muted = true;
  heroVideo.loop = true;
  heroVideo.autoplay = true;
  heroVideo.playsInline = true;
  heroVideo.style.position = "absolute";
  heroVideo.style.top = "0";
  heroVideo.style.left = "0";
  heroVideo.style.width = "100%";
  heroVideo.style.height = "100%";
  heroVideo.style.objectFit = "cover";
  heroVideo.style.zIndex = "0";
  heroVideo.style.pointerEvents = "none";
  heroSection.style.position = "relative";
  heroSection.insertBefore(heroVideo, heroSection.firstChild);
}

function updateSlider() {
  const currentData = slidesData[currentIndex];

  if (currentData.bg === "video") {
    if (!heroVideo) createHeroVideo();
    heroVideo.style.display = "block";
    heroVideo.play().catch(() => {});
    heroSection.style.backgroundImage = "none";
  } else {
    if (heroVideo) {
      heroVideo.pause();
      heroVideo.style.display = "none";
    }
    heroSection.style.backgroundImage = currentData.bg;
  }

  cards.forEach((card, i) => {
    let pos = i - currentIndex;

    if (slidesData.length === 3) {
      if (pos === 2) pos = -1;
      if (pos === -2) pos = 1;
    }

    card.dataset.pos = pos;

    const data = slidesData[i];
    const title = card.querySelector("h3");
    const desc = card.querySelector("p");
    const link = card.querySelector(".btn-more");

    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (link) link.href = data.link;
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slidesData.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
  updateSlider();
}

sliderContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".slider-card");
  if (!card) return;

  const pos = parseInt(card.dataset.pos);
  const isArrowClick = e.target.closest(".slider-arrow");

  if (isArrowClick) {
    nextSlide();
    return;
  }

  if (pos === 1) {
    nextSlide();
  } else if (pos === -1) {
    prevSlide();
  }
});

let slideInterval = setInterval(nextSlide, 8500);

sliderContainer.addEventListener("mouseenter", () =>
  clearInterval(slideInterval),
);
sliderContainer.addEventListener("mouseleave", () => {
  slideInterval = setInterval(nextSlide, 8500);
});

updateSlider();
