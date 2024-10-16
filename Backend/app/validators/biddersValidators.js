export const bidderValidationSchema={
    bid:{exists: {
        errorMessage: "Bid field is required"
      },
      notEmpty: {
        errorMessage: "Bid cannot be empty"
      },
      isFloat: {
        options: { min: 0 },
        errorMessage: "Bid must be a number and greater than or equal to 0"
      }
    }
}