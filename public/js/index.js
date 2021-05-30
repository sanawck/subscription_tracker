let eventsName;
let eventsCost;
let eventsDesc;
let saveEventsBtn;
let newEventsBtn;
let eventsList;

if (window.location.pathname === '/views/profile') {
   eventsName = document.querySelector('.events-name');
   eventsCost = document.querySelector('.events-cost');
   eventsDesc = document.querySelector('.events-desc');
   saveEventsBtn = document.querySelector('.save-event');
   newEventsBtn = document.querySelector('.new-events');
   eventsList = document.querySelectorAll('.list-container .list-group');
 }

// // Show an element
const show = (elem) => {
   elem.style.display = 'inline';
 };

// // Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// // activeNote is used to keep track of the note in the textarea
let activeEvents = {};

const getEvents = () =>
  fetch('/api/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveEvents = (events) =>
  fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteEvents = (id) =>
  fetch(`/api/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveEvents = () => {
  hide(saveEventsBtn);

  if (activeEvents.id) {
    eventsName.setAttribute('readonly', true);
    eventsCost.setAttribute('readonly', true);
    eventsDesc.setAttribute('readyonly', true);
    eventsName.value = activeEvents.event_name;
    eventsCost.value = activeEvents.total_cost;
    eventsDesc.value = activeEvents.description;
   } else {
    eventsName.value = '';
    eventsCost.value = '';
    eventsDesc.value = '';
   }
 };

 const handleEventsSave = () => {
   const newEvents = {
    event_name: eventsName.value,
    description: eventsDesc.value,  
    total_cost: eventsCost.value,
  };
  saveEvents(newEvents).then(() => {
    getAndRenderEvents();
    renderActiveEvents();
  });
};

 // Delete the clicked note
 const handleEventsDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
   e.stopPropagation();

  const events = e.target;
  const eventsId = JSON.parse(events.parentElement.getAttribute('data-events')).id;

  if (activeEvents.id === eventsId) {
    activeEvents = {};
  }

  deleteEvents(eventsId).then(() => {
    getAndRenderEvents();
    renderActiveEvents();
  });
};

// // Sets the activeEvents and displays it
const handleEventsView = (e) => {
  e.preventDefault();
  activeEvents = JSON.parse(e.target.parentElement.getAttribute('data-events'));
  renderActiveEvents();
};

// // Sets the activeEvents to and empty object and allows the user to enter a new note
const handleNewEventsView = (e) => {
  activeEvents = {};
  renderActiveEvents();
};

const handleRenderSaveBtn = () => {
  if (!eventsName.value.trim() || !eventsDesc.value.trim() || !eventsCost.value.trim()) {
    hide(saveEventsBtn);
  } else {
    show(saveEventsBtn);
  }
};

// // Render the list of events names
const renderEventsList = async (events) => {
  let jsonEvents = await events.json();
  if (window.location.pathname === '/views/profile') {
    eventsList.forEach((el) => (el.innerHTML = ''));
  }

   let eventsListItems = [];

//   // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('events-list');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleEventsView);

     liEl.append(spanEl);

     if (delBtn) {
       const delBtnEl = document.createElement('i');
       delBtnEl.classList.add(
         'fas',
         'fa-trash-alt',
         'float-right',
         'text-danger',
         'delete-events'
       );
       delBtnEl.addEventListener('click', handleEventsDelete);

       liEl.append(delBtnEl);
     }

     return liEl;
   };

   if (jsonEvents.length === 0) {
     eventsListItems.push(createLi('No saved Events', false));
   }

   jsonEvents.forEach((events) => {
     const li = createLi(events.name);
     li.dataset.events = JSON.stringify(events);

     eventsListItems.push(li);
   });

   if (window.location.pathname === '/views/profile') {
     eventsListItems.forEach((events) => eventsList[0].append(events));
   }
 };

// // Gets events from the db and renders them to the sidebar
 const getAndRenderEvents = () => getEvents().then(renderEventsList);

 if (window.location.pathname === '/views/profile') {
   saveEventsBtn.addEventListener('click', handleEventsSave);
   newEventsBtn.addEventListener('click', handleNewEventsView);
   eventsName.addEventListener('keyup', handleRenderEventsBtn);
   eventsDesc.addEventListener('keyup', handleRenderSaveBtn);
 }

 getAndRenderEvents();


