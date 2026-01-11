document.addEventListener('DOMContentLoaded', () => {
    // Console Signature
    console.log(
        '%c Observer:0 %c Online ',
        'background: #000; color: #fff; padding: 4px; border-radius: 4px 0 0 4px;',
        'background: #333; color: #fff; padding: 4px; border-radius: 0 4px 4px 0;'
    );

    // Fade-in Animation on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger Text Scramble for headers
                const header = entry.target.querySelector('h2');
                if (header) {
                    scrambleText(header);
                }
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Text Scramble Function
    function scrambleText(element) {
        if (element.dataset.scrambling === 'true') return;

        const originalText = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        let iterations = 0;

        element.dataset.scrambling = 'true';

        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);
                element.dataset.scrambling = 'false';
            }

            iterations += 1 / 3;
        }, 30);
    }

    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button'); // Removed .track-item from here to handle manually
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Track Item Accordion & Cursor Logic
    const trackItems = document.querySelectorAll('.track-item');

    trackItems.forEach(item => {
        // Cursor Effect
        item.addEventListener('mouseenter', () => cursor.classList.add('active'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('active'));

        // Accordion Click
        item.addEventListener('click', (e) => {
            // Prevent triggering if clicking links inside
            if (e.target.closest('.track-links')) return;

            const isActive = item.classList.contains('active');
            const details = item.querySelector('.track-details');

            // Close all others
            trackItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherDetails = otherItem.querySelector('.track-details');
                    if (otherDetails) otherDetails.style.maxHeight = null;
                }
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                details.style.maxHeight = details.scrollHeight + "px";

                // Slight delay to scroll into view smoothly
                setTimeout(() => {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            } else {
                item.classList.remove('active');
                details.style.maxHeight = null;
            }
        });
    });

    // Glitch Effect Randomizer (Subtle)
    const title = document.querySelector('h1');
    if (title) {
        setInterval(() => {
            // Apply a very quick skew effect randomly
            if (Math.random() > 0.95) {
                title.style.transform = `skewX(${Math.random() * 10 - 5}deg)`;
                title.style.opacity = 0.8;
                setTimeout(() => {
                    title.style.transform = 'skewX(0deg)';
                    title.style.opacity = 1;
                }, 50 + Math.random() * 100);
            }
        }, 2000);
    }
});
