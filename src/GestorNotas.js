class GestorNotas {
  constructor() {
    this.notasPorPeriodo = {};
  }

  esNotaValida(valor) {
    return valor >= 0 && valor <= 100;
  }

  registrarNota(periodo, valor) {
    if (!this.esNotaValida(valor)) {
      throw new Error('Nota fuera de rango (0-100)');
    }
    if (!this.notasPorPeriodo[periodo]) {
      this.notasPorPeriodo[periodo] = [];
    }
    this.notasPorPeriodo[periodo].push(valor);
  }

  getNotas(periodo) {
    return this.notasPorPeriodo[periodo] || [];
  }

  getPromedio() {
    const todasLasNotas = Object.values(this.notasPorPeriodo).flat();
    if (todasLasNotas.length === 0) return 0;
    const suma = todasLasNotas.reduce((acum, nota) => acum + nota, 0);
    return suma / todasLasNotas.length;
  }
}

module.exports = GestorNotas;
