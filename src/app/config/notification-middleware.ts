import { isPromise, translate } from 'react-jhipster';
import Toast from "react-native-toast-message";

const addErrorAlert = (text1: string, key?: string, data?: string) => {
  key = key ? key : text1;
  Toast.show({
    type: "error",
    position: "top",
    text1,
    visibilityTime: 3000,
    autoHide: true,
  });
};
export default () => (next: any) => (action: any) => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The notification middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `then` and `catch.
   */
  return next(action)
    .then((response: any) => {
      if (action.meta && action.meta.successMessage) {
        Toast.show({
          type: "success",
          position: "top",
          text1: action.meta.successMessage,
          visibilityTime: 3000,
          autoHide: true,
        });
      } else if (response && response.action && response.action.payload && response.action.payload.headers) {
        const headers = response.action.payload.headers;
        let alert: any = '';
        let alertParams: any = '';
        Object.entries(headers).forEach(([k, v]) => {
          if (k.toLowerCase().endsWith('app-alert')) {
            alert = v;
          } else if (k.toLowerCase().endsWith('app-params')) {
            alertParams = v;
          }
        });
        if (alert) {
          const alertParam = alertParams;
          // toast.success(translate(alert, { param: alertParam }));
          Toast.show({
            type: "success",
            position: "top",
            text2: alert,
            text1: alertParam,
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      }
      return Promise.resolve(response);
    })
    .catch((error: any) => {
      if (action.meta && action.meta.errorMessage) {
        // toast.error(action.meta.errorMessage);
        Toast.show({
          type: "error",
          position: "top",
          text1: action.meta.errorMessage,
          visibilityTime: 3000,
          autoHide: true,
        });
      } else if (error && error.response) {
        const response = error.response;
        const data = response.data;
        const details = data.detailErrors ? data.detailErrors[0].errorMessage : '';
        if (!(response.status === 401 && (error.message === '' || (data && data.path && data.path.includes('/api/account'))))) {
          let i;
          switch (response.status) {
            // connection refused, server not reachable
            case 0:
              addErrorAlert('Server not reachable', 'error.server.not.reachable');
              break;

            case 400:
              const headers = Object.entries(response.headers);
              let errorHeader = null;
              let entityKey = null;
              headers.forEach(([k, v]) => {
                if (k.toLowerCase().endsWith('app-error')) {
                  errorHeader = v;
                } else if (k.toLowerCase().endsWith('app-params')) {
                  entityKey = v;
                }
              });
              if (errorHeader) {
                const entityName: string = translate('global.menu.entities.' + entityKey);
                addErrorAlert(errorHeader, entityName);
              } else if (data !== '' && data.fieldErrors) {
                const fieldErrors = data.fieldErrors;
                for (i = 0; i < fieldErrors.length; i++) {
                  const fieldError = fieldErrors[i];
                  if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                    fieldError.message = 'Size';
                  }
                  // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                  const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                  const fieldName = translate(`izziPlatform.${fieldError.objectName}.${convertedField}`);
                  addErrorAlert(`Error on field "${fieldName}"`, `error.${fieldError.message}`);
                }
              } else if (data !== '' && data.errorMessage && data.errorCode) {
                // toast.error(data.errorMessage);
                // addErrorAlert(data.errorMessage, `error.response.${data.errorCode}`);
              } else {
                addErrorAlert(details ? details : data.message);
                // toast.error(details ? details : data.message, { autoClose: false });
                Toast.show({
                  type: "error",
                  position: "top",
                  text1: details ? details : data.message,
                  visibilityTime: 3000,
                  autoHide: true,
                });
              }
              break;

            case 401:
              // addErrorAlert('Unauthorized', 'error.unauthorized');
              break;

            case 404:
              if (data !== '' && data.errorMessage && data.errorCode) {
                addErrorAlert(data.errorMessage, `error.response.${data.errorCode}`);
              } else {
                // addErrorAlert('Not found', 'error.url-not-found');
              }
              break;

            default:
              if (data !== '' && data.errorCode) {
                addErrorAlert(`error.response.${data.errorCode}`);
              } else {
                addErrorAlert(data);
              }
          }
        }
      } else if (error && error.errorCode) {
        addErrorAlert(`error.response.${error.errorCode}`);
      } else {
        // toast.error('Hệ thống đang nâng cấp. Vui lòng thử lại sau!');
        addErrorAlert('Hệ thống đang nâng cấp. Vui lòng thử lại sau!');
      }
      return Promise.reject(error);
    });
};
