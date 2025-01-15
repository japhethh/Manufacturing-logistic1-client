import tf from "@tensorflow/tfjs";
import {
  forecastData,
  forecastDataMonth,
} from "../aggregation/rawMaterialAggregation.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";
const tensorflowDf = express.Router();

const trainModelDemandForecasting = async (data) => {
  const xs = tf.tensor2d(
    data.map((d) => d.week),
    [data.length, 1]
  );

  const ys = tf.tensor2d(
    data.map((d) => d.totalQuantity),
    [data.length, 1]
  );

  const model = tf.sequential();

  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  model.compile({
    loss: "meanSquaredError",
    optimizer: "sgd",
  });

  model.fit(xs, ys, { epochs: 100 });

  return model;
};

const trainModelMonthDf = async (data) => {
  const xs = tf.tensor2d(
    data.map((d) => d._id.month),
    [1, 1]
  );
  const ys = tf.tensor2d(
    data.map((d) => d.totalQuantity),
    [1, 1]
  );
};

const predictDemand = async (model, week) => {
  const inputTensor = tf.tensor2d([week], [1, 1]);

  const prediction = model.predict(inputTensor);

  return prediction.dataSync()[0];
};

tensorflowDf.get(
  "/getRawMaterial",
  expressAsyncHandler(async (req, res) => {
    const weekToPredict = req.body.week;

    if (!weekToPredict) {
      return res
        .status(400)
        .json({ success: false, message: "Week parameter is required!" });
    }

    const data = await forecastData(req, res);
    const model = await trainModelDemandForecasting(data);

    const inputTensor = tf.tensor2d([weekToPredict], [1, 1]);

    const prediction = model.predict(inputTensor);

    const result = prediction.dataSync()[0];

    res.status(200).json(result);
  })
);

export default tensorflowDf;
