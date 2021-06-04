const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete event");
    }
  }
};

document
  .querySelector('#e-list')
  .addEventListener('click', delButtonHandler);

// async function newEventFormHandler(event) {
//   event.preventDefault();

//   const event_name = document.querySelector('input[name="events-name"]').value;
//   const description = document.querySelector('textarea[name="events-desc"]')
//     .value;
//   const total_cost = document.querySelector('input[name="events-cost"]').value;

//   const response = await fetch(`/api/events`, {
//     method: "POST",
//     body: JSON.stringify({
//       event_name,
//       description,
//       total_cost,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     document.location.replace("/events");
//   } else {
//     alert(response.statusText);
//   }
// }

// document
//   .querySelector("#new-events-form")
//   .addEventListener("submit", newEventFormHandler);
// async function newFormHandler(event) {
//     event.preventDefault();

//     const title = document.querySelector('input[name="events-title"]').value;
//     const description = document.querySelector('input[name="events-desc"]').value;
//     const cost = document.querySelector('input[name="events-cost"]').value;

//     const response = await fetch(`/api/events`, {
//       method: 'POST',
//       body: JSON.stringify({
//         title,
//         description,
//         cost
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (response.ok) {
//       document.location.replace('/events');
//     } else {
//       alert(response.statusText);
//     }
//   };

// document.querySelector('#new-events-form').addEventListener('submit', newFormHandler);

// async function newEventFormHandler(event) {
//     event.preventDefault();
  
//     const event_name = document.querySelector('input[name="events-name"]').value.trim();
//     const description = document.querySelector('input[name="events-desc"]').value.trim();
//     const total_cost = document.querySelector('input[name="events-cost"]').value.trim();
    
//     const response = await fetch(`/api/events`, {
//       method: 'POST',
//       body: JSON.stringify({
//         event_name,
//         description,
//         total_cost
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
  
//     if (response.ok) {
//       document.location.replace('/events');
//     } else {
//       alert(response.statusText);
//     }
//   };
  
// document.querySelector('.new-events-form').addEventListener('submit', newEventFormHandler);