const render = (state, input, form, result) => {
  result.textContent = state;
  form.reset();
  //input.focus();
};

const result = document.querySelector('#result');
const form = document.querySelector('#calc');
const input = document.querySelector('input[name=number]');
const reset = document.querySelector('button');
let counter = 0;
//input.focus();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  counter += parseInt(input.value, 10);
  render(counter, input, form, result);
});
reset.addEventListener('click', () => {
  counter = 0;
  render(counter, input, form, result);
});