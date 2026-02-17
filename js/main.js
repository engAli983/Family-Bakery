// ===================== DOM Elements =====================
const header = document.getElementById("header");
const toggle = document.getElementById("menu-toggle");
const navWrapper = document.getElementById("main-nav-wrapper");
const overlay = document.getElementById("nav-overlay");
const hasSubmenu = document.querySelector(".has-submenu");
const hiddenElements = document.querySelectorAll(".hidden-element");
const modal = document.getElementById("product-modal");
const closeBtn = document.querySelector(".close-btn");
const bakingCards = document.querySelectorAll(".baking-card");
const contactForm = document.getElementById("contactForm");

// ===================== Mobile Menu Toggle =====================
function openMenu() {
  navWrapper.classList.add("active");
  overlay.classList.add("active");
  toggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  navWrapper.classList.remove("active");
  overlay.classList.remove("active");
  toggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

toggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close menu when clicking overlay
overlay.addEventListener("click", closeMenu);

// Close menu when clicking a nav link
document.querySelectorAll(".main-nav li a").forEach(function (link) {
  link.addEventListener("click", function () {
    // Don't close if it's the submenu parent
    if (!this.closest(".has-submenu") || this.closest(".sub-menu")) {
      closeMenu();
    }
  });
});

// Close menu on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && navWrapper.classList.contains("active")) {
    closeMenu();
  }
});

// ===================== Sub-menu Toggle (Mobile) =====================
if (hasSubmenu) {
  hasSubmenu.addEventListener("click", function (e) {
    // Only toggle on mobile (when toggle button is visible)
    if (window.getComputedStyle(toggle).display !== "none") {
      // Prevent navigation only for the parent link, not sub-menu links
      if (e.target.closest("a") && !e.target.closest(".sub-menu")) {
        e.preventDefault();
      }
      this.classList.toggle("open");
    }
  });
}

// ===================== Sticky Header on Scroll =====================
let lastScroll = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ===================== Scroll Animations =====================
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-element");
    }
  });
});
hiddenElements.forEach(function (el) {
  observer.observe(el);
});

// ===================== Product Modal =====================
bakingCards.forEach(function (card) {
  card.addEventListener("click", function () {
    const imgSrc = this.querySelector("img").src;
    const title = this.querySelector("h3").innerText;
    const price = this.querySelector(".price-tag").innerText;
    const desc = this.querySelector("p").innerText;

    document.getElementById("modal-img").src = imgSrc;
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-price").innerText = price;
    document.getElementById("modal-desc").innerText = desc;

    modal.style.display = "flex";
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// ===================== Contact Form =====================
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");
    const originalText = submitBtn.innerText;

    submitBtn.innerText = "Sending...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    setTimeout(function () {
      submitBtn.innerText = "Message Sent! ✔";
      submitBtn.style.backgroundColor = "#28a745";
      submitBtn.style.color = "#fff";
      submitBtn.style.opacity = "1";

      contactForm.reset();

      setTimeout(function () {
        submitBtn.innerText = originalText;
        submitBtn.style.backgroundColor = "";
        submitBtn.disabled = false;
      }, 3000);
    }, 2000);
  });
}

// ===================== Footer - Highlight Current Day =====================
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = new Date().getDay();
const currentDayName = days[today];
const footerHours = document.querySelectorAll(".footer-col ul li");
footerHours.forEach(function (li) {
  if (li.innerText.includes(currentDayName)) {
    li.style.color = "#e0c679";
    li.style.fontWeight = "bold";
    li.style.borderLeft = "3px solid #e0c679";
    li.style.paddingLeft = "10px";
  }
});
