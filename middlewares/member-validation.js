const joi = require("joi");

const validateMember = (req, res, next) => {
  const rules = joi
    .object()
    .keys({
      name: joi.string().required(),
      address: joi.string().required(),
      contact: joi.number().required(),
      gender: joi.string().valid("male", "female"),
    })
    .options({ abortEarly: false });

  let { error } = rules.validate(req.body);

  if (error != null) {
    let errMessage = error.details.map((it) => it.message).join(", ");

    return res.status(422).json({
      success: false,
      message: errMessage,
    });
  }
  next();
};

module.exports = validateMember;
