import React from 'react';
import { makeStyles, createStyles, useTheme, Chip } from '@material-ui/core';
import HeartIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(() =>
  createStyles({
    baseChip: {
      marginRight: 4,
      marginTop: 4,
      zIndex: 1,
    },
    chipText: {
      fontStyle: 'italic',
    },
    chipIcon: {
      color: 'red',
      paddingLeft: 2,
      height: 25,
      width: 25,
    },
  })
);

interface GenresInCommonChipsProps {
  name: string;
  backgroundColor: string;
  common: boolean;
}

export default function GenresInCommonChips(props: GenresInCommonChipsProps) {
  const classes = useStyles();

  const { name, backgroundColor, common } = props;

  function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
  let backgroundColorWithOpacity = backgroundColor;
  const rgbValue = hexToRgb(backgroundColor);
  if (rgbValue) {
    backgroundColorWithOpacity =
      'rgba(' + rgbValue.r + ', ' + rgbValue.g + ', ' + rgbValue.b + ', 0.15)';
  }

  return (
    <Chip
      label={name}
      key={name}
      avatar={common ? <HeartIcon /> : undefined}
      classes={{
        root: classes.baseChip,
        label: classes.chipText,
        avatar: classes.chipIcon,
      }}
      style={{
        backgroundColor: backgroundColorWithOpacity,
      }}
    />
  );
}
