
export const showMessage = (container, text, type) => {
    const isError = type === "error";
    const alertClass = isError ? "alert-danger" : "alert-success";
    const iconClass = isError
        ? "fa-solid fa-circle-exclamation"
        : "fa-solid fa-circle-check";

    container.innerHTML = `
        <div class="alert ${alertClass} alert-animated py-2 small mb-0 d-flex align-items-center gap-2" role="alert">
            <i class="${iconClass}"></i>
            <span>${text}</span>
        </div>
    `;

    setTimeout(() => {
        container.innerHTML = "";
    }, 4000);
};

export const getAnimalIcon = (species) => {
    const iconMap = {
        perro: "fa-solid fa-dog",
        gato: "fa-solid fa-cat",
        ave: "fa-solid fa-dove",
        pez: "fa-solid fa-fish",
        caballo: "fa-solid fa-horse",
        conejo: "fa-solid fa-rabbit",
    };

    return iconMap[species.toLowerCase()] || "fa-solid fa-paw";
};

export const clearFields = (ids) => {
    ids.forEach((id) => {
        document.getElementById(id).value = "";
    });
};

export const generateId = (prefix = "ID") => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
};
