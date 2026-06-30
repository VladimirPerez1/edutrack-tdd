const SistemaEduTrack = require('./src/SistemaEduTrack');

const sistema = new SistemaEduTrack();

sistema.registrarEstudiante('Ana Pérez');
sistema.registrarNota('Ana Pérez', '1er parcial', 50);
sistema.registrarNota('Ana Pérez', '2do parcial', 55);
sistema.registrarAsistencia('Ana Pérez', '2026-06-01', true);
sistema.registrarAsistencia('Ana Pérez', '2026-06-02', false);

const resultado = sistema.evaluarEstudiante('Ana Pérez');

console.log('--- Evaluación de Ana Pérez ---');
console.log('Promedio:', resultado.promedio);
console.log('¿En riesgo académico?:', resultado.enRiesgo);
console.log('Inasistencias:', resultado.inasistencias);
console.log('Resultado de notificación:', resultado.notificacion);
console.log('Historial de notificaciones:', sistema.notificaciones.getHistorial());
