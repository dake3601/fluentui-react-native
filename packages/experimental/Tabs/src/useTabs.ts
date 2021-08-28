import * as React from 'react';
import { View } from 'react-native';
import { useSelectedKey } from '@fluentui-react-native/interactive-hooks';
import { TabsProps, TabsState } from './Tabs.types';

export const useTabs = (props: TabsProps): TabsState => {
  // attach the pressable state handlers
  const defaultComponentRef = React.useRef(null);
  const { componentRef = defaultComponentRef, selectedKey, getTabId, onTabsClick, defaultSelectedKey } = props;
  // const onClickWithFocus = useOnPressWithFocus(componentRef, onSelect);

  // const pressable = useAsPressable({ ...rest, onPress: onClickWithFocus });
  // const onKeyUp = useKeyCallback(onSelect, ' ', 'Enter');
  const data = useSelectedKey(selectedKey || defaultSelectedKey || null, onTabsClick);

  // selectedTabsItemRef should be set to default tabbale element
  const [selectedTabsItemRef, setSelectedTabsItemRef] = React.useState(React.useRef<View>(null));

  const onSelectTabsItemRef = React.useCallback(
    (ref: React.RefObject<View>) => {
      setSelectedTabsItemRef(ref);
    },
    [setSelectedTabsItemRef],
  );

  const onChangeTabId = React.useCallback((key: string, index: number) => {
    if (getTabId) {
      return getTabId(key, index);
    }
    return `${key}-Tab${index}`;
  }, [getTabId]);

  // Stores views to be displayed
  const map = new Map<string, React.ReactNode[]>();
  const focusZoneRef = React.useRef(null);

  return {
    props: {
      ...props,
      accessible: true,
      accessibilityRole: 'tablist',
      ref: componentRef,
      defaultTabbableElement: selectedTabsItemRef,
      isCircularNavigation: props.isCircularNavigation ?? false,
    },
    state: {
      context:{
        selectedKey: selectedKey ?? data.selectedKey,
        onTabsClick: data.onKeySelect,
        getTabId: onChangeTabId,
        updateSelectedTabsItemRef: onSelectTabsItemRef,
        views: map,
        focusZoneRef: focusZoneRef,
      },
      info: {
        headersOnly: props.headersOnly ?? false,
        label: !!props.label,
        onKeySelect: data.onKeySelect,
      },
    },
  };
};
