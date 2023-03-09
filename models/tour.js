const mongoose = require("mongoose");
// schema design
const tourSchema = mongoose.Schema(
  {
    place: {
      type: String,
      required: [true, "Please provide a desired place name"],
      trim: true,
      unique: [true, "Place name must be unique"],
      minLength: [3, "Place name must be at least 3 characters"],
      maxLength: [30, "Place name is too long"],
    },
    description: {
      type: String,
      required: [
        true,
        "Please provide the desired destination place description",
      ],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    image: {
      type: String,
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Hotel name must be unique"],
      minLength: [3, "Hotel name must be at least 3 characters"],
      maxLength: [30, "Hotel name is too long"],
    },
    groupSize: {
      type: Number,
      required: true,
      min: [0, "Group size can not be negative"],
      max: [30, "Group members can not be more than 30"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    viewCount: {
      type: Number,
      min: [0, "viewCount can not be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
