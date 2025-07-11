export class HomePage {
  constructor() {
    this.countries = [
      { name: 'Greek', flag: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=100&h=67&fit=crop', path: 'greece' },
      { name: 'Indian', flag: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=67&fit=crop', path: 'india' },
      { name: 'Italian', flag: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=67&fit=crop', path: 'italy' },
      { name: 'Mexican', flag: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=100&h=67&fit=crop', path: 'mexico' },
      { name: 'Thai', flag: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=67&fit=crop', path: 'thailand' },
      { name: 'Turkish', flag: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=100&h=67&fit=crop', path: 'turkey' }
    ]
  }

  render() {
    return `
      <section class="hero-section">
        <h1>Welcome to Multicultural Foods 🌍</h1>
        <p>Discover authentic recipes and cultural stories from around the world</p>
      </section>

      <section class="info-section">
        <h3>🍽️ Why Multicultural Foods Matter</h3>
        <div class="info-box">
          <p>Food is more than something we eat—it tells stories about where people come from and what they believe in. Every dish carries the history, traditions, and love of the people who created it. By exploring multicultural foods, we connect with different cultures and understand the beautiful diversity of our world.</p>
        </div>

        <h3>📲 What You Can Do with This App</h3>
        <div class="info-box">
          <ul>
            <li>Browse dishes by country or ingredients</li>
            <li>Learn the history and meaning behind each recipe</li>
            <li>Ask our food-only AI chatbot for cooking help or tips</li>
            <li>Save your favorite meals and update your profile</li>
          </ul>
        </div>

        <div class="info-box">
          <p><strong>MulticulturalFoods</strong> is a web-based app designed to introduce you to culturally significant dishes from around the globe. Join us on this delicious journey!</p>
        </div>
      </section>

      <section class="welcome-box">
        <h2>Explore Recipes from Around the World</h2>
        <p>Click a country below to view its popular foods.</p>
      </section>

      <h3>🌐 Our Developers' Favorite Cuisines</h3>
      <div class="countries-grid" id="countriesGrid">
        ${this.countries.map(country => `
          <div class="country-card" data-country="${country.path}">
            <img src="${country.flag}" alt="${country.name} cuisine" />
            <h4>${country.name}</h4>
          </div>
        `).join('')}
      </div>
    `
  }

  init() {
    // Add click handlers for country cards
    document.getElementById('countriesGrid').addEventListener('click', (e) => {
      const countryCard = e.target.closest('.country-card')
      if (countryCard) {
        const country = countryCard.dataset.country
        window.history.pushState({}, '', `/country/${country}`)
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    })
  }
}