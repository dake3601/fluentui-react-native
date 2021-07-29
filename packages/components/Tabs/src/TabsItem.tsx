/** @jsx withSlots */
import * as React from 'react';
import { View } from 'react-native';
import { compose, IUseComposeStyling } from '@uifabricshared/foundation-compose';
import { ISlots, withSlots } from '@uifabricshared/foundation-composable';
import { Text } from '@fluentui-react-native/text';
import { Icon } from '@fluentui-react-native/icon';
import { settings, tabsItemSelectActionLabel } from './TabsItem.settings';
import { backgroundColorTokens, borderTokens, textTokens, foregroundColorTokens, getPaletteFromTheme } from '@fluentui-react-native/tokens';
import { filterViewProps } from '@fluentui-react-native/adapters';
import { mergeSettings } from '@uifabricshared/foundation-settings';
import { TabsContext } from './Tabs';
import { tabsItemName, TabsItemType, TabsItemProps, TabsItemSlotProps, TabsItemRenderData, TabsItemState } from './TabsItem.types';
import {
  useAsPressable,
  useKeyCallback,
  useViewCommandFocus,
  createIconProps,
  useOnPressWithFocus,
} from '@fluentui-react-native/interactive-hooks';

export const TabsItem = compose<TabsItemType>({
  displayName: tabsItemName,

  usePrepareProps: (userProps: TabsItemProps, useStyling: IUseComposeStyling<TabsItemType>) => {
    const {
      icon,
      headerText,
      onAccessibilityTap = userProps.onClick,
      accessibilityLabel = userProps.headerText,
      componentRef = React.useRef(null),
      testID,
      onClick,
      itemKey,
      ...rest
    } = userProps;

    // Grabs the context information from Tabs (currently selected TabsItem and client's onTabsClick callback)
    const info = React.useContext(TabsContext);

    /* We don't want to call the user's onTabsClick multiple times on the same selection. */
    const changeSelection = () => {
      if (itemKey != info.selectedKey) {
        info.onTabsClick && info.onTabsClick(itemKey);
        info.getTabId && info.getTabId(itemKey, info.tabsItemKeys.findIndex(x => x == itemKey) + 1);
        info.updateSelectedTabsItemRef && componentRef && info.updateSelectedTabsItemRef(componentRef);
      }
    };

    // Ensure focus is placed on tabsItem after click
    const changeSelectionWithFocus = useOnPressWithFocus(componentRef, changeSelection);

    const pressable = useAsPressable({
      ...rest,
      onPress: changeSelectionWithFocus,
      onFocus: changeSelection,
    });

    const onKeyUp = useKeyCallback(onClick, ' ', 'Enter');

    // set up state
    const state: TabsItemState = {
      info: {
        ...pressable.state,
        selected: info.selectedKey === userProps.itemKey,
        disabled: !!userProps.disabled,
        icon: !!icon,
        key: itemKey,
      },
    };

    /* We use the componentRef of the currently selected tabsItem to maintain the default tabbable
    element in Tabs. Since the componentRef isn't generated until after initial render,
    we must update it once here. */
    React.useEffect(() => {
      if (itemKey == info.selectedKey) {
        info.updateSelectedTabsItemRef && componentRef && info.updateSelectedTabsItemRef(componentRef);
      }
    }, []);

    const buttonRef = useViewCommandFocus(componentRef);

    // Grab the styling information from the userProps, referencing the state as well as the props.
    const styleProps = useStyling(userProps, (override: string) => state.info[override] || userProps[override]);

    // Used when creating accessibility properties in mergeSettings below
    const onAccessibilityAction = React.useCallback(
      (event: { nativeEvent: { actionName: any } }) => {
        switch (event.nativeEvent.actionName) {
          case 'Select':
            changeSelection();
            break;
        }
      },
      [info, itemKey],
    );

    const slotProps = mergeSettings<TabsItemSlotProps>(styleProps, {
      root: {
        ...rest,
        ...pressable.props,
        ref: buttonRef,
        onAccessibilityTap: onAccessibilityTap,
        accessibilityRole: 'tab',
        accessibilityLabel: accessibilityLabel,
        accessibilityState: { disabled: state.info.disabled, selected: state.info.selected },
        accessibilityActions: [{ name: 'Select', label: tabsItemSelectActionLabel }],
        accessibilityPositionInSet: info.tabsItemKeys.findIndex(x => x == itemKey) + 1,
        accessibilitySetSize: info.tabsItemKeys.length,
        onAccessibilityAction: onAccessibilityAction,
        onKeyUp: onKeyUp,
      },
      content: { children: headerText, testID: testID },
      icon: createIconProps(icon),
    });

    return { slotProps, state };
  },

  render: (Slots: ISlots<TabsItemSlotProps>, renderData: TabsItemRenderData, ...children: React.ReactNode[]) => {
    const info = renderData.state!.info;
    const context = React.useContext(TabsContext);
    // Sets the view that belongs to a TabItem
    context.views.set(info.key, children);

    return (
      <Slots.root>
        <Slots.stack>
          {info.icon && <Slots.icon />}
          <Slots.content />
        </Slots.stack>
        {info.selected && <Slots.indicator />}
      </Slots.root>
    );
  },

  settings,
  slots: {
    root: View,
    stack: { slotType: View, filter: filterViewProps },
    icon: { slotType: Icon as React.ComponentType },
    content: Text,
    indicator: { slotType: View, filter: filterViewProps },
  },
  styles: {
    root: [backgroundColorTokens, borderTokens],
    stack: [],
    icon: [{ source: 'iconColor', lookup: getPaletteFromTheme, target: 'color' }],
    content: [textTokens, foregroundColorTokens],
    indicator: [backgroundColorTokens],
  },
});

export default TabsItem;
