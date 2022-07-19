import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
  search: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const { search, countriesList, info } = refs;

search.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
function searchCountry(event) {
  if (event.target.value.trim() === '') {
    clearHtml();
    return;
  }
  fetchCountries(event.target.value.trim()).then(checkCount);
}
function checkCount(response) {
  if (!Array.isArray(response)) {
    fetchError();
    console.clear();
    return;
  }
  if (response.length > 10) {
    clearHtml();
    fetchInfo();
    return;
  }
  if (2 <= response.length && response.length <= 10) {
    clearHtml();
    countriesTemplates(response);
    return;
  }
  if (response.length === 1) {
    clearHtml();
    countryTemplat(response);
    return;
  }
}
function clearHtml() {
  countriesList.innerHTML = '';
  info.innerHTML = '';
}
function fetchError() {
  clearHtml();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function fetchInfo() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function countriesTemplates(response) {
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
}
function countryTemplat(response) {
  const countryInfo = response.map(
    ({ flags, name, capital, languages, population }) => {
      const cap = capital[0];
      const lang = Object.values(languages).join(', ');
      return `<div class="info-title">
      <div class="info-icon">
        <img src=${flags.svg} alt=${name.common} />
      </div>
      <p class="info-country-name">${name.common}</p>
    </div>
    <div class="info">
      <p><span class="stats">Capital :</span> ${cap}</p>
      <p><span class="stats">Population :</span> ${population}</p>
      <p><span class="stats">Languages :</span> ${lang}</p>
    </div>`;
    }
  );
  info.insertAdjacentHTML('beforeend', countryInfo);
}
