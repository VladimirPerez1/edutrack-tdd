class GestorAsistencia {
  constructor() {
    this.registros = [];
  }

  registrarAsistencia(fecha, presente) {
    this.registros.push({ fecha, presente });
  }

  getRegistros() {
    return this.registros;
  }

  getCantidadInasistencias() {
    return this.registros.filter((r) => !r.presente).length;
  }

  hasExcesoDeInasistencias() {
    return this.getCantidadInasistencias() >= 3;
  }

  getFechaUltimaAsistencia() {
    if (this.registros.length === 0) return null;
    return this.registros[this.registros.length - 1].fecha;
  }
}

module.exports = GestorAsistencia;
