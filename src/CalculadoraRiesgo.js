class CalculadoraRiesgo {
  constructor(umbralRiesgo = 65) {
    this.umbralRiesgo = umbralRiesgo;
  }

  calcularPromedio(notas) {
    if (!notas || notas.length === 0) return 0;
    const suma = notas.reduce((acum, nota) => acum + nota, 0);
    return suma / notas.length;
  }

  estaEnRiesgo(promedio) {
    return promedio < this.umbralRiesgo;
  }

  getEstadoEstudiante(notas) {
    const promedio = this.calcularPromedio(notas);
    return {
      promedio,
      enRiesgo: this.estaEnRiesgo(promedio),
    };
  }
}

module.exports = CalculadoraRiesgo;
