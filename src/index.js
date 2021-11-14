import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box")
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

fetchCountries();
searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
  const inputTextContent = searchBox.value.trim();

  clear()

  if (!inputTextContent) {
    return;
    } else fetchCountries(inputTextContent)
    .then(countries => {
      if (countries.status === 404) {
        Notify.failure("Oops, there is no country with that name");
        return;
      }
      if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        return;
      }
      if (countries.length > 1) {
        infoCountries(countries);
        return;
      }
      infoOneCountry(countries);
    })
};

function infoCountries(countries) {
  countryInfo.innerHTML = '';
  const info = countries
    .map(country => {
      return `<li>
                <img src='${country.flag}' alt='${country.name} flag' width='40' />
                <p>${country.name}</p>
              </li>`;
    })
    .join('');
    countryInfo.innerHTML = info;
};

function infoOneCountry(country) {
  countryList.innerHTML = '';
  const info = country
    .map(country => {
      const language = country.languages.map(language => language.name)
      console.log(language);
      console.log(country);
      return `<div>
                <img src='${country.flag}' alt='${country.name} flag' width='70' />
                <h2>${country.name}</h2>
              </div>
            <ul>
                <li>Capital: ${country.capital}</span></li>
                <li>Population: ${country.population}</span></li>
                <li>Languages: ${language}</span></li>
            </ul>`
    })
    countryInfo.innerHTML = info;
};

function clear() {
  searchBox.innerHTML = '';
  countryList.innerHTML = '';
}
