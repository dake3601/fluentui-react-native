
import { TabsItemTokens } from '.';
import { TokenSettings } from '@fluentui-react-native/use-styling';
import { Theme } from '@fluentui-react-native/framework';

export const tabsItemStates: (keyof TabsItemTokens)[] = ['hovered', 'selected', 'focused', 'disabled'];

export const defaultTabsItemTokens: TokenSettings<TabsItemTokens, Theme> = (t: Theme) =>
  ({
    backgroundColor: 'transparent',
    color: t.colors.bodyText,
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
      color: t.colors.buttonTextDisabled,
      borderColor: 'transparent',
      iconColor: t.colors.buttonDisabledIcon,
      indicatorColor: t.colors.transparent,
    },
    hovered: {
      backgroundColor: t.colors.neutralForeground2Hover,
      iconColor: t.colors.buttonHoveredIcon,
      color: 'buttonTextHovered',
      fontWeight: 'bold',
      indicatorColor: t.colors.neutralStroke1,
      selected: {
        marginHorizontal: -1,
      },
    },
    focused: {
      color: t.colors.neutralForeground1,
      icon: t.colors.buttonFocusedIcon,
      borderWidth: 2,
      borderRadius: 4,
    },
    selected: {
      color: t.colors.buttonTextHovered,
      icon: t.colors.buttonFocusedIcon,
      indicatorColor: t.colors.accentButtonBackground,
      variant: 'bodySemibold',
      iconColor: t.colors.buttonDisabledIcon,
    },
  } as TabsItemTokens);