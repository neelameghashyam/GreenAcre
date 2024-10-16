
export const paymentValidationSchema = ({
  user: {
    in: ['body'],
    exists: {
      errorMessage: 'User ID is required',
    },
    notEmpty: {
      errorMessage: 'User ID cannot be empty',
    },
    isMongoId: {
      errorMessage: 'User ID must be a valid MongoDB ObjectId',
    },
  },
  amount: {
    in: ['body'],
    exists: {
      errorMessage: 'Amount is required',
    },
    notEmpty: {
      errorMessage: 'Amount cannot be empty',
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Amount must be a number greater than or equal to 0',
    },
  },
  paymentType: {
    in: ['body'],
    exists: {
      errorMessage: 'Payment type is required',
    },
    notEmpty: {
      errorMessage: 'Payment type cannot be empty',
    },
    isString: {
      errorMessage: 'Payment type must be a string',
    },
  },
  transactionId: {
    in: ['body'],
    exists: {
      errorMessage: 'Transaction ID is required',
    },
    notEmpty: {
      errorMessage: 'Transaction ID cannot be empty',
    },
    isString: {
      errorMessage: 'Transaction ID must be a string',
    },
  },
  paymentStatus: {
    in: ['body'],
    exists: {
      errorMessage: 'Payment status is required',
    },
    notEmpty: {
      errorMessage: 'Payment status cannot be empty',
    },
    isString: {
      errorMessage: 'Payment status must be a string',
    },
    isIn: {
      options: [['pending', 'success', 'failed']],
      errorMessage: "Payment status must be either 'pending', 'success', or 'failed'",
    },
  },
});
