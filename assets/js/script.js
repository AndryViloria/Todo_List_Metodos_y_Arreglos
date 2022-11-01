const tareas = [{ id: 1, descripcion: "Hacer ejercicios de JavaScript", realizada: true }];

const mostrarTareas = () => {
    let template = "";
    tareas.forEach((tarea) => {
        template += `
      <tr>
        <td>${tarea.id}</td>
        <td class="descripcion">${tarea.descripcion}</td>
        <td>
          <input type="checkbox" ${tarea.realizada ? "checked" : ""} />
        </td>
        <td>
          <span><i class="fa-solid fa-trash-can"></i></span>
        </td>
      </tr>
    `;
    });

    // Se carga el listado en el DOM
    const tbody = document.querySelector("#tareas tbody");
    tbody.innerHTML = template;

    // Se asocian eventos
    agregarEventoBorrar();
    manejarEstado();
    contarTareas();
};

const agregarEventoBorrar = () => {
    const eliminar = document.querySelectorAll("#tareas span");
    eliminar.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            tareas.splice(index, 1);
            mostrarTareas();
        });
    });
};

const manejarEstado = () => {
    const boxes = document.querySelectorAll("#tareas input[type='checkbox']");
    boxes.forEach((box, index) => {
        const row = document.querySelector(
            `#tareas tbody tr:nth-child(${index + 1})`
        );

        if (box.checked) {
            row.classList.add("bold");
        }

        box.addEventListener("click", () => {
            row.classList.toggle("bold");
            tareas[index].realizada = !tareas[index].realizada;

            contarTareas();
        });
    });
};

const contarTareas = () => {
    const total = tareas.length;
    const realizadas = tareas.filter((tarea) => tarea.realizada === true).length;

    const spanTotal = document.getElementById("total");
    const spanRealizadas = document.getElementById("realizadas");

    spanTotal.innerHTML = total;
    spanRealizadas.innerHTML = realizadas;
};

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    // Se captura el input
    const tarea = document.getElementById("tarea");

    // Se envia su valor al array de nombres
    tareas.push({
        id: tareas.length + 1,
        descripcion: tarea.value,
        realizada: false
    });

    // Se limpia el input
    tarea.value = "";

    // Se genera un <li> por cada nombre del listado
    mostrarTareas();
});

// Se muestran las tareas al cargar la aplicación
mostrarTareas();