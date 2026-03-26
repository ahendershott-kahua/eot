document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 1;

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentSlideEl = document.querySelector('.current-slide');
    const dotsContainer = document.querySelector('.slide-dots');

    // Create dots
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `slide-dot${i === 1 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function goToSlide(n) {
        if (n < 1 || n > totalSlides || n === currentSlide) return;

        // Remove active from current slide
        const currentEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
        currentEl.classList.remove('active');

        // Add active to new slide
        currentSlide = n;
        const newEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
        newEl.classList.add('active');

        updateUI();
    }

    function updateUI() {
        // Update counter
        currentSlideEl.textContent = String(currentSlide).padStart(2, '0');

        // Update dots
        const dots = document.querySelectorAll('.slide-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === currentSlide);
        });

        // Update buttons
        prevBtn.disabled = currentSlide === 1;
        nextBtn.disabled = currentSlide === totalSlides;

        // Hide corner brand and draft bar on title slide and fullbleed slides
        const cornerBrand = document.querySelector('.corner-brand');
        const draftBar = document.querySelector('.draft-bar');
        const activeSlide = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
        const isFullbleed = activeSlide && activeSlide.hasAttribute('data-fullbleed');
        const isTitle = currentSlide === 1;
        if (cornerBrand) {
            cornerBrand.style.display = (isTitle || isFullbleed) ? 'none' : 'block';
        }
        if (draftBar) {
            draftBar.style.display = (isTitle || isFullbleed) ? 'none' : 'flex';
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        if (currentSlide > 1) goToSlide(currentSlide - 1);
    }

    // Button clicks
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            prevSlide();
        }
    });

    // Initialize
    updateUI();
});
