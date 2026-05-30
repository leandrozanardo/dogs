import React from 'react';
import { UserContext } from '../../UserContext';
import Feed from '../Feed/Feed';
import ProfileHeader from '../Profile/ProfileHeader';
import ProfileTabs from '../Profile/ProfileTabs';
import SavedGrid from '../Profile/SavedGrid';
import Head from '../Helper/Head';

const UserProfilePage = () => {
  const { data } = React.useContext(UserContext);
  const [tab, setTab] = React.useState('posts');

  if (!data) return null;

  return (
    <>
      <Head title={`@${data.username}`} />
      <ProfileHeader
        username={data.username}
        displayName={data.nome}
        isOwnProfile
      />
      <ProfileTabs tab={tab} onTabChange={setTab} />
      {tab === 'posts' ? (
        <Feed user={data.id} layout="grid" />
      ) : (
        <SavedGrid />
      )}
    </>
  );
};

export default UserProfilePage;
