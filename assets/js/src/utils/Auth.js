import { Render } from "../render/Render.js";

export class Auth {

    static veterinarians = [];
    static currentVet = null;

    constructor() {
        throw new Error("Auth es una clase abstracta. No se puede instanciar.");
    }
    static processLogin(username, password) {
        const veterinarian = Auth.veterinarians.find(
            (vet) => vet.verifyCredentials(username, password)
        );

        if (veterinarian) {
            Auth.currentVet = veterinarian;

            Render.showDashboard(Auth.currentVet);
            Render.renderPatients(Auth.currentVet);
            return Auth.currentVet;
        }

        return null;
    }

    static logout() {
        Auth.currentVet = null;
        Render.showLogin();
    }

    static register(newVet) {
        const exists = Auth.veterinarians.some(
            (vet) => vet.id === newVet.id
        );

        if (exists) {
            throw new Error("El veterinario ya está registrado en el sistema.");
        }

        Auth.veterinarians.push(newVet);
    }

    static getVeterinarians() {
        return Auth.veterinarians;
    }
}
