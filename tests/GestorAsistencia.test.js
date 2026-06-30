const GestorAsistencia = require('../src/GestorAsistencia');

describe('GestorAsistencia - HU-01: Registro de asistencia diaria', () => {

  test('deberiaRegistrarUnaAsistenciaPresente', () => {
    const gestor = new GestorAsistencia();
    gestor.registrarAsistencia('2026-06-01', true);
    expect(gestor.getRegistros().length).toBe(1);
  });

  test('deberiaContarLasInasistenciasCorrectamente', () => {
    const gestor = new GestorAsistencia();
    gestor.registrarAsistencia('2026-06-01', true);
    gestor.registrarAsistencia('2026-06-02', false);
    gestor.registrarAsistencia('2026-06-03', false);
    expect(gestor.getCantidadInasistencias()).toBe(2);
  });

  test('deberiaDevolverFalsoSiNoHayExcesoDeInasistencias', () => {
    const gestor = new GestorAsistencia();
    gestor.registrarAsistencia('2026-06-01', false);
    gestor.registrarAsistencia('2026-06-02', false);
    expect(gestor.hasExcesoDeInasistencias()).toBe(false);
  });

  test('deberiaDevolverVerdaderoSiHayTresOMasInasistencias', () => {
    const gestor = new GestorAsistencia();
    gestor.registrarAsistencia('2026-06-01', false);
    gestor.registrarAsistencia('2026-06-02', false);
    gestor.registrarAsistencia('2026-06-03', false);
    expect(gestor.hasExcesoDeInasistencias()).toBe(true);
  });

  test('deberiaDevolverLaFechaDeLaUltimaAsistencia', () => {
    const gestor = new GestorAsistencia();
    gestor.registrarAsistencia('2026-06-01', true);
    gestor.registrarAsistencia('2026-06-05', false);
    expect(gestor.getFechaUltimaAsistencia()).toBe('2026-06-05');
  });
});
