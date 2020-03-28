"use strict";
import { Wizard } from './wizard-module.js';

(function () {
  let isInvalidElement = (element) => element === null || element === undefined;

  let parent = document.getElementById("wizard");
  let prevBtn = document.getElementById('prev');
  let nextBtn = document.getElementById('next');

  if (isInvalidElement(parent)){
    throw new ReferenceError("Not found elements with id 'wizard'!")
  }
  if (isInvalidElement(prevBtn)){
    throw new ReferenceError("Not found button with id 'prev'!")
  }
  if (isInvalidElement(nextBtn)){
    throw new ReferenceError("Not found button with id 'next'!")
  }

  let circles = parent.getElementsByClassName('circle');
  if (circles.length === 0) {
    throw new ReferenceError("Not found elements with class 'circle'!")
  }

  let wizard = new Wizard(circles);
  wizard.setInitParams();
  prevBtn.onclick = wizard.onPrevClick;
  nextBtn.onclick = wizard.onNextClick;
})()