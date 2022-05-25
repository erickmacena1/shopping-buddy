const $productName = document.querySelector('#productName')
const $productPrice = document.querySelector('#productPrice')
const $productQuantity = document.querySelector('#productQuantity')

const $back = document.querySelector('#back')
const $add = document.querySelector('#add')

const $productList = document.querySelector('#productList')

let products = JSON.parse(localStorage.getItem('products')) || []

const productListHeader = "<li><h4><div>➖🛒</div><div>📛</div><div>💲</div><div>±</div></h4></li>";

const updateProductList = () => {
    $productList.innerHTML = productListHeader

    for(let item in products) {
        const product = products[item]

        const $template = document.createElement('template')
        $template.innerHTML = `<li><h4><button id="${item}" onclick="removeItem(${item})">➖🛒</button><div>${product.name}</div><div>${product.price}</div><div>${product.quantity}</div></h4></li>`

        $productList.appendChild($template.content.firstChild)
    }

    localStorage.setItem('products', JSON.stringify(products))
}

const removeItem = (item) => {
    products.splice(item, 1)

    updateProductList()
}

const cleanInputs = () => {
    $productName.value = ""
    $productPrice.value = ""
    $productQuantity.value = ""
}

const addItem = () => {
    products.push({
        name: $productName.value,
        price: $productPrice.value,
        quantity: $productQuantity.value
    })

    updateProductList()
    cleanInputs()
}

$back.onclick = cleanInputs

$add.onclick = addItem

updateProductList()