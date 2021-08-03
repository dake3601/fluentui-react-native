import { WinUI } from 'react-native-xaml';

export const nativeTabsName = 'Tabs';

export interface TabsTokens {}

export type TabsViewProps = WinUI.PivotProps & TabsTokens;

export interface TabsType {
  props: WinUI.PivotProps;
  tokens: TabsTokens;
  slotProps: {
    root: TabsViewProps;
  };
}
