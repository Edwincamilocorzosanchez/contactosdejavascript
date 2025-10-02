import { postCiudad, patchCiudad, deleteCiudad, getRegiones } from '../../../Apis/contact/apiConfig.js';

export class RegCiudad extends HTMLElement {
  constructor() {
    super();
    this.regiones = [];
    this.render();
    this.cargarRegiones();
    this.setupEvents();
    this.disableFrm(true);
  }

  async cargarRegiones() {
    try {
      this.regiones = await getRegiones();
      this.llenarSelectRegiones();
    } catch (error) {
      console.error('Error al cargar regiones:', error);
    }
  }

  llenarSelectRegiones() {
    const select = this.querySelector('#regionId');
    
    if (this.regiones.length === 0) {
      select.innerHTML = '<option value="">No hay regiones registradas</option>';
      select.disabled = true;
      this.mostrarAlerta();
      return;
    }

    select.innerHTML = '<option value="">Seleccione una región</option>' +
      this.regiones.map(region => 
        `<option value="${region.id}">${region.nombreRegion}</option>`
      ).join('');
    select.disabled = false;
    this.ocultarAlerta();
  }

  mostrarAlerta() {
    const alerta = this.querySelector('#alertaRegiones');
    alerta.style.display = 'block';
  }

  ocultarAlerta() {
    const alerta = this.querySelector('#alertaRegiones');
    alerta.style.display = 'none';
  }

  render() {
    this.innerHTML = /* html */ `
      <style>
        .disabled { opacity: 0.5; pointer-events: none; }
      </style>
      <div class="card mt-3">
        <div class="card-header">
          Registro de Ciudad <span class="badge rounded-pill text-bg-primary" id="idView"></span>
        </div>
        <div class="card-body">
          <div class="alert alert-warning" role="alert" id="alertaRegiones" style="display:none;">
            <strong>¡Atención!</strong> No hay regiones disponibles. Debe registrar al menos una región antes de crear una ciudad.
          </div>
          <form id="frmCiudad">
            <div class="row">
              <div class="col-md-6">
                <label for="nombreCiudad" class="form-label">Nombre de la Ciudad</label>
                <input type="text" class="form-control" id="nombreCiudad" name="nombreCiudad" required>
              </div>
              <div class="col-md-6">
                <label for="regionId" class="form-label">Región <span class="text-danger">*</span></label>
                <select class="form-select" id="regionId" name="regionId" required>
                  <option value="">Cargando regiones...</option>
                </select>
                <small class="text-muted">Debe existir al menos una región registrada</small>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-12">
                <label for="codigoCiudad" class="form-label">Código de Ciudad (Opcional)</label>
                <input type="text" class="form-control" id="codigoCiudad" name="codigoCiudad" placeholder="Ej: BGA, BOG">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <div class="container mt-4 text-center">
                  <button type="button" class="btn btn-primary" id="btnNuevo">Nuevo</button>
                  <button type="button" class="btn btn-dark disabled" id="btnCancelar">Cancelar</button>
                  <button type="button" class="btn btn-success disabled" id="btnGuardar">Guardar</button>
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

  handleNuevo() {
    if (this.regiones.length === 0) {
      alert('Debe registrar al menos una región antes de crear una ciudad');
      return;
    }
    this.disableFrm(false);
    this.resetForm();
    this.toggleButtons(['btnGuardar', 'btnCancelar'], ['btnNuevo', 'btnEditar', 'btnEliminar']);
  }

  handleCancelar() {
    this.disableFrm(true);
    this.resetForm();
    this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
  }

  async handleGuardar() {
    const form = this.querySelector('#frmCiudad');
    const data = Object.fromEntries(new FormData(form).entries());
    
    if (!data.nombreCiudad || !data.regionId) {
      alert('Por favor complete los campos obligatorios');
      return;
    }

    try {
      const response = await postCiudad(data);
      if (response && response.id) {
        this.viewData(response.id);
        this.toggleButtons(['btnNuevo', 'btnEditar', 'btnCancelar', 'btnEliminar'], ['btnGuardar']);
        alert('Ciudad guardada exitosamente');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la ciudad');
    }
  }

  async handleEditar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    const form = this.querySelector('#frmCiudad');
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await patchCiudad(data, idView);
      alert('Ciudad actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar la ciudad');
    }
  }

  async handleEliminar() {
    const idView = this.querySelector('#idView').textContent;
    if (!idView) return;

    if (!confirm('¿Está seguro de eliminar esta ciudad?')) return;

    try {
      await deleteCiudad(idView);
      this.resetForm();
      this.disableFrm(true);
      this.toggleButtons(['btnNuevo'], ['btnGuardar', 'btnCancelar', 'btnEditar', 'btnEliminar']);
      alert('Ciudad eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la ciudad');
    }
  }

  toggleButtons(enable, disable) {
    enable.forEach(id => this.querySelector(`#${id}`).classList.remove('disabled'));
    disable.forEach(id => this.querySelector(`#${id}`).classList.add('disabled'));
  }

  viewData(id) {
    this.querySelector('#idView').textContent = id;
  }

  resetForm() {
    this.querySelector('#frmCiudad').reset();
    this.querySelector('#idView').textContent = '';
  }

  disableFrm(disabled) {
    const form = this.querySelector('#frmCiudad');
    Array.from(form.elements).forEach(el => {
      if (el.tagName !== 'BUTTON') el.disabled = disabled;
    });
  }
}

customElements.define("reg-ciudad", RegCiudad);