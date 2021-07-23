import { tabsItemName, TabsItemType } from './TabsItem.types';
import { IComposeSettings } from '@uifabricshared/foundation-compose';

export const tabsItemSelectActionLabel = 'Select a TabsItem';

export const settings: IComposeSettings<TabsItemType> = [
  {
    tokens: {
      borderColor: 'buttonBorder',
      color: 'red',
      backgroundColor: 'transparent',
      textBorderColor: 'transparent',
      borderWidth: 2,
    },
    root: {
      accessible: true,
      focusable: true,
      accessibilityRole: 'tab',
      style: {},
    },
    _precedence: ['disabled', 'hovered', 'focused', 'selected'],
    _overrides: {
      selected: {
        tokens: {
          backgroundColor: 'buttonBackgroundPressed',
          color: 'buttonTextPressed',
          borderColor: 'buttonPressedBorder',
          borderWidth: 10,
        },
      },
      focused: {
        tokens: {
          textBorderColor: 'focusBorder',
        },
      },
      disabled: {
        tokens: {
          borderColor: 'buttonBorderDisabled',
          color: 'disabledBodyText',
          backgroundColor: 'background',
        },
      },
    },
  },
  tabsItemName,
];
