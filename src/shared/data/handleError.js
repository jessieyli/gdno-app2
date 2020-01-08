import * as Sentry from '@sentry/react-native';

const handleError = error => Sentry.captureException(error);

export default handleError;
