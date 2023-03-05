export const getCountries = countryName => {
  return fetch(
    `https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return res.json();
  });
};
