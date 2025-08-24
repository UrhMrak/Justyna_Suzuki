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
// EmailJS Configuration
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

  // Debug logging
  console.log("Template parameters being sent:", templateParams);
  console.log("Subject value:", templateParams.subject);
  console.log("Subject length:", templateParams.subject.length);

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
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_BASE_URL}/auth.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.success) {
      // Store authentication token
      authToken = result.token;
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("isLoggedIn", "true");

      loginMessage.textContent = "Login successful!";
      loginMessage.className = "login-message success";

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
      loginMessage.textContent =
        result.message || "Invalid username or password!";
      loginMessage.className = "login-message error";
    }
  } catch (error) {
    console.error("Login error:", error);
    loginMessage.textContent = "Login failed. Please try again.";
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
  const storedToken = localStorage.getItem("authToken");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn && storedToken) {
    // Validate token with server
    validateToken(storedToken).then((isValid) => {
      if (isValid) {
        authToken = storedToken;
        enableAdminFeatures();
      } else {
        // Token is invalid, clear stored data
        logout();
      }
    });
  } else {
    // Hide logout button if not logged in
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.style.display = "none";
  }
}

// Validate token with server
async function validateToken(token) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth.php?validate=1&token=${encodeURIComponent(token)}`
    );
    const result = await response.json();
    return result.valid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}

// Logout functionality
function logout() {
  // Clear login state and auth token
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("authToken");
  authToken = null;

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

  // Reset classes to default state
  initializeClasses();
}

// Enable admin features
async function enableAdminFeatures() {
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

  // Ensure classes are loaded and displayed
  await initializeClasses();

  // Add export/import functionality
  addDataManagementFeatures();
}

// Add data management features for admins
function addDataManagementFeatures() {
  const adminControls = document.getElementById("adminControls");

  // Create export button
  const exportBtn = document.createElement("button");
  exportBtn.className = "admin-button";
  exportBtn.textContent = "Export Classes";
  exportBtn.style.marginLeft = "10px";
  exportBtn.addEventListener("click", exportClasses);

  // Create import button
  const importBtn = document.createElement("button");
  importBtn.className = "admin-button";
  importBtn.textContent = "Import Classes";
  importBtn.style.marginLeft = "10px";
  importBtn.addEventListener("click", importClasses);

  // Add buttons to admin controls
  adminControls.appendChild(exportBtn);
  adminControls.appendChild(importBtn);
}

// Export classes data
function exportClasses() {
  const classes = loadClasses();
  if (!classes || classes.length === 0) {
    alert("No classes to export.");
    return;
  }

  const dataStr = JSON.stringify(classes, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `suzuki-classes-${
    new Date().toISOString().split("T")[0]
  }.json`;
  link.click();

  URL.revokeObjectURL(url);
}

// Import classes data
function importClasses() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedClasses = JSON.parse(event.target.result);

        if (Array.isArray(importedClasses) && importedClasses.length > 0) {
          if (
            confirm(
              `Import ${importedClasses.length} classes? This will replace current classes.`
            )
          ) {
            saveClasses(importedClasses);
            renderClasses(importedClasses);
            alert("Classes imported successfully!");
          }
        } else {
          alert(
            "Invalid file format. Please select a valid JSON file with classes data."
          );
        }
      } catch (error) {
        alert("Error reading file. Please ensure it's a valid JSON file.");
        console.error("Import error:", error);
      }
    };

    reader.readAsText(file);
  });

  input.click();
}

// Admin functionality for editing classes
let isEditing = false;

// Server API configuration
const API_BASE_URL = "/api";
let authToken = null;

// Load classes from server
async function loadClasses() {
  try {
    const response = await fetch(`${API_BASE_URL}/classes.php`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const classes = await response.json();
    return Array.isArray(classes) ? classes : [];
  } catch (error) {
    console.error("Error loading classes from server:", error);
    // Fallback to default classes
    return getDefaultClasses();
  }
}

// Save classes to server
async function saveClasses(classes) {
  if (!authToken) {
    console.error("No authentication token available");
    return false;
  }

  try {
    // Validate classes data before saving
    if (!Array.isArray(classes)) {
      console.error("Invalid classes data: not an array");
      return false;
    }

    // Ensure each class has required fields
    const validClasses = classes.filter((classData) => {
      return (
        classData &&
        typeof classData.id === "string" &&
        typeof classData.title === "string" &&
        typeof classData.day === "string" &&
        typeof classData.time === "string" &&
        typeof classData.location === "string" &&
        typeof classData.description === "string"
      );
    });

    if (validClasses.length !== classes.length) {
      console.warn("Some classes were invalid and filtered out");
    }

    const response = await fetch(`${API_BASE_URL}/classes.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(validClasses),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error saving classes to server:", error);
    return false;
  }
}

// Get default classes (fallback)
function getDefaultClasses() {
  return [
    {
      id: "1",
      title: "Suzuki Class 1",
      day: "Friday",
      time: "9:00 - 10:00",
      location: "Allegro Suzuki Music School",
      description:
        "This is a class for children with parents. Everyone is welcome to join.",
    },
    {
      id: "2",
      title: "Suzuki Class 2",
      day: "Friday",
      time: "10:15 - 11:15",
      location: "Allegro Suzuki Music School",
      description:
        "This is a class for children with parents. Everyone is welcome to join.",
    },
  ];
}

