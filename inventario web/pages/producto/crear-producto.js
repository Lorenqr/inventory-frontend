document.getElementById("crear-producto-form").addEventListener("submit", function(e){
  e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("status", document.getElementById("status").value);
    formData.append("stock", document.getElementById("stock").value || 0); // default 0
    const fileInput = document.getElementById("picture");
    if (fileInput.files.length > 0) {
      formData.append("picture", fileInput.files[0]);
    }

    fetch("http://localhost:8080/api/v1/productos", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear producto");
        return res.json();
      })
      .then((data) => {
        $('#successModal').modal('show');
        document.getElementById("crear-producto-form").reset();

      })
      .catch((err) => {
        console.error("Error al crear producto:", err);
        alert("Hubo un error al crear el producto");
      });
  });






