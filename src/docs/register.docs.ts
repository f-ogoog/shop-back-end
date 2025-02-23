export const registerRequestSchema = {
  type: "object",
  required: ["firstName", "lastName", "email", "phone", "password"],
  properties: {
    firstName: {
      type: "string",
      example: "Іван",
    },
    lastName: {
      type: "string",
      example: "Петренко",
    },
    middleName: {
      type: "string",
      example: "Андрійович",
    },
    email: {
      type: "string",
      format: "email",
      example: "ivan@example.com",
    },
    phone: {
      type: "string",
      example: "+380745344593",
    },
    password: {
      type: "string",
      format: "password",
      example: "securePassword123",
    },
  },
};

export const registerResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "User registered successfully",
    },
  },
};

export const registerErrorSchema = {
  type: "object",
  properties: {
    error: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "User with such email already exist",
        },
      },
    },
  },
};
