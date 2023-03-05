import './css/styles.css';
import { getCountries } from './fetchCountries';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const coutryListRef = document.querySelector('.country-list');
const coutryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener(
  'input',
  debounce(handleSerachCountries, DEBOUNCE_DELAY)
);

function handleSerachCountries(e) {
  const value = e.target.value.trim();
  if (!value) {
    return;
  }
  getCountries(value)
    .then(data => {
      if (data.length === 1) {
        const markup = data.map(
          ({ name: { common }, capital, population, flags, languages }) =>
            `
              <img
                src="${flags.svg}" 
                alt="${name}" 
                width="120" 
                height="80">
              <h1>${common}</h1>
              <ul >
                  <li>
                  <span>Capital:</span>
                ${capital}
                  </li>
                  <li>
                  <span>Population:</span>
                  ${population}
                  </li>
                  <li >
                  <span>Lenguages:</span>
                  ${Object.values(languages)
                    .map(lang => `<p>${lang}</p>`)
                    .join('')}
                  </li>
              </ul>
          `
        );
        coutryListRef.innerHTML = '';
        coutryInfoRef.innerHTML = markup;
        return;
      }
      if (data.length > 1 && data.length <= 10) {
        const markup = data
          .map(
            ({ name, flags }) => `
          <li>
            <img 
              src="${flags.svg}" 
              alt="${name.official}" 
              width="60" 
              height="40">
            ${name.official}
          </li>`
          )
          .join('');
        coutryInfoRef.innerHTML = '';
        coutryListRef.innerHTML = markup;
        return;
      }
      Notify.info('Too many matches found. Please enter a more specific name.');
    })
    .catch(error => Notify.failure(error.message));
}
