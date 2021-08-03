/** @jsx withSlots */
import { nativeTabsItemName, TabsItemType, TabsItemViewProps } from './TabsItem.types';
import { compose, mergeProps, withSlots, UseSlots, buildProps } from '@fluentui-react-native/framework';
import { WinUI } from 'react-native-xaml';

export const TabsItem = compose<TabsItemType>({
  displayName: nativeTabsItemName,
  tokens: [{}, nativeTabsItemName],
  slotProps: {
    root: buildProps(tokens => ({
      ...tokens,
    })),
  },
  slots: { root: WinUI.PivotItem },
  render: (userProps: WinUI.PivotItemProps, useSlots: UseSlots<TabsItemType>) => {
    const Root = useSlots(userProps).root;
    return (rest: TabsItemViewProps) => <Root {...mergeProps(userProps, rest)} />;
  },
});
