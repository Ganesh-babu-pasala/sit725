let allProjects = [];

const addCards = (items, filter = "all") => {
  $("#card-section").empty();
  const filtered = filter === "all" ? items : items.filter(p => p.link.toLowerCase() === filter);

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

  // Highlight on click (optional)
  $(".product-card").off("click").on("click", function () {
    $(".product-card").removeClass("selected-card");
    $(this).addClass("selected-card");
  });
};

const getProjects = () => {
  $.get("/api/projects", (res) => {
    if (res.statusCode === 200) {
      allProjects = res.data;
      addCards(allProjects);
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
});
