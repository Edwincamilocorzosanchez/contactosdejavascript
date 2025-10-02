export class CompaniaComponent extends HTMLElement {
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
        <h4 class="alert-heading">Módulo de Compañías</h4>
        <p>Este módulo está en construcción.</p>
        <hr>
        <p class="mb-0">Próximamente podrás gestionar las compañías aquí.</p>
      </div>
    `;
  }
}

customElements.define("compania-component", CompaniaComponent);