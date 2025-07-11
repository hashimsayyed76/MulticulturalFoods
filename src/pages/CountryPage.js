export class CountryPage {
  constructor(country) {
    this.country = country
    this.dishes = this.getDishesForCountry(country)
  }

  getDishesForCountry(country) {
    const dishesData = {
      greece: [
        {
          id: 'gyros',
          name: 'Gyros',
          img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Traditional Greek dish with seasoned meat wrapped in pita bread with vegetables and tzatziki sauce.'
        },
        {
          id: 'moussaka',
          name: 'Moussaka',
          img: 'https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Layered Greek casserole with eggplant, meat sauce, and béchamel sauce.'
        },
        {
          id: 'souvlaki',
          name: 'Souvlaki',
          img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Grilled meat skewers, a popular Greek street food served with pita and vegetables.'
        },
        {
          id: 'greek_salad',
          name: 'Greek Salad',
          img: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Fresh salad with tomatoes, cucumbers, olives, and feta cheese dressed with olive oil.'
        }
      ],
      india: [
        {
          id: 'butter_chicken',
          name: 'Butter Chicken',
          img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Creamy Indian curry with tender chicken in a rich tomato-based sauce.'
        },
        {
          id: 'biryani',
          name: 'Biryani',
          img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Aromatic rice dish layered with spiced meat or vegetables and fragrant basmati rice.'
        },
        {
          id: 'palak_paneer',
          name: 'Palak Paneer',
          img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Creamy spinach curry with cubes of fresh paneer cheese.'
        },
        {
          id: 'samosa',
          name: 'Samosa',
          img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Crispy fried pastry filled with spiced potatoes and peas.'
        }
      ],
      italy: [
        {
          id: 'spaghetti_carbonara',
          name: 'Spaghetti Carbonara',
          img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Classic Roman pasta dish with eggs, cheese, pancetta, and black pepper.'
        },
        {
          id: 'lasagna',
          name: 'Lasagna',
          img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Layered pasta dish with meat sauce, béchamel, and cheese.'
        },
        {
          id: 'margherita_pizza',
          name: 'Margherita Pizza',
          img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Traditional Neapolitan pizza with tomato, mozzarella, and fresh basil.'
        },
        {
          id: 'risotto',
          name: 'Risotto',
          img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
          description: 'Creamy rice dish slowly cooked with broth and various ingredients.'
        }
      ]
    }

    return dishesData[country] || []
  }

  render() {
    const countryName = this.country.charAt(0).toUpperCase() + this.country.slice(1)
    const flag = this.getCountryFlag(this.country)

    return `
      <div class="ai-container">
        <h2>Popular ${countryName} Dishes ${flag}</h2>
        <div class="dish-grid" id="dishGrid">
          ${this.dishes.map(dish => `
            <div class="dish-card" data-id="${dish.id}">
              <img src="${dish.img}" alt="${dish.name}" />
              <div class="heart-icon" role="button" tabindex="0" aria-label="Add ${dish.name} to favorites">♡</div>
              <div class="dish-info">
                <h4>${dish.name}</h4>
                <p>${dish.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `
  }

  getCountryFlag(country) {
    const flags = {
      greece: '🇬🇷',
      india: '🇮🇳',
      italy: '🇮🇹',
      mexico: '🇲🇽',
      thailand: '🇹🇭',
      turkey: '🇹🇷'
    }
    return flags[country] || '🌍'
  }

  init() {
    this.updateHeartIcons()
    
    const dishGrid = document.getElementById('dishGrid')
    dishGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('heart-icon')) {
        const dishCard = e.target.closest('.dish-card')
        const dishId = dishCard.dataset.id
        this.toggleFavorite(dishId, e.target)
      }
    })
  }

  updateHeartIcons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const hearts = document.querySelectorAll('.heart-icon')
    
    hearts.forEach(heart => {
      const dishId = heart.parentElement.dataset.id
      if (favorites.includes(dishId)) {
        heart.textContent = '❤️'
        heart.classList.add('favorited')
        heart.setAttribute('aria-label', `Remove ${dishId} from favorites`)
      } else {
        heart.textContent = '♡'
        heart.classList.remove('favorited')
        heart.setAttribute('aria-label', `Add ${dishId} to favorites`)
      }
    })
  }

  toggleFavorite(dishId, heartElement) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const index = favorites.indexOf(dishId)

    if (index > -1) {
      favorites.splice(index, 1)
      heartElement.textContent = '♡'
      heartElement.classList.remove('favorited')
    } else {
      favorites.push(dishId)
      heartElement.textContent = '❤️'
      heartElement.classList.add('favorited')
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}