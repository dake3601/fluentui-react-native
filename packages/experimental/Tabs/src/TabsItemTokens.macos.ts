
import { TabsItemTokens } from '.';
import { TokenSettings } from '@fluentui-react-native/use-styling';
import { Theme } from '@fluentui-react-native/framework';

export const tabsItemStates: (keyof TabsItemTokens)[] = ['hovered', 'selected', 'focused', 'disabled'];

export const defaultTabsItemTokens: TokenSettings<TabsItemTokens, Theme> = (t: Theme) =>
  ({
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
      indicatorColor: t.colors.transparent,
      fontWeight: 'normal',
    },
    hovered: {
      fontWeight: 'bold',
      selected: {
        marginHorizontal: 0,
      },
    },
    selected: {
      icon: t.colors.buttonFocusedIcon,
      indicatorColor: t.colors.accentButtonBackground,
      fontWeight: 'bold',
    },
  } as TabsItemTokens);