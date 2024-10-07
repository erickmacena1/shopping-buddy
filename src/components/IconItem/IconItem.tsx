const iconItems = {
    "add": {
        "pt": "Adicionar",
        "en": "Add",
        "icon": "➕",
    },
    "back": {
        "pt": "Voltar",
        "en": "Back",
        "icon": "◀",
    },
    "supermarket": {
        "pt": "Supermercado",
        "en": "Supermarket",
        "icon": "🛒",
    },
    "checkout": {
        "pt": "Finalizar",
        "en": "Checkout",
        "icon": "◀🛒",
    },
    "product": {
        "pt": "Produto",
        "en": "Product",
        "icon": "🛍️",
    },
    "addProduct": {
        "pt": "Adicionar Produto",
        "en": "Add Product",
        "icon": "➕🛍️",
    },
    "removeProduct": {
        "pt": "Remover Produto",
        "en": "Remove Product",
        "icon": "➖🛍️",
    },
    "totalProducts": {
        "pt": "Total Produtos",
        "en": "Total Products",
        "icon": "🔢🛍️",
    },
    "quantity": {
        "pt": "Quantidade",
        "en": "Quantity",
        "icon": "🔢",
    },
    "cash": {
        "pt": "Preço",
        "en": "Cash",
        "icon": "💲",
    },
    "cancel": {
        "pt": "Cancelar",
        "en": "Cancel",
        "icon": "❌",
    },
    "yes": {
        "pt": "Sim",
        "en": "Yes",
        "icon": "👍",
    },
    "no": {
        "pt": "Não",
        "en": "No",
        "icon": "👎",
    },
    "export": {
        "pt": "Exportar",
        "en": "Export",
        "icon": "◀🎲",
    },
} as const

type ItemName = keyof typeof iconItems
type LangOptions = keyof typeof iconItems[ItemName]

interface IconItemProps {
    name: ItemName;
    lang: LangOptions;
}

function IconItem({ name, lang }: IconItemProps) {
    return (
        <span>{iconItems[name][lang]}</span>
    )
}

export default IconItem
export type { ItemName, LangOptions }