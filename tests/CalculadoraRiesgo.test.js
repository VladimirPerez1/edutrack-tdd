const CalculadoraRiesgo = require('../src/CalculadoraRiesgo');

describe('CalculadoraRiesgo - HU-02: Panel de progreso y alertas', () => {

  test('deberiaCalcularElPromedioDeUnArregloDeNotas', () => {
    const calculadora = new CalculadoraRiesgo();
    const resultado = calculadora.calcularPromedio([100, 80, 60]);
    expect(resultado).toBe(80);
  });

  test('deberiaDevolverCeroSiElArregloDeNotasEstaVacio', () => {
    const calculadora = new CalculadoraRiesgo();
    expect(calculadora.calcularPromedio([])).toBe(0);
  });

  test('deberiaDevolverVerdaderoSiElPromedioEsMenorQue65', () => {
    const calculadora = new CalculadoraRiesgo();
    expect(calculadora.estaEnRiesgo(64)).toBe(true);
  });

  test('deberiaDevolverFalsoSiElPromedioEsMayorOIgualQue65', () => {
    const calculadora = new CalculadoraRiesgo();
    expect(calculadora.estaEnRiesgo(65)).toBe(false);
  });

  test('deberiaDevolverElEstadoCompletoDelEstudianteEnRiesgo', () => {
    const calculadora = new CalculadoraRiesgo();
    const estado = calculadora.getEstadoEstudiante([50, 60, 55]);
    expect(estado).toEqual({ promedio: 55, enRiesgo: true });
  });

  test('deberiaDevolverElEstadoCompletoDelEstudianteSinRiesgo', () => {
    const calculadora = new CalculadoraRiesgo();
    const estado = calculadora.getEstadoEstudiante([90, 85, 95]);
    expect(estado).toEqual({ promedio: 90, enRiesgo: false });
  });
});
