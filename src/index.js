/* eslint-disable no-param-reassign */
export default function ImageSlider(...imageSources) {
  const slider = document.createElement('div');
  slider.style.minHeight = '150px';
  slider.style.minWidth = '200px';
  slider.style.maxWidth = '1000px';
  slider.style.maxHeight = '750px';
  slider.style.backgroundColor = '#eeeeee';
  slider.style.aspectRatio = '1.5 / 1';
  slider.style.width = '100%';

  const frame = document.createElement('div');
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.width = 'max-content';
  container.style.height = '100%';
  frame.appendChild(container);
  slider.appendChild(frame);

  frame.style.overflow = 'hidden';
  frame.style.width = '90%';
  frame.style.margin = '0 auto';
  frame.style.height = '90%';

  const items = [];
  imageSources.forEach((source) => {
    if (typeof source === 'string') {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.justifyContent = 'center';
      item.style.alignItems = 'center';
      item.style.backgroundColor = '#cccccc';
      item.style.height = '100%';
      item.style.aspectRatio = '1 / 1';

      const image = document.createElement('img');
      image.src = source;
      image.style.maxHeight = '100%';
      image.style.maxWidth = '80%';
      image.style.borderRadius = '12px';

      items.push(item);
      item.appendChild(image);
      container.appendChild(item);
    }
  });

  return slider;
}
