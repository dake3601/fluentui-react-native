import { Theme } from '@fluentui-react-native/framework';
import { TokenSettings } from '@fluentui-react-native/use-styling';
import { TabsTokens } from '.';

export const defaultTabsTokens: TokenSettings<TabsTokens, Theme> = (t: Theme) =>
  ({
    backgroundColor: t.colors.transparent,
    color: t.colors.buttonText,
    borderColor: t.colors.buttonBorder,
    iconColor: t.colors.iconColor,
    variant: 'subheaderSemibold',
    minHeight: 32,
    minWidth: 80,
    borderWidth: 1,
    borderRadius: 2,
  } as TabsTokens);
