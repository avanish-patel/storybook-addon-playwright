import { deleteStoryScreenshots as deleteStoryScreenshotsClient } from '../api/client';
import { useAsyncApiCall } from './use-async-api-call';
import { useCurrentStoryData } from './use-current-story-data';
import { useCallback } from 'react';
import { useScreenshotDispatch } from '../store/screenshot';

export const useDeleteStoryScreenshot = () => {
  const {
    makeCall,
    ErrorSnackbar: DeleteScreenshotsErrorSnackbar,
    SuccessSnackbar: SuccessSnackbarDeleteScreenshots,
    inProgress: deleteInProgress,
  } = useAsyncApiCall(deleteStoryScreenshotsClient, false);

  const data = useCurrentStoryData();
  const dispatch = useScreenshotDispatch();

  const deleteStoryScreenshots = useCallback(async () => {
    const result = await makeCall({
      fileName: data.parameters.fileName,
      storyId: data.id,
    });
    if (!(result instanceof Error)) {
      dispatch({ type: 'removeStoryScreenshots' });
    }
  }, [data, makeCall, dispatch]);

  return {
    DeleteScreenshotsErrorSnackbar,
    SuccessSnackbarDeleteScreenshots,
    deleteInProgress,
    deleteStoryScreenshots,
  };
};
