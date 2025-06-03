fetch("http://localhost:8080/api/v1/productos")
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    return response.json();
  })
  .then(data => {
    const tbody = document.getElementById("productos-body");
    tbody.innerHTML = "";
    data.forEach(producto => {
      const row = `
        <tr>
          <td>${producto.id ?? ''}</td>
          <td>${producto.name ?? ''}</td>
          <td>${producto.status ?? ''}</td>
          <td>${producto.stock ?? ''}</td>
          <td>
              ${producto.picture 
                ? `<img src="data:image/jpeg;base64,${producto.picture}" alt="Producto" width="60" height="60" style="object-fit: cover; border-radius: 8px;" />`
              : 'Sin imagen'}
          </td>
          <td>
          <center>
          <a href="#" class="btn btn-primary btn-icon-split edit-btn" data-id="${producto.id}">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-pen"></i>
                                        </span>
                                    </a>
                                    </center></td>
          <td>
          <center>
          <a href="#" class="btn btn-danger btn-icon-split delete-btn" data-id="${producto.id}">
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
let productoAEliminarId = null; 

tbody.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    productoAEliminarId = this.getAttribute("data-id"); 
    $('#confirmDeleteModal').modal('show');
  });
});
document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (!productoAEliminarId) return;

  fetch(`http://localhost:8080/api/v1/productos/${productoAEliminarId}`, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al eliminar producto");
      }

      $('#confirmDeleteModal').modal('hide');
      productoAEliminarId = null;
      location.reload(); 
    })
    .catch(err => {
      console.error("Error eliminando producto:", err);
      alert("Ocurrió un error al eliminar el producto.");
    });
});

//update
const editProductoModal = new bootstrap.Modal(document.getElementById("editProductoModal"));

tbody.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const productoId = this.getAttribute("data-id");

    fetch(`http://localhost:8080/api/v1/productos/${productoId}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener datos");
        return res.json();
      })
      .then(prod => {
        console.log(prod);
        // Llenar el modal con los datos
        document.getElementById("edit-id").value = prod.id;
        document.getElementById("edit-name").value = prod.name;
        document.getElementById("edit-status").value = prod.status;
        document.getElementById("edit-description").value = prod.description;
        document.getElementById("edit-stock").value = prod.stock;
       document.getElementById("edit-picture-preview").src = `data:image/jpeg;base64,${prod.picture}`;
        
        
        // Mostrar el modal
       editProductoModal.show();
      })
      .catch(err => {
        console.error("Error cargando datos:", err);
        alert("No se pudo cargar el producto.");
      });
  });
});

document.getElementById("editProductoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("edit-id").value;
  const formData = new FormData();
  formData.append("name", document.getElementById("edit-name").value);
  formData.append("description", document.getElementById("edit-description").value);
  formData.append("status", document.getElementById("edit-status").value);
  formData.append("stock", document.getElementById("edit-stock").value);
   const fileInput = document.getElementById("edit-picture");
    if (fileInput.files.length > 0) {
      formData.append("picture", fileInput.files[0]);
    } else {
      formData.append("picture", 0);
    }
    console.log(formData);
  fetch(`http://localhost:8080/api/v1/productos/${id}`, {
    method: "PUT",
    body: formData,
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al actualizar el producto");
    return res.json();
  })
  .then(data => {
    alert("producto actualizado");
    window.location.href = "index.html";
  })
  .catch(err => {
    console.error("Error actualizando:", err);
    alert("No se pudo actualizar el producto.");
  });
});


  })
  .catch(error => {
    console.error("ERROR FATAL:", error);
  });