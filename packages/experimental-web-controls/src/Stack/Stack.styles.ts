import { IStackSettings, IStackProps } from './Stack.types';
import { parseGap, parsePadding } from './StackUtils';
import { augmentPlatformTheme } from '@uifabric/theming-react-native';
import { ITheme } from '@uifabric/theming';
import { styleFunction } from '@uifabric/foundation-tokens';
import { IStyleProp } from '@uifabric/foundation-settings';
import { ICSSStyle } from '../htmlTypes';

const nameMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

export function loadStackSettings(): void {
  const settings: IStackSettings = {
    root: {
      style: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: 'auto',
        overflow: 'visible',
        height: '100%'
      }
    },
    inner: {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'visible',
        boxSizing: 'border-box',
        maxWidth: '100vw'
      }
    }
  };
  augmentPlatformTheme({
    settings: {
      RNFStack: settings
    }
  });
}

function _getAlignment(
  horizontal: IStackProps['horizontal'],
  horizontalAlign: IStackProps['horizontalAlign'],
  verticalAlign: IStackProps['verticalAlign']
): IStyleProp<ICSSStyle> {
  return [
    horizontalAlign && {
      [horizontal ? 'justifyContent' : 'alignItems']: nameMap[horizontalAlign] || horizontalAlign
    },
    verticalAlign && {
      [horizontal ? 'alignItems' : 'justifyContent']: nameMap[verticalAlign] || verticalAlign
    }
  ];
}

function _getCommonSelectors(disableShrink: IStackProps['disableShrink']): object {
  // selectors to be applied regardless of wrap or direction
  return {
    // flexShrink styles are applied by the StackItem
    '> *:not(.ms-StackItem)': {
      flexShrink: disableShrink ? 0 : 1
    }
  };
}

// styles to be applied to all direct children regardless of wrap or direction
const childStyles = {
  textOverflow: 'ellipsis'
};

const _keyProps: (keyof IStackProps)[] = [
  'verticalFill',
  'horizontal',
  'reversed',
  'gap',
  'grow',
  'wrap',
  'horizontalAlign',
  'verticalAlign',
  'disableShrink',
  'childrenGap',
  'maxHeight',
  'maxWidth',
  'padding'
];

function _buildRootStyles(tokenProps: IStackProps, theme: ITheme): IStackProps {
  const {
    verticalFill,
    horizontal,
    reversed,
    gap,
    grow,
    wrap,
    horizontalAlign,
    verticalAlign,
    disableShrink,
    maxHeight,
    maxWidth,
    padding
  } = tokenProps;
  let childrenGap = tokenProps.childrenGap || gap;
  const { rowGap, columnGap } = parseGap(childrenGap, theme);

  return {
    style: [
      {
        maxWidth,
        maxHeight,
        flexWrap: wrap ? 'wrap' : 'nowrap'
      },
      (horizontal || !wrap) && {
        height: verticalFill ? '100%' : 'auto'
      },
      _getAlignment(horizontal, horizontalAlign, verticalAlign),
      !wrap && {
        flexDirection: horizontal ? (reversed ? 'row-reverse' : 'row') : reversed ? 'column-reverse' : 'column',
        maxWidth,
        maxHeight,
        padding: parsePadding(padding, theme),
        boxSizing: 'border-box',

        selectors: {
          '> *': childStyles,

          // apply gap margin to every direct child except the first direct child if the direction is not reversed,
          // and the last direct one if it is
          [reversed ? '> *:not(:last-child)' : '> *:not(:first-child)']: [
            horizontal && {
              marginLeft: `${columnGap.value}${columnGap.unit}`
            },
            !horizontal && {
              marginTop: `${rowGap.value}${rowGap.unit}`
            }
          ],

          ..._getCommonSelectors(disableShrink)
        }
      },
      grow &&
      !wrap && {
        flexGrow: grow === true ? 1 : grow,
        overflow: 'hidden'
      }
    ]
  } as IStackProps;
}

export const buildStackRootStyles = styleFunction<IStackProps, ITheme>(_buildRootStyles, _keyProps);

const _innerKeyProps: (keyof IStackProps)[] = [
  'horizontal',
  'reversed',
  'gap',
  'horizontalAlign',
  'verticalAlign',
  'disableShrink',
  'childrenGap',
  'padding'
];

function _buildInnerStyles(tokenProps: IStackProps, theme: ITheme): IStackProps {
  const { horizontal, reversed, gap, horizontalAlign, verticalAlign, disableShrink, padding } = tokenProps;
  let childrenGap = tokenProps.childrenGap || gap;
  const { rowGap, columnGap } = parseGap(childrenGap, theme);
  const horizontalMargin = `${-0.5 * columnGap.value}${columnGap.unit}`;
  const verticalMargin = `${-0.5 * rowGap.value}${rowGap.unit}`;

  return {
    style: [
      {
        marginLeft: horizontalMargin,
        marginRight: horizontalMargin,
        marginTop: verticalMargin,
        marginBottom: verticalMargin,
        padding: parsePadding(padding, theme),
        // avoid unnecessary calc() calls if horizontal gap is 0
        width: columnGap.value === 0 ? '100%' : `calc(100% + ${columnGap.value}${columnGap.unit})`,
        maxWidth: '100vw',

        selectors: {
          '> *': {
            margin: `${0.5 * rowGap.value}${rowGap.unit} ${0.5 * columnGap.value}${columnGap.unit}`,

            ...childStyles
          },
          ..._getCommonSelectors(disableShrink)
        }
      },
      _getAlignment(horizontal, horizontalAlign, verticalAlign),
      horizontal && {
        flexDirection: reversed ? 'row-reverse' : 'row',

        // avoid unnecessary calc() calls if vertical gap is 0
        height: rowGap.value === 0 ? '100%' : `calc(100% + ${rowGap.value}${rowGap.unit})`,

        selectors: {
          '> *': {
            maxWidth: columnGap.value === 0 ? '100%' : `calc(100% - ${columnGap.value}${columnGap.unit})`
          }
        }
      },
      !horizontal && {
        flexDirection: reversed ? 'column-reverse' : 'column',
        height: `calc(100% + ${rowGap.value}${rowGap.unit})`,

        selectors: {
          '> *': {
            maxHeight: rowGap.value === 0 ? '100%' : `calc(100% - ${rowGap.value}${rowGap.unit})`
          }
        }
      }
    ]
  } as IStackProps;
}

export const buildStackInnerStyles = styleFunction<IStackProps, ITheme>(_buildInnerStyles, _innerKeyProps);