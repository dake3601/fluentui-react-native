import * as React from 'react';
import { ITextProps } from '@fluentui-react-native/text';
import type { IViewWin32Props } from '@office-iss/react-native-win32';
import { IRenderData } from '@uifabricshared/foundation-composable';
import { IForegroundColorTokens, FontTokens } from '@fluentui-react-native/tokens';
import { FocusZoneProps } from '@fluentui-react-native/focus-zone';
import { ViewProps } from 'react-native';

export const tabsName = 'Tabs';

export interface ITabsContext {
  /*
   ** The currently selected RadioButton's key
   */
  selectedKey: string | null;

  /*
   ** Index of currently selected key
   */

  getTabId?: (key: string, index: number) => void;

  /*
   ** Updates the selected button and calls the client’s onTabsClick callback
   */
  onTabsClick?: (key: string) => void;

  /*
   ** Updates the selected button's ref to set as the default tabbable element
   */
  updateSelectedButtonRef?: (ref: React.RefObject<any>) => void;

  /*
   ** Array of radio button keys in the group
   */
  buttonKeys?: string[];
  
  /*
  ** A Map to for a TabItems corresponding view
  */
  views?: Map<string, React.ReactNode[]> | null;
}

export interface TabsInfo{
  headersOnly?: boolean; 
}

export interface TabsState {
  context: ITabsContext;
  info: TabsInfo;
}

export interface TabsProps extends Pick<FocusZoneProps, 'isCircularNavigation'> {
  /*
   ** Descriptive label for the RadioGroup. This will be displayed as the title of the radio group to the user
   */
  label: string;

  /*
   ** The key of the RadioButton that will initially be selected
   */
  defaultSelectedKey?: string;

  /*
   **  OPTIONAL: An aria label for narrator. If not provided, it will be set to the label of the radio group
   */
  ariaLabel?: string;

  /*
   ** The key of the selected option. If you provide this, you must maintain selection state by observing
   ** onTabsClick events and passing a new value in when changed. This overrides defaultSelectedKey
   ** and makes the RadioGroup a controlled component.
   */
  selectedKey?: string;

  /*
   ** Callback for receiving a notification when the choice has been changed
   */
  onTabsClick?: (key: string) => void;

  /*
  ** Callback for recieving the key and index when a tab is selected
  */
  getTabId?: (key: string, index: number) => void;
  
  /*
  ** Sets whether to only render the header
  */
  headersOnly?: boolean; 

  testID?: string;
}

export interface TabsTokens extends IForegroundColorTokens, FontTokens {}

export interface TabsSlotProps {
  root: React.PropsWithRef<IViewWin32Props>;
  label: ITextProps;
  container: ViewProps & FocusZoneProps;
  tabPanel: ViewProps & FocusZoneProps;
}

export type TabsRenderData = IRenderData<TabsSlotProps, TabsState>;

export interface TabsType {
  props: TabsProps;
  tokens: TabsTokens;
  slotProps: TabsSlotProps;
  state: TabsState;
}
