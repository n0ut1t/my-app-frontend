async function searchCountry() {

    const country = document.getElementById("countryInput").value;

    const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
    );

    const data = await response.json();

    const countryData = data[0];

    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = `
        <h3>${countryData.name.common}</h3>
        <p>Capital: ${countryData.capital}</p>
        <p>Població: ${countryData.population}</p>
        <img src="${countryData.flags.png}" width="100">
        <br><br>
        <button onclick="addFavorite('${countryData.name.common}')">
        Afegir a favorits
        </button>
        <button onclick="addWishlist('${countryData.name.common}')">
        Afegir a la Wishlist
        </button>
        <br><br>
        <input type="text" id="commentInput" placeholder="Escriu un comentari...">
        <button onclick="addComment('${countryData.name.common}')">
        Afegir comentari
        </button>
    `;
}

// ====================== FAVORITES ====================== //

async function addFavorite(country) {

    await fetch("https://my-app-favorites.onrender.com/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ country: country })
    });

    loadFavorites();
}

async function loadFavorites() {

    const response = await fetch("https://my-app-favorites.onrender.com/favorites");
    const data = await response.json();
    const list = document.getElementById("favorites");
    list.innerHTML = "";

    data.forEach(f => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${f.country}
        <button onclick="deleteFavorite(${f.id})">Eliminar</button>
        `;
        list.appendChild(li);
    });
}

async function deleteFavorite(id) {

    await fetch(`https://my-app-favorites.onrender.com/favorites/${id}`, {
        method: "DELETE"
    });

    loadFavorites();
}

// ====================== WISHLIST ====================== //

async function addWishlist(country) {

    await fetch("https://my-app-wishlist.onrender.com/wishlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ country: country })
    });

    loadWishlist();
}

async function loadWishlist() {

    const response = await fetch("https://my-app-wishlist.onrender.com/wishlist");
    const data = await response.json();
    const list = document.getElementById("wishlist");
    list.innerHTML = "";

    data.forEach(w => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${w.country}
        <button onclick="deleteWishlist(${w.id})">Eliminar</button>
        `;
        list.appendChild(li);
    });
}

async function deleteWishlist(id) {

    await fetch(`https://my-app-wishlist.onrender.com/${id}`, {
        method: "DELETE"
    });

    loadWishlist();
}

// ====================== COMMENTS ====================== //

async function addComment(country) {

    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value;
    
    if (!commentText) {
        alert("Si us plau, escriu un comentari.");
        return;
    }

    await fetch("https://my-app-comments.onrender.com/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ country: country, comment: commentText })
    });
    
    commentInput.value = ""; // Netejar el camp
    loadComments();
}

async function loadComments() {

    const response = await fetch("https://my-app-comments.onrender.com/comments");
    const data = await response.json();
    const list = document.getElementById("comments");
    list.innerHTML = "";

    data.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `
        <strong>${c.country}:</strong> ${c.comment}
        <button onclick="deleteComment(${c.id})">Eliminar</button>
        `;
        list.appendChild(li);
    });
}

async function deleteComment(id) {

    await fetch(`https://my-app-comments.onrender.com/comments/${id}`, {
        method: "DELETE"
    });

    loadComments();
}

// ====================== INIT ====================== //

loadFavorites();
loadWishlist();
loadComments();