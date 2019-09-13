import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  PostUserInfo,
  FilterAutoMongoKeys,
  ShelfEntry,
  SelectedGenre,
} from '@caravan/buddy-reading-types';
import PostLikesThumbnails from './PostLikesThumbnails';
import DiscordLoginModal from './DiscordLoginModal';

const useStyles = makeStyles(theme => ({
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  likesContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heartIcon: {
    padding: 4,
  },
  likeButton: {
    height: 30,
    width: 30,
  },
  createClubButtonContainer: {
    padding: theme.spacing(1),
  },
  createClubButton: {
    textTransform: 'none',
  },
}));

interface PostActionsProps {
  likes: PostUserInfo[];
  hasLiked: boolean | null;
  numLikes: number;
  onClickLike: () => void;
  likeButtonDisabled: boolean;
  shelf: FilterAutoMongoKeys<ShelfEntry>[];
  shelfName: string;
  shelfGenres: SelectedGenre[];
  shelfAuthorInfo: PostUserInfo;
  userId: string | undefined;
}

function PostActions(props: PostActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    likes,
    onClickLike,
    hasLiked,
    numLikes,
    likeButtonDisabled,
    shelf,
    shelfName,
    shelfGenres,
    shelfAuthorInfo,
    userId,
  } = props;

  const [loginModalShown, setLoginModalShown] = React.useState(false);

  const screenSmallerThanSm = useMediaQuery(theme.breakpoints.down('xs'));

  const maxLikeThumbnailsShown = screenSmallerThanSm ? 2 : 5;

  const likeListLength = 10;

  function onCloseLoginModal() {
    setLoginModalShown(false);
  }

  function handleLike() {
    if (userId) {
      onClickLike();
    } else {
      setLoginModalShown(true);
    }
  }

  return (
    <div className={classes.actionContainer}>
      <div className={classes.likesContainer}>
        <IconButton
          onClick={handleLike}
          classes={{ root: classes.heartIcon }}
          disabled={likeButtonDisabled}
        >
          <FavoriteIcon
            className={classes.likeButton}
            style={{
              fill: hasLiked ? '#AF0020' : undefined,
            }}
          />
        </IconButton>
        <PostLikesThumbnails
          likes={likes}
          numLikes={numLikes}
          maxShown={maxLikeThumbnailsShown}
          likeListLength={likeListLength}
        />
      </div>
      <div className={classes.createClubButtonContainer}>
        {userId && (
          <Link
            component={RouterLink}
            to={{
              pathname: '/clubs/create',
              state: {
                shelf: shelf,
                invites:
                  shelfAuthorInfo.userId === userId || hasLiked
                    ? likes.filter(l => l.userId !== userId)
                    : likes.map(l => l.userId).includes(shelfAuthorInfo.userId)
                    ? likes
                    : [shelfAuthorInfo, ...likes],
                inviteListLength: likeListLength,
                shelfName,
                shelfGenres,
                shelfAuthorName: shelfAuthorInfo.name,
              },
            }}
            underline="none"
          >
            <Button
              className={classes.createClubButton}
              variant="contained"
              color="primary"
            >
              <Typography variant="subtitle2">
                Create club from shelf
              </Typography>
            </Button>
          </Link>
        )}
        {!userId && (
          <Button
            className={classes.createClubButton}
            variant="contained"
            color="primary"
            onClick={() => setLoginModalShown(true)}
          >
            <Typography variant="subtitle2">Create club from shelf</Typography>
          </Button>
        )}
      </div>
      <DiscordLoginModal
        onCloseLoginDialog={onCloseLoginModal}
        open={loginModalShown}
      />
    </div>
  );
}

export default PostActions;
