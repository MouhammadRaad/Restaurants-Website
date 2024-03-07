const toggler = document.querySelector('.toggler-open');
const togglerHeader = document.getElementById('toggler-header');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

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

const cardsContainer = document.getElementById('cards-container');

let currentUser = null;
let currentRestaurants = null;
let addToFavoritesBtns = [];
let adminDeleteBtns = [];
let locationFiltersFound = [];
let favoriteFilterFound = '';
let selectedLocationFilters = [];
let favoriteFilterApplied = false;
let restaurantsCardsText = [];

const user = {
    id: 2,
    username: 'user',
    password: 'user',
    meal: 'hummus',
    isAdmin: false,
    favoriteRestaurants: ['Cedar Grill', 'Seaside Cafe'],
}

const admin = {
    id: 1,
    username: 'admin',
    password: 'admin',
    meal: 'hummus',
    isAdmin: true,
    favoriteRestaurants: ['Cedar Grill', 'Golden Falafel'],
}

const users = [user, admin]

const restaurants = [
    {
        id: 1,
        name: 'Cedar Grill',
        location: 'Zgharta',
        menu: [
            { item: 'Grilled Chicken', price: 15 },
            { item: 'Hummus Plate', price: 10 },
            { item: 'Falafel Wrap', price: 8 },
            { item: 'Mediterranean Salad', price: 12 }
        ]
    },
    {
        id: 2,
        name: 'Byblos Bistro',
        location: 'Byblos',
        menu: [
            { item: 'Pasta Carbonara', price: 18 },
            { item: 'Caesar Salad', price: 12 },
            { item: 'Seafood Paella', price: 25 },
            { item: 'Beef Burger', price: 16 }
        ]
    },
    {
        id: 3,
        name: 'Olive Garden',
        location: 'Beirut',
        menu: [
            { item: 'Margherita Pizza', price: 20 },
            { item: 'Spaghetti Bolognese', price: 16 },
            { item: 'Cheeseburger Pizza', price: 22 },
            { item: 'Greek Gyro', price: 14 }
        ]
    },
    {
        id: 4,
        name: 'Seaside Cafe',
        location: 'Byblos',
        menu: [
            { item: 'Fish & Chips', price: 22 },
            { item: 'Mango Smoothie', price: 8 },
            { item: 'Shrimp Scampi', price: 28 },
            { item: 'Vegetable Stir-Fry', price: 16 }
        ]
    },
    {
        id: 5,
        name: 'Golden Falafel',
        location: 'Beirut',
        menu: [
            { item: 'Falafel Sandwich', price: 6 },
            { item: 'Baba Ghanoush', price: 10 },
            { item: 'Chicken Shawarma', price: 12 },
            { item: 'Tabbouleh Salad', price: 8 }
        ]
    },
    {
        id: 6,
        name: 'Harbor House',
        location: 'Byblos',
        menu: [
            { item: 'Lobster Roll', price: 30 },
            { item: 'Clam Chowder', price: 14 },
            { item: 'Grilled Salmon', price: 26 },
            { item: 'Crab Cakes', price: 18 }
        ]
    }
];

const loadCurrentUser = () => {
    currentUser = null;
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        return
    }
    console.log('current in home', currentUser);

    adjustPage();
}

const saveCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

const saveRestaurants = (restaurants) => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
}

const loadRestaurants = () => {
    currentRestaurants = JSON.parse(localStorage.getItem('restaurants'));
}

const login = (usernameInput, passwordInput) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || users
    console.log(storedUsers)
    for (let i = 0; i < storedUsers.length; i++) {
        if (storedUsers[i].username === usernameInput &&
            storedUsers[i].password === passwordInput) {
            saveCurrentUser(storedUsers[i]);
            window.location.href = '/index.html';
            return;
        }
    }
    console.error('Invalid username or password.')
}

const logout = () => {
    localStorage.removeItem('currentUser');
    currentUser = null;
}

const getUniqueId = () => {
    if (users.length === 0) {
        return 1;
    }
    const latestId = users[users.length - 1].id;
    return latestId + 1
}

const register = (usernameInput, favoritemealInput, passwordInput) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || users;

    for (let i = 0; i < storedUsers.length; i++) {

        if (storedUsers[i].username === usernameInput) {
            console.log('username taken');
            return;
        }
    }

    const newUser = {
        id: getUniqueId(),
        username: usernameInput,
        password: passwordInput,
        favoritemeal: favoritemealInput,
        isAdmin: false,
        favoriteRestaurants: []
    }

    storedUsers.push(newUser);
    console.log(users)
    localStorage.setItem('users', JSON.stringify(storedUsers))
    saveCurrentUser(newUser)
    window.location.href = '/index.html';
}

const populateRestaurantCard = (restaurant) => {
    let favoriteIconClass = 'fa-regular';
    if (currentUser) {
        isFavorite = currentUser.favoriteRestaurants.includes(restaurant.name);
        favoriteIconClass = isFavorite ? 'fa-solid' : 'fa-regular'
    }

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
    restaurantsCardsText = document.querySelectorAll('.card-text');
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
    if (currentUser && currentUser.favoriteRestaurants.length > 0) {
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

    if (selectedLocationFilters.length > 0) {
        filterResult = filterResult.filter(restaurant => selectedLocationFilters.includes(restaurant.location));
    }

    if (favoriteFilterApplied) {
        filterResult = filterResult.filter(restaurant => currentUser.favoriteRestaurants.includes(restaurant.name));
    }

    populateRestaurantsCards(filterResult);
}

const setLocationFilter = (selectedFilter) => {
    let filterAlreadySelected = false;
    for (let i = 0; i < selectedLocationFilters.length; i++) {
        if (selectedLocationFilters[i] === selectedFilter) {
            filterAlreadySelected = true;
            break;
        }
    }

    if (filterAlreadySelected) {
        selectedLocationFilters = selectedLocationFilters.filter(filter => filter !== selectedFilter);
    } else {
        selectedLocationFilters.push(selectedFilter);
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

    //Logout
    for (let i = 0; i < loginBtns.length; i++) {
        loginBtns[i].addEventListener('click', () => {
            if (loginBtn.textContent === 'Sign Out') {
                console.log('login out')
                logout();
            } else {
                window.location.href = '/pages/sign-in.html'
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

    //Restaurants Button Scroll Listener
    document.addEventListener('DOMContentLoaded', () => {
        const scrollRestaurantsBtn = document.getElementById('scroll-btn');
        const restaurantsSection = document.getElementById('scroll-target')
        scrollRestaurantsBtn.addEventListener('click', () => restaurantsSection.scrollIntoView({ behavior: 'smooth' }));
    })

    //Saving Restaurant name when clicking on cards and redirecting to restaurant page
    for (let i = 0; i < restaurantsCardsText.length; i++) {
        restaurantsCardsText[i].addEventListener('click', () => {
            const cardTextContent = restaurantsCardsText[i].textContent;
            console.log(cardTextContent)

            if (cardTextContent) {
                const restaurantName = cardTextContent.split(' - ')[0];
                localStorage.setItem('selectedRestaurant', JSON.stringify(restaurantName));
                window.location.href = '/pages/restaurant.html';
            }
        })
    }

    //Profile Redirection
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

if (document.title === 'Sign Up') {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const usernameInput = document.getElementById('username').value;
        const favoriteMealInput = document.getElementById('favoritemeal').value;
        const passwordInput = document.getElementById('password').value;
        register(usernameInput, favoriteMealInput, passwordInput);
    })
}