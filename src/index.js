import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const search = document.querySelector('#search-box');
console.log(search);
search.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
function searchCountry(event) {
  if (event.target.value.trim() === '') {
    return;
  }
  fetchCountries(event.target.value.trim());
}
