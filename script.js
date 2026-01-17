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

// ✅ Theme Toggle (Dark default)
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

// ✅ Mobile Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // ✅ close menu after click (mobile)
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// ✅ Active Navbar Link (Correct Highlight)
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((a) => a.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-item[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  {
    root: null,
    threshold: 0.55,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// ✅ Toast
const toast = document.getElementById("toast");
function showToast(msg) {
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 1800);
}

// ✅ Skills Popup
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

      popupText.innerHTML = `🔥 <b>${skill}</b> is highlighted now`;
      popup.classList.add("show");

      showToast(`${skill} Activated ⚡`);
    });
  });

  closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
    skillCards.forEach((c) => c.classList.remove("selected"));
  });
}

// ✅ Skills fade animation on scroll
const skillObserver2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.2 }
);

skillCards.forEach((card) => skillObserver2.observe(card));

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

document.addEventListener("click", (e) => {
  const popup = document.getElementById("certPopup");
  if (popup && e.target === popup) closeCert();
});

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
}

/* ✅ Project Gallery Popup with Slider (FIXED ARROWS ✅) */
let galleryImages = [];
let currentGalleryIndex = 0;

function updateGalleryCount() {
  const count = document.getElementById("galleryCount");
  if (count) count.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
}

function showNextImage() {
  if (!galleryImages.length) return;
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;

  const img = document.getElementById("projectGalleryImg");
  if (img) img.src = galleryImages[currentGalleryIndex];

  updateGalleryCount();
}

function showPrevImage() {
  if (!galleryImages.length) return;
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;

  const img = document.getElementById("projectGalleryImg");
  if (img) img.src = galleryImages[currentGalleryIndex];

  updateGalleryCount();
}

function openProjectGallery(title, images) {
  const popup = document.getElementById("projectPopup");
  const img = document.getElementById("projectGalleryImg");
  const text = document.getElementById("projectTitle");

  if (!popup || !img || !text) return;

  galleryImages = images;
  currentGalleryIndex = 0;

  text.textContent = title;
  img.src = galleryImages[currentGalleryIndex];

  updateGalleryCount();
  popup.classList.add("show");

  // ✅ Attach arrow click events when popup opens
  const galleryNext = document.getElementById("galleryNext");
  const galleryPrev = document.getElementById("galleryPrev");

  if (galleryNext) galleryNext.onclick = showNextImage;
  if (galleryPrev) galleryPrev.onclick = showPrevImage;
}

function closeProjectGallery() {
  const popup = document.getElementById("projectPopup");
  if (popup) popup.classList.remove("show");
}

// ✅ Close popup when clicked outside
document.addEventListener("click", (e) => {
  const popup = document.getElementById("projectPopup");
  if (popup && e.target === popup) closeProjectGallery();
});

// ✅ Keyboard support
document.addEventListener("keydown", (e) => {
  const popup = document.getElementById("projectPopup");
  if (!popup || !popup.classList.contains("show")) return;

  if (e.key === "ArrowRight") showNextImage();
  if (e.key === "ArrowLeft") showPrevImage();
  if (e.key === "Escape") closeProjectGallery();
});

// ✅ Global functions
window.openProjectGallery = openProjectGallery;
window.closeProjectGallery = closeProjectGallery;
