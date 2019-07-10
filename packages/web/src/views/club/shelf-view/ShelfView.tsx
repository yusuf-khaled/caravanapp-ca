import React, { useMemo } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import BookList from './BookList';
import { ShelfEntry, ReadingState } from '@caravan/buddy-reading-types';

interface ShelfViewProps {
  shelf: ShelfEntry[];
  isEditing: boolean;
}

const useStyles = makeStyles(theme => ({
  sectionContainer: {
    marginTop: theme.spacing(3),
  },
  sectionLabel: {
    marginBottom: theme.spacing(1),
  },
}));

export default function ShelfView(props: ShelfViewProps) {
  const classes = useStyles();
  const { shelf, isEditing } = props;

  const shelfMap = useMemo(() => {
    const map: { [key in ReadingState]: ShelfEntry[] } = {
      current: [],
      notStarted: [],
      read: [],
    };
    shelf.forEach(s => {
      map[s.readingState].push(s);
    });
    return map;
  }, [shelf]);

  return (
    <div>
      {isEditing && (
        <div className={classes.sectionContainer}>
          <Typography color="textSecondary" style={{ fontStyle: 'italic' }}>
            If you want to edit your shelf, first click Save in the top-right,
            then click Manage Shelf below.
          </Typography>
        </div>
      )}
      {shelfMap.current.length > 0 && (
        <div className={classes.sectionContainer}>
          <Typography variant={'h6'} className={classes.sectionLabel}>
            Currently Reading
          </Typography>
          <BookList data={shelfMap.current} />
        </div>
      )}
      {shelfMap.notStarted.length > 0 && (
        <div className={classes.sectionContainer}>
          <Typography variant={'h6'} className={classes.sectionLabel}>
            To be Read
          </Typography>
          <BookList data={shelfMap.notStarted} />
        </div>
      )}
      {shelfMap.read.length > 0 && (
        <div className={classes.sectionContainer}>
          <Typography variant={'h6'} className={classes.sectionLabel}>
            Previously Read
          </Typography>
          <BookList data={shelfMap.read} />
        </div>
      )}
    </div>
  );
}
