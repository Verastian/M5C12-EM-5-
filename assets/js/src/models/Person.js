export class Person {
    #id;
    #fullName;
    #age;
    #username;
    #password;
    #role;

    constructor({ id, fullName, age, username, password, role }) {
        // Verificamos que no se intente instanciar Person directamente
        // Comportamiento de una clase abstracta
        if (new.target === Person) {
            throw new Error("La clase Person no puede ser instanciada directamente. Usa Veterinarian o Tutor.");
        }

        this.#id = id;
        this.#fullName = fullName;
        this.#age = age;
        this.#username = username;
        this.#password = password;
        this.#role = role;
    }

    // Getters

    get id() {
        return this.#id;
    }

    get fullName() {
        return this.#fullName;
    }

    set fullName(value) {
        this.#fullName = value;
    }

    get age() {
        return this.#age;
    }

    get username() {
        return this.#username;
    }

    get password() {
        return this.#password;
    }

    get role() {
        return this.#role;
    }

    verifyCredentials(username, password) {
        return this.#username === username && this.#password === password;
    }

    getDisplayInfo() {
        return `${this.#fullName} (${this.#role})`;
    }
}
