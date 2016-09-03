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
        <a href={this.props.userURL + this.props.username}>
          <img src={this.props.img} />
          {this.props.username}
        </a>
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

const CamperMenu = React.createClass({
  handleRecent: function() {
    this.props.onMenuClick('recent');
  },
  handleAllTime: function() {
    this.props.onMenuClick('alltime');
  },
  render: function() {
    return (
      <div className="CamperLeaderboard-menu">
        <div className="row row-alt">
        <div className="col-xs-1">
        #
        </div>
        <div className="col-xs-5 col-user">
          <span>Camper Name</span>
        </div>
        <div className="col-xs-3">
          <span
            onClick={this.handleRecent}
            className="menu-interactable" >Points in Past 30 Days </span>
        </div>
        <div className="col-xs-3 col-interactable">
          <span
            onClick={this.handleAllTime}
            className="menu-interactable" >All Time Points </span>
        </div>
        </div>
      </div>
    );
  }
});

const CamperLeaderboard = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
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
  handleMenuClick: function(selection) {
    this._updateState(selection);
  },
  componentDidMount: function() {
    this._updateState();
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  _updateState: function(s) {
    const selection = s || 'recent';
    this.serverRequest = this._getJSON(this.props.urlBase + selection, (d) => {
      this.setState({
        data: d
      });
    });
  },
  render: function() {
    const camperRows = this.state.data.map((d, i) => {
      let backgroundColor = 'row-primary';
      if (i % 2 === 1) backgroundColor = 'row-alt';
      return (
        <CamperRow
            key={'camper-' + d.username}
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
    return (
      <div className="CamperLeaderboard">
        <div className="container">
          <div className="CamperLeaderboard-header">
            <div className="row">
              <div className="col-xs-12 center-block">
                  <h1>Camper Leaderboard</h1>
              </div>
            </div>
          </div>
          <CamperMenu onMenuClick={this.handleMenuClick}/>
          <div className="CamperLeaderboard-body">
            {camperRows}
          </div>
        </div>
      </div>
    );
  }
});

export default CamperLeaderboard;
