// === Product Review Data ===
const cardList = [
    {
      productName: "Apple Watch Series 9",
      imageURL: "https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-carbon-neutral-lineup-230912_big.jpg.large.jpg",
      category: "watches",
      description: "The latest Apple Watch with advanced health monitoring, brighter display, and faster performance.",
      pros: [
        "Feature-rich health and fitness tracking",
        "Smooth and snappy performance",
        "Bright always-on display"
      ],
      cons: [
        "Battery life lasts about a day",
        "Premium price point",
        "Works best only with iPhone"
      ],
      recommendation: "Highly recommended for iPhone users who want the best-in-class smartwatch for fitness and daily use.",
      rating: 5
    },
    {
      productName: "Google Pixel 8 Pro",
      imageURL: "https://media.wired.com/photos/6526b988c55060c7594b0d40/1:1/w_1800,h_1800,c_limit/Google-Pixel-8-Pro-and-Pixel-8-Review-Gear.jpg",
      category: "phones",
      description: "Google's flagship phone with an incredible camera and clean Android experience.",
      pros: [
        "Outstanding camera performance",
        "Smooth and clean Android UI",
        "Beautiful OLED display"
      ],
      cons: [
        "Battery life could be better",
        "Can heat up with heavy use"
      ],
      recommendation: "Recommended for Android lovers and photography enthusiasts.",
      rating: 4
    },
    {
      productName: "Sony WF-1000XM4 Wireless Earbuds",
      imageURL: "https://store.sony.com.au/dw/image/v2/ABBC_PRD/on/demandware.static/-/Sites-sony-master-catalog/default/dw14070258/images/WF1000XM4S/WF1000XM4S.png",
      category: "electronics",
      description: "Top-tier noise-canceling wireless earbuds offering superb sound quality in a compact form.",
      pros: [
        "Excellent sound quality with deep bass",
        "Industry-leading active noise cancellation",
        "Solid battery life with charging case"
      ],
      cons: [
        "Earbuds are a bit bulky for small ears",
        "Premium price tag"
      ],
      recommendation: "Recommended for audiophiles and commuters seeking best-in-class noise-canceling earbuds.",
      rating: 5
    },
    {
      productName: "Samsung Galaxy Tab S9",
      imageURL: "https://images.samsung.com/is/image/samsung/assets/au/tablets/galaxy-tab-s9-fe/buy/TabS9FE-FE_KV_MO_720x720.jpg",
      category: "electronics",
      description: "A premium Android tablet with a vibrant display, powerful hardware, and S Pen support.",
      pros: [
        "Brilliant AMOLED display and quad speakers",
        "Powerful performance for multitasking",
        "Included S Pen"
      ],
      cons: [
        "High price compared to other Android tablets",
        "Limited Android tablet apps"
      ],
      recommendation: "Great for Android users needing a top tablet.",
      rating: 4
    }
  ];
  
  // === Render Cards ===
  const addCards = (items, filter = "all") => {
    $("#card-section").empty();
  
    if (filter === "none") return;
  
    const filteredItems = filter === "all" ? items : items.filter(item => item.category === filter);
  
    filteredItems.forEach(item => {
      const prosList = item.pros.map(p => `<li><span class="green-dot"></span> ${p}</li>`).join("");
      const consList = item.cons.map(c => `<li><span class="red-dot"></span> ${c}</li>`).join("");        
      const stars = "⭐".repeat(item.rating) + "☆".repeat(5 - item.rating);
  
      const cardHTML = `
        <div class="col s12 m6 l4">
          <div class="card">
            <div class="card-image">
              <img src="${item.imageURL}" alt="${item.productName}">
            </div>
            <div class="card-content">
              <h6 class="product-title">${item.productName}</h6>
              <p><strong>Description:</strong> ${item.description}</p>
              <p><strong>Pros:</strong><ul>${prosList}</ul></p>
              <p><strong>Cons:</strong><ul>${consList}</ul></p>
              <p><strong>Recommendation:</strong> ${item.recommendation}</p>
              <p><strong>Rating:</strong> ${stars}</p>
            </div>
          </div>
        </div>
      `;
      $("#card-section").append(cardHTML);
    });
  };
  
  // === Page Ready ===
  $(document).ready(function () {
    $('.materialboxed').materialbox();
  
    // Hide cards at first
    addCards([], "none");
  
    // Show cards when a category is clicked
    $('.category-button').click(function () {
      const selectedCategory = $(this).data("category");
      addCards(cardList, selectedCategory);
    });
  });
  