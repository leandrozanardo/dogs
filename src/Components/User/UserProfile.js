import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../Feed/Feed';
import ProfileHeader from '../Profile/ProfileHeader';
import Head from '../Helper/Head';

const UserProfile = () => {
  const { user } = useParams();

  return (
    <section className="container mainContainer">
      <Head title={`@${user}`} />
      <ProfileHeader username={user} displayName={user} />
      <Feed user={user} layout="grid" />
    </section>
  );
};

export default UserProfile;
