import { SaveScreenshotRequest, ImageDiff } from '../typings';
import { getEndpoint, responseHandler } from './utils';

export const saveScreenshot = async (
  data: SaveScreenshotRequest,
): Promise<ImageDiff> => {
  const restEndpoint = getEndpoint('SAVE_SCREENSHOT');
  console.log(data);
  const resData = await fetch(restEndpoint, {
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'post',
  }).then(responseHandler);

  return resData;
};
