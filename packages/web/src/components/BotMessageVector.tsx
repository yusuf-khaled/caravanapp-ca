import React from 'react';

import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

import { CARAVAN_BOT_NAME } from '../common/globalConstants';

const botAvatarSrc =
  'https://storage.googleapis.com/buddy-reading-storage-pub/vectors/bot.svg';
const defaultAvatarSize = 48;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    avatarContainer: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 16,
    },
    textContainer: {
      display: 'flex',
      position: 'relative',
      flex: 1,
      borderRadius: 8,
      padding: 8,
      border: `1px solid ${theme.palette.text.hint}`,
    },
    botAvatarImg: {
      objectFit: 'contain',
    },
  })
);

interface BotMessageVectorProps {
  message: string;
  avatarSize?: number;
}

export default function BotMessageVector(props: BotMessageVectorProps) {
  const { message, avatarSize } = props;
  const avatarSizeToUse = avatarSize || defaultAvatarSize;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.avatarContainer}>
        <img
          src={botAvatarSrc}
          alt={CARAVAN_BOT_NAME}
          className={classes.botAvatarImg}
          style={{ height: avatarSizeToUse, width: avatarSizeToUse }}
        />
      </div>
      <div className={classes.textContainer}>
        <Typography>{message}</Typography>
      </div>
    </div>
  );
}
