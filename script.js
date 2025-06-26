const btn = document.getElementById("searchBtn");
const display = document.getElementById("display");
btn.addEventListener("click", function () {
  const text = document.getElementById("searchInput").value.trim();
  if (!text) {
    alert("Please enter a value.");
    return;
  }
  fetch(`https://api.tvmaze.com/search/shows?q=${text}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        alert("No show found.");
        return;
      }

      // This is a less efficient way to handle multiple results by displaying the first one.
      //   else {
      //     const show = data[0].show;
      //     document.getElementById("display").innerHTML = `
      //         <h2>${show.name}</h2>
      //         <img src="${show.image.medium}" alt="${show.name}">
      //         <p>Genre: ${show.genres.join(", ")}</p>
      //         <p>Status: ${show.status}</p>
      //         <p>Rating: ${show.rating.average}</p>
      //         <p>Language: ${show.language}</p>
      //         <p>Summary: ${show.summary}</p>
      //         <p>Last updated: ${new Date(show.updated).toLocaleString()}</p>
      //         <a href="${show.officialSite}">Link here to watch the show: ${
      //       show.officialSite
      //     }<a>
      //     `;
      //   }

      // This is a more efficient way to handle multiple results by looping through the data array and creating a new card for each show.
      display.innerHTML = ""; // clear previous results

      data.forEach((item) => {
        const show = item.show;
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
      <img src="${
        show.image?.medium ||
        "https://via.placeholder.com/210x295?text=No+Image"
      } alt="${show.name}">
      <h3>${show.name}</h3>
      <p><strong>Genres:</strong> ${show.genres.join(", ") || "N/A"}</p>
      <p><strong>Status:</strong> ${show.status || "Unknown"}</p>
      <p><strong>Language:</strong> ${show.language}</p>
      <a href="${show.officialSite || "#"}" target="_blank">Visit Site</a>
    `;

        display.appendChild(card);
      });
    });
});
