import { getContacts } from '../../../Apis/contact/contactApi.js';

export class LstContacto extends HTMLElement {
  constructor() {
    super();
    this.contactos = [];
    this.render();
    this.cargarContactos(); // Cargar inmediatamente después del render
  }

  async cargarContactos() {
    try {
      this.contactos = await getContacts();
      this.mostrarContactos();
    } catch (error) {
      console.error('Error al cargar contactos:', error);
      this.mostrarError();
    }
  }

  mostrarContactos() {
    const tbody = this.querySelector('#tbodyContactos');
    
    if (this.contactos.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center">No hay contactos registrados</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.contactos.map(contacto => `
      <tr>
        <td>${contacto.id}</td>
        <td>${contacto.nombreContacto || 'N/A'}</td>
        <td>${contacto.apellidoContacto || 'N/A'}</td>
        <td>${contacto.nroCelular || 'N/A'}</td>
        <td>${contacto.emailContacto || 'N/A'}</td>
        <td>${contacto.nroResidencia || 'N/A'}</td>
      </tr>
    `).join('');
  }

  mostrarError() {
    const tbody = this.querySelector('#tbodyContactos');
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-danger">
          Error al cargar los contactos. Por favor, intente nuevamente.
        </td>
      </tr>
    `;
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/contacto/contactoStyle.css";
      </style>
      <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <span>Listado de Contactos</span>
          <button class="btn btn-primary btn-sm" id="btnRecargar">
            <span></span> Recargar
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Celular</th>
                  <th>Email</th>
                  <th>Residencia</th>
                </tr>
              </thead>
              <tbody id="tbodyContactos">
                <tr>
                  <td colspan="6" class="text-center">
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

    // Evento para recargar contactos
    this.querySelector('#btnRecargar').addEventListener('click', async () => {
      const btn = this.querySelector('#btnRecargar');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Cargando...';
      
      await this.cargarContactos();
      
      btn.disabled = false;
      btn.innerHTML = 'Recargar';
    });
  }
}

customElements.define("lst-contacto", LstContacto);