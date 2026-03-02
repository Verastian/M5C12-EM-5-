import { Veterinarian } from "./models/Veterinarian.js";
import { Tutor } from "./models/Tutor.js";
import { Pet } from "./models/Pet.js";
import { Auth } from "./utils/Auth.js";

console.log("%c--- INICIO DE PRUEBAS DE SISTEMA ---", "color: blue; font-weight: bold; font-size: 14px;");

// 1. PRUEBAS DE AUTH Y VETERINARIAN
console.group("1. Pruebas de Auth y Veterinarian");
const vet1 = new Veterinarian({
    id: 1,
    fullName: "Dr. Pérez",
    age: 45,
    username: "drperez",
    password: "vet123"
});

const vet2 = new Veterinarian({
    id: 2,
    fullName: "Dra. Gómez",
    age: 38,
    username: "dragomez",
    password: "vet456"
});

Auth.register(vet1);
Auth.register(vet2);
console.log("Veterinarios registrados:", Auth.getVeterinarians());

try {
    console.log("Intentando login exitoso...");
    const loggedVet = Auth.login("drperez", "vet123");
    console.log("Login exitoso:", loggedVet.getDisplayInfo());
    console.log("Veterinario actual:", Auth.currentVet.fullName);

    console.log("Intentando login fallido...");
    // Auth.login("user", "wrong"); // Esto lanzaría error y detendría el script si no se captura
} catch (error) {
    console.error("Error esperado en login:", error.message);
}

Auth.logout();
console.log("Post-logout, veterinario actual:", Auth.currentVet);
console.groupEnd();


// 2. PRUEBAS DE TUTOR
console.group("2. Pruebas de Tutor");
const tutor1 = new Tutor({
    id: 101,
    fullName: "Juan Dueño",
    age: 30,
    phone: "+56912345678",
    email: "juan@example.com"
});

console.log("Datos del tutor:", tutor1.getSummary());
console.log("Info de pantalla (Herencia Person):", tutor1.getDisplayInfo());
console.groupEnd();


// 3. PRUEBAS DE PET
console.group("3. Pruebas de Pet");
const miMascota = new Pet({
    name: "Firulais",
    species: "Perro",
    breed: "Quiltro",
    birthdate: "2020-05-20",
    tutor: tutor1,
    initialNote: "Consulta inicial por control de vacunas."
});

console.log("Mascota creada:", miMascota.getSummary());
console.log("ID generado:", miMascota.id);

console.log("Agregando entrada médica...");
miMascota.addMedicalEntry("Se observa buen estado general. Se recomienda desparasitación.");

console.log("Última entrada:", miMascota.getLatestEntry());
console.log("Historial completo:", miMascota.medicalEvolution);
console.groupEnd();


// 4. PRUEBAS DE INTEGRACIÓN (VET + PATIENTS)
console.group("4. Pruebas de Integración (Vet + Patients)");
const vetActivo = Auth.login("dragomez", "vet456");
console.log("Vet activo:", vetActivo.fullName);

vetActivo.addPatient(miMascota);
console.log("Total pacientes:", vetActivo.totalPatients());
console.log("Lista de pacientes:", vetActivo.getPatients());
console.groupEnd();

console.log("%c--- FIN DE PRUEBAS ---", "color: green; font-weight: bold; font-size: 14px;");
