export class SearchPage {
  constructor() {
    this.dishes = [
      {
        name: "Sushi",
        country: "Japan",
        dateAdded: "2023-01-10",
        rating: 4.9,
        description: "Delicious vinegared rice with seafood or vegetables."
      },
      {
        name: "Tacos",
        country: "Mexico",
        dateAdded: "2022-10-05",
        rating: 4.7,
        description: "Corn or wheat tortilla folded with fillings like meat, beans, and salsa."
      },
      {
        name: "Paella",
        country: "Spain",
        dateAdded: "2021-05-15",
        rating: 4.5,
        description: "Rice dish with saffron, vegetables, seafood, and meat."
      },
      {
        name: "Biryani",
        country: "India",
        dateAdded: "2023-03-20",
        rating: 4.8,
        description: "Spiced rice with meat or vegetables cooked together."
      },
      {
        name: "Baklava",
        country: "Turkey",
        dateAdded: "2020-12-01",
        rating: 4.3,
        description: "Sweet layered pastry with nuts and honey."
      },
      {
        name: "Poutine",
        country: "Canada",
        dateAdded: "2022-06-30",
        rating: 4.1,
        description: "French fries topped with cheese curds and gravy."
      }
    ]
  }

  render() {
    return `
      <div class="search-wrapper">
        <h2>Search Multicultural Dishes</h2>
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="Enter keywords, dish name, or country..." />
          <select id="searchFilter">
            <option value="">Filter by</option>
            <option value="country">Country</option>
            <option value="top">Top Rated</option>
            <option value="contains">Contains</option>
          </select>
          <button class="btn" id="searchBtn">Search</button>
        </div>
        <div class="search-results" id="searchResults">
          <p>Enter a search term to find delicious dishes from around the world!</p>
        </div>
      </div>
    `
  }

  init() {
    const searchBtn = document.getElementById('searchBtn')
    const searchInput = document.getElementById('searchInput')
    
    searchBtn.addEventListener('click', () => this.performSearch())
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch()
      }
    })
  }

  performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase()
    const filter = document.getElementById('searchFilter').value
    const resultsDiv = document.getElementById('searchResults')

    if (!query) {
      resultsDiv.innerHTML = '<p>Please enter a search term.</p>'
      return
    }

    // Filter dishes
    let filteredDishes = this.dishes.filter(dish => {
      const searchableText = (dish.name + " " + dish.country + " " + dish.description).toLowerCase()
      return searchableText.includes(query)
    })

    if (filteredDishes.length === 0) {
      resultsDiv.innerHTML = `<p>No results found for "${query}".</p>`
      return
    }

    // Apply sorting
    switch(filter) {
      case "country":
        filteredDishes.sort((a, b) => a.country.localeCompare(b.country))
        break
      case "top":
        filteredDishes.sort((a, b) => b.rating - a.rating)
        break
    }

    // Render results
    resultsDiv.innerHTML = filteredDishes.map(dish => `
      <div class="result-item">
        <h4>${dish.name}</h4>
        <div class="result-meta">
          Country: ${dish.country} | Added: ${dish.dateAdded} | Rating: ${dish.rating}⭐
        </div>
        <div class="result-description">${dish.description}</div>
      </div>
    `).join('')
  }
}