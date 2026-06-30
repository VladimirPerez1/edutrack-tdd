const GestorNotas = require('../src/GestorNotas');

describe('GestorNotas - HU-01: Registro y validación de notas', () => {

  test('deberiaDevolverVerdaderoSiLaNotaEsValida', () => {
    const gestor = new GestorNotas();
    const resultado = gestor.esNotaValida(85);
    expect(resultado).toBe(true);
  });

  test('deberiaDevolverFalsoSiLaNotaEsMenorQueCero', () => {
    const gestor = new GestorNotas();
    const resultado = gestor.esNotaValida(-5);
    expect(resultado).toBe(false);
  });

  test('deberiaDevolverFalsoSiLaNotaEsMayorQueCien', () => {
    const gestor = new GestorNotas();
    const resultado = gestor.esNotaValida(105);
    expect(resultado).toBe(false);
  });

  test('deberiaRegistrarUnaNotaValidaEnElPeriodo', () => {
    const gestor = new GestorNotas();
    gestor.registrarNota('1er parcial', 90);
    expect(gestor.getNotas('1er parcial')).toEqual([90]);
  });

  test('deberiaLanzarErrorSiSeRegistraUnaNotaInvalida', () => {
    const gestor = new GestorNotas();
    expect(() => gestor.registrarNota('1er parcial', 150)).toThrow('Nota fuera de rango (0-100)');
  });

  test('deberiaCalcularElPromedioDeTodasLasNotas', () => {
    const gestor = new GestorNotas();
    gestor.registrarNota('1er parcial', 90);
    gestor.registrarNota('2do parcial', 70);
    gestor.registrarNota('3er parcial', 80);
    expect(gestor.getPromedio()).toBe(80);
  });

  test('deberiaDevolverCeroDePromedioSiNoHayNotasRegistradas', () => {
    const gestor = new GestorNotas();
    expect(gestor.getPromedio()).toBe(0);
  });
});
