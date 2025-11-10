// JavaScript for Scroll-Triggered Fade-In Effect

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Select all elements that should fade in
    const fadeElements = document.querySelectorAll('.videoCard, .credibilityCard');
    
    // Check for modern browser support
    if ('IntersectionObserver' in window) {
        
        // 2. Define the observer options
        const observerOptions = {
            root: null, // relative to the viewport (default)
            rootMargin: '0px',
            // Threshold of 0.1 means the animation triggers when the element is 10% visible
            threshold: 0.1 
        };

        // 3. Callback function to handle intersections
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the 'is-visible' class to trigger the CSS transition (0.6s fade-in)
                    entry.target.classList.add('is-visible');
                    
                    // Stop observing the element once it has been revealed
                    observer.unobserve(entry.target);
                }
            });
        };

        // 4. Create the Intersection Observer instance
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // 5. Start observing each element
        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
    } else {
        // Fallback for very old browsers: just make everything visible immediately
        fadeElements.forEach(element => {
            element.classList.add('is-visible');
        });
    }
});