const createNav = () => {
    let nav = document.querySelector(".navbar");

    nav.innerHTML = `
<div class="nav">
<img src="../img/logo.jpg" class="brand-logo" alt="" onclick="location.href = '/'">
<div class="nav-items">
    <div class="search">
        <input type="text" class="search-box" placeholder="search in Rushi">
        <button class="search-btn">search</button>
    </div>
    <a href="#"><img src="../img/usercart.gif" alt="" onclick="location.href = '/cart'"></a>
    <a href="#"><img src="../img/wishlist1.png" alt="" onclick="location.href = '/cart'"></a>
    <a>
        <img src="../img/profile.png" id="user-img" alt="">
        <div class="login-logout-popup hide">
            <p class="account-info">Logged in as, name</p>
            <button class="btn" id="user-btn">Log out</button>
            <button class="btn" id="user-btn" onclick="location.href = '/seller'">Seller</button>
        </div>
    </a>
</div>
</div>
<ul class="Links-container">
<li class="Link-item" onclick="location.href = '/'"><a href="#" class="Link">home</a></li>
<li class="Link-item" onclick="location.href = '/women'"><a href="#" class="Link">women</a></li>
<li class="Link-item" onclick="location.href = '/men'"><a href="#" class="Link">men</a></li>
<li class="Link-item" onclick="location.href = '/kids'"><a href="#" class="Link">kids</a></li>
<li class="Link-item" onclick="location.href = '/accessories'"><a href="#" class="Link">accessories</a></li>
</ul>
`;
};

createNav();

const userImageButton = document.querySelector("#user-img");
const userPopup = document.querySelector(".login-logout-popup");
const popuptext = document.querySelector(".account-info");
const actionBtn = document.querySelector("#user-btn");

userImageButton.addEventListener("click", () => {
    userPopup.classList.toggle("hide");
});

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if (user != null) {
        popuptext.innerHTML = `Logged in as, ${user.username}`;
        actionBtn.innerHTML = `Log out`;
        actionBtn.addEventListener("click", () => {
            sessionStorage.clear();
            location.reload();
        });
    } else {
        //user is not logged out
        popuptext.innerHTML = `Log in to shop`;
        actionBtn.innerHTML = `Log in`;
        actionBtn.addEventListener("click", () => {
            location.href = "/login";
        });
    }
};

//search box
const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click', () => {
    if (searchBox.value.length) {
        location.href = `/search/${searchBox.value}`
    }
})
