fetch("http://localhost:8080/api/v1/empleados")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al obtener empleados");
    }
    return response.json();
  })
  .then(data => {
    const tbody = document.getElementById("empleados-body");
    tbody.innerHTML = "";
    data.forEach(emp => {
      const row = `
        <tr>
          <td>${emp.id ?? ''}</td>
          <td>${emp.identificationNumber ?? ''}</td>
          <td>${emp.name ?? ''}</td>
          <td>${emp.address ?? ''}</td>
          <td>${emp.phone ?? ''}</td>
          <td>
          <center>
          <a href="#" class="btn btn-primary btn-icon-split edit-btn" data-id="${emp.id}">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-pen"></i>
                                        </span>
                                    </a>
                                    </center></td>
          <td>
          <center>
          <a href="#" class="btn btn-danger btn-icon-split delete-btn" data-id="${emp.id}">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                    </a>
                                    </center></td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });

//delete
let empleadoAEliminarId = null; 

tbody.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    empleadoAEliminarId = this.getAttribute("data-id"); 
    $('#confirmDeleteModal').modal('show');
  });
});
document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (!empleadoAEliminarId) return;

  fetch(`http://localhost:8080/api/v1/empleados/${empleadoAEliminarId}`, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al eliminar empleado");
      }

      $('#confirmDeleteModal').modal('hide');
      empleadoAEliminarId = null;
      location.reload(); 
    })
    .catch(err => {
      console.error("Error eliminando empleado:", err);
      alert("Ocurrió un error al eliminar el empleado.");
    });
});

//update
const editEmpleadoModal = new bootstrap.Modal(document.getElementById("editEmpleadoModal"));

tbody.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const empleadoId = this.getAttribute("data-id");

    fetch(`http://localhost:8080/api/v1/empleados/${empleadoId}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener datos");
        return res.json();
      })
      .then(emp => {
        console.log(emp);
        // Llenar el modal con los datos
        document.getElementById("edit-id").value = emp.id;
        document.getElementById("edit-identificationNumber").value = emp.identificationNumber;
        document.getElementById("edit-name").value = emp.name;
        document.getElementById("edit-address").value = emp.address;
        document.getElementById("edit-phone").value = emp.phone;
        document.getElementById("edit-email").value = emp.email;
        document.getElementById("edit-creation").value = emp.creationDate;
        const objectSelect = document.getElementById("edit-active");
        objectSelect.value = emp.active ? "true" : "false";
        
        // Mostrar el modal
       editEmpleadoModal.show();
      })
      .catch(err => {
        console.error("Error cargando datos:", err);
        alert("No se pudo cargar el empleado.");
      });
  });
});

document.getElementById("editEmpleadoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("edit-id").value;
  const updatedEmpleado = {
    idenficationNumber: document.getElementById("edit-identificationNumber").value,
    name: document.getElementById("edit-name").value,
    address: document.getElementById("edit-address").value,
    phone: document.getElementById("edit-phone").value,
    email: document.getElementById("edit-email").value,
    creationDate: document.getElementById("edit-creation").value,
    active: document.getElementById("edit-active").value === "true" 
  };

  fetch(`http://localhost:8080/api/v1/empleados/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedEmpleado)
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al actualizar el empleado");
    return res.json();
  })
  .then(data => {
    alert("Empleado actualizado");
    window.location.href = "index.html";
  })
  .catch(err => {
    console.error("Error actualizando:", err);
    alert("No se pudo actualizar el empleado.");
  });
});


  })
  .catch(error => {
    console.error("ERROR FATAL:", error);
  });