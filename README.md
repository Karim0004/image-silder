# @karim04/image-slider
A javascript package that provides quick and easy-to-use image sliders/carousels
# Installation
Run:
```
npm install --save @karim04/image-slider
```
# Usage
Import the module into your code:
```
import ImageSlider from '@karim04/image-slider';
```

Create and store the slider element using:
```
const myCarousel = ImageSlider(image1Source, image2Source, ...)
```
pass the module all the image sources <em>'strings'</em> you want in the slider as parameters.
# Options
additionally you can modifiy the default options by passing an object to the slider with the options as properties <br>
##### Example:
```
const myCarousel = ImageSlider({color: 'blue', slidingTimer: 4000},
image1Source, image2Source, image3Source, ...);
```

## All Tweakable Options
### color
###### (Default: #6b7280)
takes a string and Sets the color of the navigation buttons
```
const myCarousel = ImageSlider({color: 'blue'}, image1Source, image2Source, image3Source, ...);
```
### slidingTimer
###### (Default: 5000)
takes a number and sets the time between automatic sliding in milliseconds, you can set it to false to disable automatic sliding
```
const myCarousel = ImageSlider({slidingTimer: 5000},
image1Source, image2Source, image3Source, ...);
```
### transitionFunc
###### (Default: 'ease-in-out')
sets the transition function used for some slider elements
```
const myCarousel = ImageSlider({transitionFunc: 'ease-in'}, image1Source, ...)
```

### transitionSpeed
###### (Default: 700)
takes a number and sets the transition speed in milliseconds for some elements
```
const myCarousel = ImageSlider({transitionSpeed: '1000'}, image1Source, ...)
```
