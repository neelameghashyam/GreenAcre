export const postValidationSchema = {
    type: {
      exists: {
        errorMessage: "Type field is required"
      },
      notEmpty: {
        errorMessage: "Type cannot be empty"
      }
    },
    propertyType: {
      exists: {
        errorMessage: "Property Type field is required"
      },
      notEmpty: {
        errorMessage: "Property Type cannot be empty"
      }
    },
    mapLocation: {
      exists: {
        errorMessage: "Map Location field is required"
      },
      notEmpty: {
        errorMessage: "Map Location cannot be empty"
      }
    },
    description: {
      exists: {
        errorMessage: "Description field is required"
      },
      notEmpty: {
        errorMessage: "Description cannot be empty"
      },
      isLength: {
        options: { min: 10, max: 2000 },
        errorMessage: "Description must be between 10 and 500 characters"
      }
    },
    state: {
      exists: {
        errorMessage: "State field is required"
      },
      notEmpty: {
        errorMessage: "State cannot be empty"
      }
      
    },
    city: {
      exists: {
        errorMessage: "City field is required"
      },
      notEmpty: {
        errorMessage: "City cannot be empty"
      }
    },
    locality: {
      exists: {
        errorMessage: "Locality field is required"
      },
      notEmpty: {
        errorMessage: "Locality cannot be empty"
      },
      isLength: {
        options: { min: 2, max: 100 },
        errorMessage: "Locality must be between 2 and 100 characters"
      }
    },
    address: {
      exists: {
        errorMessage: "Address field is required"
      },
      notEmpty: {
        errorMessage: "Address cannot be empty"
      },
      isLength: {
        options: { min: 10, max: 300 },
        errorMessage: "Address must be between 10 and 200 characters"
      }
    },
    area: {
      exists: {
        errorMessage: "Area field is required"
      },
      notEmpty: {
        errorMessage: "Area cannot be empty"
      },
      isFloat: {
        options: { min: 0 },
        errorMessage: "Area must be a positive number"
      }
    },
    unitMeasurement: {
      exists: {
        errorMessage: "Unit Measurement field is required"
      },
      notEmpty: {
        errorMessage: "Unit Measurement cannot be empty"
      }
    },
    ownerShip: {
      exists: {
        errorMessage: "OwnerShip field is required"
      },
      notEmpty: {
        errorMessage: "OwnerShip cannot be empty"
      }
    },
    price: {
      exists: {
        errorMessage: "Price field is required"
      },
      notEmpty: {
        errorMessage: "Price cannot be empty"
      },
      isFloat: {
        options: { min: 0 },
        errorMessage: "Price must be a positive number"
      }
    }
  };
  