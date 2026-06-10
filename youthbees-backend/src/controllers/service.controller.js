import Service from "../models/service.model.js";

export const createService = async (
  req,
  res
) => {
  try {
    const service =
      await Service.create(req.body);

    res.status(201).json(service);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getServices = async (
  req,
  res
) => {
  try {
    const services =
      await Service.find({
        active: true,
      });

    res.json(services);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getServiceBySlug =
  async (req, res) => {
    try {
      const service =
        await Service.findOne({
          slug: req.params.slug,
        });

      if (!service) {
        return res.status(404).json({
          message: "Service not found",
        });
      }

      res.json(service);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
  export const updateService = async (
  req,
  res
) => {
  try {
    const service =
      await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(service);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteService = async (
  req,
  res
) => {
  try {
    await Service.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Service deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};