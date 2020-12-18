import Toast from "react-native-toast-message";
import isPromise from "is-promise";

const addErrorAlert = (text1?: string, text2?: string) => {
  // toast.error(data);
  Toast.show({
    type: "error",
    position: "top",
    text1,
    text2,
    visibilityTime: 3000,
    autoHide: true,
  });
};

const getErrorMessage = (errorData: any) => {
  let message = errorData.message;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach(
      (fErr: { field: string; objectName: string; message: string }) => {
        message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
      }
    );
  }
  return message;
};

export default () => (next: any) => (action: any) => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The error middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `catch`.
   * It need not run in production
   */
  if (process.env.NODE_ENV === "development") {
    // Dispatch initial pending promise, but catch any errors
    return next(action).catch((error: any) => {
      addErrorAlert(action.type, JSON.stringify(error.message));
      console.error(
        `${action.type} caught at middleware with reason: ${JSON.stringify(
          error.message
        )}.`
      );
      if (error && error.response && error.response.data) {
        const message = getErrorMessage(error.response.data);
        console.error(`Actual cause: ${message}`);
        addErrorAlert('type', message);
      }

      return Promise.reject(error);
    });
  }
  return next(action);
};
