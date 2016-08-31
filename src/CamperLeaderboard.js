import React from 'react';
import './CamperLeaderboard.sass';

const CamperLeaderboard = React.createClass({
  getInitialState: function() {
    console.log('here');
    return {data: []};
  },
  render: function() {
    return (
      <div className="CamperLeaderboard">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 center-block">
              <div className="CamperLeaderboard-header">
                <h1>Camper Leaderboard</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default CamperLeaderboard;
