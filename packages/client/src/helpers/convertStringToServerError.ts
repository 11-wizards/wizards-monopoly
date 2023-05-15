export const convertStringToServerError = (reason: string) => ({
  response: {
    data: {
      reason,
    },
  },
});
