/** @jsx withSlots */
import { nativeTabsName, TabsType, TabsViewProps } from './Tabs.types';
import { compose, mergeProps, withSlots, UseSlots, buildProps } from '@fluentui-react-native/framework';
import { WinUI } from 'react-native-xaml';

export const Tabs = compose<TabsType>({
  displayName: nativeTabsName,
  tokens: [{}, nativeTabsName],
  slotProps: {
    root: buildProps(tokens => ({
      ...tokens,
    })),
  },
  slots: { root: WinUI.Pivot },
  render: (userProps: WinUI.PivotProps, useSlots: UseSlots<TabsType>) => {
    const Root = useSlots(userProps).root;
    return (rest: TabsViewProps) => <Root {...mergeProps(userProps, rest)} />;
  },
});
