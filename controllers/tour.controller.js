const {
  createTourService,
  getTourService,
  getATourDetailsService,
  updateATourDetailsService,
  getTrendingToursService,
  getCheapestToursService
} = require("../services/tour.service");

exports.getTours = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((field) => delete filters[field]);

    // gt, lt, gte, lte, ne
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lte|lt)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);
    console.log(filters);

    const queries = {};
    // get data by fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    // get data by sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    // pagination
    if (req.query.page) {
      const { page = 1, limit = 3 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const allTours = await getTourService(filters, queries);

    res.status(200).json({
      status: "success",
      message: "Got the desired tours details successfully",
      data: allTours,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data can't be found",
      error: error.message,
    });
  }
};

exports.createTours = async (req, res, next) => {
  try {
    const newTour = await createTourService(req.body);
    res.status(200).json({
      status: "success",
      message: "Tour data created successfully",
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is failed to be created",
      error: error.message,
    });
  }
};

exports.getATourDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTour = await getATourDetailsService(id);
    res.status(200).json({
      status: "success",
      message: "Get a tour details successfully",
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not found",
      error: error.message,
    });
  }
};

exports.updateATourDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTourDetails = await updateATourDetailsService(id, req.body);
    if (!updatedTourDetails.modifiedCount) {
      return res.status(400).json({
        status: "failed",
        error: "Data is already up-to-date",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Updated a tour details successfully",
      data: updatedTourDetails,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not updated at all",
      error: error.message,
    });
  }
};

exports.getTrendingTours = async (req, res, next) => {
  try {
    const trendingTours = await getTrendingToursService();
    res.status(200).json({
      status: "success",
      message: "Got all the trending tours successfully",
      data: trendingTours,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not found",
      error: error.message,
    });
  }
};

exports.getTrendingTours = async (req, res, next) => {
  try {
    const trendingTours = await getTrendingToursService();
    res.status(200).json({
      status: "success",
      message: "Got all the trending tours successfully",
      data: trendingTours,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not found",
      error: error.message,
    });
  }
};

exports.getCheapestTours = async (req, res, next) => {
  try {
    const cheapestTours = await getCheapestToursService();
    res.status(200).json({
      status: "success",
      message: "Got all the cheapest tours successfully",
      data: cheapestTours,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not found",
      error: error.message,
    });
  }
};
