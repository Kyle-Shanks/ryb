// - Stage Data -
// canvas dimensions: 1400 x 1000

const stages = [
  {
    title: 'Hello World',
    height: 2000, width: 3000,
    startingPosition: { x: 350, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 0,
    notes: [
      {
        pos: { x: 250, y: 600 },
        msg: 'WASD to move'
      },
      {
        pos: { x: 845, y: 550 },
        msg: 'space to jump'
      },
      {
        pos: { x: 2650, y: 380 },
        msg: 'Portals will take you'
      },
      {
        pos: { x: 2650, y: 420 },
        msg: 'to the next stage'
      },
      {
        pos: { x: 350, y: 1420 },
        msg: 'Press Q 10 times'
      },
    ],
    objects: [
      {
        pos: { x: 800, y: 600 },
        height: 100, width: 300,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1600, y: 600 },
        height: 100, width: 300,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1900, y: 500 },
        height: 200, width: 300,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 2200, y: 600 },
        height: 100, width: 300,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 200, y: 700 },
        height: 50, width: 2800,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 2750, y: 500 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'Double Jumping',
    height: 1400, width: 1400,
    startingPosition: { x: 550, y: 1000 },
    cameraPosition: { x: 0, y: 600 },
    startingColor: 2,
    notes: [
      {
        pos: { x: 300, y: 1000 },
        msg: 'Jump in the air for a'
      },
      {
        pos: { x: 300, y: 1040 },
        msg: 'super cool double jump'
      },
    ],
    objects: [
      {
        pos: { x: 200, y: 1200 },
        height: 50, width: 600,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 800, y: 950 },
        height: 300, width: 600,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 0, y: 700 },
        height: 100, width: 500,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 800, y: 450 },
        height: 100, width: 600,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 400, y: 150 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'The Leap',
    height: 1000, width: 1400,
    startingPosition: { x: 350, y: 50 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 1,
    notes: [
      {
        pos: { x: 600, y: 400 },
        msg: 'Look out below!'
      },
    ],
    objects: [
      {
        pos: { x: 0, y: 250 },
        height: 100, width: 900,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 0, y: 700 },
        height: 300, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 165, y: 550 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'Wall Jumping',
    height: 2000, width: 1400,
    startingPosition: { x: 550, y: 1500 },
    cameraPosition: { x: 0, y: 1000 },
    startingColor: 2,
    notes: [
      {
        pos: { x: 500, y: 1400 },
        msg: 'You can climb up a'
      },
      {
        pos: { x: 500, y: 1440 },
        msg: 'wall by holding'
      },
      {
        pos: { x: 500, y: 1480 },
        msg: 'towards the wall and'
      },
      {
        pos: { x: 500, y: 1520 },
        msg: 'repeatedly jumping'
      },
    ],
    objects: [
      {
        pos: { x: 500, y: 1700 },
        height: 100, width: 400,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 600 },
        height: 1200, width: 100,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 550, y: 500 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'RYB',
    height: 1000, width: 2000,
    startingPosition: { x: 350, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 0,
    notes: [
      {
        pos: { x: 632, y: 564 },
        msg: '←',
        size: 40,
      },
      {
        pos: { x: 617, y: 575 },
        msg: '⬚',
        size: 70,
      },
      {
        pos: { x: 787, y: 492 },
        msg: '↑',
        size: 40,
      },
      {
        pos: { x: 766, y: 503 },
        msg: '⬚',
        size: 70,
      },
      {
        pos: { x: 787, y: 562 },
        msg: '↓',
        size: 40,
      },
      {
        pos: { x: 766, y: 575 },
        msg: '⬚',
        size: 70,
      },
      {
        pos: { x: 932, y: 564 },
        msg: '→',
        size: 40,
      },
      {
        pos: { x: 917, y: 575 },
        msg: '⬚',
        size: 70,
      },
      {
        pos: {x: 655, y: 400},
        msg: 'Press to change color',
      }
    ],
    objects: [
      {
        pos: { x: 600, y: 600 },
        height: 100, width: 100,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 750, y: 600 },
        height: 100, width: 100,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 600 },
        height: 100, width: 100,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1350, y: 400 },
        height: 50, width: 350,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1350, y: 450 },
        height: 250, width: 50,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1650, y: 450 },
        height: 250, width: 50,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 200, y: 700 },
        height: 50, width: 1600,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1500, y: 550 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'The Great Escape',
    height: 3000, width: 1400,
    startingPosition: { x: 685, y: 300 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 1,
    notes: [
      {
        pos: { x: 640, y: 350 },
        msg: 'Have fun',
      },
    ],
    objects: [
      {
        pos: { x: 500, y: 450 },
        height: 50, width: 400,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 650 },
        height: 50, width: 400,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 850 },
        height: 50, width: 400,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 1050 },
        height: 50, width: 400,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 1250 },
        height: 50, width: 400,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 1450 },
        height: 50, width: 400,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 1650 },
        height: 50, width: 400,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 1850 },
        height: 50, width: 400,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 2050 },
        height: 50, width: 400,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 2250 },
        height: 50, width: 400,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 2450 },
        height: 50, width: 400,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 2750 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 200 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 450, y: 200 },
        height: 2600, width: 50,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 200 },
        height: 2600, width: 50,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 665, y: 2600 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'Big Blocks',
    height: 1000, width: 3000,
    startingPosition: { x: 350, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 1,
    notes: [],
    objects: [
      {
        pos: { x: 800, y: 000 },
        height: 700, width: 300,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1600, y: 0 },
        height: 300, width: 300,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1600, y: 300 },
        height: 100, width: 300,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 1600, y: 400 },
        height: 300, width: 300,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1900, y: 500 },
        height: 200, width: 300,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 2200, y: 0 },
        height: 600, width: 300,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 2200, y: 600 },
        height: 100, width: 300,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 200, y: 700 },
        height: 50, width: 1000,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1200, y: 700 },
        height: 50, width: 1800,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 2750, y: 500 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'Columns',
    height: 1000, width: 3000,
    startingPosition: { x: 350, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 2,
    notes: [],
    objects: [
      {
        pos: { x: 200, y: 700 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 850, y: -100 },
        height: 600, width: 150,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 850, y: 500 },
        height: 200, width: 150,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 850, y: 700 },
        height: 300, width: 150,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1400, y: -100 },
        height: 200, width: 150,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1400, y: 100 },
        height: 200, width: 150,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1400, y: 300 },
        height: 700, width: 150,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1950, y: -100 },
        height: 800, width: 150,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1950, y: 700 },
        height: 200, width: 150,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 1950, y: 900 },
        height: 100, width: 150,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 2400, y: 300 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 2565, y: 165 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ]
  },
  {
    title: 'Ascension',
    height: 3000, width: 1400,
    startingPosition: { x: 450, y: 2500 },
    cameraPosition: { x: 0, y: 2000 },
    startingColor: 0,
    notes: [],
    objects: [
      {
        pos: { x: 300, y: 2700 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 2450 },
        height: 50, width: 300,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 200, y: 2250 },
        height: 50, width: 300,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 1950 },
        height: 50, width: 300,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 1750 },
        height: 50, width: 300,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 200, y: 1550 },
        height: 50, width: 200,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 800, y: 1350 },
        height: 50, width: 200,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 1050 },
        height: 50, width: 200,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 850 },
        height: 50, width: 100,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 500, y: 650 },
        height: 50, width: 100,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 350 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1065, y: 200 },
        height: 70, width: 70,
        color: 4,
        type: 'port'
      },
    ]
  },
  {
    title: 'Multitasking',
    height: 2000, width: 1400,
    startingPosition: { x: 685, y: 1500 },
    cameraPosition: { x: 0, y: 1000 },
    startingColor: 1,
    notes: [
      {
        pos: { x: 300, y: 1650 },
        msg: 'Two hands working together',
      },
    ],
    objects: [
      {
        pos: { x: 300, y: 1700 },
        height: 50, width: 800,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 1200 },
        height: 400, width: 50,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 450, y: 650 },
        height: 680, width: 50,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 200 },
        height: 600, width: 50,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 550, y: 0 },
        height: 250, width: 50,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 300, y: 250 },
        height: 50, width: 300,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 370, y: 130 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'Danger',
    height: 1000, width: 1400,
    startingPosition: { x: 285, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 2,
    notes: [
      {
        pos: { x: 630, y: 580 },
        msg: 'Beware of spikes',
      },
    ],
    objects: [
      {
        pos: { x: 200, y: 700 },
        height: 50, width: 700,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 600, y: 650 },
        height: 50, width: 300,
        color: 0,
        type: 'spikes',
        dir: 0,
      },
      {
        pos: { x: 1120, y: 520 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'Floor Is Lava',
    height: 1000, width: 3200,
    startingPosition: { x: 385, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 0,
    notes: [],
    objects: [
      {
        pos: { x: 700, y: 650 },
        height: 50, width: 500,
        color: 2,
        type: 'spikes',
        dir: 0,
      },
      {
        pos: { x: 1200, y: 650 },
        height: 50, width: 500,
        color: 1,
        type: 'spikes',
        dir: 0,
      },
      {
        pos: { x: 1700, y: 650 },
        height: 50, width: 500,
        color: 2,
        type: 'spikes',
        dir: 0,
      },
      {
        pos: { x: 2200, y: 650 },
        height: 50, width: 500,
        color: 0,
        type: 'spikes',
        dir: 0,
      },
      {
        pos: { x: 2700, y: 650 },
        height: 50, width: 500,
        color: 1,
        type: 'spikes',
        dir: 0,
      },
      {
        pos: { x: 200, y: 700 },
        height: 50, width: 3000,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 2950, y: 500 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'Jaws',
    height: 1000, width: 3000,
    startingPosition: { x: 285, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 1,
    notes: [],
    objects: [
      {
        pos: { x: 100, y: 700 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 600, y: 200 },
        height: 50, width: 1600,
        color: 3,
        type: 'spikes',
        dir: 2,
      },
      {
        pos: { x: 600, y: 700 },
        height: 50, width: 1600,
        color: 3,
        type: 'spikes',
        dir: 0,
      },
      {
        pos: { x: 600, y: 0 },
        height: 200, width: 1600,
        color: 3,
        type: 'solid',
        dir: 2,
      },
      {
        pos: { x: 600, y: 750 },
        height: 250, width: 1600,
        color: 3,
        type: 'solid',
        dir: 2,
      },
      {
        pos: { x: 700, y: 300 },
        height: 350, width: 50,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 300 },
        height: 350, width: 50,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1100, y: 300 },
        height: 350, width: 50,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 1300, y: 300 },
        height: 350, width: 50,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1500, y: 300 },
        height: 350, width: 50,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 1700, y: 300 },
        height: 350, width: 50,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 1900, y: 300 },
        height: 350, width: 50,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 2100, y: 300 },
        height: 350, width: 50,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 2300, y: 300 },
        height: 350, width: 50,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 2550, y: 600 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 2715, y: 465 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
      },
    ],
  },
  {
    title: 'Fin',
    height: 1000, width: 1400,
    startingPosition: { x: 685, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 2,
    notes: [
      {
        pos: { x: 590, y: 550 },
        msg: 'That\'s all for now.',
      },
      {
        pos: { x: 545, y: 590 },
        msg: 'Thank you for playing!',
      },
      {
        pos: { x: 1000, y: 450 },
        msg: 'Portal back to stage 0',
      },
    ],
    objects: [
      {
        pos: { x: 500, y: 700 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1120, y: 520 },
        height: 70, width: 70,
        color: 4,
        type: 'port',
        stageNum: 0,
      },
    ],
  },
];
