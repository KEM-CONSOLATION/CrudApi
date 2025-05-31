//this is a call back function that will be called when an error occurs in the application
//     }
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
  res.status(statusCode); // Set the response status code
  res.json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENv === "production" ? null : err.stack,
  });
};
//   res.status(200).json({ message: "Product deleted successfully" });
// };
// Add this middleware to handle errors
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
};
module.exports = {
  errorHandler,
  notFoundHandler,
};
