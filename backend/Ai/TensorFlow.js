import tf from "@tensorflow/tfjs";

const trainModel = async () => {
  const firstArr = [1, 2, 3, 4, 5, 6];
  const secondArr = [10, 20, 30, 40, 50, 60];
  const model = tf.sequential();

  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  model.compile({
    loss: "meanSquaredError",
    optimizer: "sgd",
    // optimizer: tf.train.sgd(0.01),
  });

  const xs = tf.tensor2d(firstArr, [firstArr.length, 1]);
  const ys = tf.tensor2d(secondArr, [secondArr.length, 1]);

  await model.fit(xs, ys, { epochs: 100 });

  return model;
};

export { trainModel };
