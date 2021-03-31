const tasksRenderer = (state) => {
  const container = document.querySelector('[data-container="tasks"]');
  const [active, ] = state.lists.filter((list) => list.active);
  const activeTasks = state.tasks
    .filter((task) => task.listId === active.id)
    .map((task) => `<li>${task.value}</li>`).join('');
  const ul = `<ul>${activeTasks}</ul>`;
  container.innerHTML = ul;
};

const listsRenderer = (state) => {
  const container = document.querySelector('[data-container="lists"]');
  const lists = state.lists.map((list) => {
    if (list.active) {
      return `<li><b>${list.value}</b></li>`;
    }
    return `<li><a href="#${list.value.toLowerCase()}">${list.value}</a></li>`
  }).join('');
  const ul = `<ul>${lists}</ul>`;
  container.innerHTML = ul;
  const inactiveLists = document.querySelectorAll('a');
  inactiveLists.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      state.lists.forEach((list) => {
        list.active = list.value === e.target.innerHTML;
      });
      listsRenderer(state);
      tasksRenderer(state);
    });
  });
};

const remState = {
  lists: [
    {
      id: 1,
      value: 'General',
      active: true,
    },
  ],
  tasks: [],
};

const listForm = document.querySelector('[data-container="new-list-form"]');
const taskForm = document.querySelector('[data-container="new-task-form"]');

listForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newList = {
    id: Math.random().toString(36).substr(2, 5),
    value: formData.get('name'),
    active: false,
  };
  remState.lists.push(newList);
  listsRenderer(remState);
  e.target.reset();
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const [active, ] = remState.lists.filter((list) => list.active);
  const newTask = {
    id: Math.random().toString(36).substr(2, 5),
    listId: active.id,
    value: formData.get('name'),
  }
  remState.tasks.push(newTask);
  tasksRenderer(remState);
  e.target.reset();
})

listsRenderer(remState);
tasksRenderer(remState);