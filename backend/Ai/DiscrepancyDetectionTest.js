import tf from "@tensorflow/tfjs";
import express from "express";

const discrepancyTestRouter = express.Router();

// Default training data
const defaultTrainingData = [
  { expected: 500, actual: 500 },
  { expected: 400, actual: 590 },
  { expected: 700, actual: 680 },
];

// Prepare data as tensors
const prepareData = (data) => {
  const xs = tf.tensor2d(
    data.map((d) => [d.expected]),
    [data.length, 1]
  );
  const ys = tf.tensor2d(
    data.map((d) => [d.actual]),
    [data.length, 1]
  );
  return { xs, ys };
};

// Build and train the model
const trainModel = async (xs, ys) => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ optimizer: "sgd", loss: "meanSquaredError" });
  await model.fit(xs, ys, { epochs: 100 });
  return model;
};

// API to detect discrepancies
discrepancyTestRouter.post("/", async (req, res) => {
  try {
    const { testData } = req.body;
    const datas = req.body;

    console.log(datas);

    if (!testData || !Array.isArray(testData) || testData.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing test data!" });
    }

    // Prepare training data
    const { xs, ys } = prepareData(defaultTrainingData);

    // Train the model
    const model = await trainModel(xs, ys);

    // console.log(xs)

    // Prepare input tensor for prediction
    const inputTensor = tf.tensor2d(
      testData.map((d) => [d.expected]),
      [testData.length, 1]
    );

    // Predict
    const predictions = model.predict(inputTensor);
    const result = await predictions.array();

    // Calculate discrepancies
    const discrepancies = testData.map((data, index) => ({
      expected: data.expected,
      predicted: result[index][0],
      discrepancy: Math.abs(data.expected - result[index][0]),
    }));

    res.json({ success: true, discrepancies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default discrepancyTestRouter;
