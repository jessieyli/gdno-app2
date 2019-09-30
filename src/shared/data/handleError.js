const handleError = (error) => {
  // TODO: Add Sentry
  const errorMessage = error.message ? error.message.toString() : error.toString();
  // console.error(errorMessage);
};

export default handleError;
