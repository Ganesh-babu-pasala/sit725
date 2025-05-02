let allProjects = [];

const addCards = (items, filter = "all") => {
  console.log("addCards called with", items.length, "items and filter:", filter);
  $("#card-section").empty();

  const filtered = filter === "all"
    ? items
    : items.filter(p => p.link.toLowerCase() === filter);

  if (filtered.length === 0) {
    $("#card-section").append("<p class='center-align'>No products found in this category.</p>");
    return;
  }

  filtered.forEach(item => {
    const pros = item.pros?.map(p => `<li><span class="green-dot"></span>${p}</li>`).join("") || "";
    const cons = item.cons?.map(c => `<li><span class="red-dot"></span>${c}</li>`).join("") || "";
    const stars = "⭐".repeat(item.rating) + "☆".repeat(5 - item.rating);

    const html = `
      <div class="col s12 m6 l4">
        <div class="card product-card" data-title="${item.title}">
          <div class="card-image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="card-content">
            <h6 class="product-title">${item.title}</h6>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Pros:</strong><ul>${pros}</ul></p>
            <p><strong>Cons:</strong><ul>${cons}</ul></p>
            <p><strong>Recommendation:</strong> ${item.recommendation}</p>
            <p><strong>Rating:</strong> ${stars}</p>
          </div>
        </div>
      </div>`;
    $("#card-section").append(html);
  });

  $(".product-card").off("click").on("click", function () {
    $(".product-card").removeClass("selected-card");
    $(this).addClass("selected-card");
  });
};

const getProjects = () => {
  $.get("/api/products", (res) => {
    if (res.statusCode === 200) {
      allProjects = res.data;
      addCards(allProjects, "all");  // default to 'all'
    } else {
      console.error("Failed to fetch data:", res.message);
    }
  });
};

$(document).ready(function () {
  $('.modal').modal();
  getProjects();

  $('.category-button').click(function () {
    $('.category-button').removeClass('active');
    $(this).addClass('active');
    const category = $(this).data("category");
    addCards(allProjects, category);
  });

  const socket = io();  // connect to server

  socket.on("productAdded", (newProduct) => {
    console.log("New product added via socket:", newProduct);
    allProjects.push(newProduct);
    addCards(allProjects);
  });
});
