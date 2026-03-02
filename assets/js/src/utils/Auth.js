
export class Auth {
    static veterinarians = [];
    static currentVet = null;
    
    // Constructor privado: previene instanciación
    constructor() {
        throw new Error("Auth es una clase abstracta. No se puede instanciar.");
    }


    static login(username, password) {
        const vet = this.veterinarians.find(v =>
            v.verifyCredentials(username, password)
        )

        if (!vet) {
            throw new Error('Usuario o contraseña incorrectos')
        }

        this.currentVet = vet
        return vet
    }

    static logout() {
        Auth.currentVet = null;
    }

    static register(newVet) {
       this.veterinarians.push(newVet)
    }

    static getVeterinarians() {
        return this.veterinarians;
    }
}
