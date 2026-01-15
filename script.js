// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, 700);
});

// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme Toggle
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");
    if (document.body.classList.contains("light")) {
      icon.className = "fa-solid fa-sun";
      showToast("Light Mode ☀️");
    } else {
      icon.className = "fa-solid fa-moon";
      showToast("Dark Mode 🌙");
    }
  });
}

// Mobile Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Active Navbar Link
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
});

// Toast
const toast = document.getElementById("toast");
function showToast(msg) {
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 1800);
}

// Skills Popup
const skillCards = document.querySelectorAll(".skill-card");
const popup = document.getElementById("skillPopup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

if (skillCards.length && popup && popupText && closePopup) {
  skillCards.forEach((card) => {
    card.addEventListener("click", () => {
      skillCards.forEach((c) => c.classList.remove("selected"));

      card.classList.add("selected");
      const skill = card.getAttribute("data-skill");

      popupText.innerHTML = `✅ Selected Skill: <b>${skill}</b>`;
      popup.classList.add("show");

      showToast(`${skill} selected ⭐`);
    });
  });

  closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
    skillCards.forEach((c) => c.classList.remove("selected"));
  });
}

// ✅ Skills fade animation on scroll
const skillCardsAll = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.2 }
);

skillCardsAll.forEach((card) => skillObserver.observe(card));

/* ✅ CERTIFICATES POPUP (OPEN/CLOSE) */
function openCert(imgPath, title) {
  const popup = document.getElementById("certPopup");
  const img = document.getElementById("certImage");
  const text = document.getElementById("certTitle");

  if (!popup || !img || !text) return;

  img.src = imgPath;
  text.textContent = title;
  popup.classList.add("show");
}

function closeCert() {
  const popup = document.getElementById("certPopup");
  if (popup) popup.classList.remove("show");
}

// Close popup when clicking outside
document.addEventListener("click", (e) => {
  const popup = document.getElementById("certPopup");
  if (popup && e.target === popup) closeCert();
});

// ✅ Make functions global (important because HTML onclick uses them)
window.openCert = openCert;
window.closeCert = closeCert;

/* ✅ CERTIFICATES ARROWS (LEFT / RIGHT) */
const certSlider = document.getElementById("certSlider");
const certLeft = document.getElementById("certLeft");
const certRight = document.getElementById("certRight");

if (certSlider && certLeft && certRight) {
  certLeft.addEventListener("click", () => {
    certSlider.scrollBy({
      left: -(certSlider.clientWidth / 3),
      behavior: "smooth",
    });
  });

  certRight.addEventListener("click", () => {
    certSlider.scrollBy({
      left: certSlider.clientWidth / 3,
      behavior: "smooth",
    });
  });
} else {
  console.log("❌ Certificates slider/arrows not found in HTML");
}
