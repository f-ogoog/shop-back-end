export const unauthorizedErrorSchema = {
  type: "object",
  properties: {
    error: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Invalid token",
        },
      },
    },
  },
};
