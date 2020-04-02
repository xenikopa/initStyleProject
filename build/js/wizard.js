/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/js/wizard/wizard-module.js
const Wizard = function (circles, boxForm) {
  let _circles = circles;
  let _boxForm = boxForm;
  let _step = 0;
  let _state = {
    active: 'active',
    completed: 'completed'
  };

  const pipe = (...funcs) => v => {
    return funcs.reduce((res, func) => {
      return func(res);
    }, v);
  };

  this.setInitParams = () => {
    changeActive(_step);
  };

  this.onPrevClick = () => {
    if (_step === 0) {
      return;
    }

    _step = pipe(changeActive, transformBack, decrementStep, changeComplete, changeActive)(_step);
  };

  this.onNextClick = () => {
    if (_step === _circles.length - 1) {
      return;
    }

    _step = pipe(changeActive, changeComplete, incrementStep, transformForvard, changeActive)(_step);
  };

  let changeActive = index => pipe(getElement, toggleClassActive, mapTo(index))(index);

  let changeComplete = index => pipe(getElement, toggleClassComplete, mapTo(index))(index);

  let transformForvard = index => {
    _boxForm.classList.remove(`step${index}`);

    _boxForm.classList.add(`step${index + 1}`);

    return index;
  };

  let transformBack = index => {
    _boxForm.classList.remove(`step${index + 1}`);

    _boxForm.classList.add(`step${index}`);

    return index;
  };

  let getElement = index => _circles[index];

  let incrementStep = step => step + 1;

  let decrementStep = step => step - 1;

  let toggleClassComplete = element => element.classList.toggle(_state.completed);

  let toggleClassActive = element => element.classList.toggle(_state.active);

  let mapTo = x => () => x;
};
// CONCATENATED MODULE: ./src/js/wizard/wizard.js




(function () {
  let isInvalidElement = element => element === null || element === undefined;

  let parent = document.getElementById("wizard");
  let prevBtn = document.getElementById('prev');
  let nextBtn = document.getElementById('next');
  let forms = document.getElementById('forms');

  if (isInvalidElement(parent)) {
    throw new ReferenceError("Not found elements with id 'wizard'!");
  }

  if (isInvalidElement(prevBtn)) {
    throw new ReferenceError("Not found button with id 'prev'!");
  }

  if (isInvalidElement(nextBtn)) {
    throw new ReferenceError("Not found button with id 'next'!");
  }

  if (isInvalidElement(forms)) {
    throw new ReferenceError("Not found blocks with id 'forms'!");
  }

  let circles = parent.getElementsByClassName('circle');

  if (circles.length === 0) {
    throw new ReferenceError("Not found elements with class 'circle'!");
  }

  let wizard = new Wizard(circles, forms);
  wizard.setInitParams();
  prevBtn.onclick = wizard.onPrevClick;
  nextBtn.onclick = wizard.onNextClick;
})();

/***/ })
/******/ ]);