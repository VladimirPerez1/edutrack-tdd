const SistemaEduTrack = require('../src/SistemaEduTrack');

describe('SistemaEduTrack - Integración HU-01, HU-02 y HU-03', () => {

  let sistema;

  beforeEach(() => {
    sistema = new SistemaEduTrack();
    sistema.registrarEstudiante('Ana Pérez');
  });

  test('deberiaRegistrarUnEstudianteNuevo', () => {
    expect(sistema.getEstudiante('Ana Pérez')).toBeDefined();
  });

  test('deberiaRegistrarNotasDeUnEstudiante', () => {
    sistema.registrarNota('Ana Pérez', '1er parcial', 90);
    const estudiante = sistema.getEstudiante('Ana Pérez');
    expect(estudiante.notas.getNotas('1er parcial')).toEqual([90]);
  });

  test('deberiaDevolverNoExisteEstudianteSiNoEstaRegistrado', () => {
    expect(() => sistema.registrarNota('Carlos Ruiz', '1er parcial', 80))
      .toThrow('No existe el estudiante');
  });

  test('deberiaRegistrarAsistenciaDeUnEstudiante', () => {
    sistema.registrarAsistencia('Ana Pérez', '2026-06-01', false);
    const estudiante = sistema.getEstudiante('Ana Pérez');
    expect(estudiante.asistencia.getCantidadInasistencias()).toBe(1);
  });

  test('deberiaEvaluarUnEstudianteSinRiesgoYSinNotificar', () => {
    sistema.registrarNota('Ana Pérez', '1er parcial', 90);
    sistema.registrarNota('Ana Pérez', '2do parcial', 85);
    sistema.registrarAsistencia('Ana Pérez', '2026-06-01', true);

    const resultado = sistema.evaluarEstudiante('Ana Pérez');

    expect(resultado.promedio).toBe(87.5);
    expect(resultado.enRiesgo).toBe(false);
    expect(resultado.notificacion).toBe('No se requiere notificación');
  });

  test('deberiaEvaluarUnEstudianteEnRiesgoYNotificar', () => {
    sistema.registrarNota('Ana Pérez', '1er parcial', 50);
    sistema.registrarNota('Ana Pérez', '2do parcial', 55);
    sistema.registrarAsistencia('Ana Pérez', '2026-06-01', true);

    const resultado = sistema.evaluarEstudiante('Ana Pérez');

    expect(resultado.promedio).toBe(52.5);
    expect(resultado.enRiesgo).toBe(true);
    expect(resultado.notificacion).toContain('Notificación enviada');
    expect(sistema.notificaciones.getHistorial().length).toBe(1);
  });

  test('deberiaEvaluarUnEstudianteConExcesoDeInasistenciasYNotificar', () => {
    sistema.registrarNota('Ana Pérez', '1er parcial', 95);
    sistema.registrarAsistencia('Ana Pérez', '2026-06-01', false);
    sistema.registrarAsistencia('Ana Pérez', '2026-06-02', false);
    sistema.registrarAsistencia('Ana Pérez', '2026-06-03', false);

    const resultado = sistema.evaluarEstudiante('Ana Pérez');

    expect(resultado.enRiesgo).toBe(false);
    expect(resultado.notificacion).toContain('Notificación enviada');
  });
});
