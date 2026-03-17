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
    eyebrow: 'Diagnóstico · Lectura de Tarot',
    title: 'Tu lectura es el Tarot',
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

    cta: 'Reservar mi Lectura de Tarot',

    // Bloque regalo — el resultado es Tarot, el regalo es Manos
    gift: {
      eyebrow: 'Solo para vos · Por tiempo limitado',
      title: 'Y la Lectura de Manos, de regalo',
      body:  'Cuando el Tarot muestra el camino, la lectura de manos revela quién camina. Las dos lecturas juntas te dan una imagen completa: la situación de afuera y la esencia de adentro. Hoy, si reservás tu Tarot, la Lectura de Manos no tiene costo adicional.',
      service: 'tarot',
      cta: 'Quiero las dos — reservar ahora',
      disclaimer: 'Al reservar, recibís ambas lecturas · Sin videollamada · A tu ritmo',
    },
  },


  /* ════════════════════════════════════════════════════════════
     MANOS
     Para quienes buscan autoconocimiento, patrones profundos,
     esencia, ciclos internos, paz interior.
     ════════════════════════════════════════════════════════════ */
  manos: {
    eyebrow: 'Diagnóstico · Lectura de Manos',
    title: 'Tu lectura es la Lectura de Manos',
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

    cta: 'Reservar mi Lectura de Manos',

    // Bloque regalo — el resultado es Manos, el regalo es Tarot
    gift: {
      eyebrow: 'Solo para vos · Por tiempo limitado',
      title: 'Y la Lectura de Tarot, de regalo',
      body:  'Cuando la lectura de manos revela tu esencia, el Tarot puede mostrarte el momento exacto que estás atravesando. Las dos lecturas juntas se potencian: una muestra quién sos, la otra muestra el ahora. Hoy, si reservás tu Lectura de Manos, la Lectura de Tarot no tiene costo adicional.',
      service: 'manos',
      cta: 'Quiero las dos — reservar ahora',
      disclaimer: 'Al reservar, recibís ambas lecturas · Sin videollamada · A tu ritmo',
    },
  },

};
