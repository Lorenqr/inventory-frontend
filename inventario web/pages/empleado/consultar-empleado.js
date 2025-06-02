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

let empleadoAEliminarId = null; 

tbody.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    empleadoAEliminarId = this.getAttribute("data-id"); 
    $('#confirmDeleteModal').modal('show');
  });
});

//delete
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
tbody.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const empleadoId = this.getAttribute("data-id");
    if (!empleadoId) return;

    window.location.href = `editar-empleado.html?id=${empleadoId}`;
  });
});

  })
  .catch(error => {
    console.error("ERROR FATAL:", error);
  });