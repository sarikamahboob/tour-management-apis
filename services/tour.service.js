const Tour = require("../models/tour");

exports.getTourService = async (filters, queries) => {
  const result = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Tour.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { page,total, result };
};

exports.createTourService = async (data) => {
  const result = await Tour.create({ ...data, viewCount: 0 });
  return result;
};

exports.getATourDetailsService = async (id) => {
  const tour = await Tour.updateOne({ _id: id }, { $inc: { viewCount: 1 } });
  const result = await Tour.findById({ _id: id });
  return result;
};

exports.updateATourDetailsService = async (id, data) => {
  const result = await Tour.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.getTrendingToursService = async () => {
  const result = await Tour.find().sort({ viewCount: -1 }).limit(3);
  return result;
};

exports.getCheapestToursService = async () => {
  const result = await Tour.find().sort({ price: 1 }).limit(3);
  return result;
};
