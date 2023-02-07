// #Variables
// Get Slider Items | Array.form [ES6 Feature]
let sliderItems = Array.from(document.images);
// Get Slides Number
let slidesCount = sliderItems.length;
// Set Current Slide
let currentSlide = 1;

// Catch elements
let slideNumShow = document.getElementById("slide-number");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

// Create container of slides number bullets
let bulletsParent = document.createElement("ul");
// Create slides bullets
for (let i = 1; i <= sliderItems.length; i++) {
  let bullet = document.createElement("li");
  bullet.setAttribute("data-index", `${i}`);
  bullet.innerHTML = i;

  bulletsParent.appendChild(bullet);
}
// Add elements to the page
document.getElementById("indicators").appendChild(bulletsParent);

// List of bullets
let bulletsList = Array.from(bulletsParent.children);

// #Events
// Change slides by press next & previous buttons
nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;
// Change slides by press bullets
bulletsList.forEach((bullet) => {
  bullet.onclick = function () {
    currentSlide = +bullet.dataset.index;
    theChecker();
  };
});
// Change slides using keyboard arrows
document.onkeyup = (e) =>
  e.key === "ArrowRight"
    ? nextSlide()
    : e.key === "ArrowLeft"
    ? prevSlide()
    : false;

// Trigger theChecker function
theChecker();

// #Functions
// Next slide function
function nextSlide() {
  currentSlide !== slidesCount ? currentSlide++ : false;
  // Change to the next slide
  theChecker();
}

// Previous slide function
function prevSlide() {
  currentSlide !== 1 ? currentSlide-- : false;
  // Change to the previous slide
  theChecker();
}

// The checker function
function theChecker() {
  // Set slides count
  slideNumShow.textContent = `Slides #${currentSlide} Of ${slidesCount}`;

  // Remove active class form previous slide
  sliderItems.forEach((slide) => slide.classList.remove("active"));
  // Set active class to current slide
  sliderItems[currentSlide - 1].classList.add("active");

  // Remove active class form previous bullet
  bulletsList.forEach((bullet) => bullet.classList.remove("active"));
  // Set active class to current bullet
  bulletsList[currentSlide - 1].classList.add("active");

  // Disabled buttons at first and last slide
  // Disabled next button
  currentSlide === slidesCount
    ? nextBtn.classList.add("disabled")
    : nextBtn.classList.remove("disabled");
  // Disabled previuos button
  currentSlide === 1
    ? prevBtn.classList.add("disabled")
    : prevBtn.classList.remove("disabled");
}
