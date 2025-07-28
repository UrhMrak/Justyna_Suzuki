// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all other FAQ items
    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar shadow change on scroll (background transparency removed)
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Form submission handling
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (!data.name || !data.email || !data.message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate form submission
  const submitButton = this.querySelector(".submit-button");
  const originalText = submitButton.textContent;

  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".class-card, .stat, .faq-item, .contact-form"
  );
  animatedElements.forEach((el) => observer.observe(el));
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    // Set initial opacity to 1 for logo, carousel images, and Justyna image to prevent flickering
    if (
      img.src.includes("logo.png") ||
      img.src.includes("hero_img2.jpeg") ||
      img.src.includes("hero_img.jpeg") ||
      img.src.includes("Justyna.jpeg")
    ) {
      img.style.opacity = "1";
      img.style.transition = "opacity 0.3s ease";
    } else {
      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";
    }
  });
});
