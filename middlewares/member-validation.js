const joi = require("joi");

const validateMember = (req, res, next) => {
  console.log("middleware is executed");
  const rules = joi
    .object()
    .keys({
      name: joi.string(),
      address: joi.string(),
      contact: joi.number(),
      gender: joi.string().valid("male", "female").insensitive(),
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
