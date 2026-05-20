const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuItems = document.querySelectorAll(".menu-item");
const headerContainer = document.querySelector(".container");

function updateGap(item) {
  const existingCorners = headerContainer.querySelectorAll(".corner-js");
  existingCorners.forEach((c) => c.remove());

  if (item && item.classList.contains("active")) {
    const rect = item.getBoundingClientRect();
    const containerRect = headerContainer.getBoundingClientRect();
    const left = rect.left - containerRect.left;
    const width = rect.width;

    headerContainer.style.setProperty("--gap-left", `${left}px`);
    headerContainer.style.setProperty("--gap-width", `${width}px`);
    headerContainer.classList.add("has-active");

    const leftCorner = document.createElement("div");
    leftCorner.className = "corner-js";
    leftCorner.style.cssText = `
      position: absolute;
      bottom: -9px;
      left: ${left - 10}px;
      width: 10px;
      height: 10px;
      pointer-events: none;
      overflow: hidden;
      transform: scaleX(-1) rotate(180deg) scale(0.98);
      transform-origin: center;
    `;
    leftCorner.innerHTML = `<div style="
      width: 10px;
      height: 10px;
      border-radius: 0 0 10px 0;
      border-right: 2px solid #63718f;
      border-bottom: 2px solid #63718f;
    "></div>`;
    headerContainer.appendChild(leftCorner);

    const rightCorner = document.createElement("div");
    rightCorner.className = "corner-js";
    rightCorner.style.cssText = `
      position: absolute;
      bottom: -9px;
      left: ${left + width}px;
      width: 10px;
      height: 10px;
      pointer-events: none;
      overflow: hidden;
      transform: rotate(180deg) scale(0.98);
      transform-origin: center;
    `;
    rightCorner.innerHTML = `<div style="
      width: 10px;
      height: 10px;
      border-radius: 0 0 10px 0;
      border-right: 2px solid #63718f;
      border-bottom: 2px solid #63718f;
    "></div>`;
    headerContainer.appendChild(rightCorner);
  } else {
    headerContainer.style.removeProperty("--gap-left");
    headerContainer.style.removeProperty("--gap-width");
    headerContainer.classList.remove("has-active");
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  burgerBtn.classList.remove("active");
}

burgerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  } else {
    burgerBtn.classList.add("active");
    mobileMenu.classList.add("active");
  }
});

const closeBtn = mobileMenu.querySelector(".close-btn");
if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMobileMenu();
  });
}

document
  .querySelectorAll(".menu-group-btn, .company-menu-group-btn")
  .forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = btn.closest(".menu-group");
      parent.classList.toggle("open");
    });
  });

mobileMenu.querySelectorAll(".submenu a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

menuItems.forEach((item) => {
  const btn = item.querySelector("button");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    let isAlreadyActive = item.classList.contains("active");

    menuItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
    });

    if (!isAlreadyActive) {
      item.classList.add("active");
      updateGap(item);
    } else {
      updateGap(null);
    }
  });
});

window.addEventListener("click", () => {
  closeMobileMenu();
  menuItems.forEach((item) => item.classList.remove("active"));
  updateGap(null);
});

window.addEventListener("resize", () => {
  const activeItem = document.querySelector(".menu-item.active");
  if (activeItem) {
    updateGap(activeItem);
  }
});
