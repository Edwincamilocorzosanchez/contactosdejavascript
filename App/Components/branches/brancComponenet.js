export class SucursalComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .nav-tabs .nav-link.active {
          background-color: #0d6efd;
          color: white;
        }
      </style>
      <div class="alert alert-info mt-3" role="alert">
        <h4 class="alert-heading">Módulo de Sucursales</h4>
        <p>Este módulo está en construcción.</p>
        <hr>
        <p class="mb-0">Próximamente podrás gestionar las sucursales aquí.</p>
      </div>
    `;
  }
}

customElements.define("sucursal-component", SucursalComponent);