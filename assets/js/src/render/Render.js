import { createPatientCard, createEmptyState } from "../components/PatientCard.js";

export class Render {

    constructor() {
        throw new Error("Render es una clase abstracta. No se puede instanciar.");
    }

    static renderPatients(veterinarian) {
        const container = document.getElementById("patientsContainer");
        const patients = veterinarian.getPatients();

        if (patients.length === 0) {
            container.innerHTML = createEmptyState();
            return;
        }

        container.innerHTML = patients
            .map((pet, index) => createPatientCard(pet, index))
            .join("");
    }

    static updateStats(veterinarian) {
        const total = veterinarian.totalPatients();
        document.getElementById("statTotal").textContent = total;
        document.getElementById("statToday").textContent = total;
        document.getElementById("statVet").textContent = veterinarian.username;
    }

    static showDashboard(veterinarian) {
        document.getElementById("headerVetName").textContent = veterinarian.fullName;

        document.getElementById("headerUser").classList.remove("hidden");
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("dashboardSection").classList.remove("hidden");

        // Actualizar stats y lista
        Render.updateStats(veterinarian);
        Render.renderPatients(veterinarian);
    }

    static showLogin() {
        document.getElementById("dashboardSection").classList.add("hidden");
        document.getElementById("headerUser").classList.add("hidden");
        document.getElementById("loginSection").classList.remove("hidden");

        // Limpiamos campos y mensajes
        document.getElementById("loginUser").value = "";
        document.getElementById("loginPass").value = "";
        document.getElementById("loginMessage").innerHTML = "";
    }
}
