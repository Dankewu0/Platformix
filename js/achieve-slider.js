document.addEventListener("DOMContentLoaded", () => {
  const achievementsData = [
    {
      month: "в январе",
      stats: ["41", "15 633", "52", "6", "2 755 "],
    },
    {
      month: "в феврале",
      stats: ["38", "3 120", "45", "8", "12 400"],
    },
    {
      month: "в марте",
      stats: ["54", "4 890", "61", "12", "18 210"],
    },
    {
      month: "в апреле",
      stats: ["47", "3 450", "55", "9", "14 800"],
    },
    {
      month: "в мае",
      stats: ["62", "5 200", "68", "14", "20 500"],
    },
    {
      month: "в июне",
      stats: ["59", "4 980", "63", "11", "19 300"],
    },
    {
      month: "в июле",
      stats: ["44", "3 880", "50", "7", "16 100"],
    },
    {
      month: "в августе",
      stats: ["51", "4 200", "57", "10", "17 400"],
    },
    {
      month: "в сентябре",
      stats: ["48", "3 990", "53", "9", "15 900"],
    },
    {
      month: "в октябре",
      stats: ["55", "4 670", "60", "11", "18 800"],
    },
    {
      month: "в ноябре",
      stats: ["39", "3 100", "46", "6", "13 200"],
    },
    {
      month: "в декабре",
      stats: ["60", "5 100", "66", "13", "21 000"],
    },
  ];

  let currentAchieveIndex = 0;

  const statSpans = document.querySelectorAll(".stat-item span");
  const btnPrev = document.querySelector(".achievements__arrow--left");
  const btnNext = document.querySelector(".achievements__arrow--right");
  const btnRhomb = document.querySelector(".achievements__rhomb-btn");
  const selectWrapper = document.querySelector(".achievements__select-wrapper");

  const existingSelect = selectWrapper.querySelector(".achievements__select");
  if (existingSelect) existingSelect.remove();

  const elems = [];
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.className = "achievements__select";
    div.setAttribute("data-pos", i - 2);
    const span = document.createElement("span");
    div.appendChild(span);
    fragment.appendChild(div);
    elems.push(div);
  }

  const rhomb = selectWrapper.querySelector(".achievements__rhomb-btn");
  selectWrapper.insertBefore(fragment, rhomb);

  const getPos = function (current, active) {
    const diff = current - active;
    if (Math.abs(current - active) > 2) {
      return -current;
    }
    return diff;
  };

  const updatePositions = (newActivePos) => {
    elems.forEach((item) => {
      const currentPos = parseInt(item.dataset.pos);
      item.dataset.pos = getPos(currentPos, newActivePos);
    });
  };

  function updateAchievements(index) {
    const data = achievementsData[index];
    const longMonths = ["в феврале", "в сентябре", "в октябре", "в декабре"];
    elems.forEach((el) => {
      el.querySelector("span").textContent = data.month;
      if (longMonths.includes(data.month)) {
        el.querySelector("span").style.fontSize = "42px";
      } else {
        el.querySelector("span").style.fontSize = "";
      }
    });
    statSpans.forEach((span, i) => {
      if (data.stats[i]) {
        span.textContent = data.stats[i];
      }
    });
  }

  const nextAchieve = () => {
    currentAchieveIndex = (currentAchieveIndex + 1) % achievementsData.length;
    updateAchievements(currentAchieveIndex);
    updatePositions(1);
  };

  const prevAchieve = () => {
    currentAchieveIndex =
      (currentAchieveIndex - 1 + achievementsData.length) %
      achievementsData.length;
    updateAchievements(currentAchieveIndex);
    updatePositions(-1);
  };

  if (btnPrev) btnPrev.addEventListener("click", prevAchieve);
  if (btnNext) btnNext.addEventListener("click", nextAchieve);
  if (btnRhomb) btnRhomb.addEventListener("click", nextAchieve);
  if (selectWrapper) {
    selectWrapper.addEventListener("click", nextAchieve);
  }

  updateAchievements(currentAchieveIndex);
});
