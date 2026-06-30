const SistemaNotificaciones = require('../src/SistemaNotificaciones');

describe('SistemaNotificaciones - HU-03: Notificaciones a padres/tutores', () => {

  test('deberiaNotificarSiElPromedioEsMenorQue65', () => {
    const sistema = new SistemaNotificaciones();
    expect(sistema.debeNotificar(60, 0)).toBe(true);
  });

  test('deberiaNotificarSiHayTresOMasInasistencias', () => {
    const sistema = new SistemaNotificaciones();
    expect(sistema.debeNotificar(90, 3)).toBe(true);
  });

  test('deberiaNoNotificarSiElEstudianteEstaBienYAsiste', () => {
    const sistema = new SistemaNotificaciones();
    expect(sistema.debeNotificar(80, 1)).toBe(false);
  });

  test('deberiaGenerarElMensajeDeNotificacionConLosDatosDelEstudiante', () => {
    const sistema = new SistemaNotificaciones();
    const mensaje = sistema.generarMensaje({
      nombre: 'Ana Pérez',
      promedio: 58,
      materiasBajoRendimiento: ['Matemática', 'Física'],
      fechaUltimaAsistencia: '2026-06-10'
    });
    expect(mensaje).toContain('Ana Pérez');
    expect(mensaje).toContain('Matemática, Física');
    expect(mensaje).toContain('2026-06-10');
  });

  test('deberiaRegistrarLaNotificacionEnElHistorial', () => {
    const sistema = new SistemaNotificaciones();
    sistema.registrarNotificacionEnviada('Ana Pérez', '2026-06-10');
    expect(sistema.getHistorial().length).toBe(1);
  });

  test('deberiaDevolverNoHayRiesgoSiNoSeCumpleNingunCriterio', () => {
    const sistema = new SistemaNotificaciones();
    const resultado = sistema.evaluarYNotificar({
      nombre: 'Luis Gómez',
      promedio: 90,
      inasistencias: 0,
      materiasBajoRendimiento: [],
      fechaUltimaAsistencia: '2026-06-12'
    });
    expect(resultado).toBe('No se requiere notificación');
  });

  test('deberiaEnviarYRegistrarNotificacionSiHayRiesgoAcademico', () => {
    const sistema = new SistemaNotificaciones();
    const resultado = sistema.evaluarYNotificar({
      nombre: 'Luis Gómez',
      promedio: 50,
      inasistencias: 0,
      materiasBajoRendimiento: ['Química'],
      fechaUltimaAsistencia: '2026-06-12'
    });
    expect(resultado).toContain('Notificación enviada');
    expect(sistema.getHistorial().length).toBe(1);
  });
});
