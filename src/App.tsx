import { useEffect } from 'react'
import './App.css'
import start from './shopping_service'

function App() {

  useEffect(() => {
    start()
  }, [])
 
  return (
    <>
      <div className="modal d-none" id="checkoutModal">
        <div>
          <h1>◀🛒👍</h1>

          <h2><button id="confirmCheckout">👍</button> <button id="rejectCheckout">👎</button></h2>

        </div>
      </div>

      <div className="modal d-none" id="exportModal">
        <div>
          <h1>◀🎲</h1>

          <h2><a id="confirmExport">👍</a><button id="rejectExport">👎</button></h2>
        </div>
      </div>

      <h1>🛒<input type="text" id="storeName" /> <input type="date" id="date" /></h1>
      <h4><button id="back">◀</button></h4>

      <h3>
        <label htmlFor="productName">🛍️</label>
        <input id="productName" type="text" />
      </h3>

      <h3>
        <label htmlFor="productPrice">💲</label>
        <input id="productPrice" type="text" onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(',', '.').replace(/[a-z]/g, '')} />
      </h3>

      <h3>
        <label htmlFor="productQuantity">±</label>
        <input id="productQuantity" type="number" />
      </h3>

      <h1><button id="add">➕</button></h1>

      <h4>
        <ul id="productList">

        </ul>
        <strong id="productSumary">

          🛍️±<span id="sumaryCount"></span>
          💲<span id="sumaryMoney"></span>

        </strong>
      </h4>

      <h2><button id="checkout">🛒👍</button></h2>

      <h2 className="export"><button id="export">◀🎲</button></h2>

    </>
  )
}

export default App
