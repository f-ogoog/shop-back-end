export const loginRequestSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
      example: "ivan@example.com",
    },
    password: {
      type: "string",
      format: "password",
      example: "securePassword123",
    },
  },
};

export const loginResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "User login successfully",
    },
  },
};

export const loginErrorSchema = {
  type: "object",
  properties: {
    error: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Invalid Credentials",
        },
      },
    },
  },
};
