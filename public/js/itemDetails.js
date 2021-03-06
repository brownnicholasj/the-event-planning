/*
    Reads the user input for items data through an HTML form
    Performs the necessary validations
*/
const itemFormHandler = async (event) => {
  event.preventDefault();

  const user_id = document
    .querySelector('#item-category')
    .getAttribute('data-user_id')
    .trim();
  const item_id = document
    .querySelector('#item-category')
    .getAttribute('data-id')
    .trim();
  const event_id = document
    .querySelector('#item-category')
    .getAttribute('data-event_id')
    .trim();
  const category = document.querySelector('#item-category').value.trim();
  const name = document.querySelector('#item-name').value.trim();
  const quantity = document.querySelector('#item-quantity').value.trim();
  const qty_uom = document.querySelector('#item-uom').value.trim();
  const cost_perunit = document.querySelector('#item-cost').value.trim();

  // If button = create, post a call to the /api/events end point
  if (createBtn === 'create') {
    const send = await fetch(`/api/items`, {
      method: 'POST',
      body: JSON.stringify({
        category,
        name,
        quantity,
        qty_uom,
        cost_perunit,
        event_id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Redirect the user to enter/view the item details
    if (send.ok) {
      document.location.replace(
        `/users/${user_id}/events/${event_id}/itemDetails`
      );
    } else {
      alert('Failed to create.');
    }
  } else if (item_id) {
    //   Update the item
    const send = await fetch(`/api/items/${item_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        category,
        name,
        quantity,
        qty_uom,
        cost_perunit,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Redirect the user to enter/view the item details
    if (send.ok) {
      document.location.replace(
        `/users/${user_id}/events/${event_id}/itemDetails`
      );
    } else {
      alert('Failed to update.');
    }
  }
};

/*
   Reads the user input and performs the item deletion 
*/
const itemDeleteHandler = async (event) => {
  event.preventDefault();
  const user_id = document
    .querySelector('#item-category')
    .getAttribute('data-user_id')
    .trim();
  const item_id = document
    .querySelector('#item-category')
    .getAttribute('data-id')
    .trim();
  const event_id = document
    .querySelector('#item-category')
    .getAttribute('data-event_id')
    .trim();
  const send = await fetch(`/api/items/${item_id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      item_id,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Redirect the user to enter/view the item details
  if (send.ok) {
    document.location.replace(
      `/users/${user_id}/events/${event_id}/itemDetails`
    );
  } else {
    alert('Failed to delete.');
  }
};

/*
   Returns the control to the calling sub-application
*/
const itemCancelHandler = async (event) => {
  event.preventDefault();

  window.history.back();
};

const createBtn = document
  .querySelector('#item-create-btn')
  .getAttribute('value');

/*
    Creates event listeners
*/
document
  .querySelector('#item-update-btn')
  .addEventListener('click', itemFormHandler);

document
  .querySelector('#item-delete-btn')
  .addEventListener('click', itemDeleteHandler);

document
  .querySelector('#item-cancel-btn')
  .addEventListener('click', itemCancelHandler);

document
  .querySelector('#item-create-btn')
  .addEventListener('click', itemFormHandler);
