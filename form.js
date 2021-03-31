formState = {
  name: {
    clicked: false,
    value: '',
  },
  email: {
    clicked: false,
    value: '',
  },
};


const formRender = (state) => {
  const divs = document.querySelectorAll('div[data-editable-target]');
  divs.forEach((div) => {
    const target = div.dataset.editableTarget;
    const value = state[target].value === '' ? '' : state[target].value;
    const form = `<form data-target="${target}">
      <input type="text" value="${value}" name="${target}">
      <input type="submit" value="Save">
    </form>`;
    if (state[target].value === '' && !state[target].clicked) {
      div.innerHTML = `<i>${target}</i>`;
    } else if (state[target].clicked) {
      div.innerHTML = form;
      const submitForm = div.querySelector('form');
      submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        state[target].value = formData.get(target);
        state[target].clicked = false;
        formRender(state);
      })
    } else if (state[target].value !== '') {
      div.innerHTML = state[target].value;
    }
  });
};

/* const formSubmit = (form) => {
  const target = form.dataset.target;
  const formData = new FormData(form);
  formState[target].value = formData.get(target);
  formState[target].clicked = false;
  formRender(formState);
}; */

const divs = document.querySelectorAll('div[data-editable-target]');
divs.forEach((div) => {
  div.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
      return;
    }
    console.log(div.dataset.editableTarget, e.target.dataset.editableTarget, e.target.tagName)
    const target = e.target.dataset.editableTarget;
    formState[target].clicked = true;
    formRender(formState);
  });
});

formRender(formState);

