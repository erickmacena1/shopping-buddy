import { useEffect } from 'react'
import './App.css'
import start from './shopping_service'
import IconItem from './components/IconItem/IconItem'
import type { LangOptions } from './components/IconItem/IconItem'

let CURRENT_LANG: LangOptions = "pt"

function App() {

  useEffect(() => {
    start()
  }, [])

  return (
    <>
      <div className="modal d-none" id="checkoutModal">
        <div>
          <h1><IconItem name='checkout' lang={CURRENT_LANG}/></h1>

          <h2><button id="confirmCheckout"><IconItem name='yes' lang={CURRENT_LANG}/></button> <button id="rejectCheckout"><IconItem name='no' lang={CURRENT_LANG}/></button></h2>

        </div>
      </div>

      <div className="modal d-none" id="exportModal">
        <div>
          <h1><IconItem name='export' lang={CURRENT_LANG}/></h1>

          <h2><a id="confirmExport"><IconItem name='yes' lang={CURRENT_LANG}/></a><button id="rejectExport"><IconItem name='no' lang={CURRENT_LANG}/></button></h2>
        </div>
      </div>

      <h1><IconItem name='supermarket' lang={CURRENT_LANG}/><input type="text" id="storeName" /> <input type="date" id="date" /></h1>
      <h4><button id="back">◀</button></h4>

      <h3>
        <label htmlFor="productName"><IconItem name="product" lang={CURRENT_LANG} /></label>
        <input id="productName" type="text" />
      </h3>

      <h3>
        <label htmlFor="productPrice"><IconItem name="cash" lang={CURRENT_LANG} /></label>
        <input id="productPrice" type="text" onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(',', '.').replace(/[a-z]/g, '')} />
      </h3>

      <h3>
        <label htmlFor="productQuantity"><IconItem name="quantity" lang={CURRENT_LANG} /></label>
        <input id="productQuantity" type="number" />
      </h3>

      <h1><button id="add"><IconItem name="add" lang={CURRENT_LANG} /></button></h1>

      <h4>
        <ul id="productList">

        </ul>
        <strong id="productSumary">

          <IconItem name="totalProducts" lang={CURRENT_LANG} /> <span id="sumaryCount"></span> |
          <IconItem name="cash" lang={CURRENT_LANG} /><span id="sumaryMoney"></span>

        </strong>
      </h4>

      <h2><button id="checkout"><IconItem name='checkout' lang={CURRENT_LANG}/></button></h2>

      <h2 className="export"><button id="export"><IconItem name='export' lang={CURRENT_LANG}/></button></h2>

    </>
  )
}

export default App
