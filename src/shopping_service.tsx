const start = () => {

    const qs = (selector: string, parent: Document | Element = document) => {
        return parent.querySelector(selector)
    }

    const qsa = (selector: string, parent: Document | Element = document) => {
        return Array.from(parent.querySelectorAll(selector))
    }

    const sleep = async (ms: number) => {
        return new Promise(resolve => setInterval(resolve, ms))
    }

    const $storeName = qs("#storeName") as HTMLInputElement | any
    const $date = qs("#date") as HTMLInputElement | any

    const $productName = qs('#productName') as HTMLInputElement | any
    const $productPrice = qs('#productPrice') as HTMLInputElement | any
    const $productQuantity = qs('#productQuantity') as HTMLInputElement | any

    const $back = qs('#back') as HTMLButtonElement | any
    const $add = qs('#add') as HTMLButtonElement | any

    const $checkout = qs('#checkout') as HTMLButtonElement | any
    const $checkoutModal = qs('#checkoutModal') as HTMLDivElement | any
    const $confirmCheckout = qs('#confirmCheckout') as HTMLAnchorElement | any
    const $rejectCheckout = qs('#rejectCheckout') as HTMLButtonElement | any

    const $export = qs('#export') as HTMLButtonElement | any
    const $exportModal = qs('#exportModal') as HTMLDivElement | any
    const $confirmExport = qs('#confirmExport') as HTMLAnchorElement | any
    const $rejectExport = qs('#rejectExport') as HTMLButtonElement | any

    const $productList = qs('#productList') as HTMLUListElement | any
    const $sumaryCount = qs("#sumaryCount") as HTMLSpanElement | any
    const $sumaryMoney = qs("#sumaryMoney") as HTMLSpanElement | any

    const STOREKEY: string = 'sbStore';
    const STOREMODEL = {
        currentPurchase: {
            storeName: "Store Name",
            date: "",
            products: [],
        },
        purchaseHistory: [],
    };

    let sbStore = STOREMODEL
    let currentPurchase = sbStore.currentPurchase
    let purchaseHistory: any[] = sbStore.purchaseHistory
    let products: any[] = currentPurchase.products

    const OpenCheckoutModal = () => $checkoutModal?.classList.remove('d-none')
    const CloseCheckoutModal = () => $checkoutModal?.classList.add('d-none')
    const CheckoutData = () => {
        purchaseHistory.push(currentPurchase)

        sbStore.currentPurchase = {
            storeName: "Store Name",
            date: "",
            products: [],
        }

        start()
        CloseCheckoutModal()
    }

    const CloseExportModal = () => $exportModal?.classList.add('d-none')
    const CleanExportDownload = () => {
        $confirmExport?.setAttribute('href', '')
        $confirmExport?.setAttribute('download', '')
        CloseExportModal()
    }
    const FillConfirmExport = () => {
        const data = JSON.stringify(products)

        const todayDate = new Date()
        const dateFormatted = `${todayDate.getDate()}.${todayDate.getMonth() + 1}.${todayDate.getFullYear()}`

        $confirmExport?.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data))
        $confirmExport?.setAttribute('download', 'shopping-data-' + dateFormatted + '.json')
    }
    const OpenExportModal = () => {
        FillConfirmExport()
        $exportModal?.classList.remove('d-none')
    }

    const CountTotalItems = ($productList = qs("#productList")) => {
        if (!$productList) return 0
        return qsa('.item', $productList).length
    }

    const CountCashTotalPrice = ($productList = qs("#productList")) => {
        if (!$productList) return 0
        return qsa('.item div:nth-child(3)', $productList)
            .reduce((sum, $priceDiv) => sum += parseFloat(($priceDiv as HTMLElement).innerText), 0)
    }

    const RemoveItem = (itemIdx: number) => {
        products.splice(itemIdx, 1)

        UpdateUI()
    }

    const productListHeader = "<li><h4><div>➖🛒</div><div>🛍️</div><div>💲</div><div>±</div></h4></li>";
    const UpdateUI = () => {
        currentPurchase.storeName = $storeName.value;
        currentPurchase.date = ($date as HTMLInputElement).value;

        $productList.innerHTML = productListHeader
        for (let item in products) {
            const product = products[item]

            const $template = document.createElement('template')
            $template.innerHTML = `<li class="item"><h4><button id="${item}" onclick="RemoveItem(${item})">➖🛒</button><div>${product.name}</div><div>${product.price}</div><div>${product.quantity}</div></h4></li>`;

            $productList.appendChild(($template?.content?.firstChild as Node))
        }

        $sumaryCount.innerText = CountTotalItems()
        $sumaryMoney.innerText = CountCashTotalPrice()
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
        UpdateUI()
    }

    const GetDateYYYYMMDD = (date = new Date(), separator = "-") => {
        return String(date.getFullYear() + separator + (date.getMonth() + 1).toString().padStart(2, "0") + separator + date.getDate().toString().padStart(2, "0"))
    }



    $storeName.onchange = UpdateUI
    $date.onchange = UpdateUI

    $back.onclick = CleanInputs
    $add.onclick = AddItem

    $checkout.onclick = OpenCheckoutModal
    $confirmCheckout.onclick = CheckoutData
    $rejectCheckout.onclick = CloseCheckoutModal

    $export.onclick = OpenExportModal
    $confirmExport.onclick = CloseExportModal
    $rejectExport.onclick = CleanExportDownload

    sbStore = localStorage.getItem(STOREKEY) ? JSON.parse(String(localStorage.getItem(STOREKEY))) : structuredClone(STOREMODEL)
    purchaseHistory = sbStore.purchaseHistory
    currentPurchase = sbStore.currentPurchase
    products = currentPurchase.products

    $storeName.value = currentPurchase.storeName
    $date.value = currentPurchase.date == "" ? GetDateYYYYMMDD() : currentPurchase.date

    UpdateUI()
}

export default start