/** @jsx withSlots */
import * as React from 'react';
import { Platform, View } from 'react-native';
import { tabsName, TabsType, TabsProps, TabsContextData } from './Tabs.types';
import { Text } from '@fluentui-react-native/experimental-text';
import { stylingSettings } from './Tabs.styling';
import { compose, mergeProps, withSlots, UseSlots } from '@fluentui-react-native/framework';
import { useTabs } from './useTabs';
import { FocusZone } from '@fluentui-react-native/focus-zone';
import type { IKeyboardEvent } from '@office-iss/react-native-win32';


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
  enabledKeys: [],
  views: null,
  focusZoneRef: null,
});


export const Tabs = compose<TabsType>({
  displayName: tabsName,
  ...stylingSettings,
  slots: {
    root: View,
    label: Text,
    container: Platform.OS !== 'windows' ? FocusZone : React.Fragment,
    stack: View,
    tabPanel: View,
  },
  render: (userProps: TabsProps, useSlots: UseSlots<TabsType>) => {
    const tabs = useTabs(userProps);
    // grab the styled slots
    const Slots = useSlots(userProps, layer => tabs.state[layer] || userProps[layer]);
    // now return the handler for finishing render
    return (final: TabsProps, ...children: React.ReactNode[]) => {
      const { label, defaultTabbableElement, isCircularNavigation, ...mergedProps } = mergeProps(tabs.props, final); // ...mergedProps

      const onKeyDown = (ev: IKeyboardEvent) => {
        if (ev.nativeEvent.key === 'ArrowRight' || ev.nativeEvent.key === 'ArrowLeft') {
          const length = tabs.state.context.enabledKeys.length;
          const currTabItemIndex = tabs.state.context.enabledKeys.findIndex(x => x == tabs.state.context.selectedKey)
          let newCurrTabItemIndex;
          if (ev.nativeEvent.key === 'ArrowRight') {
            if (isCircularNavigation || !(currTabItemIndex + 1 == length)) {
              newCurrTabItemIndex = (currTabItemIndex + 1) % length;
              tabs.state.context.selectedKey = tabs.state.context.enabledKeys[newCurrTabItemIndex];
              tabs.state.info.onKeySelect(tabs.state.context.selectedKey);
            }
          }
          if (ev.nativeEvent.key === 'ArrowLeft') {
            if (isCircularNavigation || !(currTabItemIndex == 0)) {
              newCurrTabItemIndex = (currTabItemIndex - 1 + length) % length;
              tabs.state.context.selectedKey = tabs.state.context.enabledKeys[newCurrTabItemIndex];
              tabs.state.info.onKeySelect(tabs.state.context.selectedKey);
            }
          }
        }
      };
      // Populate the tabsItemKeys array
      if (children) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - TODO, fix typing error
        tabs.state.context.tabsItemKeys = React.Children.map(children, (child: React.ReactChild) => {
          if (React.isValidElement(child)) {
            // Sets default selected tabItem
            if (tabs.state.context.selectedKey == null && !child.props.disabled) {
              tabs.state.context.selectedKey = child.props.itemKey;
            }
            return child.props.itemKey;
          }
        });

        tabs.state.context.enabledKeys = React.Children.map(children, (child: React.ReactChild) => {
          if (React.isValidElement(child)) {
            if (!child.props.disabled) {
              return child.props.itemKey;
            }
          }
        });
      }

      const containerProps = Platform.OS === 'windows' ? {defaultTabbableElement: defaultTabbableElement, isCircularNavigation: isCircularNavigation}: {};
      const stackProps = Platform.OS === 'windows' ? { focusable: true, ref: tabs.state.context.focusZoneRef, onKeyDown: onKeyDown}: {};
      return (
        <TabsContext.Provider
          // Passes in the selected key and a hook function to update the newly selected tabsItem and call the client's onTabsClick callback
          value={tabs.state.context}
        >
          <Slots.root {...mergedProps}>
            {tabs?.state?.info?.label && <Slots.label key="label">{label}</Slots.label>}
            <Slots.container {...containerProps}>
              <Slots.stack {...stackProps} >{children}</Slots.stack>
            </Slots.container>
            <Slots.tabPanel>
              {
                <TabsContext.Consumer>
                  {context => !tabs?.state?.info?.headersOnly && <View>{context.views.get(context.selectedKey)}</View>}
                </TabsContext.Consumer>
              }
            </Slots.tabPanel>
          </Slots.root>
        </TabsContext.Provider>
      );
    };
  },
});

export default Tabs;
