export const ErrorCode = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  EMAIL_IS_REQUIRED: 'EMAIL_IS_REQUIRED',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',

  MAX_USERNAME_LENGTH: 'MAX_USERNAME_LENGTH',
  MIN_USERNAME_LENGTH: 'MIN_USERNAME_LENGTH',
  USERNAME_IS_REQUIRED: 'USERNAME_IS_REQUIRED',
  USERNAME_ALREADY_EXISTS: 'USERNAME_ALREADY_EXISTS',

  MAX_PASSWORD_LENGTH: 'MAX_PASSWORD_LENGTH',
  MIN_PASSWORD_LENGTH: 'MIN_PASSWORD_LENGTH',
  PASSWORD_IS_REQUIRED: 'PASSWORD_IS_REQUIRED',

  SERVER_ERROR: 'SERVER_ERROR',
  SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',

  NO_CREDENTIALS_PROVIDED: 'NO_CREDENTIALS_PROVIDED',
  WRONG_CREDENTIALS: 'WRONG_CREDENTIALS',
  WRONG_PROVIDER: 'WRONG_PROVIDER',

  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
} as const;

export const ErrorMessage = {
  // email
  [ErrorCode.INVALID_EMAIL]: 'Invalid Email Address',
  [ErrorCode.EMAIL_IS_REQUIRED]: 'Email Address is required',
  [ErrorCode.EMAIL_ALREADY_EXISTS]: 'User with the same email already exists',

  // username
  [ErrorCode.MIN_USERNAME_LENGTH]: "Username can't be shorter than 3 characters",
  [ErrorCode.MAX_USERNAME_LENGTH]: "Username can't be longer than 50 characters",
  [ErrorCode.USERNAME_IS_REQUIRED]: 'Username is required',
  [ErrorCode.USERNAME_ALREADY_EXISTS]: 'User with the same username already exists',

  // password
  [ErrorCode.MIN_PASSWORD_LENGTH]: "Password can't be shorter than 8 characters",
  [ErrorCode.MAX_PASSWORD_LENGTH]: "Password can't be longer than 255 characters",
  [ErrorCode.PASSWORD_IS_REQUIRED]: 'Password is required',

  [ErrorCode.SERVER_ERROR]: 'Server error',
  [ErrorCode.SOMETHING_WENT_WRONG]: 'Something went wrong...',

  [ErrorCode.NO_CREDENTIALS_PROVIDED]: 'No credentials were provided',
  [ErrorCode.WRONG_CREDENTIALS]: 'Wrong email or/and password',
  [ErrorCode.WRONG_PROVIDER]: 'Account has been created with other provider',

  [ErrorCode.NOT_AUTHENTICATED]: 'You have to be authenticated to perform this action',
} as const;
