const toggler = document.querySelector('.toggler-open');
const togglerHeader = document.getElementById('toggler-header');

const searchInput = document.getElementById('search').value;

const filtersToggler = document.getElementById('toggle-filters');
const filtersContainer = document.getElementById('filter-toggler-links');
const locationFiltersContainer = document.getElementById('filter-links');
const favoriteFilterContainer = document.getElementById('fav-filter-container');

const adminAddBtn = document.getElementById('add-restaurant');



// const loginForm = getElementById('login-form');
// const usernameInput = document.getElementById('username').value;
// const passwordInput = document.getElementById('password').value;


const cardsContainer = document.getElementById('cards-container');

let addToFavoritesBtns = [];
let adminDeleteBtns = [];
let locationFiltersFound = document.querySelectorAll('.filter-link');
let locationFiltersApplied = false;
let favoriteFilterFound = '';
let favoriteFilterApllied = false;



const restaurant = {
    name: '',
    location: '',
}

const user = {
    username: 'user',
    password: 'user',
    isAdmin: false,
    favoriteRestaurants: ['Cedar Grill', 'Seaside Cafe'],
}

const admin = {
    username: 'admin',
    password: 'user',
    isAdmin: true
}

const users = [user, admin]

const restaurants = [
    { name: 'Cedar Grill', location: 'Beirut' },
    { name: 'Byblos Bistro', location: 'Byblos' },
    { name: 'Olive Garden', location: 'Beirut' },
    { name: 'Seaside Cafe', location: 'Byblos' },
    { name: 'Golden Falafel', location: 'Beirut' },
    { name: 'Harbor House', location: 'Byblos' }
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
    searchInput = searchInput.trim().toLowerCase();
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
    locationFiltersContainer.innerHTML += '';
    const uniqueLocations = {};
    for (let i = 0; i < restaurants.length; i++) {
        uniqueLocations[restaurants[i].location] = true;
    }
    const uniqueLocationsArray = []
    for (const location in uniqueLocations) {
        uniqueLocationsArray.push(location);
    }

    for (let i = 0; i < uniqueLocationsArray.length; i++) {
        locationFiltersContainer.innerHTML += `<li class="filter-link">${uniqueLocationsArray[i]}</li>`;
    }
}

const getSelectedLocationFilter = (filterElement) => filterElement.textContent;

const applySelectedLocationFilter = (selectedFilter) => {
    const filterResult = restaurants.filter(restaurant => restaurant.location == selectedFilter);
    populateRestaurantsCards(filterResult);
}

const populateFavoriteFilter = () => {
    if (user.favoriteRestaurants.length > 0) {
        favoriteFilterContainer.innerHTML = `<i class="fa-regular fa-star" id="fav-filter"></i>`;
        favoriteFilterFound = document.getElementById('fav-filter');
    }
    else {
        favoriteFilterContainer.innerHTML = '';
    }
}

const applyFavoriteFilter = () => {
    if (!favoriteFilterApllied) {
        const favoriteFilterResult = restaurants.filter(restaurant => user.favoriteRestaurants.includes(restaurant.name));
        populateRestaurantsCards(favoriteFilterResult);
    }
    else {
        populateRestaurantsCards(restaurants);
    }
    favoriteFilterApllied = !favoriteFilterApllied;
}

const addOrRemoveToFavorites = (restaurantName) => {
    if (!user.favoriteRestaurants.includes(restaurantName)) {
        user.favoriteRestaurants.push(restaurantName);
    }
    else {
        user.favoriteRestaurants = user.favoriteRestaurants.filter(restaurant => restaurant.name != restaurantName)
    }
}

const getCardClicked = () => {

}

function populateRestaurantCard(restaurant) {
    cardsContainer.innerHTML += `<div class="card flex center box-shadow off-white-bg">
                                <img src="/assets/card-img.jpg" alt="restaurant-img">
                                <div class="card-footer flex center space-between off-white-bg">
                                    <p>${restaurant.name} - ${restaurant.location}</p>
                                    <i class="remove-restaurant fa-regular hidden fa-square-minus"></i>
                                    <i class="add-to-favorites fa-regular fa-star"></i>
                                </div>
                                </div>`;
}

function populateRestaurantsCards(restaurants) {
    cardsContainer.innerHTML = '';
    for (let i = 0; i < restaurants.length; i++) {
        populateRestaurantCard(restaurants[i])
    }

    addToFavoritesBtns = document.querySelectorAll('.add-to-favorites');
    adminDeleteBtns = document.querySelectorAll('.remove-restaurant');
}

populateRestaurantsCards(restaurants);
populateLocationFilters();
populateFavoriteFilter();

// Show filters on filter toggler click
filtersToggler.addEventListener('click', () => {
    filtersContainer.classList.toggle('hidden');
})

// Navbar toggler style on click
toggler.addEventListener('click', () => {
    toggler.classList.toggle('fa-bars');
    toggler.classList.toggle('fa-xmark');
    togglerHeader.classList.toggle('hidden');
})

// Toggling favorite filter and changing button style
favoriteFilterFound && favoriteFilterFound.addEventListener('click', () => {
    favoriteFilterFound.classList.toggle('fa-regular');
    favoriteFilterFound.classList.toggle('fa-solid');
    applyFavoriteFilter();
})

console.log(addToFavoritesBtns);
// addToFavoritesBtns.addEventListener('click', () => {
//     console.log('adding to favorites');
//     const parentCard = this.closest('.card');
//     const restaurantName = parentCard.querySelector('.p').textContent.split(' - ')[0];
//     addOrRemoveToFavorites(restaurantName);
//     console.log(user.favoriteRestaurants)
// })`