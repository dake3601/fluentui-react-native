import * as React from 'react';
import { IRenderData } from '@uifabricshared/foundation-composable';
import { IButtonProps } from '@fluentui-react-native/button';
import { IFocusable } from '@fluentui-react-native/interactive-hooks';
import type { IViewWin32Props } from '@office-iss/react-native-win32';
import { FontTokens, IForegroundColorTokens, IBackgroundColorTokens, IBorderTokens } from '@fluentui-react-native/tokens';

export const tabsItemName = 'TabsItem';

// Props for the radio button
export interface TabsItemProps extends IButtonProps {
  /*
   ** The text string for the tab
   */
  content: string;
  /*
   ** A unique key-identifier for each option
   */
  buttonKey: string;

  /*
   ** Whether or not the radio button is selectable
   */
  disabled?: boolean;

  /*
   ** An optional string for the Narrator to read for each RadioButton. If not provided, this will be set to the button's content
   */
  ariaLabel?: string;

  /**
   * A RefObject to access the IFocusable interface. Use this to access the public methods and properties of the component.
   */
  componentRef?: React.RefObject<IFocusable>;
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
