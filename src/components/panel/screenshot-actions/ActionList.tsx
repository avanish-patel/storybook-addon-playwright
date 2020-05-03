import React, { SFC, useContext, useMemo, useState, useEffect } from 'react';
import { ActionContext } from '../../../store/actions';
import { ActionOptions } from './ActionOptions';
import { StoryAction } from '../../../typings';

interface ActionListProp {
  storyId: string;
}

const ActionList: SFC<ActionListProp> = ({ storyId }) => {
  const state = useContext(ActionContext);
  // const [expendedItems, setExpendedItems] = useState();

  const [storyActions, setStoryAction] = useState<StoryAction[]>();

  useEffect(() => {
    const actions = state.storyActions.filter((x) => x.storyId === storyId);
    setStoryAction(actions);
  }, [state.storyActions, storyId]);

  // useEffect(() => {

  //   return () => {

  //   }
  // }, []);

  return useMemo(() => {
    if (!storyActions) return null;
    return (
      <>
        {storyActions.map((action) => (
          <ActionOptions
            key={action.id}
            actionName={action.schemaKey}
            actionId={action.id}
          />
        ))}
      </>
    );
  }, [storyActions]);
};

ActionList.displayName = 'ActionList';

export { ActionList };
