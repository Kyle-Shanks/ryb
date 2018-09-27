// - Stage Data -
const stages = [
  {
    title: 'Intro Stage',
    height: 1000,
    width: 3000,
    startingPosition: { x: 350, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 0,
    objects: [
      {
        pos: { x: 800, y: 600 },
        height: 100,
        width: 300,
        color: 3,
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
        color: 3,
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
    title: 'Stage 2',
    height: 1000,
    width: 1400,
    startingPosition: { x: 360, y: 500 },
    cameraPosition: { x: 0, y: 0 },
    startingColor: 0,
    objects: [
      {
        pos: { x: 300, y: 700 },
        height: 50,
        width: 400,
        color: 2,
        type: 'solid'
      },
    ],
  },
];
