/**
 * result-copy.js — El Secreto de las Manos v2
 * Copy dinámico para la pantalla de diagnóstico (Fase 3)
 *
 * Variantes de párrafos — clave = p1Type + '_' + p2Type:
 *   p1 [0,3] → 'ext'    (situación concreta / pregunta puntual)
 *   p1 [1,2] → 'int'    (algo que no puedo nombrar / patrón)
 *   p2 [0,2] → 'recent' (algo reciente / evento reciente que despertó algo)
 *   p2 [1,3] → 'deep'   (lo arrastro hace tiempo / no tiene inicio claro)
 *
 * Tercer párrafo — clave = p3Type:
 *   p3 [0,2] → 'situacion' (claridad sobre situación o decisión)
 *   p3 [1,3] → 'patron'    (claridad interna / patrones / autoconocimiento)
 *
 * Consumido por: js/result.js
 * Depende de: —
 */

'use strict';

window.RESULT_COPY = {

  /* ════════════════════════════════════════════════════════════
     TAROT
     Para quienes buscan claridad sobre una situación puntual,
     una decisión, un panorama externo, señales concretas.
     ════════════════════════════════════════════════════════════ */
  tarot: {
    eyebrow: 'Tu diagnóstico · Lectura recomendada',
    title: 'El Tarot es la lectura indicada para vos',
    titleShort: 'Tarot',

    paragraphs: {

      // Situación concreta + algo reciente
      ext_recent: [
        'Hay algo concreto que está pasando en tu vida — algo que apareció de repente y todavía no terminás de entender del todo. El Tarot trabaja exactamente ahí: en lo que está en movimiento, en lo que todavía no tiene nombre pero ya te ocupa.',
        'En este momento no necesitás un análisis largo. Necesitás claridad sobre lo que está frente a vos, ahora mismo.',
      ],

      // Situación concreta + lo arrastrás desde hace tiempo
      ext_deep: [
        'Esta situación no es nueva, pero tampoco te suelta. Hay algo en ella que sigue pidiendo atención. El Tarot puede mostrarte lo que todavía no ves de lo que está pasando — y por qué seguís conectada a eso.',
        'A veces lo que parece externo tiene raíces más profundas. La lectura te da el espejo que falta para verlo con claridad.',
      ],

      // Algo interno / sin nombre + algo reciente
      int_recent: [
        'Sentís algo que cuesta poner en palabras, y sin embargo está ahí. El Tarot puede darte el símbolo justo — el que ordena lo que ya sabés pero todavía no podés ver completo.',
        'Muchas veces lo que necesitamos no es más información. Es el ángulo correcto para leer lo que ya sentimos.',
      ],

      // Patrón que se repite + lo arrastrás desde hace tiempo
      int_deep: [
        'Esto que sentís no es nuevo. Es algo que viene de antes, que aparece en distintas formas y que en algún punto necesita ser nombrado. El Tarot tiene la capacidad de iluminar exactamente eso.',
        'Cuando algo se repite, hay un mensaje detrás. La lectura te ayuda a verlo con claridad, sin rodeos y sin vueltas.',
      ],
    },

    // Tercer párrafo — modulado por P3 (tipo de claridad buscada)
    p3: {
      situacion: 'Tu lectura va a explorar lo que está en juego en esta situación, las energías que la rodean y qué caminos están disponibles para vos en este momento.',
      patron:    'Tu lectura también va a tocar la decisión que está esperándote, y qué parte de vos ya está lista para dar ese paso.',
    },

    checklist: [
      'Claridad sobre la situación o la pregunta que te ocupa hoy',
      'Las energías que rodean la decisión o el momento que atravesás',
      'Un camino posible hacia adelante, sin forzar nada',
    ],

    // Gancho del 2x1 — aparece integrado en el bloque de oferta
    offerHook: 'El Tarot es la lectura que más te conviene hoy para entender con claridad lo que está pasando en tu vida. Y si reservás en los próximos 20 minutos, te llevás también la Lectura de Manos sin costo extra. Recibís las dos por WhatsApp, a tu ritmo y por el precio de una.',

    cta: 'Quiero mi 2x1 por WhatsApp →',

    // Datos de regalo — usados por main.js para construir el mensaje de WhatsApp
    gift: {
      service: 'tarot',
    },
  },


  /* ════════════════════════════════════════════════════════════
     MANOS
     Para quienes buscan autoconocimiento, patrones profundos,
     esencia, ciclos internos, paz interior.
     ════════════════════════════════════════════════════════════ */
  manos: {
    eyebrow: 'Tu diagnóstico · Lectura recomendada',
    title: 'La Lectura de Manos es la indicada para vos',
    titleShort: 'Manos',

    paragraphs: {

      // Situación concreta + algo reciente
      ext_recent: [
        'Aunque lo que te trajo aquí es algo concreto que está pasando, tus respuestas revelan algo más. Hay patrones de fondo que vale la pena mirar. La lectura de manos trabaja exactamente ahí: en lo que está escrito en vos, más allá de las circunstancias.',
        'Lo externo es el disparador. Pero lo que necesita atención, esta vez, está adentro.',
      ],

      // Situación concreta + lo arrastrás desde hace tiempo
      ext_deep: [
        'Esta situación que persiste no es un accidente. Hay algo en tu manera de moverte por el mundo que la atrae o que la sostiene. La lectura de manos puede mostrarte esa raíz — y desde ahí, todo empieza a tener sentido.',
        'Cuando algo se repite, lo que se necesita no es solo resolverlo. Es entender qué parte de vos lo convoca.',
      ],

      // Algo interno / sin nombre + algo reciente
      int_recent: [
        'Algo acaba de moverse en vos, y lo sentís. Ese movimiento tiene nombre, y está escrito en tus manos. La lectura puede ayudarte a ponerle palabras a lo que todavía es solo una sensación.',
        'No todo lo que se siente puede explicarse con la mente. Algunas cosas simplemente se reconocen — y ese reconocimiento lo cambia todo.',
      ],

      // Patrón que se repite + lo arrastrás desde hace tiempo
      int_deep: [
        'Esto que cargás no empezó ahora. Es parte de quién sos — y eso no es un problema, es el punto de partida. La lectura de manos trabaja con tu esencia, no con las circunstancias.',
        'Conocerse no es un lujo. Es lo que permite que todo lo demás, eventualmente, encuentre su lugar.',
      ],
    },

    p3: {
      patron:    'Tu lectura va a explorar los patrones más profundos que moldean cómo actuás y qué atraés a tu vida, sin juicio y con claridad.',
      situacion: 'La lectura también va a dar luz sobre por qué esta situación persiste, y qué tiene que ver con quién sos en este ciclo.',
    },

    checklist: [
      'Tus patrones más profundos — lo que creás sin darte cuenta',
      'Los bloqueos que frenan tu crecimiento o tu paz interior',
      'La esencia de quién sos y lo que viniste a vivir en este ciclo',
    ],

    // Gancho del 2x1 — aparece integrado en el bloque de oferta
    offerHook: 'La Lectura de Manos es la que más te conviene hoy para ver con claridad el patrón que estás atravesando. Y si reservás en los próximos 20 minutos, te llevás también la Lectura de Tarot sin costo extra. Recibís las dos por WhatsApp, a tu ritmo y por el precio de una.',

    cta: 'Quiero mi 2x1 por WhatsApp →',

    // Datos de regalo — usados por main.js para construir el mensaje de WhatsApp
    gift: {
      service: 'manos',
    },
  },

};
