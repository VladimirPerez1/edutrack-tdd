class SistemaNotificaciones {
  constructor(umbralRiesgo = 65, umbralInasistencias = 3) {
    this.umbralRiesgo = umbralRiesgo;
    this.umbralInasistencias = umbralInasistencias;
    this.historial = [];
  }

  debeNotificar(promedio, inasistencias) {
    return promedio < this.umbralRiesgo || inasistencias >= this.umbralInasistencias;
  }

  generarMensaje({ nombre, promedio, materiasBajoRendimiento, fechaUltimaAsistencia }) {
    return (
      `Estimado padre/tutor, le informamos que el estudiante ${nombre} ` +
      `tiene un promedio de ${promedio}. Materias con bajo rendimiento: ` +
      `${materiasBajoRendimiento.join(', ')}. Última asistencia registrada: ` +
      `${fechaUltimaAsistencia}.`
    );
  }

  registrarNotificacionEnviada(nombre, fecha) {
    this.historial.push({ nombre, fecha });
  }

  getHistorial() {
    return this.historial;
  }

  evaluarYNotificar({ nombre, promedio, inasistencias, materiasBajoRendimiento, fechaUltimaAsistencia }) {
    if (!this.debeNotificar(promedio, inasistencias)) {
      return 'No se requiere notificación';
    }
    const mensaje = this.generarMensaje({
      nombre,
      promedio,
      materiasBajoRendimiento,
      fechaUltimaAsistencia,
    });
    this.registrarNotificacionEnviada(nombre, fechaUltimaAsistencia);
    return `Notificación enviada: ${mensaje}`;
  }
}

module.exports = SistemaNotificaciones;
