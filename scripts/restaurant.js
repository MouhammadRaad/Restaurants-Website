const restaurant = document.getElementById('restaurant');
const name= document.getElementById('res-name');
const location = document.getElementById('res-location');
const menu = document.getElementById('menu');

const restaurant_data = { 
    name: "The Golden Apple",
    location: "123 Main St, New York, NY 10001",
    menu: [
        {name: "Cheeseburger", price: 5.99},
        {name: "French Fries", price: 2.99},
        {name: "Soda", price: 1.99},
        {name: "Onion Rings", price: 3.99}
    ]
};    

name.innerHTML = restaurant_data.name;
location.innerHTML = restaurant_data.location;

restaurant_data.menu.forEach(item => {
    const menuItem = document.createElement('li');
    menuItem.innerHTML = 
    `<div class="dish-card flex space-between off-white-text dark-gray-bg">    
    <div class="info flex space-between  ">
        <img src="../assets/card-img.jpg" alt="">
        <div class="flex column description">
        <h2>${item.name}</h2>
    </div>
    </div>
    <h2>${item.price}</h2>
</div>`;
    menu.appendChild(menuItem);
});
