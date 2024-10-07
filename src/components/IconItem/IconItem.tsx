const iconItems = {
    "product": {
        "pt": "Produto",
        "icon": "🛍️",
    },
    "add": {
        "pt": "Adicionar",
        "icon": "➕",
    },
    "yes": {
        "pt": "Sim",
        "icon": "👍"
    },
    "no": {
        "pt": "Não",
        "icon": "👎"
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