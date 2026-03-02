
import { Normalizer } from "./Normalizer.js";

export class Validator {

    constructor() {
        throw new Error("Validator es una clase abstracta. No se puede instanciar.");
    }

    static name(value, errorMsg) {
        const regex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s.]+$/;
        const trimmed = value.trim();

        if (!trimmed || !regex.test(trimmed)) {
            throw new Error(errorMsg || "El nombre solo debe contener letras y espacios.");
        }

        return Normalizer.capitalizeName(trimmed);
    }

    static email(value, errorMsg) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const trimmed = value.trim();

        if (!trimmed || !regex.test(trimmed)) {
            throw new Error(errorMsg || "El correo electrónico no es válido.");
        }

        return Normalizer.lowerCase(trimmed);
    }

    static phone(value, errorMsg) {
        const regex = /^[+\d\s()-]{7,20}$/;
        const trimmed = value.trim();

        if (!trimmed || !regex.test(trimmed)) {
            throw new Error(errorMsg || "El teléfono no es válido (mínimo 7 dígitos).");
        }

        return trimmed;
    }

    static notEmpty(value, fieldName) {
        const trimmed = value.trim();

        if (!trimmed) {
            throw new Error(`El campo "${fieldName}" es obligatorio.`);
        }

        return Normalizer.trimText(trimmed);
    }

    static date(value, errorMsg) {
        if (!value || isNaN(new Date(value).getTime())) {
            throw new Error(errorMsg || "La fecha no es válida.");
        }

        return value;
    }
}
