const laptops = [
  {
    model: 'v1', processor: 'intel', frequency: 1.7, memory: 16,
  },
  {
    model: 'd3', processor: 'intel', frequency: 3.5, memory: 8,
  },
  {
    model: 'd2', processor: 'amd', frequency: 2.5, memory: 16,
  },
];

const predicates = {
  eq: (value) => (el) => String(el) === String(value),
  gte: (value) => (el) => (el) >= Number(value),
  lte: (value) => (el) => (el) <= Number(value),
};
 
const filterItems = (query, items) => {
  const fields = Object.keys(query);
  const activeFields = fields.filter((field) => query[field]);
  const result = activeFields.reduce((acc, field) => {
    const [name, predicateName] = field.split('_');
    const match = predicates[predicateName];
    return acc.filter((item) => match(query[field])(item[name]));
  }, items);
  return result;
};
 
const lapRender = (state) => {
  const resultElement = document.querySelector('.result');
  const filteredLaptops = filterItems(state.filter, laptops);
  if (filteredLaptops.length === 0) {
    resultElement.innerHTML = '';
    return;
  }
  const html = `<ul>${filteredLaptops.map((n) => `<li>${n.model}</li>`).join('')}</ul>`;
  resultElement.innerHTML = html;
};
 
const state = {
  filter: {
    processor_eq: null,
    memory_eq: null,
    frequency_gte: null,
    frequency_lte: null,
  },
};
 
const items = [
  { name: 'processor_eq', eventType: 'change' },
  { name: 'memory_eq', eventType: 'change' },
  { name: 'frequency_gte', eventType: 'input' },
  { name: 'frequency_lte', eventType: 'input' },
];
items.forEach(({ name, eventType }) => {
  const element = document.querySelector(`[name="${name}"]`);
  element.addEventListener(eventType, ({ target }) => {
    state.filter[target.name] = target.value === '' ? null : target.value;
    lapRender(state);
  });
});
lapRender(state);

// OR MAYBE THIS
/* const laptops = [
  {
    model: 'v1', processor: 'intel', frequency: 1.7, memory: 16,
  },
  {
    model: 'd3', processor: 'intel', frequency: 3.5, memory: 8,
  },
  {
    model: 'd2', processor: 'amd', frequency: 2.5, memory: 16,
  },
];

const render = (state) => {
  const container = document.querySelector('.result');
  const ul = document.createElement('ul');

  container.innerHTML = '';
  ul.innerHTML = '';

  const filters = {
    memory: (item) => {
      return state.memory_eq ? item.memory === +state.memory_eq : true;
    },
    processor: (item) => {
      return state.processor_eq ? item.processor === state.processor_eq : true;
    },
    frequency: (item) => {
      const lte = +state.frequency_lte || Infinity;
      const gte = +state.frequency_gte || 0;

      return item.frequency <= lte && item.frequency >= gte;
    },
  };

  laptops
    .filter(filters.memory)
    .filter(filters.processor)
    .filter(filters.frequency)
    .map((i) => {
      const li = document.createElement('li');
      li.innerHTML = i.model;
      return li;
    })
    .forEach((li) => {
      ul.appendChild(li);
    });

  if (ul.innerHTML !== '') container.appendChild(ul);
};

const form = document.querySelector('#laptops');

const state = {};

form.addEventListener('input', (e) => {
  state[e.target.name] = e.target.value;
  render(state);
});

render(state); */



//FUCK THIS SHIT
/* const laptops = [
  {
    model: 'v1', processor: 'intel', frequency: 1.7, memory: 16,
  },
  {
    model: 'd3', processor: 'intel', frequency: 3.5, memory: 8,
  },
  {
    model: 'd2', processor: 'amd', frequency: 2.5, memory: 16,
  },
];

const lapRender = (laptops) => {
  const result = document.querySelector('.result');
  const ul = document.createElement('ul');
  laptops.forEach((laptop) => {
    const li = document.createElement('li');
    li.textContent = laptop.model;
    ul.appendChild(li);
  })
  result.innerHTML = '';
  if (ul.innerHTML !== '') {
    result.appendChild(ul);
  }
}

const state = {
  processor: '',
  memory: '',
  frequency: { min: '', max: '' },
};

const isEmpty = (state) => Object.values(state).filter((value) => value !== '' && (value.min !== '' || value.max !== '')).length === 0;

const selects = document.querySelectorAll('select');
const freqInputs = document.querySelectorAll('.input');
const min = document.querySelector('input[name=frequency_gte]');
const max = document.querySelector('input[name=frequency_lte]');

const filter = (state) => laptops.filter((laptop) => {
  const { processor, memory, frequency } = state;
  const actualKeys = Object.keys(state).filter((key) => state[key] !== '' && (state[key].min !== '' || state[key].max !== ''));
  if (!actualKeys.includes('frequency')) {
    if (processor === '') {
      return laptop.memory.toString() === memory;
    }
    if (memory === '') {
      return laptop.processor === processor;
    }
    return laptop.memory.toString() === memory && laptop.processor === processor;
  }
  if (frequency.min === '' && actualKeys.includes('frequency')) {
    if (processor === '' && memory !== '') {
      return laptop.memory.toString() === memory && laptop.frequency <= parseInt(frequency.max);
    }
    if (memory === '' && processor !== '') {
      return laptop.processor === processor && laptop.frequency <= parseInt(frequency.max);
    }
    if (processor === '' && memory === '') {
      return laptop.frequency <= parseInt(frequency.max);
    }
    return laptop.frequency <= parseInt(frequency.max) && laptop.memory.toString() === memory && laptop.processor === processor;
  }
  if (frequency.max === '' && actualKeys.includes('frequency')) {
    if (processor === '' && memory !== '') {
      return laptop.memory.toString() === memory && laptop.frequency >= parseInt(frequency.min);
    }
    if (memory === '' && processor !== '') {
      return laptop.processor === processor && laptop.frequency >= parseInt(frequency.min);
    }
    if (processor === '' && memory === '') {
      return laptop.frequency >= parseInt(frequency.min);
    }
    return laptop.frequency >= parseInt(frequency.min) && laptop.memory.toString() === memory && laptop.processor === processor;
  }
  if (processor === '' && memory !== '') {
    return laptop.memory.toString() === memory && laptop.frequency <= parseInt(frequency.max) && laptop.frequency >= parseInt(frequency.min);
  }
  if (memory === '' && processor !== '') {
    return laptop.processor === processor && laptop.frequency <= parseInt(frequency.max) && laptop.frequency >= parseInt(frequency.min);
  }
  if (processor === '' && memory === '') {
    return laptop.frequency <= parseInt(frequency.max) && laptop.frequency >= parseInt(frequency.min);
  }
  return laptop.frequency <= parseInt(frequency.max) && laptop.frequency >= parseInt(frequency.min) && laptop.memory.toString() === memory && laptop.processor === processor;
})

selects.forEach((select) => select.addEventListener('change', (e) => {
  const [name,] = e.target.name.split('_');
  state[name] = e.target.value.toLowerCase();
  isEmpty(state) ? lapRender(laptops) : lapRender(filter(state));
}));

freqInputs.forEach((input) => input.addEventListener('input', (e) => {
  state.frequency.min = min.value;
  state.frequency.max = max.value;
  isEmpty(state) ? lapRender(laptops) : lapRender(filter(state));
}));
isEmpty(state) ? lapRender(laptops) : lapRender(filter(state)); */

