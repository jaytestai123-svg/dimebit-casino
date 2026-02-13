/**
 * BetBoost500 Landing Page JavaScript
 */

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initCountdown();
  initFormNavigation();
  initAccordion();
  initLiveWinnerAlerts();
  initScrollAnimation();
  initMobileMenu();
  
  // Track form submissions
  document.getElementById('signup-form').addEventListener('submit', handleFormSubmit);
});

/**
 * Countdown Timer
 */
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;
  
  // Set countdown for 24 hours from now (or from page load)
  let hours = 23;
  let minutes = 59;
  let seconds = 59;
  
  const countdownInterval = setInterval(() => {
    seconds--;
    
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
    
    if (minutes < 0) {
      minutes = 59;
      hours--;
    }
    
    if (hours < 0) {
      clearInterval(countdownInterval);
      // Reset to show 00:00:00 when expired
      countdownEl.textContent = "00:00:00";
      // Optionally add expired class for styling
      countdownEl.classList.add('expired');
      return;
    }
    
    // Format with leading zeros
    countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

/**
 * Form Steps Navigation
 */
function initFormNavigation() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  
  const nextButtons = form.querySelectorAll('.next-step');
  const prevButtons = form.querySelectorAll('.prev-step');
  const formSteps = form.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const progressLines = document.querySelectorAll('.progress-line');
  
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find current active step
      const currentStep = form.querySelector('.form-step.active');
      const currentIndex = Array.from(formSteps).indexOf(currentStep);
      
      // Validate current step
      if (!validateStep(currentStep)) return;
      
      // Hide current step
      currentStep.classList.remove('active');
      
      // Show next step
      formSteps[currentIndex + 1].classList.add('active');
      
      // Update progress indicator
      updateProgress(currentIndex + 1);
      
      // Scroll to top of form
      form.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find current active step
      const currentStep = form.querySelector('.form-step.active');
      const currentIndex = Array.from(formSteps).indexOf(currentStep);
      
      // Hide current step
      currentStep.classList.remove('active');
      
      // Show previous step
      formSteps[currentIndex - 1].classList.add('active');
      
      // Update progress indicator
      updateProgress(currentIndex - 1);
    });
  });
  
  function validateStep(step) {
    const inputs = step.querySelectorAll('input, select');
    let isValid = true;
    
    // Remove existing error messages
    const errorMessages = step.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
    
    // Check each input
    inputs.forEach(input => {
      input.classList.remove('error');
      
      // Skip inputs that aren't required
      if (!input.hasAttribute('required')) return;
      
      // Check if empty
      if (!input.value.trim()) {
        input.classList.add('error');
        addErrorMessage(input, 'This field is required');
        isValid = false;
        return;
      }
      
      // Email validation
      if (input.type === 'email' && !isValidEmail(input.value)) {
        input.classList.add('error');
        addErrorMessage(input, 'Please enter a valid email address');
        isValid = false;
        return;
      }
      
      // Password validation
      if (input.type === 'password' && input.value.length < 8) {
        input.classList.add('error');
        addErrorMessage(input, 'Password must be at least 8 characters');
        isValid = false;
        return;
      }
      
      // Phone validation
      if (input.type === 'tel' && !isValidPhone(input.value)) {
        input.classList.add('error');
        addErrorMessage(input, 'Please enter a valid phone number');
        isValid = false;
        return;
      }
      
      // ZIP code validation
      if (input.id === 'zipCode' && !isValidZip(input.value)) {
        input.classList.add('error');
        addErrorMessage(input, 'Please enter a valid 5-digit ZIP code');
        isValid = false;
        return;
      }
    });
    
    return isValid;
  }
  
  function addErrorMessage(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
  }
  
  function updateProgress(activeIndex) {
    progressSteps.forEach((step, index) => {
      if (index <= activeIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
    
    // Update progress lines
    progressLines.forEach((line, index) => {
      if (index < activeIndex) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });
  }
  
  // Validation helper functions
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function isValidPhone(phone) {
    return /^[\d\s\(\)\-\+]{10,15}$/.test(phone);
  }
  
  function isValidZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
  }
}

/**
 * FAQ Accordion
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      // Close all other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

/**
 * Live Winner Notifications
 */
function initLiveWinnerAlerts() {
  const winnersContainer = document.getElementById('live-winners');
  if (!winnersContainer) return;
  
  // Sample data for winner alerts
  const winners = [
    { name: 'Michael J.', amount: '$1,850', game: 'Lakers game' },
    { name: 'Sarah T.', amount: '$750', game: 'NFL parlay' },
    { name: 'David M.', amount: '$2,400', game: 'UFC fight' },
    { name: 'Anna K.', amount: '$1,200', game: 'MLB spread' },
    { name: 'Robert P.', amount: '$3,100', game: 'NBA playoffs' },
    { name: 'Lisa G.', amount: '$950', game: 'Tennis match' },
    { name: 'James W.', amount: '$1,500', game: 'Soccer game' },
    { name: 'Jennifer B.', amount: '$2,800', game: 'NHL moneyline' }
  ];
  
  // Initial notifications (2 random winners)
  for (let i = 0; i < 2; i++) {
    const winner = winners[Math.floor(Math.random() * winners.length)];
    createWinnerAlert(winner, i * 2);
  }
  
  // Add new notification every 20-30 seconds
  setInterval(() => {
    const winner = winners[Math.floor(Math.random() * winners.length)];
    createWinnerAlert(winner, 0);
    
    // Remove oldest notification if there are more than 3
    const notifications = winnersContainer.querySelectorAll('.winner-alert');
    if (notifications.length > 3) {
      const oldest = notifications[notifications.length - 1];
      oldest.classList.add('fade-out');
      setTimeout(() => {
        oldest.remove();
      }, 500);
    }
  }, Math.random() * 10000 + 20000); // Random between 20-30 seconds
  
  function createWinnerAlert(winner, minutesAgo) {
    const timeString = minutesAgo === 0 ? 'Just now' : `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    const bgColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    
    const winnerElement = document.createElement('div');
    winnerElement.className = 'winner-alert';
    winnerElement.innerHTML = `
      <div class="winner-avatar" style="background-color: ${bgColor}"></div>
      <div class="winner-text">
        <p><strong>${winner.name}</strong> just won <span class="highlight">${winner.amount}</span> on ${winner.game}</p>
        <small>${timeString}</small>
      </div>
    `;
    
    winnersContainer.prepend(winnerElement);
  }
}

/**
 * Scroll Animation
 */
function initScrollAnimation() {
  const elements = document.querySelectorAll('.step, .feature-card, .testimonial, .stat');
  
  // Add initial hidden class
  elements.forEach(el => {
    if (!isInViewport(el)) {
      el.classList.add('hidden');
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
  });
  
  // Check on scroll
  window.addEventListener('scroll', () => {
    elements.forEach(el => {
      if (isInViewport(el) && el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Trigger once on load
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 500);
  
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }
}

/**
 * Form Submission Handler
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Simulate form submission
  const form = event.target;
  const submitButton = form.querySelector('.submit-form');
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = 'Processing...';
  
  // Collect form data
  const formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  
  // Add UTM parameters from cookies
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'referrer'];
  utmParams.forEach(param => {
    const value = getCookie(param);
    if (value) {
      formObject[param] = value;
    }
  });
  
  // Track conversion
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead', {
      'event_category': 'conversion',
      'event_label': 'signup'
    });
  }
  
  // Simulate API call
  setTimeout(() => {
    console.log('Form submitted:', formObject);
    
    // Redirect to DimeBit affiliate link
    window.location.href = 'https://dimebit.com/register?ref=dimebit_casino_landing';
  }, 1500);
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

/**
 * Mobile Menu Functions
 */
function initMobileMenu() {
  // Close mobile menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  
  toggle.classList.toggle('active');
  menu.classList.toggle('active');
}

function closeMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  
  toggle.classList.remove('active');
  menu.classList.remove('active');
}