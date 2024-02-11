const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
        <img src="../img/logo.jpg" class="logo" alt="">
        <div class="footer-ul-container">
            <ul class="category">
                <li class="category-title">men</li>
                <li><a href="#" class="footer-link">T-shirts</a></li>
                <li><a href="#" class="footer-link">Sweatshirts</a></li>
                <li><a href="#" class="footer-link">Shirts</a></li>
                <li><a href="#" class="footer-link">Jeans</a></li>
                <li><a href="#" class="footer-link">Trousers</a></li>
                <li><a href="#" class="footer-link">Shoes</a></li>
                <li><a href="#" class="footer-link">Sneakers</a></li>
                <li><a href="#" class="footer-link">Watch</a></li>
            </ul>
            <ul class="category">
                <li class="category-title">women</li>
                <li><a href="#" class="footer-link">Salwar-Kameez</a></li>
                <li><a href="#" class="footer-link">Sarees</a></li>
                <li><a href="#" class="footer-link">Kurtis</a></li>
                <li><a href="#" class="footer-link">T-shirts</a></li>
                <li><a href="#" class="footer-link">Unstitched-Fabric</a></li>
                <li><a href="#" class="footer-link">Shoes</a></li>
                <li><a href="#" class="footer-link">Bag</a></li>
                <li><a href="#" class="footer-link">Watch</a></li>
            </ul>
        </div>
    </div>
    <p class="footer-title">about company</p>
    <p class="info">Rushi is an online fashion retailer based in Bangladesh that sells men's, women's, kid's clothing. The site founded in 2021, ships to all over the country and offers everything from party looks to athleisure. It is also one of the industry’s leading names when it comes to finding inclusive clothing.</p>
    <p class="info">Email - customersupport@rushi.com</p>
    <p class="info">telephone - 0170-0000000, 0180-0000000</p>
    <div class="footer-social-container">
        <div>
            <a href="#" class="social-link">terms & services</a>
            <a href="#" class="social-link">privacy page</a>
        </div>
        <div>
            <a href="#" class="social-link">instagram</a>
            <a href="#" class="social-link">facebook</a>
            <a href="#" class="social-link">twitter</a>
        </div>
    </div>
    <p class="footer-credit">Rushi, Best apparels online store</p>
    `;
}

createFooter();