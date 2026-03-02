"use strict";

import { Veterinarian } from "./models/Veterinarian.js";
import { Tutor } from "./models/Tutor.js";
import { Pet } from "./models/Pet.js";

import { Auth } from "./utils/Auth.js";
import { Validator } from "./utils/Validator.js";

import { showMessage, clearFields, generateId } from "./utils/helpers.js";

import { Render } from "./render/Render.js";

// Instancia Dr. Carlos Pérez
const vet1 = new Veterinarian({
    id: "VET-001",
    fullName: "Dr. Carlos Pérez",
    age: 35,
    username: "drperez",
    password: "vet123"
});

// Instancia Dra. María Gómez
const vet2 = new Veterinarian({
    id: "VET-002",
    fullName: "Dra. María Gómez",
    age: 42,
    username: "dragomez",
    password: "vet456"
});

Auth.register(vet1);
Auth.register(vet2);

document.getElementById("btnLogin").addEventListener("click", () => {
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value.trim();
    const messageContainer = document.getElementById("loginMessage");

    if (!username || !password) {
        showMessage(messageContainer, "Por favor, completa todos los campos.", "error");
        return;
    }

    const result = Auth.processLogin(username, password);

    if (!result) {
        showMessage(
            messageContainer,
            "Usuario o contraseña incorrectos. Intenta de nuevo.",
            "error"
        );
    }
});

document.getElementById("loginPass").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("btnLogin").click();
});

document.getElementById("loginUser").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("loginPass").focus();
});

document.getElementById("formRegisterPet").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const messageContainer = document.getElementById("registerMessage");

    try {
        const petName = Validator.name(formData.get("petName"), "Ingresa un nombre válido para la mascota.");
        const species = Validator.notEmpty(formData.get("petSpecies"), "Especie");
        const breed = Validator.notEmpty(formData.get("petBreed"), "Raza");
        const birthdate = Validator.date(formData.get("petBirthdate"), "Ingresa una fecha de nacimiento válida.");
        const tutorName = Validator.name(formData.get("tutorName"), "Ingresa un nombre válido para el tutor.");
        const tutorPhone = Validator.phone(formData.get("tutorPhone"), "El teléfono no es válido.");
        const tutorEmail = Validator.email(formData.get("tutorEmail"), "El correo no es válido.");
        const evolution = Validator.notEmpty(formData.get("petEvolution"), "Evolución médica");

        const tutor = new Tutor({
            id: generateId("TUT"),
            fullName: tutorName,
            age: 0,
            phone: tutorPhone,
            email: tutorEmail
        });

        const newPet = new Pet({
            name: petName,
            species,
            breed,
            birthdate,
            tutor,
            initialNote: evolution
        });

        Auth.currentVet.addPatient(newPet);

        showMessage(
            messageContainer,
            `¡${petName} fue registrado/a exitosamente!`,
            "success"
        );

        form.reset();

        Render.renderPatients(Auth.currentVet);
        Render.updateStats(Auth.currentVet);

    } catch (error) {
        showMessage(messageContainer, error.message, "error");
    }
});

document.getElementById("btnLogout").addEventListener("click", () => {
    Auth.logout();
});
