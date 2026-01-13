import { body, validationResult } from "express-validator";


// Register Validator
export const registerValidator = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can contain only letters, numbers, and underscores"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character")
];

// Login Validator
export const loginValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),

  body("password")
    .notEmpty().withMessage("Password is required")
];



/**
 * Wrap validators in a higher-order function
 * Usage: validate([validatorArray])
 */
export const validate = (validators) => {
  return async (req, res, next) => {
    // Run all validators
    await Promise.all(validators.map(v => v.run(req)));

    // Gather errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    next();
  };
};

const validationResults = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};