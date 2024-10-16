export const articleValidationSchema = {
  title: {
      exists: {
          errorMessage: "Title field is required",
      },
      notEmpty: {
          errorMessage: "Title cannot be empty",
      },
      isString: {
          errorMessage: "Title must be a string",
      },
      trim: true,
      isLength: {
          options: { min: 1, max: 255 },
          errorMessage: "Title must be between 1 and 255 characters",
      },
  },
  body: {
      exists: {
          errorMessage: "Body field is required",
      },
      notEmpty: {
          errorMessage: "Body cannot be empty",
      },
      isString: {
          errorMessage: "Body must be a string",
      },
      trim: true,
      isLength: {
          options: { min: 1, max: 10000 },
          errorMessage: "Body must be between 1 and 10000 characters",
      },
  },
  category: {
      exists: {
          errorMessage: "Category field is required",
      },
      notEmpty: {
          errorMessage: "Category cannot be empty",
      },
      isString: {
          errorMessage: "Category must be a string",
      },
      trim: true,
  },
};
