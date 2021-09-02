import { tabsName, TabsTokens, TabsSlotProps, TabsProps } from './Tabs.types';
import { Theme, UseStylingOptions, buildProps } from '@fluentui-react-native/framework';
import { fontStyles } from '@fluentui-react-native/tokens';
import { defaultTabsTokens } from './TabsTokens';

export const tabsState: (keyof TabsTokens)[] = ['rtl'];


export const stylingSettings: UseStylingOptions<TabsProps, TabsSlotProps, TabsTokens> = {
  tokens: [defaultTabsTokens, tabsName],
  states: tabsState,
  slotProps: {
    root: buildProps(
      (tokens: TabsTokens) => ({
        style: {
          display: 'flex',
          minHeight: 32,
          minWidth: 80,
          flexDirection: 'column',
          alignItems: tokens.alignItems,
        },
      }),
      ['alignItems'],
    ),
    label: buildProps(
      (tokens: TabsTokens, theme: Theme) => ({
        variant: 'subheaderSemibold',
        style: {
          ...fontStyles.from(tokens, theme),
        },
      }),
      [...fontStyles.keys],
    ),
    stack: buildProps(
      (tokens: TabsTokens) => ({
        style: {
          flexDirection: tokens.flexDirection,
        },
      }),
      ['flexDirection'],
    ),
  },
};
