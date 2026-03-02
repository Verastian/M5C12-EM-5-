import { Person } from "./Person.js";

export class Veterinarian extends Person {
    #pets;

    constructor({ id, fullName, age, username, password }) {
        //clase padre
        super({
            id,
            fullName,
            age,
            username,
            password,
            role: "veterinarian"
        });

        this.#pets = [];
    }

    addPatient(pet) {
        this.#pets.push(pet);
    }

    getPatients() {
        return [...this.#pets];
    }

    totalPatients() {
        return this.#pets.length;
    }

}
