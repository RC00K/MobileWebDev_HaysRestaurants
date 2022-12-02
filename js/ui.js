const restaurants = document.querySelector(".restaurants");

const renderRestaurant = (data, id) => {
  const html = `
  <div class="card-panel restaurant white row" data-id ="${id}">
      <div class="restaurant-detail">
          <div class="restaurant-name">${data.name}</div>
          <div class="restaurant-state">${data.state}</div>
          <div class="restaurant-town">${data.town}</div>
      </div>
      <div class="restaurant-delete">
          <i class="material-icons" data-id ="${id}">delete_outline</i>
      </div>
  </div>
  `;
  
  restaurants.innerHTML += html;
};

// Remove task
const removeRestaurant = (id) => {
    const restaurant = document.querySelector(`.restaurant[data-id=${id}]`);
    restaurant.remove();
};