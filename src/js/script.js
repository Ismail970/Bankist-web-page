'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector(".header");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(openBtn => openBtn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = 'We use cookied to improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

document.body.append(message);

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
});

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = "120%";

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section = document.querySelector("#section--1");

// smooth scrolling button
btnScrollTo.addEventListener("click", () => section.scrollIntoView({ behavior: "smooth" }));

// page navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  // matching startegy
  if (e.target.classList.contains("nav__link")) {
    // prevent default html navigation
    e.preventDefault();
    // get the links
    const id = e.target.getAttribute("href");
    // select section id based on the link and scroll into it smoothly
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  // getting closest parent with this class
  const clicked = e.target.closest('.operations__tab');

  // guard clause "finishs code is the condition is true"
  if (!clicked) return;

  // active tab
  tabs.forEach(t => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // activate click tab's content
  tabsContent.forEach(c => c.classList.remove("operations__content--active"));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

// Menu fade animation
const nav = document.querySelector(".nav");
const handleHover = function (e) {
  // matching strategey "targeting only clicked el with this class"
  if (e.target.classList.contains("nav__link")) {
    // getting the clicked el
    const link = e.target;
    // selecting links inside nav container
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    // selecting logo inside nav container
    const logo = link.closest(".nav").querySelector("img");

    // loop and add opacity to evey link thas is not what i'm hovering on
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    // add opacity to logo
    logo.style.opacity = this;
  }
};

// add opacity on hover
nav.addEventListener("mouseover", handleHover.bind(0.5));
// remove opacity
nav.addEventListener("mouseout", handleHover.bind(1));

// sticky navigation
const section1 = document.querySelector("#section--1");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// reveal sections
const allSections = document.querySelectorAll('.section');

const revealSections = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // remove hidden class for earch intersectitng target
  entry.target.classList.remove("section--hidden");
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

// lazy loading
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  // remove blur whene image is loaded
  entry.target.addEventListener("load", () => entry.target.classList.remove("lazy-img"));
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
});

imgTargets.forEach(img => imgObserver.observe(img));

// slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  let curSlide = 0;
  const maxSlides = slides.length;
  const dotContainer = document.querySelector(".dots");

  // slider dots
  const createDots = function () {
    // creating dot buttons for each slide
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  // making clicked dots active
  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  };

  // set slides one besides the other by add 100% * the index of the current slide
  const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);
  };

  const nextSlide = function () {
    // if the current slider is equal to sliders length then stop
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      // increase the slide
      curSlide++;
    };
    // subtract 100% from the current slide by the index number
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    };
  });
};

slider();