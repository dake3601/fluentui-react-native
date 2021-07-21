import { tabsItemName, TabsItemType } from './TabsItem.types';
import { IComposeSettings } from '@uifabricshared/foundation-compose';

const radioButtonSize = 20;
const radioButtonRadius = radioButtonSize / 2;

const radioButtonInnerCircleSize = 10;
const radioButtonInnerCircleRadius = radioButtonInnerCircleSize / 2;

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
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 20,
        marginTop: 0,
        position: 'relative',
      },
    },
    button: {
      style: {},
    },
    innerCircle: {
      style: {
        position: 'relative',
        opacity: 0,
        borderRadius: radioButtonInnerCircleRadius,
        height: radioButtonInnerCircleSize,
        width: radioButtonInnerCircleSize,
        left: 4,
        top: 4,
      },
    },
    content: {
      variant: 'subheaderStandard',
      style: {
        marginTop: 2,
        borderStyle: 'solid',
        borderWidth: 2,
      },
    },
    _precedence: ['disabled', 'hovered', 'focused', 'selected'],
    _overrides: {
      selected: {
        innerCircle: {
          style: {
            opacity: 1,
          },
        },
      },
      focused: {
        tokens: {
          textBorderColor: 'focusBorder',
        },
      },
      hovered: {
        innerCircle: {
          style: {
            opacity: 0.5,
          },
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
