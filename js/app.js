document.addEventListener('DOMContentLoaded', () => {
    
    const fadeElements = document.querySelectorAll('.videoCard, .credibilityCard');
    
    if ('IntersectionObserver' in window) {
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
    } else {
        fadeElements.forEach(element => {
            element.classList.add('is-visible');
        });
    }
});

function showVideo(e, vimeoUrl) {
    e.preventDefault(); 
    e.stopPropagation();

    const urlParts = vimeoUrl.split('/');
    const videoId = urlParts.pop() || urlParts.pop();
    
    const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
    
    $('#lightboxVideoPlayer').attr('src', embedUrl);
    $('#videoLightbox').addClass('active');
}

function hideVideo() {
    $('#videoLightbox').removeClass('active');
    $('#lightboxVideoPlayer').attr('src', '');
}

$(document).on('keydown', function(e) {
    if (e.key === "Escape") { 
        hideVideo();
    }
});