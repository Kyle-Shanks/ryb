// - Stage Data -
// canvas dimensions: 1400 x 1000

const stages = [
  {
    title: 'Stage 0 - Hello World',
    height: 1000,
    width: 3000,
    startingPosition: { x: 350, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 0,
    notes: [
      {
        pos: { x: 250, y: 600 },
        msg: 'WASD to move'
      },
      {
        pos: { x: 825, y: 550 },
        msg: 'space to jump'
      },
      {
        pos: { x: 2650, y: 360 },
        msg: 'Portals will take you'
      },
      {
        pos: { x: 2650, y: 400 },
        msg: 'to the next stage'
      },
    ],
    objects: [
      {
        pos: { x: 800, y: 600 },
        height: 100,
        width: 300,
        color: 2,
        type: 'solid'
      },
      {
        pos: { x: 1600, y: 600 },
        height: 100,
        width: 300,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 1900, y: 500 },
        height: 200,
        width: 300,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 2200, y: 600 },
        height: 100,
        width: 300,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 200, y: 700 },
        height: 50,
        width: 2800,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 2750, y: 500 },
        height: 70,
        width: 70,
        color: 4,
        type: 'port',
        stageNum: 1,
      },
    ],
  },
  {
    title: 'Stage 1 - Double Jumping',
    height: 1400,
    width: 1400,
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
        height: 50,
        width: 600,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 800, y: 950 },
        height: 300,
        width: 600,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 0, y: 700 },
        height: 100,
        width: 500,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 800, y: 450 },
        height: 100,
        width: 600,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 400, y: 150 },
        height: 70,
        width: 70,
        color: 4,
        type: 'port',
        stageNum: 2,
      },
    ],
  },
  {
    title: 'Stage 2 - The Leap',
    height: 1000,
    width: 1400,
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
        height: 100,
        width: 900,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 0, y: 700 },
        height: 300,
        width: 400,
        color: 3,
        type: 'solid'
      },
      {
        pos: { x: 165, y: 550 },
        height: 70,
        width: 70,
        color: 4,
        type: 'port',
        stageNum: 3,
      },
    ],
  },
  {
    title: 'Stage 3 - Wall Jumping',
    height: 2000,
    width: 1400,
    startingPosition: { x: 550, y: 1500 },
    cameraPosition: { x: 0, y: 1000 },
    startingColor: 2,
    notes: [
      {
        pos: { x: 400, y: 1400 },
        msg: 'You can climb up a'
      },
      {
        pos: { x: 400, y: 1440 },
        msg: 'wall by holding'
      },
      {
        pos: { x: 400, y: 1480 },
        msg: 'towards the wall and'
      },
      {
        pos: { x: 400, y: 1520 },
        msg: 'repeatedly jumping'
      },
    ],
    objects: [
      {
        pos: { x: 500, y: 1700 },
        height: 100,
        width: 400,
        color: 0,
        type: 'solid'
      },
      {
        pos: { x: 900, y: 600 },
        height: 1200,
        width: 100,
        color: 1,
        type: 'solid'
      },
      {
        pos: { x: 550, y: 500 },
        height: 70,
        width: 70,
        color: 4,
        type: 'port',
        stageNum: 0,
      },
    ],
  },
];
