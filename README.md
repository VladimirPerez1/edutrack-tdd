# EduTrack RD — Núcleo desarrollado con TDD

Implementación del núcleo de lógica de negocio de **EduTrack RD** (HU-01, HU-02, HU-03)
construida con la metodología **Test Driven Development (Red → Green → Refactor)**,
siguiendo el mismo patrón de la guía "TDD Máquina de Café".

## Estructura del proyecto

```
edutrack-tdd/
├── src/
│   ├── GestorNotas.js          # HU-01: registro y validación de notas (0-100)
│   ├── GestorAsistencia.js     # HU-01: registro de asistencia diaria
│   ├── CalculadoraRiesgo.js    # HU-02: promedio y alerta de riesgo (<65)
│   ├── SistemaNotificaciones.js# HU-03: lógica de disparo de notificaciones
│   └── SistemaEduTrack.js      # Orquestador que integra las 4 piezas
├── tests/
│   └── *.test.js               # Un archivo de test por clase (Jest)
├── demo.js                     # Demo ejecutable manual
└── package.json
```

## Cómo abrir y ejecutar en VS Code

1. Abre la carpeta `edutrack-tdd` en VS Code (`File > Open Folder...`).
2. Abre una terminal integrada (`Ctrl + ñ` / `` Ctrl + ` ``).
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Corre todos los tests:
   ```bash
   npm test
   ```
   Deberías ver **32 tests pasando** (5 test suites).

5. (Opcional) Modo watch, útil mientras programas en ciclo TDD:
   ```bash
   npm run test:watch
   ```

6. (Opcional) Ejecutar la demo manual por consola:
   ```bash
   npm run demo
   ```

> Recomendación de extensión de VS Code: **Jest** (orta.vscode-jest) para ver el
> resultado de cada test en línea, igual que la vista de JUnit en Eclipse de la guía.

## Trazabilidad con las Historias de Usuario

| Clase | Historia de Usuario | Responsable original (Sprint 1) |
|---|---|---|
| `GestorNotas` | HU-01 | Eduardo Rodríguez |
| `GestorAsistencia` | HU-01 | Vladimir Pérez |
| `CalculadoraRiesgo` | HU-02 | Vladimir Pérez |
| `SistemaNotificaciones` | HU-03 | Vladimir Pérez / Eduardo Rodríguez |
| `SistemaEduTrack` | HU-01, HU-02, HU-03 | Integración |

## Siguientes pasos (fuera del alcance de este ejercicio TDD)

- Conectar `SistemaEduTrack` a la base de datos PostgreSQL real (capa de persistencia).
- Exponer estas clases a través de los endpoints REST de Express ya documentados
  (`POST /notas`, `POST /asistencia`, etc.).
- Sustituir el envío simulado de notificaciones por la integración real con SendGrid.
