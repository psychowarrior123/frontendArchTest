const companies = [
  { id: 1, name: 'Hexlet', description: 'online courses' },
  { id: 2, name: 'Google', description: 'search engine' },
  { id: 3, name: 'Facebook', description: 'social network' },
];

const companiesState = {
  created: false,
  uiState: [
    { companyId: 1, visibility: false },
    { companyId: 2, visibility: false },
    { companyId: 3, visibility: false },
  ],
};

const container = document.querySelector('#container');

const companiesRender = () => {
  const buttonsDiv = document.createElement('div');
  const renderedCompanies = companies.map((item) => `<button class="btn btn-primary button">${item.name}</button>`).join('\n');
  buttonsDiv.innerHTML = renderedCompanies;
  container.appendChild(buttonsDiv);
};

const descriptionRender = (state) => {
  const target = state.uiState.filter((item) => item.visibility);
  const id = target.length !== 0 ? target[0].companyId : null;
  console.log(id)
  const company = companies.filter((item) => item.id === id);
  const description = company.length !== 0 ? company[0].description : null;
  console.log(company)
  if (!state.created) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerHTML = description ? description : '';
    container.appendChild(descriptionDiv);
    state.created = true;
  } else {
    container.childNodes[1].innerHTML = description ? description : '';
  }
};

companiesRender(companiesState);
const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const [company, ] = companies.filter((item) => item.name === e.target.innerHTML);
    companiesState.uiState.forEach((item) => {
      if (item.companyId === company.id) {
        item.visibility = !item.visibility;
      } else {
        item.visibility = false;
      }
    })
    descriptionRender(companiesState);
  })
});

