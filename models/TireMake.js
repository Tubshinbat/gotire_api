const mongoose = require("mongoose");

const TireMakeSchema = new mongoose.Schema(
  {
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },

    name: {
      type: String,
      trim: true,
      required: [true, "Дугуй үйлдвэрлэгчийн нэрийг оруулна уу"],
    },

    shortName: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },

    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
    createUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    updateUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

TireMakeSchema.virtual("tireCount", {
  ref: "Tire",
  localField: "_id",
  foreignField: "make",
  justOne: false,
  count: true,
});

module.exports = mongoose.model("TireMake", TireMakeSchema);
