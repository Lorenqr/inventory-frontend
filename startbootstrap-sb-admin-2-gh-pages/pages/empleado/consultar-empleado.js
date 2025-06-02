fetch("http://localhost:8080/api/v1/empleados")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al obtener empleados");
    }
    return response.json();
  })
  .then(data => {// 👈 Verifica si llega
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
          <a href="#" class="btn btn-primary btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-pen"></i>
                                        </span>
                                    </a>
                                    </center></td>
          <td>
          <center>
          <a href="#" class="btn btn-danger btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                    </a>
                                    </center></td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  })
  .catch(error => {
    console.error("ERROR FATAL:", error);
  });