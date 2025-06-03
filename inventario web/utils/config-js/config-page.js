    fetch("fragments/nav.html")
      .then(res => res.text())
      .then(data => 
        document.getElementById("navbar-placeholder").innerHTML = data);

      fetch("fragments/topbar.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("topbar-placeholder").innerHTML = data;
        
        document.querySelectorAll("a[data-page]").forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        const page = this.getAttribute("data-page");
        loadPage(page);
      });
    });
  });

      

function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content-placeholder").innerHTML = html;
      const scriptPath = `pages/${page}.js`;
      const script = document.createElement("script");
      script.src = scriptPath;
      script.defer = true;
      script.onload = () => console.log(`Script ${scriptPath} cargado.`);
      script.onerror = () => console.warn(`No se encontró script para ${page}`);
      document.body.appendChild(script);
    })
    .catch(err => {
      document.getElementById("content-placeholder").innerHTML = "<p>Error al cargar la página.</p>";
    });

    
}

loadPage("home");

//cargue en el panel de control
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api/v1/empleados/contar")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        document.getElementById("empleados").textContent = data.empleados;
        document.getElementById("productos").textContent = data.productos;
        document.getElementById("entregas").textContent = data.entregas;
        document.getElementById("devoluciones").textContent = data.devoluciones;
      })
      .catch(error => {
        console.error("Error al cargar los datos del panel:", error);
        document.getElementById("empleados").textContent = "-";
        document.getElementById("productos").textContent = "-";
        document.getElementById("entregas").textContent = "-";
        document.getElementById("devoluciones").textContent = "-";
      });
  });