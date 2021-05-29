const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete event");
    }
  }
};

async function newEventFormHandler(event) {
  event.preventDefault();

  const event_name = document.querySelector("#events-name").value;
  const description = document.querySelector("#events-desc").value;
  const total_cost = document.querySelector("#events-cost").value;

  if (event_name && total_cost && description) {
    fetch(`/api/events`, {
      method: "POST",
      body: JSON.stringify({
        event_name,
        description,
        total_cost,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        //refresh the page
        location.reload();
      } else {
        alert(response.statusText);
      }
    });
  } else {
    alert("All fields are required");
  }
}

document
  .querySelector("#create")
  .addEventListener("click", newEventFormHandler);

//when the page loads get all my events
function loadEvents() {
  fetch("/api/events/user")
    .then((response) => response.json())
    .then((data) => {
      //empty the events
      const eventsList = $("#events");
      eventsList.empty();

      //build our list of events
      if (data && data.length > 0) {
        data.forEach((singleEvent) => {
          const rightNow = moment();
          const eventDate = moment(singleEvent.createdAt);
          const days = rightNow.diff(eventDate, "days");

          let text =
            '<a href="#" class="list-group-item list-group-item-action" aria-current="true"><div class="d-flex w-100 justify-content-between">';
          text += `<h5 class="mb-1">${singleEvent.event_name}</h5><small>${days} days ago</small></div>`;
          text += `<p class="mb-1">${singleEvent.description}</p><small>Total Cost: ${singleEvent.total_cost} </small></a>`;
          eventsList.append(text);
          //console.log(text);
        });
      }
    });
}

loadEvents();

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const events_name = document.querySelector("#events-name").value.trim();
//   const total_cost = document.querySelector("#events-cost").value.trim();
//   const description = document.querySelector("#events-desc").value.trim();

//   if (events_name && total_cost && description) {
//     const response = await fetch(`/api/events`, {
//       method: "POST",
//       body: JSON.stringify({ events_name, total_cost, description }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to create event");
//     }
//   }
// };

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/events/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to delete event");
//     }
//   }
// };

// document
//   .querySelector(".new-events-form")
//   .addEventListener("submit", newFormHandler);

// document
//   .querySelector(".events-list")
//   .addEventListener("click", delButtonHandler);
// const newFormHandler = async (event) => {
//     event.preventDefault();

//     const events_name = document.querySelector('#events-name').value.trim();
//     const total_cost = document.querySelector('#events-cost').value.trim();
//     const description = document.querySelector('#events-desc').value.trim();

//     if (events_name && total_cost && description) {
//       const response = await fetch(`/api/events`, {
//         method: 'POST',
//         body: JSON.stringify({ events_name, total_cost, description }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to create event');
//       }
//     }
//   };

//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');

//       const response = await fetch(`/api/events/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete event');
//       }
//     }
//   };

//   document
//     .querySelector('.new-events-form')
//     .addEventListener('submit', newFormHandler);

//   document
//     .querySelector('.events-list')
//     .addEventListener('click', delButtonHandler);
