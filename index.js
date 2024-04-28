async function fetchCountryData() {
  const response = await fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries');
  const data = await response.json();
  return data.data;
}

function displayCountryData(countries) {
  const countryContainer = document.getElementById('country-container');
  countryContainer.innerHTML = '';

  countries.forEach(country => {
    const card = document.createElement('div');
    card.classList.add('country-card');
    card.innerHTML = `
      <h2>${country.country}</h2>
      <p><strong>ID:</strong> ${country.id}</p>
      <p><strong>Rank:</strong> ${country.Rank}</p>
      <p><strong>Population:</strong> ${country.population}</p>
    `;
    countryContainer.appendChild(card);
  });
}

function sortCountriesByPopulation(countries, order = 'desc') {
  return countries.sort((a, b) => {
    if (order === 'desc') {
      return b.population - a.population;
    } else {
      return a.population - b.population;
    }
  });
}

const sortButton = document.getElementById('sort-button');
sortButton.addEventListener('click', async () => {
  const countries = await fetchCountryData();
  const sortedCountries = sortCountriesByPopulation(countries);
  displayCountryData(sortedCountries);
});

window.onload = async () => {
  const countries = await fetchCountryData();
  displayCountryData(countries);
};