const uname = document.getElementById('uname');
const id = document.getElementById('id');
const fav = document.getElementById('fav');
const fav_res=document.getElementById('fav-res');
const user = JSON.parse(localStorage.getItem('user'));
const del = document.getElementById('delete');

uname.innerHTML = user.name;
id.innerHTML = user.id;
fav.innerHTML = user.meal;

const current_user = JSON.parse(localStorage.getItem('currentUser'));
const allUsers = JSON.parse(localStorage.getItem('users'));
const user_data = allUsers.find(user => user.name === current_user);


user_data.favoriteRestaurants.forEach(resto => { 
    const favResto = document.createElement('div');
    favResto.classList.add('flex','center','off-white-text','dark-gray-bg','fav-card');
    favResto.innerHTML = 
    `<img src="../assets/card-img.jpg" alt="">
    <h5>${resto}</h5>
    <button id="delete"><i class="fa fa-times" aria-hidden="true"></i></button>`;
    fav-res.appendChild(favResto);
});


del.addEventListener('click',()=>{  
    let b = JSON.parse(localStorage.getItem('user'))
    localStorage.removeItem('user')
    b.favoriteRestaurants.splice(b.favoriteRestaurants.indexOf(favReso),1)
    localStorage.setItem('user',JSON.stringify(b))
    location.reload();
});