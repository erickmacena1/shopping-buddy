import { useEffect } from 'react'
import start from './shopping_service'
import IconItem from './components/IconItem/IconItem'
import type { LangOptions } from './components/IconItem/IconItem'
import ProductForm from './components/ProductForm/ProductForm'

let CURRENT_LANG: LangOptions = "pt"

function App() {

  // useEffect(() => {
  //   start()
  // }, [])

  return (
    <div className='bg-blue-950 min-h-screen text-white font-serif'>

      <h1><IconItem name='supermarket' lang={CURRENT_LANG}/><input type="text" id="storeName" /> <input type="date" id="date" /></h1>

      <ProductForm lang={CURRENT_LANG}/>

      <h4>
        <ul id="productList">

        </ul>
        <strong id="productSumary">

          <IconItem name="totalProducts" lang={CURRENT_LANG} /> <span id="sumaryCount"></span> |
          <IconItem name="cash" lang={CURRENT_LANG} /><span id="sumaryMoney"></span>

        </strong>
      </h4>

    </div>
  )
}

export default App
