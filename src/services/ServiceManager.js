import axios from 'axios';
import {Platform} from 'react-native';
import {printLog} from '../utilities/functions';

export const RequestMethod = {
  post: 'POST',
  get: 'GET',
};

export const callApi = async (
  url,
  method,
  params,
  onLoading,
  onSuccess,
  onFailure,
) => {
  var passParams = {
    ...params,
  };
  printLog('callApi', `Method : ${method}`);
  printLog('callApi', `URL : ${url}`);
  printLog('callApi', `Params : ${JSON.stringify(passParams)}`);
  onLoading(true);
  var isFile = false;
  const formData = new FormData();
  isFile = true;
  if (typeof passParams == 'object') {
    var myparams = Object.keys(passParams);
    myparams?.map(item => {
      formData.append(item, passParams[item]);
    });
    printLog('PARAMS :::: ', JSON.stringify(formData));
  }
  var PassParamsData = {};

  if (isFile) {
    if (method == RequestMethod.get) {
      PassParamsData = {
        method: method,
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'Application/json',
        },
        params: passParams,
      };
    } else {
      PassParamsData = {
        method: method,
        url: url,
        headers: {
          Accept: 'Application/json',
        },
        data: formData,
        // params: passParams,
      };
    }
  }

  var config = isFile
    ? {
        method: method,
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'Application/json',
        },
        data: formData,
        params: passParams,
      }
    : {
        method: method,
        url: url,
        headers: isAuthToken
          ? {
              Authorization: `Bearer ${token}`,
              Accept: 'Application/json',
            }
          : {Accept: 'Application/json'},
        params: passParams,
        data: formData,
      };

  axios(Platform.OS == 'ios' ? PassParamsData : config)
    .then(response => {
      printLog(`callApi`, `Response : ${JSON.stringify(response?.data)}`);
      onLoading(false);
      onSuccess(response?.data);
    })
    .catch(error => {
      printLog(`callApi`, `Error : ${JSON.stringify(error)}`);
      onLoading(false);
      onFailure(error?.message);
    });
};
