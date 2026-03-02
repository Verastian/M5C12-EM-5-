import { getAnimalIcon } from "../utils/helpers.js";

export const createPatientCard = (pet, index) => {
    const { name, species, breed, birthdate, tutor, medicalEvolution, registrationDate } = pet;

    const animalIcon = getAnimalIcon(species);

    const evolutionHTML = medicalEvolution
        .map((entry, i) => `
            <div class="evolution-entry small p-2 mb-1 rounded ${i === medicalEvolution.length - 1 ? "bg-white" : ""}">
                <span class="text-muted"><i class="fa-regular fa-clock me-1"></i>${entry.date}</span>
                <p class="mb-0 mt-1">${entry.description}</p>
            </div>
        `)
        .join("");

    return `
        <div class="patient-item d-flex align-items-start gap-3 p-3 mb-2">
            <!-- Avatar con ícono FontAwesome según especie -->
            <div class="patient-avatar fs-5">
                <i class="${animalIcon}"></i>
            </div>

            <!-- Información completa del paciente -->
            <div class="flex-grow-1">
                <!-- Encabezado: nombre + badge -->
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <h6 class="fw-bold mb-0">${name}</h6>
                    <span class="badge rounded-pill badge-patient">
                        #${index + 1}
                    </span>
                </div>

                <!-- Datos del animal -->
                <div class="mb-2">
                    <span class="badge bg-light text-dark border me-1 small">
                        <i class="fa-solid fa-paw me-1 text-primary-custom"></i>${species}
                    </span>
                    <span class="badge bg-light text-dark border me-1 small">
                        <i class="fa-solid fa-tag me-1"></i>${breed}
                    </span>
                    <span class="badge bg-light text-dark border small">
                        <i class="fa-solid fa-cake-candles me-1"></i>${birthdate}
                    </span>
                </div>

                <!-- Datos del Tutor (objeto Tutor) -->
                <div class="bg-light rounded p-2 mb-2 small">
                    <strong class="text-primary-custom">
                        <i class="fa-solid fa-user me-1"></i> Tutor:
                    </strong>
                    ${tutor.fullName}
                    <span class="text-muted ms-2">
                        <i class="fa-solid fa-phone me-1"></i>${tutor.phone}
                    </span>
                    <span class="text-muted ms-2">
                        <i class="fa-solid fa-envelope me-1"></i>${tutor.email}
                    </span>
                </div>

                <!-- Evolución médica (arreglo de entradas) -->
                <div class="evolution-box p-2 small mb-2">
                    <strong class="text-primary-custom">
                        <i class="fa-solid fa-notes-medical me-1"></i> Evolución médica:
                    </strong>
                    <div class="mt-1">
                        ${evolutionHTML || '<span class="text-muted">Sin registros médicos</span>'}
                    </div>
                </div>

                <!-- Fecha de registro -->
                <span class="text-muted small">
                    <i class="fa-regular fa-calendar me-1"></i> Registrado: ${registrationDate}
                </span>
            </div>
        </div>
    `;
};

export const createEmptyState = () => {
    return `
        <div class="text-center py-5 text-muted">
            <i class="fa-solid fa-inbox fa-3x mb-3 opacity-25"></i>
            <p class="mb-0">Aún no hay pacientes registrados.</p>
            <p class="small">¡Registra el primero desde el formulario!</p>
        </div>
    `;
};
