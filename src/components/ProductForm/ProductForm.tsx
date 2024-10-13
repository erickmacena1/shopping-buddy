/**
Name - Str
Size - Double
Unit of Mesurement - [Str]
Quantity - Int
Price - Double
 */

import IconItem, { LangOptions } from "../IconItem/IconItem"

interface ProductFormProps {
    lang: LangOptions
}

function ProductForm({ lang }: ProductFormProps) {

    return <form
    className="p-4"
        action=""
        onClick={(e) => e.preventDefault()}
    >
        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <label
                className="text-end"
                htmlFor="productName"
            >
                <IconItem name="product" lang={lang} />:
            </label>
            <input
                id="productName"
                type="text"
            />

            <label
                className="text-end"
                htmlFor="productPrice"
            >
                <IconItem name="cash" lang={lang} />:
            </label>
            <input
                id="productPrice"
                type="text"
                onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(',', '.').replace(/[a-z]/g, '')}
            />

            <label
                className="text-end"
                htmlFor="productQuantity"
            >
                <IconItem name="quantity" lang={lang} />:
            </label>
            <input id="productQuantity" type="number" />
        </div>

        <button
            className="pt-4"
            id="add"
            type="submit"
        >
            <IconItem name="add" lang={lang} />
        </button>
    </form>
}

export default ProductForm