import React from 'react';
import ReactDOM from 'react-dom';
import CamperLeaderboard from './CamperLeaderboard';
import './index.sass';

ReactDOM.render(
  <CamperLeaderboard urlBase="https://fcctop100.herokuapp.com/api/fccusers/top/"
  />,
  document.getElementById('root')
);
