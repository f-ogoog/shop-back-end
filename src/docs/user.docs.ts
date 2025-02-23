export const userResponseSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "65f4b6c5e2a9f8331c9a8a91",
    },
    role: {
      type: "string",
      enum: ["admin", "user"],
      example: "user",
    },
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
    address: {
      type: "string",
      example: "м. Київ, вул. Шевченка, 12",
    },
    isRegular: {
      type: "boolean",
      example: true,
    },
  },
};
