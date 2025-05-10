import { login } from './login';
import { displayMap } from './leaflet';

// DOM ELEMENTS
const MapPage = document.getElementById('map');
const loginForm = document.querySelector('.form');

// VALUES

// DELEGATION
if (MapPage) {
  const locations = JSON.parse(MapPage.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
