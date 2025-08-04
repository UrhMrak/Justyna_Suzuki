// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Navbar logo click to go home
const navLogo = document.querySelector(".nav-logo");
navLogo.addEventListener("click", () => {
  const homeSection = document.querySelector("#home");
  if (homeSection) {
    const offsetTop = homeSection.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
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

// Login Modal Functionality
const modal = document.getElementById("loginModal");
const footerLogo = document.getElementById("footerLogo");
const closeBtn = document.querySelector(".close");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

// Open modal when footer logo is clicked
footerLogo.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

// Close modal when X is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  loginMessage.textContent = "";
  loginMessage.className = "login-message";
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    loginMessage.textContent = "";
    loginMessage.className = "login-message";
  }
});

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    loginMessage.textContent = "Login successful!";
    loginMessage.className = "login-message success";

    // Store login state
    localStorage.setItem("isLoggedIn", "true");

    // Close modal after successful login
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      loginMessage.textContent = "";
      loginMessage.className = "login-message";
      loginForm.reset();

      // Enable admin features
      enableAdminFeatures();

      // Scroll to classes section
      const classesSection = document.querySelector("#classes");
      if (classesSection) {
        const offsetTop = classesSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }, 1500);
  } else {
    loginMessage.textContent = "Invalid username or password!";
    loginMessage.className = "login-message error";
  }
});

// Check if user is already logged in
function checkLoginStatus() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    enableAdminFeatures();
  } else {
    // Hide logout button if not logged in
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.style.display = "none";
  }
}

// Logout functionality
function logout() {
  // Clear login state
  localStorage.removeItem("isLoggedIn");

  // Hide admin features
  const adminControls = document.getElementById("adminControls");
  const adminActions = document.querySelectorAll(".admin-actions");
  const logoutButton = document.getElementById("logoutButton");

  adminControls.style.display = "none";
  adminActions.forEach((action) => {
    action.style.display = "none";
  });
  logoutButton.style.display = "none";

  // Reset any editing states
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((btn) => {
    if (btn.textContent === "Save") {
      btn.textContent = "Edit";
      btn.classList.remove("save-btn");
      btn.classList.add("edit-btn");
      btn.style.backgroundColor = "#3b82f6";
    }
  });

  // Disable editing for all editable elements
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.setAttribute("contenteditable", "false");
  });

  // Reset editing state
  isEditing = false;
}

// Enable admin features
function enableAdminFeatures() {
  const adminControls = document.getElementById("adminControls");
  const adminActions = document.querySelectorAll(".admin-actions");
  const logoutButton = document.getElementById("logoutButton");

  // Show admin controls
  adminControls.style.display = "block";

  // Show admin action buttons
  adminActions.forEach((action) => {
    action.style.display = "flex";
  });

  // Show logout button
  logoutButton.style.display = "block";
}

// Admin functionality for editing classes
let isEditing = false;

// Add new class functionality
function addNewClass() {
  const classesGrid = document.getElementById("classesGrid");
  const newClassId = Date.now(); // Use timestamp as unique ID

  const newClassCard = document.createElement("div");
  newClassCard.className = "class-card";
  newClassCard.setAttribute("data-class-id", newClassId);

  newClassCard.innerHTML = `
    <div class="class-header">
      <h3 class="editable" contenteditable="false">New Class</h3>
      <span class="class-level editable" contenteditable="false">Level 1</span>
    </div>
    <div class="class-details">
      <div class="detail">
        <i class="fas fa-calendar"></i>
        <span class="editable" contenteditable="false">Day</span>
      </div>
      <div class="detail">
        <i class="fas fa-clock"></i>
        <span class="editable" contenteditable="false">Time</span>
      </div>
      <div class="detail">
        <i class="fas fa-map-marker-alt"></i>
        <span class="editable" contenteditable="false">Location</span>
      </div>
    </div>
    <p class="class-description editable" contenteditable="false">
      Enter class description here.
    </p>
    <a href="#contact" class="class-button">Enroll Now</a>
    <div class="admin-actions" style="display: flex;">
      <button class="edit-btn admin-action-btn">Edit</button>
      <button class="delete-btn admin-action-btn">Delete</button>
    </div>
  `;

  classesGrid.appendChild(newClassCard);

  // Add event listeners to new buttons
  addClassEventListeners(newClassCard);
}

// Add event listeners to class cards
function addClassEventListeners(classCard) {
  const editBtn = classCard.querySelector(".edit-btn");
  const deleteBtn = classCard.querySelector(".delete-btn");
  const editableElements = classCard.querySelectorAll(".editable");

  // Edit functionality
  editBtn.addEventListener("click", () => {
    if (!isEditing) {
      // Start editing
      isEditing = true;
      editBtn.textContent = "Save";
      editBtn.classList.remove("edit-btn");
      editBtn.classList.add("save-btn");
      editBtn.style.backgroundColor = "#10b981";

      // Enable editing for all editable elements
      editableElements.forEach((element) => {
        element.setAttribute("contenteditable", "true");

        // Add character limit for level elements
        if (element.classList.contains("class-level")) {
          // Store handlers as properties for later removal
          element._inputHandler = function () {
            if (this.textContent.length > 10) {
              this.textContent = this.textContent.substring(0, 10);
            }
            // Update character count
            this.setAttribute("data-char-count", this.textContent.length);
          };

          element._pasteHandler = function (e) {
            e.preventDefault();
            const pastedText = (
              e.clipboardData || window.clipboardData
            ).getData("text");
            const currentText = this.textContent;
            const newText = currentText + pastedText;
            if (newText.length <= 10) {
              this.textContent = newText;
              this.setAttribute("data-char-count", this.textContent.length);
            }
          };

          element.addEventListener("input", element._inputHandler);
          element.addEventListener("paste", element._pasteHandler);

          // Initialize character count
          element.setAttribute("data-char-count", element.textContent.length);
        }
      });
    } else {
      // Save changes
      isEditing = false;
      editBtn.textContent = "Edit";
      editBtn.classList.remove("save-btn");
      editBtn.classList.add("edit-btn");
      editBtn.style.backgroundColor = "#3b82f6";

      // Disable editing for all editable elements
      editableElements.forEach((element) => {
        element.setAttribute("contenteditable", "false");

        // Remove event listeners for level elements
        if (element.classList.contains("class-level")) {
          element.removeEventListener("input", element._inputHandler);
          element.removeEventListener("paste", element._pasteHandler);
        }
      });
    }
  });

  // Delete functionality
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this class?")) {
      classCard.remove();
    }
  });
}

// Add event listeners to existing class cards
document.addEventListener("DOMContentLoaded", () => {
  const classCards = document.querySelectorAll(".class-card");
  classCards.forEach((card) => {
    addClassEventListeners(card);
  });

  // Add event listener to add class button
  const addClassBtn = document.getElementById("addClassBtn");
  if (addClassBtn) {
    addClassBtn.addEventListener("click", addNewClass);
  }

  // Add event listener to logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  // Check login status on page load
  checkLoginStatus();
});
