const { Schema, model } = require("mongoose");

const storageSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    file: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
    },
  },
  { timeseries: true, timestamps: true }
);

const Storage = model("Storage", storageSchema);
module.exports = Storage;
