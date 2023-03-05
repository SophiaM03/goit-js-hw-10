import './css/styles.css';
import { getCountries } from './services/fetchCountries';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import {
  createCountryMarkup,
  createCountriesMarkup,
  clearDocument,
  render,
} from './templates/renderCountries';
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
  clearDocument(coutryInfoRef, coutryListRef);
  if (!value) {
    return;
  }
  getCountries(value).then(onFulfilled).catch(onRejected);
}

function onFulfilled(data) {
  if (data.length === 1) {
    return render(coutryInfoRef, createCountryMarkup(data[0]));
  }
  if (data.length > 1 && data.length <= 10) {
    return render(coutryListRef, createCountriesMarkup(data));
  }
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function onRejected(error) {
  Notify.failure(error.message);
}
