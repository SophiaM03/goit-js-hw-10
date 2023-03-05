export function createCountriesMarkup(countries) {
  return countries
    .map(
      ({ flags, name }) => `
            <li>
                <div >
                    <img
                        src="${flags.svg}"
                        alt="${name}"
                        width="60"
                        height="40"
                    />
                    <span>${name}</span>
                </div>
            </li>
        `
    )
    .join('');
}

export function createCountryMarkup({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  return `
            <div >
                <img src="${
                  flags.svg
                }" alt="${name}" width= "120"  height="80" />
                <h2>${name}</h2>
            </div>
            <ul>
                <li>
                    <p >
                    Capital: <span >${capital}</span>
                    </p>
                </li>
                <li>
                    <p >
                    Population: <span >${population}</span>
                    </p>
                </li>
                <li>
                    <p>
                    Languages:
                    <span>${languages.map(({ name }) => name).join(',')}</span>
                    </p>
                </li>
             </ul>
          `;
}

export function clearDocument(...refs) {
  refs.forEach(ref => {
    ref.innerHTML = '';
  });
}

export function render(ref, markup) {
  ref.innerHTML = markup;
}
