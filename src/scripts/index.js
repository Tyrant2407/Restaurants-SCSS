import "regenerator-runtime"; 
import "../styles/main.css";
import "./footer-bar.js";

class RestaurantList extends HTMLElement {
  constructor() {
    super();


    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._style = document.createElement("style");
    this._style.textContent = `
            .restaurant-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                grid-gap: 15px;
                margin: 32px auto auto;
                text-align: center;
                width: 100%;
            }
            .restaurant-card {
                border: 1px solid #ccc;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .restaurant-card img {
              width: 85%;
              border-radius: 8px;
              margin-bottom: 10px;
            }
            
            .restaurant-card h2 {
              font-size: 20px;
              margin-bottom: 10px;
              color: #333;
            }
            
            .restaurant-card p {
              margin-bottom: 10px;
              color: #666;
            }
            
            .restaurant-card p.city {
              font-style: italic;
            }
            
            .restaurant-card p.rating {
              font-weight: bold;
            }
            
            /* Efek hover */
            .restaurant-card:hover {
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }
            
            /* Efek transition */
            .restaurant-card img,
            .restaurant-card h2,
            .restaurant-card p {
              transition: all 0.3s ease;
            }
        `;
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
            <div class="restaurant-list">
            </div>
        `;
    this.renderRestaurants();
  }

  async fetchData() {
    try {
      const response = await fetch("/data/DATA.json");
      const data = await response.json();
      return data.restaurants;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async renderRestaurants() {
    const restaurants = await this.fetchData();
    const restaurantList = this._shadowRoot.querySelector(".restaurant-list");
    restaurantList.appendChild(this._style);

    this._shadowRoot.appendChild(this._style);
    restaurants.forEach((restaurant, index) => {
      const restaurantItem = document.createElement("div");
      restaurantItem.classList.add("restaurant-card");
      restaurantItem.setAttribute("tabindex", index + 1);

      restaurantItem.innerHTML = `
                <img src="${restaurant.pictureId}" alt="${restaurant.name}">
                <h2>${restaurant.name}</h2>
                <p>${restaurant.description.substring(0, 100)}...</p>
                <p class="city">City: ${restaurant.city}</p>
                <p class="rating">Rating: ${restaurant.rating}</p>
            `;

      restaurantList.appendChild(restaurantItem);
    });
  }
}

customElements.define("restaurant-list", RestaurantList);

// Event listeners
const menu = document.querySelector("#menu");
const hero = document.querySelector(".hero_header");
const drawer = document.querySelector("#navbar");

menu.addEventListener("click", function (event) {
  drawer.classList.toggle("open");
  event.stopPropagation();
});

hero.addEventListener("click", function () {
  drawer.classList.remove("open");
});

document.body.addEventListener("click", function () {
  drawer.classList.remove("open");
});


console.log("Hello Coders! :)");
