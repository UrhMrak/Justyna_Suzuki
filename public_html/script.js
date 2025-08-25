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

// Navbar shadow change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Form submission handling with EmailJS
emailjs.init("clul3jbzWuRkHzJCU");

// Contact form submission with EmailJS
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Prepare template parameters
  const templateParams = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Send email using EmailJS
  emailjs.send("service_9ozipbl", "template_cyuy68p", templateParams).then(
    function (response) {
      // Success
      alert("Thank you for your message! We will get back to you soon.");
      document.getElementById("contactForm").reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    },
    function (error) {
      // Error
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  );
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

// ===== FILE-BASED STORAGE SYSTEM =====

// Data storage and management
class DataManager {
  constructor() {
    this.baseUrl = window.location.origin;
    this.data = {
      classes: [],
      about: {},
      pricing: [],
      faq: [],
      calendar: [],
    };
    this.isEditing = false;
  }

  // Load data from server
  async loadData(type) {
    try {
      const response = await fetch(
        `${this.baseUrl}/load_data.php?type=${type}`
      );
      const result = await response.json();

      if (result.success) {
        this.data[type] = result.data;
        return result.data;
      } else {
        console.error(`Failed to load ${type}:`, result.error);
        return null;
      }
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
      return null;
    }
  }

  // Save data to server
  async saveData(type, content) {
    try {
      const response = await fetch(`${this.baseUrl}/save_data.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          content: content,
        }),
      });

      const result = await response.json();

      if (result.success) {
        this.data[type] = content;
        return true;
      } else {
        console.error(`Failed to save ${type}:`, result.error);
        return false;
      }
    } catch (error) {
      console.error(`Error saving ${type}:`, error);
      return false;
    }
  }

  // Load all data
  async loadAllData() {
    const types = ["classes", "about", "pricing", "faq", "calendar"];
    for (const type of types) {
      await this.loadData(type);
    }
    this.renderAllData();
  }

  // Render all data to the page
  renderAllData() {
    this.renderClasses();
    this.renderAbout();
    this.renderPricing();
    this.renderFAQ();
    this.renderCalendar();
  }

  // Render classes section
  renderClasses() {
    const classesGrid = document.getElementById("classesGrid");
    if (!classesGrid) return;

    classesGrid.innerHTML = "";

    this.data.classes.forEach((classItem, index) => {
      const classCard = this.createClassCard(classItem, index);
      classesGrid.appendChild(classCard);
    });
  }

  // Create a class card element
  createClassCard(classItem, index) {
    const classCard = document.createElement("div");
    classCard.className = "class-card";
    classCard.setAttribute("data-class-id", classItem.id || index + 1);

    classCard.innerHTML = `
      <div class="class-header">
        <h3 class="editable" contenteditable="false" data-field="title">${
          classItem.title || "New Class"
        }</h3>
      </div>
      <div class="class-details">
        <div class="detail">
          <i class="fas fa-calendar"></i>
          <span class="editable" contenteditable="false" data-field="date">${
            classItem.date || "Day"
          }</span>
        </div>
        <div class="detail">
          <i class="fas fa-clock"></i>
          <span class="editable" contenteditable="false" data-field="time">${
            classItem.time || "Time"
          }</span>
        </div>
        <div class="detail">
          <i class="fas fa-map-marker-alt"></i>
          <span class="editable" contenteditable="false" data-field="location">${
            classItem.location || "Location"
          }</span>
        </div>
      </div>
      <p class="class-description editable" contenteditable="false" data-field="description">
        ${classItem.description || "Enter class description here."}
      </p>
      <a href="#contact" class="class-button open-calendar">More calendar info</a>
      <div class="admin-actions" style="display: none">
        <button class="edit-btn admin-action-btn">Edit</button>
        <button class="delete-btn admin-action-btn">Delete</button>
      </div>
    `;

    // Add event listeners
    this.addClassEventListeners(classCard, index);
    return classCard;
  }

  // Add event listeners to class cards
  addClassEventListeners(classCard, index) {
    const editBtn = classCard.querySelector(".edit-btn");
    const deleteBtn = classCard.querySelector(".delete-btn");
    const editableElements = classCard.querySelectorAll(".editable");

    if (editBtn) {
      editBtn.addEventListener("click", () =>
        this.handleClassEdit(classCard, index, editBtn, editableElements)
      );
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => this.handleClassDelete(index));
    }
  }

  // Handle class editing
  async handleClassEdit(classCard, index, editBtn, editableElements) {
    if (!this.isEditing) {
      // Start editing
      this.isEditing = true;
      editBtn.textContent = "Save";
      editBtn.classList.remove("edit-btn");
      editBtn.classList.add("save-btn");
      editBtn.style.backgroundColor = "#10b981";

      editableElements.forEach((element) => {
        element.setAttribute("contenteditable", "true");
      });
    } else {
      // Save changes
      const updatedClass = this.extractClassData(classCard);
      this.data.classes[index] = updatedClass;

      const success = await this.saveData("classes", this.data.classes);

      if (success) {
        this.isEditing = false;
        editBtn.textContent = "Edit";
        editBtn.classList.remove("save-btn");
        editBtn.classList.add("edit-btn");
        editBtn.style.backgroundColor = "#3b82f6";

        editableElements.forEach((element) => {
          element.setAttribute("contenteditable", "false");
        });
      } else {
        alert("Failed to save changes. Please try again.");
      }
    }
  }

  // Extract class data from DOM
  extractClassData(classCard) {
    const title = classCard.querySelector('[data-field="title"]').textContent;
    const date = classCard.querySelector('[data-field="date"]').textContent;
    const time = classCard.querySelector('[data-field="time"]').textContent;
    const location = classCard.querySelector(
      '[data-field="location"]'
    ).textContent;
    const description = classCard.querySelector(
      '[data-field="description"]'
    ).textContent;
    const id = parseInt(classCard.getAttribute("data-class-id"));

    return { id, title, date, time, location, description };
  }

  // Handle class deletion
  async handleClassDelete(index) {
    if (confirm("Are you sure you want to delete this class?")) {
      this.data.classes.splice(index, 1);
      const success = await this.saveData("classes", this.data.classes);

      if (success) {
        this.renderClasses();
      } else {
        alert("Failed to delete class. Please try again.");
      }
    }
  }

  // Add new class
  async addNewClass() {
    const newClass = {
      id: Date.now(),
      title: "New Class",
      date: "Day",
      time: "Time",
      location: "Location",
      description: "Enter class description here.",
    };

    this.data.classes.push(newClass);
    const success = await this.saveData("classes", this.data.classes);

    if (success) {
      this.renderClasses();
    } else {
      alert("Failed to add new class. Please try again.");
    }
  }

  // Render about section
  renderAbout() {
    // This would update the about section content if needed
    // For now, the content is static in HTML
  }

  // Render pricing section
  renderPricing() {
    // This would update the pricing section content if needed
    // For now, the content is static in HTML
  }

  // Render FAQ section
  renderFAQ() {
    // This would update the FAQ section content if needed
    // For now, the content is static in HTML
  }

  // Render calendar
  renderCalendar() {
    // This would update the calendar content if needed
    // For now, the content is static in HTML
  }
}

// Initialize data manager
const dataManager = new DataManager();

// ===== LOGIN SYSTEM =====

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

  if (username === "JustynaSuzukiece" && password === "qtmc!KetfZT49vG") {
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
        const offsetTop = classesSection.offsetTop - 80;
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

// Privacy Policy Modal Functionality
const privacyModal = document.getElementById("privacyPolicyModal");
const privacyBtn = document.getElementById("privacyPolicyBtn");
const closePrivacyBtn = document.querySelector(".close-privacy");

// Open privacy policy modal
privacyBtn.addEventListener("click", () => {
  privacyModal.style.display = "block";
  document.body.style.overflow = "hidden";
});

// Close privacy policy modal when X is clicked
closePrivacyBtn.addEventListener("click", () => {
  privacyModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close privacy policy modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === privacyModal) {
    privacyModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Check if user is already logged in
function checkLoginStatus() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    enableAdminFeatures();
  } else {
    // Hide logout button if not logged in
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) logoutButton.style.display = "none";
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

  if (adminControls) adminControls.style.display = "none";
  adminActions.forEach((action) => {
    action.style.display = "none";
  });
  if (logoutButton) logoutButton.style.display = "none";

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
  dataManager.isEditing = false;
}

// Enable admin features
function enableAdminFeatures() {
  const adminControls = document.getElementById("adminControls");
  const adminActions = document.querySelectorAll(".admin-actions");
  const logoutButton = document.getElementById("logoutButton");

  // Show admin controls
  if (adminControls) adminControls.style.display = "block";

  // Show admin action buttons
  adminActions.forEach((action) => {
    action.style.display = "flex";
  });

  // Show logout button
  if (logoutButton) logoutButton.style.display = "block";
}

// ===== CALENDAR MODAL =====

// Classes Calendar Modal logic
(function setupClassesCalendarModal() {
  const modal = document.getElementById("classesCalendarModal");
  if (!modal) return;

  const openButtons = document.querySelectorAll(".open-calendar");
  const closeBtn = modal.querySelector(".close-calendar");
  const monthsContainer = document.getElementById("calendarMonths");
  const editBtn = document.getElementById("calendarEditBtn");

  function monthKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}`;
  }

  function loadMonthData(key) {
    try {
      return JSON.parse(localStorage.getItem(`months-${key}`) || "null");
    } catch {
      return null;
    }
  }

  function saveMonthData(key, list) {
    localStorage.setItem(`months-${key}`, JSON.stringify(list));
  }

  function defaultMonthDates(date) {
    return [];
  }

  function renderMonths() {
    monthsContainer.innerHTML = "";
    const now = new Date();

    for (let i = 0; i < 12; i++) {
      const dt = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const key = monthKey(dt);
      let monthDates = loadMonthData(key) || [];

      if (monthDates.length > 5) monthDates = monthDates.slice(0, 5);
      while (monthDates.length < 5) monthDates.push("");

      const wrapper = document.createElement("div");
      wrapper.className = "calendar-month";

      const title = document.createElement("h4");
      title.textContent = dt.toLocaleString(undefined, {
        month: "long",
        year: "numeric",
      });

      const list = document.createElement("ul");
      list.className = "calendar-dates";

      for (let idx = 0; idx < 5; idx++) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.className = "date-text";
        span.textContent = monthDates[idx] || "";
        span.setAttribute("data-index", idx.toString());
        li.appendChild(span);
        list.appendChild(li);
      }

      wrapper.appendChild(title);
      wrapper.appendChild(list);
      monthsContainer.appendChild(wrapper);
    }

    // Toggle contenteditable on spans when editing
    const editing =
      editBtn?.dataset.mode === "editing" &&
      localStorage.getItem("isLoggedIn") === "true";

    monthsContainer.querySelectorAll(".date-text").forEach((el) => {
      el.setAttribute("contenteditable", editing ? "true" : "false");
      if (editing) {
        el.addEventListener(
          "blur",
          (e) => {
            const span = e.target;
            const newVal = (span.textContent || "").trim();
            const wrapper = span.closest(".calendar-month");
            if (!wrapper) return;

            const title = wrapper.querySelector("h4")?.textContent || "";
            const dt = new Date(title);
            const key = monthKey(dt);
            const list = loadMonthData(key) || defaultMonthDates(dt);
            const idx = parseInt(span.getAttribute("data-index") || "0", 10);
            list[idx] = newVal || "";
            saveMonthData(key, list);
          },
          { once: true }
        );
      }
    });
  }

  function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const adminBar = modal.querySelector(".calendar-admin-actions");
    if (adminBar) adminBar.style.display = loggedIn ? "flex" : "none";

    editBtn.dataset.mode = "view";
    editBtn.textContent = "Edit";
    renderMonths();
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  openButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    })
  );

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (localStorage.getItem("isLoggedIn") !== "true") return;

      const mode = editBtn.dataset.mode === "editing" ? "view" : "editing";
      editBtn.dataset.mode = mode;
      editBtn.textContent = mode === "editing" ? "Save" : "Edit";
      renderMonths();
    });
  }
})();

// ===== INITIALIZATION =====

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Load all data from server
  await dataManager.loadAllData();

  // Add event listener to add class button
  const addClassBtn = document.getElementById("addClassBtn");
  if (addClassBtn) {
    addClassBtn.addEventListener("click", () => dataManager.addNewClass());
  }

  // Add event listener to logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  // Check login status on page load
  checkLoginStatus();
});

// Auto-logout on page reload/refresh
window.addEventListener("beforeunload", () => {
  // Clear login state when page is about to be unloaded (including reloads)
  localStorage.removeItem("isLoggedIn");
});
