import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const search = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
search.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
function searchCountry(event) {
  if (event.target.value.trim() === '') {
    return;
  }
  fetchCountries(event.target.value.trim()).then(checkCount);
}
function checkCount(response) {
  console.log(response);
  if (response.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (2 <= response.length && response.length <= 10) {
    countriesList.innerHTML = '';
    const countriesItem = response
      .map(({ flags, name }) => {
        return `<li class='country-item'>
        <div class='country-icon'>
         <img src = ${flags.svg} alt = ${name.common} />
         </div>
         <p class ='country-name'> ${name.common} </p>
      </li>`;
      })
      .join('');

    countriesList.insertAdjacentHTML('beforeend', countriesItem);
    return;
  }
}
