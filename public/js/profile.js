const newFormHandler = async (event) => {
    event.preventDefault();
  
    const events_name = document.querySelector('#events-name').value.trim();
    const total_cost = document.querySelector('#events-cost').value.trim();
    const description = document.querySelector('#events-desc').value.trim();
  
    if (events_name && total_cost && description) {
      const response = await fetch(`/api/events`, {
        method: 'POST',
        body: JSON.stringify({ events_name, total_cost, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create event');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete event');
      }
    }
  };
  
  document
    .querySelector('.new-events-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.events-list')
    .addEventListener('click', delButtonHandler);
  