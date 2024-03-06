const restaurant = document.getElementById('restaurant');
const name= document.getElementById('res-name');
const location = document.getElementById('res-location');
const menu = document.getElementById('menu');
const favorize = document.getElementById('favorize')

const thisRestaurant = JSON.parse(localStorage.getItem('selectedRestaurant'));
const allRestaurants = JSON.parse(localStorage.getItem('restaurants'));

const restaurant_data = allRestaurants.find(restaurant => restaurant.name === thisRestaurant);


name.innerHTML = restaurant_data.name;
location.innerHTML = restaurant_data.location;

restaurant_data.menu.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('dish-card',' flex ','space-between' ,'off-white-text', 'dark-gray-bg');
    menuItem.innerHTML = 
    `<div class="info flex space-between  ">
        <img src="../assets/card-img.jpg" alt="">
        <div class="flex column description">
        <h2>${item.name}</h2>
    </div>
    </div>
    <h2>${item.price}</h2>
    `;
    menu.appendChild(menuItem);
});

const remove_fav = (a)=>{
    let b = JSON.parse(localStorage.getItem('user'))
    localStorage.removeItem('user')
    b.favoriteRestaurants.splice(b.favoriteRestaurants.indexOf(a),1)
    localStorage.setItem('user',JSON.stringify(b))
}

const add_fav =(a)=>{
    let b = JSON.parse(localStorage.getItem('user'))
    localStorage.removeItem('user')
    b.favoriteRestaurants.push(a)
    localStorage.setItem('user',JSON.stringify(b))
}

favorize.addEventListener('click',()=>{

    user.favoriteRestaurants.forEach(resto => {
        if(resto===name.innerHTML){
            remove_fav(resto)
            favorize.style.color=white;
        }
        else{
            add_fav(resto)
            favorize.style.color= orange;
        }
    });




})
