const handleError = (error) => {
  const errorMessage = error.message ? error.message.toString() : error.toString();
  console.error(errorMessage);
};

export default handleError;
