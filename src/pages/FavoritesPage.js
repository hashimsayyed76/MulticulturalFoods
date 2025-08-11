export class FavoritesPage {
  constructor() {
    this.dishData = {
      gyros: {
        name: "Gyros",
        img: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        description: "Traditional Greek dish with seasoned meat in pita bread"
      },
      moussaka: {
        name: "Moussaka",
        img: "https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        description: "Layered Greek casserole with eggplant and meat sauce"
      },
      souvlaki: {
        name: "Souvlaki",
        img: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        description: "Grilled meat skewers, a Greek street food favorite"
      },
      greek_salad: {
        name: "Greek Salad",
        img: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        description: "Fresh salad with tomatoes, olives, and feta cheese"
      },
      butter_chicken: {
        name: "Butter Chicken",
        img: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        description: "Creamy Indian curry with tender chicken"
      },
      biryani: {
        name: "Biryani",
        img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
        description: "Aromatic rice dish with spices and meat"
      }
    }
  }

  render() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    
    if (favorites.length === 0) {
      return `
        <div class="ai-container">
          <h2>Your Favorite Dishes ❤️</h2>
          <div class="info-box">
            <p style="text-align: center; font-size: 18px; color: #666;">
              You haven't added any favorite dishes yet! 
              <br><br>
              Explore our country pages and click the heart icon on dishes you love to add them here.
            </p>
          </div>
        </div>
      `
    }

    return `
      <div class="ai-container">
        <h2>Your Favorite Dishes ❤️</h2>
        <div class="dish-grid" id="favoritesGrid">
          ${favorites.map(dishId => {
            const dish = this.dishData[dishId]
            if (!dish) return ''
            
            return `
              <div class="dish-card" data-id="${dishId}">
                <img src="${dish.img}" alt="${dish.name}" />
                <div class="heart-icon favorited" role="button" tabindex="0" aria-label="Remove ${dish.name} from favorites">❤️</div>
                <div class="dish-info">
                  <h4>${dish.name}</h4>
                  <p>${dish.description}</p>
                </div>
              </div>
            `
          }).join('')}
        </div>
      </div>
    `
  }

  init() {
    const favoritesGrid = document.getElementById('favoritesGrid')
    if (!favoritesGrid) return

    favoritesGrid.addEventListener('click', (e) => {
      if (e.target.classList.contains('heart-icon')) {
        const dishCard = e.target.closest('.dish-card')
        const dishId = dishCard.dataset.id
        this.removeFavorite(dishId)
      }
    })
  }

  removeFavorite(dishId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    favorites = favorites.filter(id => id !== dishId)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    
    // Re-render the page
    const mainContent = document.getElementById('mainContent')
    mainContent.innerHTML = this.render()
    this.init()
  }
}