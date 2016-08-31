import React from 'react';
import './CamperLeaderboard.sass';

const CamperRow = React.createClass({
  render: function() {
    return (
    <div className={"row " + this.props.background}>
      <div className="col-xs-1">
        {this.props.ranking}
      </div>
      <div className="col-xs-5 col-user">
        <img src={this.props.img} />
        <a href={this.props.userURL + this.props.username}>{this.props.username}</a>
      </div>
      <div className="col-xs-3">
        {this.props.recent}
      </div>
      <div className="col-xs-3">
        {this.props.alltime}
      </div>
    </div>
  );
  }
});

const CamperLeaderboard = React.createClass({
  getInitialState: function() {
    return {data: [1,2]};
  },
  _getJSON: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        callback(data);
      } else {
        // We reached our target server, but it returned an error
        console.log('error');
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log('error');
    };

    request.send();
  },
  componentDidMount: function() {
    this.serverRequest = this._getJSON(this.props.urlBase + 'recent', (d) => {
      this.setState({
        data: d
      });
    });
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
    const camperRows = this.state.data.map((d, i) => {
      let backgroundColor = 'row-primary';
      if (i % 2 === 1) backgroundColor = 'row-alt';
      return (
        <CamperRow
            userURL="https://www.freecodecamp.com/"
            ranking={i + 1}
            background={backgroundColor}
            username={d.username}
            img={d.img}
            alltime={d.alltime}
            recent={d.recent}
        />
      );
    });
    console.log(this.state.data);
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
          <div className="CamperLeaderboard-body">
            {camperRows}
          </div>
        </div>
      </div>
    );
  }
});

export default CamperLeaderboard;
