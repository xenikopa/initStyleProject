export const Wizard = function (circles) {
  let _circles = circles;
  let _step = 0;
  let _state = {
    active: 'active', completed: 'completed'
  }
  const pipe = (...funcs) => v => {
    return funcs.reduce((res, func) => {
      return func(res);
    }, v);
  };

  this.setInitParams = () => {
    changeActive(_step);
  }

  this.onPrevClick = () => {
    if (_step === 0) {
      return;
    }
    _step = pipe(
      changeActive,
      decrementStep,
      changeComplete,
      changeActive
    )(_step)
  }

  this.onNextClick = () => {
    if (_step === (_circles.length - 1)) {
      return;
    }
    _step = pipe(
      changeActive,
      changeComplete,
      incrementStep,
      changeActive
    )(_step)
  }

  let changeActive = (index) => pipe(
    getElement,
    toggleClassActive,
    mapTo(index)
  )(index)
  let mapTo = (x) => () => x;
  let changeComplete = (index) => pipe(
    getElement,
    toggleClassComplete,
    mapTo(index)
  )(index)

  let getElement = (index) => _circles[index];

  let incrementStep = (step) => step + 1;
  let decrementStep = (step) => step - 1;

  let toggleClassComplete = (element) => element.classList.toggle(_state.completed)
  let toggleClassActive = (element) => element.classList.toggle(_state.active);
}

