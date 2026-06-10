import Partner from "../models/partner.model.js";

export const createPartner = async (
  req,
  res
) => {
  try {
    const partner =
      await Partner.create(req.body);

    res.status(201).json(partner);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getPartners = async (
  req,
  res
) => {
  try {
    const partners =
      await Partner.find({
        active: true,
      });

    res.json(partners);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deletePartner =
  async (req, res) => {
    try {
      await Partner.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Partner deleted",
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };