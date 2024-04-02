document.addEventListener("DOMContentLoaded", function() {
    const countryName = new URLSearchParams(location.search).get('name');
    const flagImage = document.querySelector(".country-flag img");
    const countryNameH1 = document.querySelector(".country-flag h1");
    const nativeName = document.querySelector(".native-name");
    const population = document.querySelector(".population");
    const region = document.querySelector(".region");
    const subRegion = document.querySelector(".sub-region");
    const capital = document.querySelector(".capital");
    const topLevelDomain = document.querySelector(".top-level-domain");
    const currencies = document.querySelector(".currencies");
    const languages = document.querySelector(".languages");

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const countryData = data[0]; // Assign data[0] to countryData
            // Update flag image source
            flagImage.src = countryData.flags.svg;
            // Update country name
            countryNameH1.textContent = countryName;
            // Update native name if available
            if (countryData.name && countryData.name.native) {
                // Convert the native object to an array of values and join them
                nativeName.innerText = Object.values(countryData.name.native).join(", ");
            } else {
                // If native name is not available, use the common country name
                nativeName.innerText = countryName;
            }
            // Update population if available
            if (countryData.population) {
                population.innerText = countryData.population.toLocaleString();
            } else {
                population.innerText = 'N/A';
            }
            // Update region if available
            region.innerText = countryData.region || 'N/A';
            // Update sub-region if available
            subRegion.innerText = countryData.subregion || 'N/A';
            // Update capital if available
            capital.innerText = countryData.capital || 'N/A';
            // Update top-level domain if available
            topLevelDomain.innerText = countryData.tld || 'N/A';
            // Update currencies if available
            currencies.innerText = countryData.currencies ? Object.values(countryData.currencies).map(currency => currency.name).join(", ") : 'N/A';
            // Update languages if available
            languages.innerText = countryData.languages ? Object.values(countryData.languages).join(", ") : 'N/A';
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
});



document.addEventListener("DOMContentLoaded", function() {
    // Simulate loading delay of 1 second
    setTimeout(function() {
      // Hide the loader
      const loader = document.querySelector('.loader');
      loader.style.display = 'none';
  
      // Show the content
      const content = document.querySelector('.content');
      content.classList.remove('hidden');
    }, 1000); // 1000 milliseconds = 1 second
  });
  