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

const STOREKEY = 'sbStore';
const STOREMODEL = {
    purchaseHistory: [],
    currentPurchase: {
        storeName: "Store Name",
        date: String,
        products: [],
    },
};

let sbStore = STOREMODEL
let currentPurchase = sbStore.currentPurchase
let products = currentPurchase.products

const CloseExportModal = () => {
    $confirmExport.setAttribute('href', '')
    $confirmExport.setAttribute('download', '')

    $exportModal.classList.add('d-none')
}

const FillConfirmExport = () => {
    const data = JSON.stringify(products)

    const todayDate = new Date()
    const dateFormatted = `${todayDate.getDate()}.${todayDate.getMonth() + 1}.${todayDate.getFullYear()}`

    $confirmExport.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data))
    $confirmExport.setAttribute('download', 'shopping-data-' + dateFormatted + '.json')
}

const OpenExportModal = () => {
    FillConfirmExport()
    $exportModal.classList.remove('d-none')
}

const CountTotalItems = ($productList = qs("#productList")) => {
    return qsa('.item', $productList).length
}

const CountCashTotalPrice = ($productList = qs("#productList")) => {
    return qsa('.item div:nth-child(3)', $productList)
        .reduce((sum, $priceDiv) => sum += parseFloat($priceDiv.innerText), 0)
}

const RemoveItem = (item) => {
    products.splice(item, 1)

    UpdateProductList()
}

const productListHeader = "<li><h4><div>➖🛒</div><div>📛</div><div>💲</div><div>±</div></h4></li>";
const UpdateProductList = () => {
    $productList.innerHTML = productListHeader

    for (let item in products) {
        const product = products[item]

        const $template = document.createElement('template')
        $template.innerHTML = `<li class="item"><h4><button id="${item}" onclick="RemoveItem(${item})">➖🛒</button><div>${product.name}</div><div>${product.price}</div><div>${product.quantity}</div></h4></li>`

        $productList.appendChild($template.content.firstChild)
    }

    $sumaryCount.innerText = CountTotalItems()
    $sumaryMoney.innerText = CountCashTotalPrice()
    console.log("Store updated")
    console.log(sbStore)
    localStorage.setItem(STOREKEY, JSON.stringify(sbStore))
}

const CleanInputs = () => {
    $productName.value = ""
    $productPrice.value = ""
    $productQuantity.value = ""
}

const AddItem = () => {
    products.push({
        name: $productName.value,
        price: $productPrice.value,
        quantity: $productQuantity.value
    })

    CleanInputs()
    UpdateProductList()
}

const GetDateYYYYMMDD = (date = new Date(), separator = "-") => {
    return String(date.getFullYear() + separator + (date.getMonth() + 1).toString().padStart(2, "0") + separator + date.getDate().toString().padStart(2, "0"))
}

const OnStoreNameChange = () => {
    currentPurchase.storeName = $storeName.value
    UpdateProductList()
}

const OnDateChange = () => {
    currentPurchase.date = $date.value
    UpdateProductList()
}

$storeName.onchange = OnStoreNameChange
$date.onchange = OnDateChange

$back.onclick = CleanInputs
$add.onclick = AddItem

$export.onclick = OpenExportModal
$rejectExport.onclick = CloseExportModal

sbStore = JSON.parse(localStorage.getItem(STOREKEY)) || STOREMODEL
currentPurchase = sbStore.currentPurchase
products = currentPurchase.products

$storeName.value = currentPurchase.storeName
$date.value = currentPurchase.date == "" ? GetDateYYYYMMDD() : currentPurchase.date

UpdateProductList()