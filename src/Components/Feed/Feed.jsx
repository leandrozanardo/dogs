import React from 'react';
import PropTypes from 'prop-types';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import { useSocial } from '../../context/SocialContext';

const Feed = ({
  user = 0,
  layout = 'feed',
  filterFollowing = false,
  onPhotosLoaded,
}) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);
  const { following } = useSocial();

  React.useEffect(() => {
    setPages([1]);
    setInfinite(true);
  }, [user, layout, filterFollowing]);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (!infinite) return;
      const scroll = window.scrollY;
      const height = document.body.offsetHeight - window.innerHeight;
      if (scroll > height * 0.75 && !wait) {
        setPages((prev) => [...prev, prev.length + 1]);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, 500);
      }
    }

    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={`${user}-${layout}-${filterFollowing}-${page}`}
          user={user}
          page={page}
          layout={layout}
          filterFollowing={filterFollowing}
          following={following}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
          onPhotosLoaded={onPhotosLoaded}
        />
      ))}
      {!infinite && layout === 'feed' && !filterFollowing && (
        <p className="pg-empty">Não existem mais postagens.</p>
      )}
    </div>
  );
};

Feed.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  layout: PropTypes.oneOf(['feed', 'grid']),
  filterFollowing: PropTypes.bool,
  onPhotosLoaded: PropTypes.func,
};

export default Feed;
