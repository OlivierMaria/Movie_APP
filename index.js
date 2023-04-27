$(document).ready(function () {
  const apikey = "9f994339";
  $("#movieForm").submit(function (event) {
    event.preventDefault();

    const movie = $("#movie").val();

    const url = `http://www.omdbapi.com/?apikey=${apikey}&s=${movie}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let result = "";

        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            result += `
              <div class="card" style="width: 18rem;" data-aos="zoom-in" data-imdbid="${movie.imdbID}">
                <img class="card-img-top" src="${movie.Poster}" alt="Movie Poster">
                <div class="card-body">
                  <h5 class="card-title">${movie.Title}</h5>
                  <button class="btn btn-primary read-more d-inline-block">Read more</button>
                  <a class="btn btn-secondary imdb-link d-inline-block" href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank">IMDB</a>
                </div>
              </div>
            `;
          });
        } else {
          result = `<p>${data.Error}</p>`;
        }

        $("#result").html(result);
      })

      .catch((error) => console.log(error));
  });

  $(document).on("click", ".read-more", function () {
    const imdbid = $(this).closest(".card").data("imdbid");
    const url = `http://www.omdbapi.com/?apikey=${apikey}&i=${imdbid}`;

    const card = $(this).closest(".card");
    const details = card.find(".details");

    if (details.length) {
      details.remove();
      return;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const detailsHtml = `
          <div class="details">
            <ul>
              <li><strong>Released:</strong> ${data.Released}</li>
              <li><strong>Runtime:</strong> ${data.Runtime}</li>
              <li><strong>Genre:</strong> ${data.Genre}</li>
              <li><strong>Director:</strong> ${data.Director}</li>
              <li><strong>Actors:</strong> ${data.Actors}</li>
            </ul>
          </div>
        `;
        card.append(detailsHtml);
      })
      .catch((error) => console.log(error));
  });
});