// Get current classes from DOM
function getCurrentClassesFromDOM() {
  const classCards = document.querySelectorAll(".class-card");
  const classes = [];

  classCards.forEach((card) => {
    const classId = card.getAttribute("data-class-id");
    const title = card.querySelector(".class-header h3").textContent;
    const day = card.querySelector(".detail:nth-child(1) span").textContent;
    const time = card.querySelector(".detail:nth-child(2) span").textContent;
    const location = card.querySelector(
      ".detail:nth-child(3) span"
    ).textContent;
    const description = card.querySelector(".class-description").textContent;

    classes.push({
      id: classId,
      title,
      day,
      time,
      location,
      description,
    });
  });

  return classes;
}

// Render classes from data
function renderClasses(classes) {
  const classesGrid = document.getElementById("classesGrid");
  classesGrid.innerHTML = "";

  classes.forEach((classData) => {
    const classCard = document.createElement("div");
    classCard.className = "class-card";
    classCard.setAttribute("data-class-id", classData.id);

    classCard.innerHTML = `
      <div class="class-header">
        <h3 class="editable" contenteditable="false">${classData.title}</h3>
      </div>
      <div class="class-details">
        <div class="detail">
          <i class="fas fa-calendar"></i>
          <span class="editable" contenteditable="false">${classData.day}</span>
        </div>
        <div class="detail">
          <i class="fas fa-clock"></i>
          <span class="editable" contenteditable="false">${classData.time}</span>
        </div>
        <div class="detail">
          <i class="fas fa-map-marker-alt"></i>
          <span class="editable" contenteditable="false">${classData.location}</span>
        </div>
      </div>
      <p class="class-description editable" contenteditable="false">
        ${classData.description}
      </p>
      <a href="#" class="class-button open-calendar">More calendar info</a>
      <div class="admin-actions" style="display: none">
        <button class="edit-btn admin-action-btn">Edit</button>
        <button class="delete-btn admin-action-btn">Delete</button>
      </div>
    `;

    classesGrid.appendChild(classCard);
    addClassEventListeners(classCard);
  });
}

// Initialize classes on page load
async function initializeClasses() {
  let classes = await loadClasses();

  // If no saved classes, use the default ones
  if (!classes || classes.length === 0) {
    classes = getDefaultClasses();
    // Try to save default classes to server (only if logged in)
    if (authToken) {
      await saveClasses(classes);
    }
  }

  renderClasses(classes);
}

// Add new class functionality
async function addNewClass() {
  const newClassId = Date.now().toString(); // Use timestamp as unique ID

  const newClass = {
    id: newClassId,
    title: "New Class",
    day: "Day",
    time: "Time",
    location: "Location",
    description: "Enter class description here.",
  };

  // Load existing classes, add new one, and save
  let classes = await loadClasses();
  classes.push(newClass);
  const success = await saveClasses(classes);

  if (success) {
    // Re-render all classes
    renderClasses(classes);
  } else {
    alert("Failed to add new class. Please try again.");
  }
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
      });

      // Save changes to server
      const classes = getCurrentClassesFromDOM();
      saveClasses(classes).then((success) => {
        if (success) {
          // Show save confirmation
          const originalText = editBtn.textContent;
          editBtn.textContent = "Saved!";
          editBtn.style.backgroundColor = "#059669";
          setTimeout(() => {
            editBtn.textContent = originalText;
            editBtn.style.backgroundColor = "#3b82f6";
          }, 1500);
        } else {
          // Show error
          editBtn.textContent = "Error!";
          editBtn.style.backgroundColor = "#ef4444";
          setTimeout(() => {
            editBtn.textContent = originalText;
            editBtn.style.backgroundColor = "#3b82f6";
          }, 1500);
        }
      });
    }
  });

  // Delete functionality
  deleteBtn.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this class?")) {
      const classId = classCard.getAttribute("data-class-id");

      // Remove from server
      let classes = await loadClasses();
      classes = classes.filter((c) => c.id !== classId);
      const success = await saveClasses(classes);

      if (success) {
        // Remove from DOM
        classCard.remove();
      } else {
        alert("Failed to delete class. Please try again.");
      }
    }
  });
}

// Add event listeners to existing class cards
document.addEventListener("DOMContentLoaded", async () => {
  // Check login status on page load
  checkLoginStatus();

  // Initialize classes on page load
  await initializeClasses();

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

  // Add event listener for beforeunload to warn about unsaved changes
  window.addEventListener("beforeunload", (e) => {
    if (isEditing) {
      e.preventDefault();
      e.returnValue =
        "You have unsaved changes. Are you sure you want to leave?";
      return e.returnValue;
    }
  });
});

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
    // Provide 5 completely empty entries by default
    return [];
  }

  function renderMonths() {
    monthsContainer.innerHTML = "";
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const dt = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const key = monthKey(dt);
      // Load existing data or start empty
      let monthDates = loadMonthData(key) || [];
      // Ensure exactly 5 items
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

      // Always show 5 list items, but only display text for user-added content
      for (let idx = 0; idx < 5; idx++) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "date-text";
        // Only show text if user has actually added content
        span.textContent = monthDates[idx] || ""; // Show user content or empty
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
            // Save free-form text without validation
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
    // Show edit button only when logged in
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
  closeBtn?.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  editBtn?.addEventListener("click", () => {
    if (localStorage.getItem("isLoggedIn") !== "true") return;
    const mode = editBtn.dataset.mode === "editing" ? "view" : "editing";
    editBtn.dataset.mode = mode;
    editBtn.textContent = mode === "editing" ? "Save" : "Edit";
    renderMonths();
  });
})();
