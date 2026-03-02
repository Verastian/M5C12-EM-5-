export class Pet {
    #id;
    #name;
    #species;
    #breed;
    #birthdate;
    #tutor;
    #medicalEvolution;
    #registrationDate;

    constructor ({name,species,breed,birthdate,tutor,initialNote}){
        this.#id=`pet-${Date.now()}-${Math.random().toString(36).substring(2,6)}`
        this.#name= name;
        this.#species=species;
        this.#breed=breed;
        this.#birthdate=birthdate;
        this.#tutor= tutor;
        this.#medicalEvolution=[]; //historial
        this.#registrationDate=new Date().toLocaleDateString(//registro automatico.
            "es-CL",
            {
                day:"2-digit",
                month:"short",
                year:"numeric",
                hour:"2-digit",
                minute:"2-digit"
            }
        );
        if (initialNote) {
            this.addMedicalEntry(initialNote);
        }
    }
// Getters 

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get species() {
        return this.#species;
    }

    get breed() {
        return this.#breed;
    }

    get birthdate() {
        return this.#birthdate;
    }

    get tutor() {
        return this.#tutor;
    }

    get medicalEvolution() {
        return [...this.#medicalEvolution]; // Retornamos copia
    }

    get registrationDate() {
        return this.#registrationDate;
    }


     addMedicalEntry(description) {
        const entry = {
            date: new Date().toLocaleDateString("es-CL", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            description
        };
        this.#medicalEvolution.push(entry);
    }

     getLatestEntry() {
        const entries = this.#medicalEvolution;
        return entries.length > 0 ? entries[entries.length - 1] : null;
    }
    getSummary() {
        return `${this.#name} (${this.#species} - ${this.#breed}) | Tutor: ${this.#tutor.fullName}`;
    }
}