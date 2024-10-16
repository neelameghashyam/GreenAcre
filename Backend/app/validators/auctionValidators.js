export const auctionValidationSchema = {
  title: {
    exists: {
      errorMessage: "Title field is required"
    },
    notEmpty: {
      errorMessage: "Title cannot be empty"
    },
    isString: {
      errorMessage: "Title must be a string"
    },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Title must be between 1 and 255 characters"
    }
  },
  description: {
    exists: {
      errorMessage: "Description field is required"
    },
    notEmpty: {
      errorMessage: "Description cannot be empty"
    },
    isString: {
      errorMessage: "Description must be a string"
    },
    isLength: {
      options: { min: 1, max: 5000 },
      errorMessage: "Description must be between 1 and 5000 characters"
    }
  },
  category: {
    exists: {
      errorMessage: "Category field is required"
    },
    notEmpty: {
      errorMessage: "Category cannot be empty"
    },
    isString: {
      errorMessage: "Category must be a string"
    }
  },
  startDate: {
    exists: {
      errorMessage: "Start Date field is required"
    },
    notEmpty: {
      errorMessage: "Start Date cannot be empty"
    },
    // isISO8601: {
    //   errorMessage: "Start Date must be a valid date"
    // }
  },
  endDate: {
    exists: {
      errorMessage: "End Date field is required"
    },
    notEmpty: {
      errorMessage: "End Date cannot be empty"
    },
    isISO8601: {
      errorMessage: "End Date must be a valid date"
    },
    custom: {
      options: (value, { req }) => {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(value);
        if (endDate <= startDate) {
          throw new Error("End Date must be greater than Start Date");
        }
        return true;
      }
    }
  },
  startBid: {
    exists: {
      errorMessage: "Start Bid field is required"
    },
    notEmpty: {
      errorMessage: "Start Bid cannot be empty"
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: "Start Bid must be a number and greater than or equal to 0"
    }
  },
  // finalBid: {
  //   optional: true,
  //   isFloat: {
  //     options: { min: 0 },
  //     errorMessage: "Final Bid must be a number and greater than or equal to 0"
  //   }
  // }
}

