const GestorNotas = require('./GestorNotas');
const GestorAsistencia = require('./GestorAsistencia');
const CalculadoraRiesgo = require('./CalculadoraRiesgo');
const SistemaNotificaciones = require('./SistemaNotificaciones');

class SistemaEduTrack {
  constructor() {
    this.estudiantes = {};
    this.calculadora = new CalculadoraRiesgo();
    this.notificaciones = new SistemaNotificaciones();
  }

  registrarEstudiante(nombre) {
    this.estudiantes[nombre] = {
      nombre,
      notas: new GestorNotas(),
      asistencia: new GestorAsistencia(),
    };
  }

  getEstudiante(nombre) {
    return this.estudiantes[nombre];
  }

  _validarExistencia(nombre) {
    if (!this.estudiantes[nombre]) {
      throw new Error('No existe el estudiante');
    }
  }

  registrarNota(nombre, periodo, valor) {
    this._validarExistencia(nombre);
    this.estudiantes[nombre].notas.registrarNota(periodo, valor);
  }

  registrarAsistencia(nombre, fecha, presente) {
    this._validarExistencia(nombre);
    this.estudiantes[nombre].asistencia.registrarAsistencia(fecha, presente);
  }

  evaluarEstudiante(nombre) {
    this._validarExistencia(nombre);
    const estudiante = this.estudiantes[nombre];

    const todasLasNotas = Object.values(estudiante.notas.notasPorPeriodo).flat();
    const { promedio, enRiesgo } = this.calculadora.getEstadoEstudiante(todasLasNotas);
    const inasistencias = estudiante.asistencia.getCantidadInasistencias();
    const fechaUltimaAsistencia = estudiante.asistencia.getFechaUltimaAsistencia();

    const notificacion = this.notificaciones.evaluarYNotificar({
      nombre,
      promedio,
      inasistencias,
      materiasBajoRendimiento: enRiesgo ? ['Promedio general'] : [],
      fechaUltimaAsistencia,
    });

    return { promedio, enRiesgo, inasistencias, notificacion };
  }
}

module.exports = SistemaEduTrack;
