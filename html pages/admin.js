document.getElementById('switch-mode').addEventListener('change', function() {
  document.body.classList.toggle('dark');
});

/***userrr*/
function addUser(name, completed) {
  const userList = document.querySelector('.user-items');
  const newItem = document.createElement('li');
  newItem.textContent = name;
  newItem.classList.add('user-item');
  

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="bx bx-trash"></i>';
  deleteButton.classList.add('delete-btn'); 
  

  newItem.appendChild(deleteButton);

  if (completed) {
      newItem.classList.add('completed');
  } else {
      newItem.classList.add('not-completed');
  }
  userList.appendChild(newItem);
}


document.querySelector('.user-items').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const itemToDelete = event.target.parentElement;
    deleteUser(itemToDelete);
  }
});


function deleteUser(item) {
  item.remove();
}


document.querySelector('.add-user-btn').addEventListener('click', function() {
  const userName = prompt('Enter user name:');
  if (userName) {
      addUser(userName, false); 
  }
});


document.querySelector('.user-items').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
      event.target.classList.toggle('completed');
      event.target.classList.toggle('not-completed');
  }
});


/***********restaurant***************/
function addRestaurant(name, completed) {
  const restList = document.querySelector('.rest-items');
  const newItem = document.createElement('li');
  newItem.textContent = name;
  newItem.classList.add('rest-item');

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="bx bx-trash"></i>';
  deleteButton.classList.add('delete-btn');

  newItem.appendChild(deleteButton);

  if (completed) {
      newItem.classList.add('completed');
  } else {
      newItem.classList.add('not-completed');
  }
  restList.appendChild(newItem);
}

document.querySelector('.add-rest-btn').addEventListener('click', function() {
  const restName = prompt('Enter restaurant name:');
  if (restName) {
      addRestaurant(restName, false);
  }
});

document.querySelector('.rest-items').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const itemToDelete = event.target.parentElement;
    deleteRestaurant(itemToDelete);
  }
});

function deleteRestaurant(item) {
  item.remove();
}

document.querySelector('.rest-items').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
      event.target.classList.toggle('completed');
      event.target.classList.toggle('not-completed');
  }
});




