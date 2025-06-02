document.getElementById("crear-empleado-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const empleado = {
    idenficationNumber: document.getElementById("identificationNumber").value,
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    active: document.getElementById("active").value
  };

  fetch("http://localhost:8080/api/v1/empleados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(empleado)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al crear empleado");
    }
    return response.json();
  })
  .then(data => {
     $('#successModal').modal('show');
    document.getElementById("crear-empleado-form").reset();
  })
  .catch(error => {
    console.error("ERROR al crear empleado:", error);
    alert("Ocurrió un error al crear el empleado.");
  });
});
