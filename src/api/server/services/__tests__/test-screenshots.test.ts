jest.mock('fast-glob', () => ({
  __esModule: true as never,
  default: () => {
    return new Promise((resolve) => {
      resolve(['story.ts']);
    });
  },
}));

import { testScreenshots } from '../test-screenshots';

jest.mock('../../configs');
jest.mock('../make-screenshot');
jest.mock('../../utils/load-story-data');
jest.mock('../diff-image-to-screenshot');

describe('testScreenshots', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should have result', async () => {
    const onCompleteMock = jest.fn();
    const result = await testScreenshots({
      fileName: 'story.ts',
      onComplete: onCompleteMock,
    });

    const data = [
      {
        added: true,
        newScreenshot: 'base64-image',
        screenshotId: 'screenshot-id',
        storyId: 'story-id',
      },
      {
        added: true,
        newScreenshot: 'base64-image',
        screenshotId: 'screenshot-id-2',
        storyId: 'story-id',
      },
    ];

    expect(result).toStrictEqual(data);

    expect(onCompleteMock).toHaveBeenCalledWith(data);
  });
});
