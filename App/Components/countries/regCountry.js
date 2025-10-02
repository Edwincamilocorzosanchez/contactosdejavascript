import { postPais, patchPais, deletePais } from '../../../Apis/contact/apiConfig.js';

export class RegPais extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setupEvents();
    this.disableFrm(true);
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .disabled { opacity: 0.5; pointer-events: none; }
        .alert { margin-top: 1rem; }
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de País <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <div id="alertContainer"></div>
          <form id="frmPais">
            <div class="row">
              <div class="col-md-12">
                <label for="nombrePais" class="form-label">Nombre del País <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="nombrePais" name="nombrePais" required placeholder="Ingrese el nombre del país">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <div class="container mt-4 text-center">
                  <button type="button" class="btn btn-primary" id="btnNuevo">Nuevo</button>
                  <button type="button" class="btn btn-dark disabled" id="btnCancelar">Cancelar</button>
                  <button type="button" class="btn btn-success disabled" id="btnGuardar">
                    <span class="btn-text">Guardar</span>
                  </button>
                  <button type="button" class="btn btn-warning disabled" id="btnEditar">Editar</button>
                  <button type="button" class="btn btn-danger disabled" id="btnEliminar">Eliminar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  setupEvents() {
    this.querySelector("#btnNuevo").addEventListener("click", () => this.handleNuevo());
    this.querySelector("#btnCancelar").addEventListener("click", () => this.handleCancelar());
    this.querySelector("#btnGuardar").addEventListener("click", () => this.handleGuardar());
    this.querySelector("#btnEditar").addEventListener("click", () => this.handleEditar());
    this.querySelector("#btnEliminar").addEventListener("click", () => this.handleEliminar());
  }

  showAlert(message, type = 'success') {
    const alertContainer = this.querySelector('#alertContainer');
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    
    // Auto-dismiss después de 5 segundos
    setTimeout(() => {
      const alert = alertContainer.querySelector('.alert');
      if (alert) {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 150);
      }
    }, 5000);
  }

  handleNuevo() {
    this.disableFrm(false);
    this.resetForm();
    this.toggleButtons(['btnGuardar', 'btnCancelar'], ['btnNuevo', 'btnEditar', 'btnEliminar']);
    this.querySelector('#nombrePais').focus();
  }

  handleCancelar() {
    this.disableFrm(true);
    this.resetForm();
    this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
  }

  async handleGuardar() {
    const form = this.querySelector('#frmPais');
    const nombrePais = this.querySelector('#nombrePais').value.trim();
    
    // Validación
    if (!nombrePais) {
      this.showAlert('Por favor ingrese el nombre del país', 'warning');
      this.querySelector('#nombrePais').focus();
      return;
    }

    const btnGuardar = this.querySelector('#btnGuardar');
    const btnText = btnGuardar.querySelector('.btn-text');
    
    try {
      // Deshabilitar botón y mostrar loading
      btnGuardar.disabled = true;
      btnText.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Guardando...';
      
      const data = { nombrePais };
      console.log('Enviando datos:', data);
      
      const response = await postPais(data);
      console.log('Respuesta recibida:', response);
      
      if (response && response.id) {
        this.viewData(response.id);
        this.toggleButtons(['btnNuevo', 'btnEditar', 'btnCancelar', 'btnEliminar'], ['btnGuardar']);
        this.showAlert(`País "${nombrePais}" guardado exitosamente con ID: ${response.id}`, 'success');
        this.disableFrm(true);
      } else {
        throw new Error('No se recibió ID en la respuesta');
      }
    } catch (error) {
      console.error('Error completo al guardar:', error);
      this.showAlert(`Error al guardar el país: ${error.message}`, 'danger');
      btnGuardar.disabled = false;
    } finally {
      btnText.textContent = 'Guardar';
    }
  }

  async handleEditar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) {
      this.showAlert('No hay un registro seleccionado para editar', 'warning');
      return;
    }

    const nombrePais = this.querySelector('#nombrePais').value.trim();
    
    if (!nombrePais) {
      this.showAlert('Por favor ingrese el nombre del país', 'warning');
      return;
    }

    const btnEditar = this.querySelector('#btnEditar');
    const originalText = btnEditar.textContent;
    
    try {
      btnEditar.disabled = true;
      btnEditar.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Actualizando...';
      
      const data = { nombrePais };
      await patchPais(data, idView);
      
      this.showAlert(`País actualizado exitosamente`, 'success');
    } catch (error) {
      console.error('Error al actualizar:', error);
      this.showAlert(`Error al actualizar el país: ${error.message}`, 'danger');
    } finally {
      btnEditar.disabled = false;
      btnEditar.textContent = originalText;
    }
  }

  async handleEliminar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) {
      this.showAlert('No hay un registro seleccionado para eliminar', 'warning');
      return;
    }

    const nombrePais = this.querySelector('#nombrePais').value;
    
    if (!confirm(`¿Está seguro de eliminar el país "${nombrePais}"?`)) return;

    const btnEliminar = this.querySelector('#btnEliminar');
    const originalText = btnEliminar.textContent;
    
    try {
      btnEliminar.disabled = true;
      btnEliminar.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Eliminando...';
      
      await deletePais(idView);
      
      this.resetForm();
      this.disableFrm(true);
      this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
      this.showAlert('País eliminado exitosamente', 'info');
    } catch (error) {
      console.error('Error al eliminar:', error);
      this.showAlert(`Error al eliminar el país: ${error.message}`, 'danger');
      btnEliminar.disabled = false;
      btnEliminar.textContent = originalText;
    }
  }

  toggleButtons(enable, disable) {
    enable.forEach(id => {
      const btn = this.querySelector(`#${id}`);
      if (btn) btn.classList.remove('disabled');
    });
    disable.forEach(id => {
      const btn = this.querySelector(`#${id}`);
      if (btn) btn.classList.add('disabled');
    });
  }

  viewData(id) {
    this.querySelector('#idView').textContent = id;
  }

  resetForm() {
    this.querySelector('#frmPais').reset();
    this.querySelector('#idView').textContent = '';
    const alertContainer = this.querySelector('#alertContainer');
    if (alertContainer) alertContainer.innerHTML = '';
  }

  disableFrm(disabled) {
    const form = this.querySelector('#frmPais');
    Array.from(form.elements).forEach(el => {
      if (el.tagName !== 'BUTTON') {
        el.disabled = disabled;
      }
    });
  }
}

customElements.define("reg-pais", RegPais);