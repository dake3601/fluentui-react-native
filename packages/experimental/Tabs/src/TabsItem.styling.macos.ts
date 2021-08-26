import { tabsItemName, TabsItemTokens, TabsItemSlotProps, TabsItemProps } from './TabsItem.types';
import { Theme, UseStylingOptions, buildProps } from '@fluentui-react-native/framework';
import { borderStyles, fontStyles } from '@fluentui-react-native/tokens';
import { IComposeSettings } from '@uifabricshared/foundation-compose';
import { TokenSettings } from '@fluentui-react-native/use-styling';

export const tabsItemStates: (keyof TabsItemTokens)[] = ['hovered', 'selected', 'focused', 'disabled', 'pressed'];

export const defaultTabsItemTokens: TokenSettings<TabsItemTokens, Theme> = (t: Theme) =>
  ({
    backgroundColor: 'transparent',
    color: t.colors.neutralForeground3Brand,
    borderColor: 'transparent',
    iconColor: t.colors.buttonIcon,
    indicatorColor: t.colors.transparent,
    marginHorizontal: 10,
    variant: 'bodyStandard',
    minHeight: 32,
    minWidth: 80,
    borderWidth: 2,
    borderRadius: 4,

    disabled: {
      backgroundColor: t.colors.buttonDisabledBackground,
      color: t.colors.neutralForegroundDisabled,
      borderColor: 'transparent',
      iconColor: t.colors.buttonDisabledIcon,
      indicatorColor: t.colors.transparent,
    },
    hovered: {
      backgroundColor: t.colors.neutralForeground2Hover,
      iconColor: t.colors.buttonHoveredIcon,
      color: t.colors.neutralForeground2Hover,
      indicatorColor: t.colors.neutralStroke1,
      selected: {
        marginHorizontal: -1,
      },
    },
    pressed: {
      color: t.colors.neutralForeground2Pressed,
      borderColor: 'transparent',
      iconColor: t.colors.buttonPressedIcon,
      indicatorColor: t.colors.brandStroke1,
    },
    focused: {
      color: t.colors.neutralForeground1,
      icon: t.colors.buttonFocusedIcon,
      borderWidth: 2,
      borderRadius: 4,
    },
    selected: {
      color: t.colors.neutralForeground1,
      icon: t.colors.buttonFocusedIcon,
      indicatorColor: 'lightblue',
      variant: 'bodySemibold',
      iconColor: t.colors.buttonDisabledIcon,
    },
  } as TabsItemTokens);


export const stylingSettings: UseStylingOptions<TabsItemProps, TabsItemSlotProps, TabsItemTokens> = {
  tokens: [defaultTabsItemTokens, tabsItemName],
  states: tabsItemStates,
  slotProps: {
    root: buildProps(
      (tokens: TabsItemTokens, theme: Theme) => ({
        style: {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          ...borderStyles.from(tokens, theme),
        },
      }),
      [...borderStyles.keys],
    ),
    content: buildProps(
      (tokens: TabsItemTokens, theme: Theme) => ({
        style: {
          color: tokens.color,
          ...fontStyles.from(tokens, theme),
        },
      }),
      ['color', ...fontStyles.keys],
    ),
    icon: buildProps(
      (tokens: TabsItemTokens) => ({
        style: {
          tintColor: tokens.iconColor,
        },
      }),
      ['iconColor'],
    ),
    stack: buildProps(
      () => ({
        style: {
          display: 'flex',
          marginHorizontal: 10,
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'flex-start',
          minHeight: 32,
          minWidth: 32,
          justifyContent: 'center',
        },
      }),
      ['iconColor', 'indicatorColor'],
    ),
    indicator: buildProps(
      (tokens: TabsItemTokens) => ({
        style: {
          minHeight: 2,
          borderRadius: 2,
          marginBottom: 2,
          alignSelf: 'stretch',
          marginHorizontal: tokens.marginHorizontal,
          backgroundColor: tokens.indicatorColor,
        },
      }),
      ['indicatorColor'],
    ),
  },
};
