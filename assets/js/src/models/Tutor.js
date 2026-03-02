import { Person } from "./Person.js";

export class Tutor extends Person {
    #phone;
    #email;
    constructor({ id, fullName, age, phone, email }) {
        super({
            id,
            fullName,
            age,
            username: email,       
            password: "",          // Sin contraseña (no hace login)
            role: "tutor"
        });

        this.#phone = phone;
        this.#email = email;
    }

    //Getters

    get phone() {
        return this.#phone;
    }

    get email() {
        return this.#email;
    }
    
    getSummary() {
        return `${this.fullName} | Tel: ${this.#phone} | ${this.#email}`;
    }
}
