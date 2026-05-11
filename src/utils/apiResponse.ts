export const apiResponse = {
  success: (data: any, message = "Success") => ({
    success: true,
    message,
    data,
  }),

  error: (message = "Error", errors?: any) => ({
    success: false,
    message,
    errors,
  }),
};