let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let container, slides, dots;

    if (document.querySelector(".desktop-nav").offsetParent !== null) {
        container = document.querySelector(".desktop-nav");
        slides = container.getElementsByClassName("slide-desktop");
        dots = container.getElementsByClassName("dot-desktop");
    } else {
        container = document.querySelector(".phone-nav");
        slides = container.getElementsByClassName("slide-phone");
        dots = container.getElementsByClassName("dot-phone");
    }

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    if (container) {
        container.querySelector(".slideshow-container").style.minHeight = slides[0].offsetHeight + "px";
    }

    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;
}
