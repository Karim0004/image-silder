/* eslint-disable no-param-reassign */
export default function ImageSlider(...imageSources) {
  if (imageSources.length < 1) return null;

  const slider = document.createElement('div');

  slider.style.minHeight = '150px';
  slider.style.minWidth = '200px';
  slider.style.maxWidth = '1000px';
  slider.style.maxHeight = '750px';
  slider.style.aspectRatio = '1.5 / 1';
  slider.style.width = '100%';
  slider.style.position = 'relative';
  slider.style.padding = '0 36px';
  slider.style.boxSizing = 'border-box';

  const frame = document.createElement('div');
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.width = 'max-content';
  container.style.height = '100%';

  frame.appendChild(container);
  slider.appendChild(frame);

  frame.style.overflow = 'hidden';
  frame.style.width = '100%';
  frame.style.margin = '0 auto';
  frame.style.height = '95%';

  // default settings
  let controlsColors = '#6b7280';
  let slidingTimer = 5000;
  let transitionSpeed = 600;
  let transitionFunc = 'ease-in-out';

  // checking for settings input
  for (const param of imageSources) {
    if (typeof param === 'object') {
      
      if (typeof param.color === 'string') {
        controlsColors = param.color; 
      }
      if (typeof param.slidingTimer === 'number') {
        slidingTimer = param.slidingTimer;
      } else if (param.slidingTimer === false) {
        slidingTimer = false;
      }
      if (typeof param.transitionFunc === 'string') {
        transitionFunc = param.transitionFunc;
      }
      if (typeof param.transitionSpeed === 'number') {
        transitionSpeed = param.transitionSpeed;
      }
      break;
    }
  };

  // creating slider items/images
  const items = [];
  imageSources.forEach((source) => {
    if (typeof source === 'string') {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.justifyContent = 'center';
      item.style.alignItems = 'center';
      item.style.transition = `transform 
      ${transitionSpeed}ms ${transitionFunc}`;;

      item.style.height = '100%';
      item.style.aspectRatio = '1 / 1';

      const image = document.createElement('img');
      image.src = source;
      image.style.maxHeight = '100%';
      image.style.maxWidth = '90%';
      image.style.borderRadius = '12px';

      items.push(item);
      item.appendChild(image);
      container.appendChild(item);
    } 
  });

  // sliding functionality
  let currentSlide = 0;
  container.style.transition = `transform 
  ${transitionSpeed}ms ${transitionFunc}`;

  function showSlide(slide) {
    if (items.length < 1) return;
    container.style.transform = `translateX(${
      -(slide * items[slide].offsetWidth)
      + ((frame.offsetWidth / 2)
      - (items[slide].offsetWidth / 2))
    }px)`;
    currentSlide = slide;

    // make adjacent slides smaller
    if (currentSlide > 0 && items[currentSlide - 1]) {
      items[currentSlide - 1].style.transform = `scale(0.5)
      translateX(45%)`;
    }
    if (currentSlide < items.length - 1 && items[currentSlide + 1]) {
      items[currentSlide + 1].style.transform = `scale(0.5)
      translateX(-45%)`;
    }
    items[currentSlide].style.transform = '';

    selectedCircle(currentSlide);
  }

  function nextSlide() {
    // if at last slide return to first slide
    if ((currentSlide >= items.length - 1)
      || (currentSlide < 0)) {
      showSlide(0);
      return;
    }
    // show next slide
    showSlide(currentSlide + 1);
  }

  function previousSlide() {
    // if at last slide return to first slide
    if ((currentSlide > items.length - 1)
      || (currentSlide <= 0)) {
      showSlide(items.length - 1);
      return;
    }
    // show previous slide
    showSlide(currentSlide - 1);
  }

  // sliding buttons
  const previous = document.createElement('div');
  previous.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
  height="48" width="48" viewBox ="0 0 48 48" >
  <path d="M28.05 36 16 23.95 28.05 
  11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>`;
  previous.style.position = 'absolute';
  previous.style.top = 'calc(50% - 24px';
  previous.style.left = '12%';
  previous.firstChild.style.width = '100%';
  previous.firstChild.style.height = '100%';
  previous.style.width = '10%';
  previous.style.aspectRatio = '1 / 1';
  previous.firstChild.style.fill = controlsColors;
  previous.style.transition = 'all 0.2s ease-in-out';
  previous.style.borderRadius = '50%'



  const next = document.createElement('div');
  next.innerHTML = `<svg xmlns= "http://www.w3.org/2000/svg" 
  height="48" width="48" viewBox ="0 0 48 48">
  <path d="m18.75 36-2.15-2.15 
  9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"/></svg>`;
  next.style.position = 'absolute';
  next.style.top = 'calc(50% - 24px';
  next.style.right = '12%';
  next.firstChild.style.width = '100%';
  next.firstChild.style.height = '100%';
  next.style.width = '10%';
  next.style.aspectRatio = '1 / 1';
  next.firstChild.style.fill = controlsColors;
  next.style.transition = 'all 0.2s ease-in-out';
  next.style.borderRadius = '50%'

  // adding hover effects to navigation buttons
  const hoverEnlarge = function () {
    this.style.transform = 'scale(1.2)';
  }

  const unhover = function () {
    this.style.transform = '';
  }

  const flashButton = function () {
    const button = this;
    button.style.backgroundColor =controlsColors;
    button.style.opacity = '0.5';
  setTimeout(() => {
    button.style.backgroundColor = '';
    button.style.opacity = '';
  }, 200);
  }

  next.onmouseover = hoverEnlarge;
  previous.onmouseover = hoverEnlarge;
  next.onmouseleave = unhover;
  previous.onmouseleave = unhover;
  previous.onmousedown = flashButton;
  next.onmousedown = flashButton;



  // circles representing the slides for quick navigation
  const sliderCircles = document.createElement('div');
  sliderCircles.style.display = 'flex';
  sliderCircles.style.gap = '12px';
  sliderCircles.style.justifyContent = 'center';
  sliderCircles.style.alignItems = 'center';
  sliderCircles.style.height = '5%';

  const circles = []
  for (let i = 0; i < items.length; i++) {
    const circle = document.createElement('div');
    circle.style.height = '50%';
    circle.style.minHeight = '12px'
    circle.style.aspectRatio = '1 / 1';
    circle.style.borderRadius = '50%';
    circle.style.border = `1px solid ${controlsColors}`;
    circle.style.transition = `background 
    ${transitionSpeed}ms ${transitionFunc}`;
    circle.onclick = () => {
      showSlide(i);
    }
    sliderCircles.appendChild(circle);
    circles.push(circle);
  }

  function selectedCircle (slideNumber) {
    
    // reseting any circle selected
    circles.forEach((circle) => {
      circle.style.backgroundColor = '';
    });

    // setting new circle selection
    circles[slideNumber].style.backgroundColor = controlsColors;
  }

  // binding buttons
  next.onclick = nextSlide;
  previous.onclick = previousSlide;

  slider.append(previous, next, sliderCircles);

  setTimeout(() => showSlide(currentSlide), 10);
  
  if (typeof slidingTimer === `number`) {
    setInterval(nextSlide, slidingTimer);
  }

  return slider;
}
