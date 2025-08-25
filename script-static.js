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

// Local storage functions for classes
function loadClassesFromStorage() {
  try {
    const stored = localStorage.getItem("suzukiClasses");
    if (stored) {
      return JSON.parse(stored);
    }
    // Return default classes if nothing stored
    return [
      {
        id: "1",
        title: "Suzuki Class 1",
        date: "Saturday 11th of October",
        time: "9:00 - 10:00",
        location: "Allegro Suzuki Music School",
        description:
          "This is a class for children with parents. Everyone is welcome to join.",
      },
      {
        id: "2",
        title: "Suzuki Class 2",
        date: "Saturday 11th of October",
        time: "10:15 - 11:15",
        location: "Allegro Suzuki Music School",
        description:
          "This is a class for children with parents. Everyone is welcome to join.",
      },
    ];
  } catch (error) {
    console.error("Error loading classes from storage:", error);
    return [];
  }
}

function saveClassesToStorage(classes) {
  try {
    localStorage.setItem("suzukiClasses", JSON.stringify(classes));
    return true;
  } catch (error) {
    console.error("Error saving classes to storage:", error);
    return false;
  }
}

// Local storage functions for calendar
function loadCalendarFromStorage() {
  try {
    const stored = localStorage.getItem("suzukiCalendar");
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error loading calendar from storage:", error);
    return {};
  }
}

function saveCalendarToStorage(calendar) {
  try {
    localStorage.setItem("suzukiCalendar", JSON.stringify(calendar));
    return true;
  } catch (error) {
    console.error("Error saving calendar to storage:", error);
    return false;
  }
}

