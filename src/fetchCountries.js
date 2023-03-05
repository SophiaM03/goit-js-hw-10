export const getCountries = countryName => {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(
    res => {
      if (!res.ok) {
        throw new Error('Oops, there is no country with that name');
      }
      return res.json();
    }
  );
};
