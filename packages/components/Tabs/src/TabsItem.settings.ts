import { tabsItemName, TabsItemType } from './TabsItem.types';
import { IComposeSettings } from '@uifabricshared/foundation-compose';

export const tabsItemSelectActionLabel = 'Select a TabsItem';

export const settings: IComposeSettings<TabsItemType> = [
  {
    tokens: {
      borderColor: 'menuItemText',
      color: 'menuItemText',
      backgroundColor: 'menuItemText',
      textBorderColor: 'transparent',
    },
    root: {
      accessible: true,
      focusable: true,
      accessibilityRole: 'tab',
      style: {},
    },
    button: {
      style: {},
    },
  },
  tabsItemName,
];
