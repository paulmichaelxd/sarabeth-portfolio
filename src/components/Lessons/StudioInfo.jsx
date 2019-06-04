import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Img from 'gatsby-image';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import LessonButtons from './LessonButtons';
import Lightbox from '../Photos/Lightbox';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 30%',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    padding: `${theme.spacing(6)}px 10vw`,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '50% 50%',
      padding: theme.spacing(6, 2),
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
    },
  },
  gridItem: {
    padding: theme.spacing(0, 4),
  },
  content: {
    ...theme.typography.body1,
    padding: 0,
    margin: 0,
    '& ul': {
      marginLeft: theme.spacing(-4),
      listStyleType: 'none',
    },
    '& ul li:before': {
      content: '"\\2014"',
      paddingRight: theme.spacing(1),
    },
    '& h1': {
      ...theme.typography.h4,
    },
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    border: 'none',
    margin: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  centerButton: {
    gridColumn: '1 / 3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 2',
    },
  },
  photoGallery: {
    cursor: 'pointer',
  },
}));

const StudioInfo = (props) => {
  const { teachingResume, photoGallery, reviewLink } = props;
  const classes = useStyles(props);
  const [photosOpen, setOpen] = useState(false);
  const [currentPhoto, setPhoto] = useState(0);

  return (
    <div className={classes.container}>
      <div className={classes.gridItem}>
        <Typography variant="h2" align="center">
          Teaching Resume
        </Typography>

        <div
          className={classes.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: teachingResume }}
        />
      </div>

      {photoGallery && photoGallery.length && (
        <div className={classes.gridItem}>
          <Typography variant="h2" align="center">
            Photos
          </Typography>

          <Lightbox
            images={photoGallery.map(photo => ({
              src: photo.fullSize.src,
              srcSet: photo.fullSize.srcSet,
              caption: photo.description,
              alt: `${photo.title} (Full Resolution)`,
            }))}
            isOpen={photosOpen}
            currentImage={currentPhoto}
            onClickPrev={() => setPhoto(currentPhoto - 1)}
            onClickNext={() => setPhoto(currentPhoto + 1)}
            onClose={() => setOpen(false)}
          />

          <GridListTile
            component="div"
            className={classes.photoGallery}
            onClick={() => setOpen(true)}
          >
            <Img
              fluid={photoGallery[0].thumbnail}
              alt={photoGallery[0].title}
            />
            <GridListTileBar
              title={(
                <Typography variant="subtitle1">
                  {"View Sarabeth's Studio"}
                </Typography>
              )}
            />
          </GridListTile>
        </div>
      )}

      <div className={classes.centerButton}>
        <LessonButtons reviewLink={reviewLink} />
      </div>
    </div>
  );
};

StudioInfo.propTypes = {
  reviewLink: PropTypes.string,
  teachingResume: PropTypes.string.isRequired,
  photoGallery: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      fullSize: PropTypes.object.isRequired,
      thumbnail: PropTypes.object.isRequired,
    }),
  ).isRequired,
};
StudioInfo.defaultProps = {
  reviewLink: null,
};

export default StudioInfo;