// Function to render classes from data
function renderClassesFromData(classes) {
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
      <div class="details">
        <div class="detail">
          <i class="fas fa-calendar"></i>
          <span class="editable" contenteditable="false">${classData.date}</span>
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
      <div class="admin-actions" style="display: none;">
        <button class="edit-btn admin-action-btn">Edit</button>
        <button class="delete-btn admin-action-btn">Delete</button>
      </div>
    `;

    classesGrid.appendChild(classCard);
    addClassEventListeners(classCard);
  });

  // Set up calendar buttons after rendering classes
  setupCalendarButtons();
}

// Load classes on page load
function loadClasses() {
  const classes = loadClassesFromStorage();
  renderClassesFromData(classes);
}

// Add new class functionality
function addNewClass() {
  const newClassData = {
    id: Date.now().toString(),
    title: "New Class",
    date: "Day",
    time: "Time",
    location: "Location",
    description: "Enter class description here.",
  };

  const classesGrid = document.getElementById("classesGrid");
  const newClassCard = document.createElement("div");
  newClassCard.className = "class-card";
  newClassCard.setAttribute("data-class-id", newClassData.id);

  newClassCard.innerHTML = `
    <div class="class-header">
      <h3 class="editable" contenteditable="false">${newClassData.title}</h3>
    </div>
    <div class="details">
      <div class="detail">
        <i class="fas fa-calendar"></i>
        <span class="editable" contenteditable="false">${newClassData.date}</span>
      </div>
      <div class="detail">
        <i class="fas fa-clock"></i>
        <span class="editable" contenteditable="false">${newClassData.time}</span>
      </div>
      <div class="detail">
        <i class="fas fa-map-marker-alt"></i>
        <span class="editable" contenteditable="false">${newClassData.location}</span>
      </div>
    </div>
    <p class="class-description editable" contenteditable="false">
      ${newClassData.description}
    </p>
    <a href="#" class="class-button open-calendar">More calendar info</a>
    <div class="admin-actions" style="display: flex;">
      <button class="edit-btn admin-action-btn">Edit</button>
      <button class="delete-btn admin-action-btn">Delete</button>
    </div>
  `;

  classesGrid.appendChild(newClassCard);
  addClassEventListeners(newClassCard);

  // Set up calendar buttons for the new class
  setupCalendarButtons();

  // Save the new class to storage
  try {
    const currentClasses = loadClassesFromStorage();
    currentClasses.push(newClassData);
    saveClassesToStorage(currentClasses);
  } catch (error) {
    console.error("Error saving new class:", error);
  }
}

// Add event listeners to class cards
function addClassEventListeners(classCard) {
  const editBtn = classCard.querySelector(".edit-btn");
  const deleteBtn = classCard.querySelector(".delete-btn");
  const editableElements = classCard.querySelectorAll(".editable");

  // Edit functionality
  editBtn.addEventListener("click", async () => {
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

      // Save changes to storage
      try {
        const classId = classCard.getAttribute("data-class-id");
        const title = classCard.querySelector(".class-header h3").textContent;
        const date = classCard.querySelector(
          ".detail:nth-child(1) span"
        ).textContent;
        const time = classCard.querySelector(
          ".detail:nth-child(2) span"
        ).textContent;
        const location = classCard.querySelector(
          ".detail:nth-child(3) span"
        ).textContent;
        const description =
          classCard.querySelector(".class-description").textContent;

        const updatedClass = {
          id: classId,
          title: title,
          date: date,
          time: time,
          location: location,
          description: description,
        };

        const currentClasses = loadClassesFromStorage();
        const classIndex = currentClasses.findIndex((c) => c.id === classId);

        if (classIndex !== -1) {
          currentClasses[classIndex] = updatedClass;
          saveClassesToStorage(currentClasses);
        }
      } catch (error) {
        console.error("Error saving class changes:", error);
        alert("Failed to save changes. Please try again.");
      }
    }
  });

  // Delete functionality
  deleteBtn.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this class?")) {
      try {
        const classId = classCard.getAttribute("data-class-id");
        const currentClasses = loadClassesFromStorage();
        const updatedClasses = currentClasses.filter((c) => c.id !== classId);
        saveClassesToStorage(updatedClasses);
        classCard.remove();
      } catch (error) {
        console.error("Error deleting class:", error);
        alert("Failed to delete class. Please try again.");
      }
    }
  });
}

// Classes Calendar Modal logic
function setupClassesCalendarModal() {
  const modal = document.getElementById("classesCalendarModal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".close-calendar");
  const monthsContainer = document.getElementById("calendarMonths");
  const editBtn = document.getElementById("calendarEditBtn");

  function monthKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}`;
  }

  function loadMonthData(key) {
    try {
      const calendarData = loadCalendarFromStorage();
      return calendarData[key] || [];
    } catch {
      return [];
    }
  }

  function saveMonthData(key, list) {
    try {
      const calendarData = loadCalendarFromStorage();
      calendarData[key] = list;
      saveCalendarToStorage(calendarData);
    } catch (error) {
      console.error("Error saving calendar data:", error);
    }
  }

  function defaultMonthDates(date) {
    // Provide 5 completely empty entries by default
    return [];
  }

  function renderMonths() {
    // Prevent multiple simultaneous renders
    if (isRenderingMonths) {
      console.log("Render already in progress, skipping...");
      return;
    }

    isRenderingMonths = true;

    try {
      // Clear the container completely to prevent duplication
      if (monthsContainer) {
        // Remove all child elements to ensure complete clearing
        while (monthsContainer.firstChild) {
          monthsContainer.removeChild(monthsContainer.firstChild);
        }
        console.log("Calendar months container completely cleared");
      } else {
        console.error("Months container not found!");
        return;
      }

      const now = new Date();
      console.log("Rendering months starting from:", now.toLocaleString());

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

      console.log(
        "Finished rendering months. Total months rendered:",
        monthsContainer.children.length
      );

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
    } catch (error) {
      console.error("Error rendering months:", error);
    } finally {
      isRenderingMonths = false;
    }
  }

  function openModal() {
    // Prevent multiple modal opens
    if (modal.style.display === "block") {
      console.log("Modal already open, skipping...");
      return;
    }

    console.log("Opening calendar modal...");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Show edit button only when logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const adminBar = modal.querySelector(".calendar-admin-actions");
    if (adminBar) adminBar.style.display = loggedIn ? "flex" : "none";
    editBtn.dataset.mode = "view";
    editBtn.textContent = "Edit";

    // Render months only once when opening
    renderMonths();
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Set up event listeners for modal elements
  closeBtn?.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  editBtn?.addEventListener("click", () => {
    if (localStorage.getItem("isLoggedIn") !== "true") return;
    const mode = editBtn.dataset.mode === "editing" ? "view" : "editing";
    editBtn.dataset.mode = mode;
    editBtn.textContent = mode === "editing" ? "Save" : "Edit";

    // Only re-render if we're switching to editing mode to avoid duplication
    if (mode === "editing") {
      console.log("Switching to edit mode, re-rendering months...");
      renderMonths();
    }
  });

  // Return the openModal function so it can be called from outside
  return { openModal };
}

// Global variable to store the calendar modal functions
let calendarModalFunctions = null;
let isRenderingMonths = false; // Flag to prevent multiple simultaneous renders

// Function to set up calendar button event listeners
function setupCalendarButtons() {
  const openButtons = document.querySelectorAll(".open-calendar");
  if (openButtons.length > 0 && calendarModalFunctions) {
    openButtons.forEach((btn) => {
      // Remove any existing event listeners
      btn.removeEventListener("click", calendarModalFunctions.openModal);
      // Add new event listener
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        calendarModalFunctions.openModal();
      });
    });
  }
}

// Add event listeners to existing class cards
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize calendar modal first
  calendarModalFunctions = setupClassesCalendarModal();

  // Load classes from storage
  loadClasses();

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
