const createAlienAnimations = (animations) => {
  animations.create({
    key: "alien-idle",
    frames: [
      {
        key: "alien",
        frame: 0,
      },
    ],
  });

  animations.create({
    key: "alien-walk",
    frames: animations.generateFrameNumbers("alien", {
      start: 0,
      end: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export default createAlienAnimations;
