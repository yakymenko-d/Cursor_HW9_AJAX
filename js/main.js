const API = `https://test-users-api.herokuapp.com/users/`;
let usersCard = document.querySelector('#user_cards');
let users = [];

const getUsers= () => {
    return fetch(API).then(res => {
        return res.json();
    }).then(user => {
        return user.data;
    })
    .catch(err => {
        console.log('Cant find users', err);
        return [];
    })
}

const renderUsers = () => {
    usersCard.innerHTML = ''
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user');
        
        const userHeader = document.createElement('h3');
        userHeader.classList.add(`userHeader`);
        userHeader.innerHTML = 'Registered User';

        const inputName = document.createElement(`input`);
        inputName.classList.add(`inputName`);
        inputName.type = 'text';
        inputName.value = `${user.name}`;

        const inputAge = document.createElement(`input`);
        inputAge.classList.add(`inputAge`);
        inputAge.type = 'number';
        inputAge.value = `${user.age}`;

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('user_button');
        saveBtn.innerHTML = 'Save';
        saveBtn.addEventListener('click', createUser);
       
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('user_button');
        removeBtn.innerHTML = 'Delete';
        removeBtn.addEventListener('click', () => {
            deleteUser(user.id, userItem)});

        
        userItem.append(removeBtn);
        userItem.append(saveBtn);
        userItem.append(inputAge);
        userItem.append(inputName);
        userItem.append(userHeader);
        usersCard.append(userItem);
    });
}

const loadUsers = async () => {
    users = await getUsers();
    renderUsers();
}

const createCard = () => {
    const name = document.querySelector(`#name`).value;
    const age = document.querySelector(`#age`).value;
    const user = {
        name,
        age};
    users.push(user)
    renderUsers();
}

const createUser = () => {
    const name = document.querySelector(`#name`).value;
    const age = document.querySelector(`#age`).value;
    fetch(API , {
        method: `POST`,
        body: JSON.stringify({name: name, age: age}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'}
    }).then(res => {
        return (res.json());
    }).catch(err => {
        console.log(`Can't create user`, err);
    })
}

const deleteUser =  async (userId, userItem) => {
    try {
        const res = await fetch(API + userId, { 
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'}
        });
        if (res.status !== 200) throw new Error();
        users = users.filter((user) => user.id !== userId);
        userItem.remove();
    } catch (err) {
        console.log(`Can't delete a user`, err);   
    }
}





document.addEventListener('DOMContentLoaded', () => {
    const load = document.querySelector('#load_users')
    load.addEventListener('click', loadUsers);
    const createUserBtn = document.querySelector('#create_user')
    createUserBtn.addEventListener('click', createCard);
  });
