// JavaScript code for carousel functionality
function initializeCarousel() {
    const carouselItems = document.querySelectorAll("[data-carousel-item]");
    const slideIndicators = document.querySelectorAll("[data-carousel-slide-to]");
    const prevButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");
    let currentSlide = 0;

    function showSlide(slideIndex) {
        carouselItems.forEach((item, index) => {
            if (index === slideIndex) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });

        slideIndicators.forEach((indicator, index) => {
            indicator.setAttribute("aria-current", index === slideIndex ? "true" : "false");
        });

        currentSlide = slideIndex;
    }

    function goToNextSlide() {
        const nextSlide = (currentSlide + 1) % carouselItems.length;
        showSlide(nextSlide);
    }

    function goToPrevSlide() {
        const prevSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        showSlide(prevSlide);
    }

    prevButton.addEventListener("click", goToPrevSlide);
    nextButton.addEventListener("click", goToNextSlide);

    // Show the first slide initially
    showSlide(0);
}

function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            contentArea.innerHTML = data;
            // After loading the content, initialize the carousel if it's a testimonials page
            if (url.includes('testimonials.html')) {
                initializeCarousel();
            }
            // Store the last visited page URL in localStorage
            localStorage.setItem('lastVisitedPage', url);
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}


const navLinks = document.querySelector('.nav-links');
function onToggleMenu(e) {
    e.name = e.name === 'menu' ? 'close' : 'menu';
    navLinks.classList.toggle('top-[9%]');
}

const navigationLinks = document.querySelectorAll('.nav-links a');
const contentArea = document.querySelector('.content-area');

// Function to load home.html into the content area
function loadHomePage() {
    // Get the last visited page URL from localStorage
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');
    // If a last visited page is found, load it. Otherwise, load the home page by default.
    const defaultPage = '/views/home.html';
    const urlToLoad = lastVisitedPage ? lastVisitedPage : defaultPage;

    fetch(urlToLoad)
        .then(response => response.text())
        .then(data => {
            contentArea.innerHTML = data;
            // After loading the content, initialize the carousel if it's a testimonials page
            if (urlToLoad.includes('testimonials.html')) {
                initializeCarousel();
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

// Call the function to load the home page by default upon page load
loadHomePage();

navigationLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        // Load the content of the clicked screen into the content area
        loadContent(link.href);
    });
});
