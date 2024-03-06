const toggler = document.querySelector('.toggler-open');
const togglerHeader = document.getElementById('toggler-header');
const loginBtn = document.getElementById('login-btn');
const loginBtnCollapsed = document.getElementById('login-btn-collapsed');
const navbarProfileLink = document.getElementById('nav-link-profile');
const navbarProfileLinkCollapsed = document.getElementById('nav-link-profile-collapsed');


const searchInput = document.getElementById('search');
const filtersToggler = document.getElementById('toggle-filters');
const filtersContainer = document.getElementById('filter-toggler-links');
const locationFiltersContainer = document.getElementById('filter-links');
const favoriteFilterContainer = document.getElementById('fav-filter-container');

const adminAddBtn = document.getElementById('add-restaurant');

const loginForm = document.getElementById('login-form');

const cardsContainer = document.getElementById('cards-container');

let currentUser = null;
let currentRestaurants = null;
let addToFavoritesBtns = [];
let adminDeleteBtns = [];
let locationFiltersFound = [];
let locationFilterApplied = null;
let favoriteFilterFound = '';
let favoriteFilterApplied = false;
let restaurantsCards = [];

const user = {
    id: 2,
    username: 'user',
    password: 'user',
    isAdmin: false,
    favoriteRestaurants: ['Cedar Grill', 'Seaside Cafe'],
}

const admin = {
    id: 1,
    username: 'admin',
    password: 'admin',
    isAdmin: true,
    favoriteRestaurants: ['Cedar Grill', 'Golden Falafel'],
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

const loadCurrentUser = () => {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('current in home', currentUser);

    adjustPage();
}

const saveCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

const saveRestaurants = (restaurants) => {
    localStorage.setItem('restaurants', json.stringify(restaurants));
}

const loadRestaurants = () => {
    currentRestaurants = JSON.parse(localStorage.getItem('restaurants'));
}

const login = (usernameInput, passwordInput) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === usernameInput &&
            users[i].password === passwordInput) {
            saveCurrentUser(users[i]);
            window.location.href = '/index.html';
            return;
        }
    }
}

const populateRestaurantCard = (restaurant) => {
    const isFavorite = currentUser.favoriteRestaurants.includes(restaurant.name);
    const favoriteIconClass = isFavorite ? 'fa-solid' : 'fa-regular'

    cardsContainer.innerHTML += `<div class="card flex center box-shadow off-white-bg">
                                <img src="/assets/card-img.jpg" alt="restaurant-img">
                                <div class="card-footer flex center space-between">
                                    <p class="card-text">${restaurant.name} - ${restaurant.location}</p>
                                    <i class="remove-restaurant fa-regular hidden fa-square-minus"></i>
                                    <i class="add-to-favorites ${favoriteIconClass} fa-star"></i>
                                </div>
                                </div>`;
}

const populateRestaurantsCards = (restaurants) => {
    cardsContainer.innerHTML = '';
    for (let i = 0; i < restaurants.length; i++) {
        populateRestaurantCard(restaurants[i])
    }
    restaurantsCards = document.querySelectorAll('.card');
    addToFavoritesBtns = document.querySelectorAll('.add-to-favorites');
    adminDeleteBtns = document.querySelectorAll('.remove-restaurant');
}

const populateLocationFilters = () => {
    locationFiltersContainer.innerHTML = '';
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
    locationFiltersFound = document.querySelectorAll('.filter-link')
}

const populateFavoriteFilter = () => {
    if (currentUser.favoriteRestaurants.length > 0) {
        favoriteFilterContainer.innerHTML = `<i class="fa-regular fa-star" id="fav-filter"></i>`;
        favoriteFilterFound = document.getElementById('fav-filter');
    }
    else {
        favoriteFilterContainer.innerHTML = '';
    }
}

const adjustCards = () => {
    for (let i = 0; i < adminDeleteBtns.length; i++) {
        adminDeleteBtns[i].classList.remove('hidden');
    }
}

const adjustPage = () => {
    loginBtn.classList.remove('nav-login');
    loginBtn.classList.add('nav-login-secondary');
    loginBtn.innerHTML = 'Sign Out';
    loginBtnCollapsed.innerHTML = 'Sign Out'

    if (currentUser.isAdmin) {
        navbarProfileLink.innerHTML = 'Admin Panel';
        navbarProfileLinkCollapsed.innerHTML = 'Admin Panel';
        adminAddBtn.classList.remove('hidden');
        adjustCards();
    }
}

const getSelectedLocationFilter = (filterElement) => filterElement.textContent;

const applyFilters = () => {
    let filterResult = restaurants;

    if (locationFilterApplied) {
        filterResult = restaurants.filter(restaurant => restaurant.location === locationFilterApplied);
    }

    if (favoriteFilterApplied) {
        filterResult = filterResult.filter(restaurant => currentUser.favoriteRestaurants.includes(restaurant.name));
    }

    populateRestaurantsCards(filterResult);
}

const setLocationFilter = (selectedFilter) => {
    if (selectedFilter != locationFilterApplied) {
        locationFilterApplied = selectedFilter
    } else {
        locationFilterApplied = null;
    }
    applyFilters();
}

