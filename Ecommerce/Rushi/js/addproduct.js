let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

// checking user is logged in or not
window.onload = () => {
    if (user) {
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login');
        }
    } else {
        location.replace('/login');
    }
}

// price inputs

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    if (discountPercentage.value > 100) {
        discountPercentage.value = 90;
    } else {
        let discount = actualPrice.value * discountPercentage.value / 100;
        sellingPrice.value = actualPrice.value - discount;
    }
})

sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
})

// upload image to S3
let uploadImages = document.querySelectorAll('.fileupload');
let imagePaths = []; //uploaded image paths will be stored;

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0];
        let imageUrl;

        if (file.type.includes('image')) {
            //if user uploades an image
            fetch('/s3url').then(res => res.json())
                .then(url => {
                    fetch(url, {
                        method: 'PUT',
                        headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
                        body: file
                    }).then(res => {
                        imageUrl = url.split("?")[0];
                        imagePaths[index] = imageUrl;
                        let label = document.querySelector(`label[for=${fileupload.id}]`);
                        label.style.backgroundImage = `url(${imageUrl})`;
                        let productImage = document.querySelector('.product-image');
                        productImage.style.backgroundImage = `url(${imageUrl})`;
                    })
                })
        } else {
            showAlert('Please upload an image');
        }
    })
})

// form submission
const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');

let sizes = []; // will store all the sizes

const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

// buttons
const addProductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');

// store size function
const storeSizes = () => {
    sizes = [];
    let sizeCheckBox = document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item => {
        if (item.checked) {
            sizes.push(item.value);
        }
    })
}
//validate form
const validateForm = () => {
    if (!productName.value.length) {
        return showAlert('enter product name');
    } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
        return showAlert('short description must be between 10 to 100 letters long');
    } else if (!des.value.length) {
        return showAlert('enter detail description about the product');
    } else if (!imagePaths.length) { // image link array
        return showAlert('upload atleast one product image')
    } else if (!sizes.length) { // size array
        return showAlert('select at least one size');
    } else if (!actualPrice.value.length || !discount.value.length || !sellingPrice.value.length) {
        return showAlert('you must add pricings');
    } else if (stock.value < 20) {
        return showAlert('you should have at least 20 items in stock');
    } else if (!tags.value.length) {
        return showAlert('enter few tags to help ranking your product in search');
    } else if (!tac.checked) {
        return showAlert('you must agree to our terms and conditions');
    }
    return true;
}

//send to server.js
const productData = () => {
    let tagArr = tags.value.split(',');
    tagArr.forEach((item, i) => tagArr[i] = tagArr[i].trim());
    return data = {
        name: productName.value,
        shortDes: shortLine.value,
        des: des.value,
        images: imagePaths,
        sizes: sizes,
        actualPrice: actualPrice.value,
        discount: discountPercentage.value,
        sellPrice: sellingPrice.value,
        stock: stock.value,
        tags: tagArr,
        tac: tac.checked,
        email: user.email
    }
}

//save button
addProductBtn.addEventListener('click', () => {
    storeSizes();
    // validate form
    if (validateForm()) {
        loader.style.display = 'block';
        let data = productData();
        if (productId) {
            data.id = productId;
        }
        sendData('/add-product', data);
    }
})

//save draft button
saveDraft.addEventListener('click', () => {
    storeSizes();
    if (!productName.value.length) {
        showAlert('enter product name');
    } else {
        let data = productData();
        data.draft = true;
        if (productId) {
            data.id = productId;
        }
        sendData('/add-product', data);
    }
})

//existing product details handler
const setFormsData = (data) => {
    productName.value = data.name;
    shortLine.value = data.shortDes;
    des.value = data.des;
    actualPrice.value = data.actualPrice;
    discountPercentage.value = data.discount;
    sellingPrice.value = data.sellPrice;
    stock.value = data.stock;
    tags.value = data.tags;
    //set up images
    imagePaths = data.images;
    imagePaths.forEach((url, i) => {
        let label = document.querySelector(`label[for=${uploadImages[i].id}]`);
        label.style.backgroundImage = `url(${url})`;
        let productImage = document.querySelector('.product-image');
        productImage.style.backgroundImage = `url(${url})`;
    })
    //setup sizes
    sizes = data.sizes
    let sizeCheckbox = document.querySelectorAll('.size-checkbox');
    sizeCheckbox.forEach(item => {
        if (sizes.includes(item.value)) {
            item.setAttribute('checked', '');
        }
    })
}
const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email: user.email, id: productId })
    }).then((res) => res.json())
        .then((data) => {
            setFormsData(data);
        })
        .catch(err => {
            location.replace('/seller');
        })
}
let productId = null;
if (location.pathname != '/add-product') {
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}
