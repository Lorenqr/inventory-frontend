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
    })
    .catch(err => {
      document.getElementById("content-placeholder").innerHTML = "<p>Error al cargar la página.</p>";
    });
}

loadPage("home");