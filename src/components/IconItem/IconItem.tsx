type LangOptions = "pt" | "icon";

interface ItemVersions {
    "pt": string;
    "icon": string
}

interface ItemOptions {
    [name: string]: ItemVersions
}

const iconItemList: ItemOptions = {
    "product": {
        "pt": "Protudo",
        "icon": "🛍️"
    },
    "add": {
        "pt": "Adicionar",
        "icon": "➕"
    }
}

interface IconItemProps {
    name: string;
    lang: LangOptions;
}

function IconItem({ name, lang }: IconItemProps) {
    return (
        <span>{iconItemList[name][lang]}</span>
    )
}

export default IconItem