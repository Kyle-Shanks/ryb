// - Stage Data -
// canvas dimensions: 1400 x 1000

const stages = [
  {
    title: 'Stage 0 - Hello World',
    height: 1000, width: 3000,
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
        stageNum: 1,
      },
    ],
  },
  {
    title: 'Stage 1 - Double Jumping',
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
        stageNum: 2,
      },
    ],
  },
  {
    title: 'Stage 2 - The Leap',
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
        stageNum: 3,
      },
    ],
  },
  {
    title: 'Stage 3 - Wall Jumping',
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
        stageNum: 4,
      },
    ],
  },
  {
    title: 'Stage 4 - RYB',
    height: 1000, width: 2000,
    startingPosition: { x: 350, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 0,
    notes: [
      {
        pos: { x: 625, y: 670 },
        msg: '←',
        size: 54
      },
      {
        pos: { x: 787, y: 672 },
        msg: '↕',
        size: 54
      },
      {
        pos: { x: 925, y: 670 },
        msg: '→',
        size: 54
      },
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
        stageNum: 5,
      },
    ],
  },
  {
    title: 'Stage 5 - The Great Escape',
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
        stageNum: 6,
      },
    ],
  },
  {
    title: 'Stage 6 - Big Blocks',
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
        pos: { x: 1600, y: 400 },
        height: 300, width: 300,
        color: 3,
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
        pos: { x: 2200, y: 0 },
        height: 600, width: 300,
        color: 0,
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
        stageNum: 7,
      },
    ],
  },
  {
    title: 'Stage 7 - Multitasking',
    height: 2000, width: 1400,
    startingPosition: { x: 685, y: 1500 },
    cameraPosition: { x: 0, y: 1000 },
    startingColor: 0,
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
        stageNum: 8,
      },
    ],
  },
  {
    title: 'Stage 8 - IDK',
    height: 1000, width: 1400,
    startingPosition: { x: 685, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 2,
    notes: [],
    objects: [
      {
        pos: { x: 500, y: 700 },
        height: 50, width: 400,
        color: 3,
        type: 'solid'
      },
    ],
  },
];