const setFavoriteFilter = () => {
    favoriteFilterApplied = !favoriteFilterApplied;
    applyFilters();
}

const search = (searchInput) => {
    searchInput = searchInput.trim().toLowerCase();
    const searchResults = [];

    for (let i = 0; i < restaurants.length; i++) {
        let restaurantName = restaurants[i].name.toLowerCase();
        if (restaurantName.includes(searchInput)) {
            searchResults.push(restaurants[i])
        }
    }
    return searchResults
}

const addOrRemoveToFavorites = (restaurantName) => {
    if (!currentUser.favoriteRestaurants.includes(restaurantName)) {
        currentUser.favoriteRestaurants.push(restaurantName);
    }
    else {
        currentUser.favoriteRestaurants = currentUser.favoriteRestaurants.filter(name => name != restaurantName)
    }
    saveCurrentUser(currentUser);
}

if (document.title === 'Restaurants Website') {
    loadCurrentUser();

    populateRestaurantsCards(restaurants);
    populateLocationFilters();
    populateFavoriteFilter();

    //Login btn listen
    const loginBtns = [
        loginBtn,
        loginBtnCollapsed
    ]

    for (let i = 0; i < loginBtns.length; i++) {
        loginBtns[i].addEventListener('click', () => {
            if (loginBtn.innerHTML.textContent === 'Sign Out') {
                localStorage.removeItem('currentUser');
                window.location.href('/index.html');
                console.log('logging out')
            } else {
                window.location.href('/pages/sign-in-test.html')
            }
        })
    }

    //Show filters on filter toggler click
    filtersToggler.addEventListener('click', () => {
        filtersContainer.classList.toggle('hidden');
    })

    //Navbar toggler style on click
    toggler.addEventListener('click', () => {
        toggler.classList.toggle('fa-bars');
        toggler.classList.toggle('fa-xmark');
        togglerHeader.classList.toggle('hidden');
    })

    //Toggling favorite filter and changing button style
    favoriteFilterFound && favoriteFilterFound.addEventListener('click', () => {
        favoriteFilterFound.classList.toggle('fa-regular');
        favoriteFilterFound.classList.toggle('fa-solid');
        setFavoriteFilter();
    })

    //Adding removing from favorites
    for (let i = 0; i < addToFavoritesBtns.length; i++) {
        addToFavoritesBtns[i].addEventListener('click', () => {
            addToFavoritesBtns[i].classList.toggle('fa-regular');
            addToFavoritesBtns[i].classList.toggle('fa-solid');
            const parentCard = addToFavoritesBtns[i].closest('.card');
            const restaurantNameElement = parentCard.querySelector('.card-text')
            const restaurantName = restaurantNameElement.textContent.split(' - ')[0];
            addOrRemoveToFavorites(restaurantName);
        })
    }

    //Toggling Location Filters
    for (let i = 0; i < locationFiltersFound.length; i++) {
        locationFiltersFound[i].addEventListener('click', () => {
            locationFiltersFound[i].classList.toggle('toggled');
            let locationFilterApplied = getSelectedLocationFilter(locationFiltersFound[i]);
            setLocationFilter(locationFilterApplied);
        })
    }

    //Searching
    searchInput.addEventListener('input', (event) => {
        const searchInputValue = event.target.value;
        const restaurantsFound = search(searchInputValue);
        if (restaurantsFound.length > 0) {
            populateRestaurantsCards(restaurantsFound)
        }
        else {
            cardsContainer.innerHTML = `<div class="cards-not-found flex column center">
                                            <h2>Nothing matches...</h2>
                                        </div>`
        }
    })

    //Restaurants btn scroll
    document.addEventListener('DOMContentLoaded', () => {
        const scrollRestaurantsBtn = document.getElementById('scroll-btn');
        const restaurantsSection = document.getElementById('scroll-target')
        scrollRestaurantsBtn.addEventListener('click', () => restaurantsSection.scrollIntoView({ behavior: 'smooth' }));
    })

    //Saving Restaurant name when clicking on cards and redirecting to restaurant page
    for (let i = 0; i < restaurantsCards.length; i++) {
        restaurantsCards[i].addEventListener('click', () => {
            const cardTextElement = restaurantsCards[i].querySelector('.card-text');

            if (cardTextElement) {
                const restaurantName = cardTextElement.textContent.split(' - ')[0];
                localStorage.setItem('selectedRestaurant', JSON.stringify(restaurantName));
                window.location.href = '/pages/restaurant.html';
            }
        })
    }

    //Profile button redirects to specific profile
    const profileBtns = [
        navbarProfileLink,
        navbarProfileLinkCollapsed
    ]
    for (let i = 0; i < profileBtns.length; i++) {
        profileBtns[i].addEventListener('click', () => {
            if (currentUser.isAdmin) {
                window.location.href = '/pages/admin.html';
            } else {
                window.location.href = '/pages/user.html';
            }
        })
    }

}

if (document.title === 'Sign In') {

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        login(usernameInput, passwordInput)
    })
}