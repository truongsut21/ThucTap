import axios from "axios";
import { config } from "../../../config";
import { encryptPayload } from "../../../config/utilities";

export function workerAPIECard(data) {
  return Promise.all([
    data.donotEncrypt
      ? workaroundNotEncrypt(data.payload)
      : encryptPayload(data.payload),
  ])
    .then(([encodePayload]) => {
      return axios({
        method: data.method || "POST",
        url: config.backend_url + data.functionName,
        timeout: data.timeout ? data.timeout : 7000,
        headers: {
          Authorization: "Tomaho " + data.token,
        },
        data: {
          payload: encodePayload,
        },
      });
    })
    .then((response) => {
      if (response.data.data && response.data.statusCode === 0) {
        return response.data.data;
      } else {
        return {
          code: response.data.statusCode,
          message: response.data.statusMessage,
        };
      }
    })
    .catch((error) => {
      return {
        code: 1,
        message: error ? error.toString() : "",
      };
    });
}
