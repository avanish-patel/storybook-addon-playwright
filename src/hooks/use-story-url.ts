import { useState, useEffect } from 'react';
import { useStorybookState } from '@storybook/api';
import { constructUrl } from '../api/server/utils';

export const useStoryUrl = () => {
  const state = useStorybookState();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    let newUrl = constructUrl(state.location.host, state.storyId);

    const queryKeys = Object.keys(state.customQueryParams);

    if (queryKeys.length > 0) {
      const query = queryKeys.map((key) => {
        const val = state.customQueryParams[key];
        return `${key}=${val}`;
      });
      newUrl += '&' + query.join('&');
    }

    setUrl(newUrl);
  }, [state.customQueryParams, state.location.host, state.storyId]);

  return url;
};
