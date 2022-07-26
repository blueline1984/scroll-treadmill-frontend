const createTreadmillAnimations = (animations) => {
  animations.create({
    key: "treadmill",
    frames: [
      {
        key: "treadmill",
        frame: 0,
      },
    ],
  });

  animations.create({
    key: "treadmill-working",
    frames: animations.generateFrameNumbers("treadmill", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export default createTreadmillAnimations;
