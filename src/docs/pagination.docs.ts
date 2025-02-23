export const pagination = {
  type: "object",
  properties: {
    totalPages: { type: "integer", example: 5 },
    currentPage: { type: "integer", example: 1 },
    totalCount: { type: "integer", example: 50 },
    limit: { type: "integer", example: 10 },
  },
};
