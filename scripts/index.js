const toggler = document.querySelector('.toggler-open');
const togglerHeader = document.getElementById('toggler-header');
const loginForm = getElementById('login-form');
const usernameInput = document.getElementById('username').value;
const passwordInput = document.getElementById('password').value;
const searchInput = document.getElementById('search').value;
const filtersContainer = document.getElementById('filter-links');

const cardsContainer = document.getElementById('cards-container');

let filter = document.getElementById('filter-link')

const restaurant = {
    name: '',
    location: '',
    favorite: false
}

const user = {
    username: 'user',
    password: 'user',
    isAdmin: false
}

const admin = {
    username: 'admin',
    password: 'user',
    isAdmin: true
}

const users = [user, admin]

const restaurants = [
    { name: 'Cedar Grill', location: 'Beirut', favorite: false },
    { name: 'Byblos Bistro', location: 'Byblos', favorite: false },
    { name: 'Olive Garden', location: 'Beirut', favorite: false },
    { name: 'Seaside Cafe', location: 'Byblos', favorite: false },
    { name: 'Golden Falafel', location: 'Beirut', favorite: false },
    { name: 'Harbor House', location: 'Byblos', favorite: false }
];


const login = (usernameInput, passwordInput) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === usernameInput &&
            users[i].password === passwordInput) {
            user[i].isAdmin ? window.location.href('/pages/admin-panel.html') : window.location.href('/index.html')
        }
        return;
    }
}

const search = (searchInput) => {
    const searchInput = searchInput.trim().toLowerCase();
    const searchResults = [];

    for (let i = 0; i < restaurants.length; i++) {
        let restaurantName = restaurants[i].toLowerCase();
        if (restaurantName.includes(searchInput)) {
            searchResults.push(restaurants[i])
        }
    }
    return searchResults
}

const populateLocationFilters = () => {
    filtersContainer.innerHTML += '';
    const uniqueLocations = {};
    for (let i = 0; i < restaurants.length; i++) {
        uniqueLocations[restaurants[i].location] = true;
    }
    const uniqueLocationsArray = []
    for (const location in uniqueLocations) {
        uniqueLocationsArray.push(location);
    }

    for (let i = 0; i < uniqueLocationsArray.length; i++) {
        filtersContainer.innerHTML += `<li class="filter-link">${uniqueLocationsArray[i]}</li>`;
    }
}

const getSelectedLocationFilter = (filterElement) => filterElement.textContent;

const applySelectedLocationFilter = (selectedFilter) => {
    const filterResult = restaurants.filter(restaurant => restaurant.location == selectedFilter);
    populateRestaurantsCards(filterResult);
}

function populateRestaurantCard(restaurant) {
    cardsContainer.innerHTML = `<div class="card flex center box-shadow">
        <img src="/assets/restaurant-${restaurant.name}.jpg" alt="restaurant-img">
        <p>${restaurant.location}</p></div>`;
}

function populateRestaurantsCards(restaurants) {
    for (let i = 0; i < restaurants.length; i++) {
        populateRestaurantCard(restaurants[i])
    }
}

toggler.addEventListener('click', () => {
    toggler.classList.toggle('fa-bars');
    toggler.classList.toggle('fa-xmark');
    togglerHeader.classList.toggle('hidden');
})