document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0; // 0-based index into slides array

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlideEl = document.querySelector('.total-slides');
    const dotsContainer = document.querySelector('.slide-dots');

    // Update total count display
    if (totalSlideEl) totalSlideEl.textContent = totalSlides;

    // Create sleek progress bar instead of individual dots for massive decks
    dotsContainer.innerHTML = `
        <div class="progress-track" style="width: 200px; height: 4px; background: #e0e0e0; border-radius: 4px; cursor: pointer; position: relative; overflow: hidden;">
            <div class="progress-fill" style="height: 100%; width: 0%; background: #007D99; border-radius: 4px; transition: width 0.3s ease;"></div>
        </div>
    `;
    
    // Allow clicking the track to navigate
    const track = dotsContainer.querySelector('.progress-track');
    if (track) {
        track.addEventListener('click', (e) => {
            const rect = track.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const targetIndex = Math.round(percentage * (totalSlides - 1));
            goToSlide(targetIndex);
        });
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides || index === currentIndex) return;

        // Remove active from current slide
        slides[currentIndex].classList.remove('active');

        // Add active to new slide
        currentIndex = index;
        slides[currentIndex].classList.add('active');

        updateUI();
    }

    function updateUI() {
        // Update counter (1-based display)
        currentSlideEl.textContent = String(currentIndex + 1).padStart(2, '0');

        // Update progress bar
        const fill = document.querySelector('.progress-fill');
        if (fill) {
            const maxIndex = Math.max(1, totalSlides - 1);
            const percentage = (currentIndex / maxIndex) * 100;
            fill.style.width = `${percentage}%`;
        }

        // Update buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;

        // Hide corner brand and draft bar on fullbleed slides only
        const cornerBrand = document.querySelector('.corner-brand');
        const draftBar = document.querySelector('.draft-bar');
        const activeSlide = slides[currentIndex];
        const isFullbleed = activeSlide && activeSlide.hasAttribute('data-fullbleed');
        if (cornerBrand) {
            cornerBrand.style.display = isFullbleed ? 'none' : 'block';
        }
        if (draftBar) {
            draftBar.style.display = isFullbleed ? 'none' : 'flex';
        }
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        if (currentIndex > 0) goToSlide(currentIndex - 1);
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

