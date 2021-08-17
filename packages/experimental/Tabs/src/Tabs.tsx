/** @jsx withSlots */
import * as React from 'react';
import { View } from 'react-native';
import { tabsName, TabsType, TabsProps, TabsContextData } from './Tabs.types';
import { Text } from '@fluentui-react-native/experimental-text';
import { stylingSettings } from './TabsItem.styling';
import { compose, mergeProps, withSlots, UseSlots } from '@fluentui-react-native/framework';
import { filterViewProps } from '@fluentui-react-native/adapters';

import { useTabs } from './useTabs';
import { FocusZone } from '@fluentui-react-native/focus-zone';

export const TabsContext = React.createContext<TabsContextData>({
  selectedKey: null,
  onTabsClick: (/* key: string */) => {
    return;
  },
  getTabId: (/* key:string, index: number*/) => {
    return null;
  },
  updateSelectedTabsItemRef: (/* ref: React.RefObject<any>*/) => {
    return;
  },
  tabsItemKeys: [],
  views: null,
});

export const Tabs = compose<TabsType>({
  displayName: tabsName,
  ...stylingSettings,
  slots: {
    root: View,
    label: Text,
    container: FocusZone,
    stack: { slotType: View, filter: filterViewProps },
    tabPanel: { slotType: View, filter: filterViewProps },
  },
  render: (userProps: TabsProps, useSlots: UseSlots<TabsType>) => {
    const tabs = useTabs(userProps);
    // grab the styled slots
    const Slots = useSlots(userProps);
    // now return the handler for finishing render
    return (final: TabsProps, ...children: React.ReactNode[]) => {
      const { label, ...mergedProps } = mergeProps(tabs.props, final);

      // Populate the tabsItemKeys array
      if (children) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - TODO, fix typing error
        tabs.context.tabsItemKeys = React.Children.map(children, (child: React.ReactChild) => {
          if (React.isValidElement(child)) {
            // Sets default selected tabItem
            if (tabs.context.selectedKey == null && !child.props.disabled) {
              tabs.context.selectedKey = child.props.itemKey;
            }
            return child.props.itemKey;
          }
        });
      }

      return (
        <TabsContext.Provider
          // Passes in the selected key and a hook function to update the newly selected tabsItem and call the client's onTabsClick callback
          value={tabs.context}
        >
          <Slots.root {...mergedProps}>
            {tabs.info.label && <Slots.label>{label}</Slots.label>}
            <Slots.container>
              <Slots.stack>{children && children}</Slots.stack>
            </Slots.container>
            <Slots.tabPanel>
              <TabsContext.Consumer>{context => tabs.info.headersOnly && context.views.get(context.selectedKey)}</TabsContext.Consumer>
            </Slots.tabPanel>
          </Slots.root>
        </TabsContext.Provider>
      );
    };
  },
});

export default Tabs;