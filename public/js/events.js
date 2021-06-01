async function newEventFormHandler(event) {
    event.preventDefault();
  
    const event_name = document.querySelector('input[name="events-name"]').value.trim();
    const description = document.querySelector('input[name="events-desc"]').value.trim();
    const total_cost = document.querySelector('input[name="events-cost"]').value.trim();
    
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        event_name,
        description,
        total_cost
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/events');
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('.new-events-form').addEventListener('submit', newEventFormHandler);

