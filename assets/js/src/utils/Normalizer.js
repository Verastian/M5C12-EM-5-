export class Normalizer {

    constructor() {
        throw new Error("Normalizer es una clase abstracta. No se puede instanciar.");
    }

    static capitalizeName(name) {
        return name
            .toLowerCase()
            .trim()
            .split(" ")
            .filter((word) => word.length > 0) // Elimina strings vacíos
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    static lowerCase(text) {
        return text.toLowerCase().trim();
    }

    static trimText(text) {
        return text.trim().replace(/\s+/g, " ");
    }
}
