/**
 * quiz-copy.js — El Secreto de las Manos v2
 * Datos del quiz: preguntas, opciones y pesos de scoring
 *
 * Estructura intencional:
 *   P1 → momento actual         (qué está pasando)
 *   P2 → urgencia / frecuencia  (desde cuándo / qué tan profundo)
 *   P3 → tipo de claridad       (tiebreaker primario)
 *   P4 → cómo procesa / percibe (señales internas vs externas)
 *   P5 → resultado esperado     (tiebreaker fallback)
 *
 * Lógica de scores:
 *   scoreT → situación puntual, decisión, panorama, señales externas, claridad inmediata
 *   scoreM → patrón profundo, identidad, esencia, cuerpo, ciclos, autoconocimiento
 *
 * Desempate: P3 primero (tiebreaker: true), P5 como fallback.
 */

window.QUIZ_DATA = [
  {
    id: 1,
    question: '¿Qué está pasando en tu vida en este momento?',
    options: [
      { text: 'Estoy en medio de una situación concreta que no se resuelve',    scoreT: 2, scoreM: 0 },
      { text: 'Siento algo que no puedo nombrarlo, pero está ahí',              scoreT: 0, scoreM: 2 },
      { text: 'Una misma situación se repite y no entiendo por qué',            scoreT: 0, scoreM: 2 },
      { text: 'Tengo una pregunta puntual que me da vueltas sin respuesta',     scoreT: 2, scoreM: 0 },
    ],
  },
  {
    id: 2,
    question: '¿Desde cuándo sentís esto?',
    options: [
      { text: 'Es algo reciente — apareció de repente y necesito entenderlo ya',      scoreT: 2, scoreM: 0 },
      { text: 'Lo arrastro hace tiempo — aparece, se va y vuelve',                    scoreT: 0, scoreM: 2 },
      { text: 'Un evento reciente lo despertó, pero siento que hay algo más detrás',  scoreT: 1, scoreM: 1 },
      { text: 'No tiene un inicio claro — siempre formó parte de mí',                 scoreT: 0, scoreM: 2 },
    ],
  },
  {
    id: 3,
    question: '¿Qué tipo de claridad estás buscando?',
    tiebreaker: true,
    options: [
      { text: 'Entender qué está pasando en esta situación o relación',            scoreT: 2, scoreM: 0 },
      { text: 'Entender qué está pasando dentro mío — mis patrones, mis bloqueos', scoreT: 0, scoreM: 2 },
      { text: 'Saber qué decisión tomar o qué camino elegir',                      scoreT: 2, scoreM: 0 },
      { text: 'Conocerme mejor — ver qué hay en mí que atrae o repite esto',       scoreT: 0, scoreM: 2 },
    ],
  },
  {
    id: 4,
    question: '¿Cómo procesás lo que sentís?',
    options: [
      { text: 'Busco señales en lo que pasa afuera — situaciones, personas, coincidencias', scoreT: 2, scoreM: 0 },
      { text: 'Lo siento en el cuerpo — algo me pesa o me alivia antes de entender',        scoreT: 0, scoreM: 2 },
      { text: 'Razono, pregunto, busco información — necesito entender con la cabeza',      scoreT: 2, scoreM: 0 },
      { text: 'Intuyo cosas que no puedo explicar, pero que siento que son ciertas',        scoreT: 0, scoreM: 2 },
    ],
  },
  {
    id: 5,
    question: '¿Qué esperás llevarte de tu lectura?',
    tiebreaker: true,
    options: [
      { text: 'Claridad sobre una situación concreta que me está frenando',     scoreT: 2, scoreM: 0 },
      { text: 'Autoconocimiento — entender mis patrones y mi esencia',          scoreT: 0, scoreM: 2 },
      { text: 'Dirección — saber qué pasos tomar o qué dejar ir',              scoreT: 2, scoreM: 0 },
      { text: 'Paz — entender algo de mí que hace tiempo me genera ruido',     scoreT: 0, scoreM: 2 },
    ],
  },
];
