const qs = (selector, parent = document) => {
    return parent.querySelector(selector)
}

const qsa = (selector, parent = document) => {
    return Array.from(parent.querySelectorAll(selector))
}

const $exportModal = qs('#exportModal')
const $export = qs('#export')
const $confirmExport = qs('#confirmExport')
const $rejectExport = qs('#rejectExport')

const $storeName = qs("#storeName")
const $date = qs("#date")

const $productName = qs('#productName')
const $productPrice = qs('#productPrice')
const $productQuantity = qs('#productQuantity')

const $back = qs('#back')
const $add = qs('#add')

const $productList = qs('#productList')
const $sumaryCount = qs("#sumaryCount")
const $sumaryMoney = qs("#sumaryMoney")

let sbStore;
let products = JSON.parse(localStorage.getItem('products')) || []

const closeExportModal = () => {
    $confirmExport.setAttribute('href', '')
    $confirmExport.setAttribute('download', '')

    $exportModal.classList.add('d-none')
}

const fillConfirmExport = () => {
    const data = JSON.stringify(products)

    const todayDate = new Date()
    const dateFormatted = `${todayDate.getDate()}.${todayDate.getMonth() + 1}.${todayDate.getFullYear()}`

    $confirmExport.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data))
    $confirmExport.setAttribute('download', 'shopping-data-' + dateFormatted + '.json')
}

const openExportModal = () => {
    fillConfirmExport()
    $exportModal.classList.remove('d-none')
}

const countTotalItems = ($productList = qs("#productList")) => {
    return qsa('.item', $productList).length
}

const countCashTotalPrice = () => {
    return qsa('.item div:nth-child(3)', $productList)
        .reduce((sum, $priceDiv) => sum += parseFloat($priceDiv.innerText), 0)
}

const removeItem = (item) => {
    products.splice(item, 1)

    updateProductList()
}

const productListHeader = "<li><h4><div>➖🛒</div><div>📛</div><div>💲</div><div>±</div></h4></li>";
const updateProductList = () => {
    $productList.innerHTML = productListHeader

    for (let item in products) {
        const product = products[item]

        const $template = document.createElement('template')
        $template.innerHTML = `<li class="item"><h4><button id="${item}" onclick="removeItem(${item})">➖🛒</button><div>${product.name}</div><div>${product.price}</div><div>${product.quantity}</div></h4></li>`

        $productList.appendChild($template.content.firstChild)
    }

    $sumaryCount.innerText = countTotalItems()
    $sumaryMoney.innerText = countCashTotalPrice()

    localStorage.setItem('products', JSON.stringify(products))
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

    cleanInputs()
    updateProductList()
}

const getDateYYYYMMDD = (date = new Date(), separator = "-") => {
    return String(date.getFullYear() + separator + (date.getMonth() + 1).toString().padStart(2, "0") + separator + date.getDate().toString().padStart(2, "0"))
}

$date.value = getDateYYYYMMDD()

$back.onclick = cleanInputs
$add.onclick = addItem

$export.onclick = openExportModal
$rejectExport.onclick = closeExportModal

sbStore = JSON.parse(localStorage.getItem('sbStore'))
    ||
{
    purchaseHistory: [],
    currentPurchase: {
        storeName: $storeName.value,
        date: $date.value,
        products: [],
    },
}

updateProductList()