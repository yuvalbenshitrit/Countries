document.addEventListener("DOMContentLoaded", function() {
    // Fetch country data asynchronously
    fetchCountryData()
        .then(countries => {
            // Update the UI with fetched data
            displayCountries(countries);
        })
        .catch(error => {
            console.error('Error loading countries:', error);
        });

    // Add event listener for filter by region dropdown
    $('#continent-filter').on('change', function() {
        const selectedContinent = $(this).val();
        let apiUrl = "https://restcountries.com/v3.1/all";

        if (selectedContinent !== 'all') {
            apiUrl = `https://restcountries.com/v3.1/region/${selectedContinent}`;
        }

        fetch(apiUrl)
            .then(res => res.json())
            .then(countries => {
                displayCountries(countries);
            })
            .catch(error => {
                console.error('Error loading countries:', error);
            });
    });

    // Add event listener for search input
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase();
        const countryCards = document.querySelectorAll('.country');
        
        countryCards.forEach(card => {
            const countryName = card.getAttribute('data-country-name').toLowerCase();
            if (countryName.includes(searchText)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

function fetchCountryData() {
    return fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .catch(error => {
            throw error;
        });
}

function displayCountries(countries) {
    const container = document.querySelector('.countries-grid');
    container.innerHTML = ""; // Clear the placeholder content
    countries.forEach(country => {
        const countryCard = getCountry(country);
        container.insertAdjacentHTML('beforeend', countryCard);
    });

    // Add event listener to each country card
    const countryCards = document.querySelectorAll('.country');
    countryCards.forEach(card => {
        card.addEventListener('click', () => {
            const countryName = card.getAttribute('data-country-name');
            // Redirect to details.html with the selected country name
            window.location.href = `details.html?name=${encodeURIComponent(countryName)}`;
        });
    });
}

function getCountry(country) {
    return `
    <div class="country scale-effect" data-country-name="${country.name.common}">
        <img src="${country.flags.png}" alt="${country.name.common} flag">
        <h2>${country.name.common}</h2>
        <ul>
            <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
            <li><strong>Region:</strong> ${country.region}</li>
            <li><strong>Capital:</strong> ${country.capital}</li>
        </ul>
    </div>
    `;
}
