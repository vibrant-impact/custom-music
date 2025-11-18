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

function showVideo(e, videoUrl) {
    e.preventDefault(); 
    e.stopPropagation();

    let embedUrl = '';

    // 1. Check if the URL is from YouTube
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        // Assume the URL is already in the correct /embed/ format from the HTML fix.
        // We just need to ensure autoplay is added.
        embedUrl = `${videoUrl.split('?')[0]}?autoplay=1`;
    } 
    // 2. Otherwise, treat it as a Vimeo URL (your original logic)
    else if (videoUrl.includes('vimeo.com')) {
        const urlParts = videoUrl.split('/');
        const videoId = urlParts.pop() || urlParts.pop();
        // Construct the Vimeo embed URL
        embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
    }

    if (embedUrl) {
        // Set the calculated embed URL and show the lightbox
        $('#lightboxVideoPlayer').attr('src', embedUrl);
        $('#videoLightbox').addClass('active');
    }
}

function hideVideo() {
    $('#videoLightbox').removeClass('active');
    // Stop the video from playing when closing the lightbox
    $('#lightboxVideoPlayer').attr('src', '');
}

$(document).on('keydown', function(e) {
    if (e.key === "Escape") { 
        hideVideo();
    }
});