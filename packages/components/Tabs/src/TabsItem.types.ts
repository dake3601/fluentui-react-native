import * as React from 'react';
import { IRenderData } from '@uifabricshared/foundation-composable';
import { IButtonProps } from '@fluentui-react-native/button';
import type { IViewWin32Props } from '@office-iss/react-native-win32';
import { FontTokens, IForegroundColorTokens, IBackgroundColorTokens, IBorderTokens } from '@fluentui-react-native/tokens';

export const tabsItemName = 'TabsItem';

// Props for the radio button
export interface TabsItemProps extends IButtonProps {
  /*
   ** The text string for the tab
   */
  headerText: string;
  /*
   ** A unique key-identifier for each option
   */
  buttonKey: string;

  /*
   ** An optional string for the Narrator to read for each RadioButton. If not provided, this will be set to the button's content
   */
  ariaLabel?: string;
}

export interface TabsItemTokens extends FontTokens, IForegroundColorTokens, IBackgroundColorTokens, IBorderTokens {
  textBorderColor?: string;
}

export interface TabsItemSlotProps {
  root: React.PropsWithRef<IViewWin32Props>;
  button: IButtonProps;
}

export type TabsItemRenderData = IRenderData<TabsItemSlotProps>;

export interface TabsItemType {
  props: TabsItemProps;
  tokens: TabsItemTokens;
  slotProps: TabsItemSlotProps;
}
