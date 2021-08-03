import { WinUI } from 'react-native-xaml';

export const nativeTabsItemName = 'TabsItem';

export interface TabsItemTokens {}

export type TabsItemViewProps = WinUI.PivotItemProps & TabsItemTokens;

export interface TabsItemType {
  props: WinUI.PivotItemProps;
  tokens: TabsItemTokens;
  slotProps: {
    root: TabsItemViewProps;
  };
}
