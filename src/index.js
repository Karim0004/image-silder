/* eslint-disable no-param-reassign */
export default function ImageSlider(...imageSources) {
  if (imageSources.length < 1) return null;

  const slider = document.createElement('div');

  slider.style.minHeight = '150px';
  slider.style.minWidth = '200px';
  slider.style.maxWidth = '1000px';
  slider.style.maxHeight = '750px';
  slider.style.backgroundColor = '#555555';
  slider.style.aspectRatio = '1.5 / 1';
  slider.style.width = '100%';
  slider.style.position = 'relative';
  slider.style.padding = '0 24px';
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

  const items = [];
  imageSources.forEach((source) => {
    if (typeof source === 'string') {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.justifyContent = 'center';
      item.style.alignItems = 'center';
      item.style.transition = 'transform 600ms ease-in-out';

      item.style.backgroundColor = '#cccccc';

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
  container.style.transition = 'transform 600ms ease-in-out';

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
    // show next slide
    showSlide(currentSlide - 1);
  }

  // sliding buttons
  const previous = document.createElement('div');
  previous.innerHTML = `<svg xmlns=
  "http://www.w3.org/2000/svg" height="48" 
  width="48"><path d="M28.05 36 16 23.95 28.05 
  11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>`;
  previous.style.position = 'absolute';
  previous.style.top = '50%';
  previous.style.left = '0';

  const next = document.createElement('div');
  next.innerHTML = `<svg xmlns=
  "http://www.w3.org/2000/svg" height="48" 
  width="48"><path d="m18.75 36-2.15-2.15 
  9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"/></svg>`;
  next.style.position = 'absolute';
  next.style.top = '50%';
  next.style.right = '0';

  const sliderCircles = document.createElement('div');
  sliderCircles.style.backgroundColor = '#101010';
  sliderCircles.style.height = '5%';

  next.onclick = nextSlide;
  previous.onclick = previousSlide;

  slider.append(previous, next, sliderCircles);

  setTimeout(() => showSlide(currentSlide), 10);
  // setInterval(nextSlide, 5000);

  return slider;
}
