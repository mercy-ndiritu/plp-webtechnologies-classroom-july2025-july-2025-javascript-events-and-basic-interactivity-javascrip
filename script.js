// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Counter Game Functionality
const counterElement = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');
const gameMessage = document.getElementById('game-message');

let count = 0;

function updateCounter() {
    counterElement.textContent = count;
    
    // Game logic
    if (count === 10) {
        gameMessage.textContent = 'Congratulations! You reached 10!';
        gameMessage.style.color = 'var(--success-color)';
    } else if (count > 10) {
        gameMessage.textContent = 'You went over 10! Try again.';
        gameMessage.style.color = 'var(--error-color)';
    } else {
        gameMessage.textContent = '';
    }
}

incrementBtn.addEventListener('click', function() {
    count++;
    updateCounter();
});

decrementBtn.addEventListener('click', function() {
    count--;
    updateCounter();
});

resetBtn.addEventListener('click', function() {
    count = 0;
    updateCounter();
    gameMessage.textContent = '';
});

// FAQ Section Functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const toggle = this.querySelector('.faq-toggle');
        
        // Toggle the 'show' class on the answer
        answer.classList.toggle('show');
        
        // Update the toggle symbol
        toggle.textContent = answer.classList.contains('show') ? '−' : '+';
    });
});

// Form Validation Functionality
const form = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const successMessage = document.getElementById('success-message');

// Validate name field
nameInput.addEventListener('input', function() {
    if (this.value.length >= 2) {
        nameError.style.display = 'none';
        this.style.borderColor = '#ddd';
    }
});

// Validate email field
emailInput.addEventListener('input', function() {
    if (isValidEmail(this.value)) {
        emailError.style.display = 'none';
        this.style.borderColor = '#ddd';
    }
});

// Validate password field
passwordInput.addEventListener('input', function() {
    if (isValidPassword(this.value)) {
        passwordError.style.display = 'none';
        this.style.borderColor = '#ddd';
    }
});

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Validate name
    if (nameInput.value.length < 2) {
        nameError.style.display = 'block';
        nameInput.style.borderColor = 'var(--error-color)';
        isValid = false;
    }
    
    // Validate email
    if (!isValidEmail(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = 'var(--error-color)';
        isValid = false;
    }
    
    // Validate password
    if (!isValidPassword(passwordInput.value)) {
        passwordError.style.display = 'block';
        passwordInput.style.borderColor = 'var(--error-color)';
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        successMessage.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            successMessage.style.display = 'none';
        }, 3000);
    }
});

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate password strength
function isValidPassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}