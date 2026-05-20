{
  const initCardsScroll = () => {
    if (window.innerWidth > 1023) return;

    const serviceCards = document.querySelectorAll(
      ".cards-solutions-and-services article",
    );

    if (serviceCards.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -15% 0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          serviceCards.forEach((card) => card.classList.remove("active-focus"));
          entry.target.classList.add("active-focus");
        } else {
          entry.target.classList.remove("active-focus");
        }
      });
    }, observerOptions);

    serviceCards.forEach((card) => {
      observer.observe(card);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCardsScroll);
  } else {
    initCardsScroll();
  }
}
