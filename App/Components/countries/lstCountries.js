import { getPaises } from '../../../Apis/contact/apiConfig';

export class LstPais extends HTMLElement {
  constructor() {
    super();
    this.paises = [];
    this.render();
    this.cargarPaises();
  }

  async cargarPaises() {
    try {
      this.paises = await getPaises();
      this.mostrarPaises();
    } catch (error) {
      console.error('Error al cargar países:', error);
      this.mostrarError();
    }
  }

  mostrarPaises() {
    const tbody = this.querySelector('#tbodyPaises');
    
    if (this.paises.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center">No hay países registrados</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.paises.map(pais => `
      <tr>
        <td>${pais.id}</td>
        <td>${pais.nombrePais || 'N/A'}</td>
        <td>${pais.codigoPais || 'N/A'}</td>
      </tr>
    `).join('');
  }

  mostrarError() {
    const tbody = this.querySelector('#tbodyPaises');
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="text-center text-danger">
          Error al cargar los países. Por favor, intente nuevamente.
        </td>
      </tr>
    `;
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>Listado de Países</span>
          <button class="btn btn-primary btn-sm" id="btnRecargar">
            🔄 Recargar
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre del País</th>
                  <th>Código</th>
                </tr>
              </thead>
              <tbody id="tbodyPaises">
                <tr>
                  <td colspan="3" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Cargando...</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>     
    `;

    this.querySelector('#btnRecargar').addEventListener('click', async () => {
      const btn = this.querySelector('#btnRecargar');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Cargando...';
      
      await this.cargarPaises();
      
      btn.disabled = false;
      btn.innerHTML = '🔄 Recargar';
    });
  }
}

customElements.define("lst-pais", LstPais);