const qs = (selector, parent = document) => {
    return parent.querySelector(selector)
}

const $exportModal = qs('#exportModal')
const $export = qs('#export')
const $confirmExport = qs('#confirmExport')
const $rejectExport = qs('#rejectExport')

const $productName = qs('#productName')
const $productPrice = qs('#productPrice')
const $productQuantity = qs('#productQuantity')

const $back = qs('#back')
const $add = qs('#add')

const $productList = qs('#productList')

let products = JSON.parse(localStorage.getItem('products')) || []


const closeExportModal = () => {
    $confirmExport.setAttribute('href', '')
    $confirmExport.setAttribute('download', '')
    
    $exportModal.classList.add('d-none')
}

const fillConfirmExport = () => {
    const data = JSON.stringify(products)

    const todayDate = new Date()
    const dateFormatted = `${todayDate.getDate()}.${todayDate.getMonth()+1}.${todayDate.getFullYear()}`

    $confirmExport.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data))
    $confirmExport.setAttribute('download', 'shopping-data-' + dateFormatted + '.json')

    closeExportModal()
}

const openExportModal = () => {
    fillConfirmExport()
    $exportModal.classList.remove('d-none')
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
        $template.innerHTML = `<li><h4><button id="${item}" onclick="removeItem(${item})">➖🛒</button><div>${product.name}</div><div>${product.price}</div><div>${product.quantity}</div></h4></li>`

        $productList.appendChild($template.content.firstChild)
    }

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

$back.onclick = cleanInputs

$add.onclick = addItem

$export.onclick = openExportModal
$rejectExport.onclick = closeExportModal

updateProductList()