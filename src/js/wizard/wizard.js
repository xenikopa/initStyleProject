"use strict";
import { Wizard } from './wizard-module.js';

(function () {
  let isInvalidElement = (element) => element === null || element === undefined;

  let parent = document.getElementById("wizard");
  let prevBtn = document.getElementById('prev');
  let nextBtn = document.getElementById('next');
  let forms = document.getElementById('forms');

  if (isInvalidElement(parent)){
    throw new ReferenceError("Not found elements with id 'wizard'!")
  }
  if (isInvalidElement(prevBtn)){
    throw new ReferenceError("Not found button with id 'prev'!")
  }
  if (isInvalidElement(nextBtn)){
    throw new ReferenceError("Not found button with id 'next'!")
  }
  if (isInvalidElement(forms)){
    throw new ReferenceError("Not found blocks with id 'forms'!")
  }

  let circles = parent.getElementsByClassName('circle');
  if (circles.length === 0) {
    throw new ReferenceError("Not found elements with class 'circle'!")
  }

  let wizard = new Wizard(circles, forms);
  wizard.setInitParams();
  prevBtn.onclick = wizard.onPrevClick;
  nextBtn.onclick = wizard.onNextClick;
})()