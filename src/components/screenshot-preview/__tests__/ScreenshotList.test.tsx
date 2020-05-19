import { useActiveBrowserMock } from '../../../../__manual_mocks__/hooks/use-active-browser';
import { ScreenshotList } from '../ScreenshotList';
import { shallow } from 'enzyme';
import React from 'react';
import { ScreenshotView } from '../ScreenshotView';
import { Toolbar } from '../Toolbar';

describe('ScreenshotList', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    useActiveBrowserMock.mockClear();
  });

  it('should render', () => {
    const wrapper = shallow(
      <ScreenshotList
        browserTypes={['chromium', 'firefox', 'webkit']}
        onClose={onCloseMock}
        viewPanel="dialog"
      />,
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should not have screenshot view if there is no active browser', () => {
    useActiveBrowserMock.mockImplementationOnce(() => ({
      activeBrowsers: [],
      isDisabled: jest.fn(),
      toggleBrowser: jest.fn(),
    }));

    const wrapper = shallow(
      <ScreenshotList
        browserTypes={['chromium', 'firefox', 'webkit']}
        onClose={onCloseMock}
        viewPanel="dialog"
      />,
    );

    const screenshotView = wrapper.find(ScreenshotView);
    expect(screenshotView.exists()).toBeFalsy();
  });

  it('should have screenshot view list', () => {
    const wrapper = shallow(
      <ScreenshotList
        browserTypes={['chromium', 'firefox', 'webkit']}
        onClose={onCloseMock}
        viewPanel="dialog"
      />,
    );
    const screenshotView = wrapper.find(ScreenshotView);
    expect(screenshotView.exists()).toBeTruthy();
  });

  it('should show storybook story in screen shot view', () => {
    const wrapper = shallow(
      <ScreenshotList
        browserTypes={['chromium']}
        onClose={onCloseMock}
        viewPanel="dialog"
        showStorybook={true}
      />,
    );
    const screenshotView = wrapper.find(ScreenshotView);
    expect(screenshotView.first().props().browserType).toBe('storybook');
  });

  it('should handle refresh', () => {
    const wrapper = shallow(
      <ScreenshotList
        browserTypes={['chromium']}
        onClose={onCloseMock}
        viewPanel="dialog"
      />,
    );
    const toolbar = wrapper.find(Toolbar);

    toolbar.props().onRefresh();

    let screenshotView = wrapper.find(ScreenshotView);
    expect(screenshotView.first().props().refresh).toBeTruthy();

    screenshotView.first().props().onRefreshEnd();
    screenshotView = wrapper.find(ScreenshotView);
    expect(screenshotView.first().props().refresh).toBeFalsy();
  });
});
