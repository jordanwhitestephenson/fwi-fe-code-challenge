import React from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';
import PlayerView from '../PlayerView/PlayerView';

import Avatar from '../../Avatar';
import { COUNTRIES } from '../../constants';

class TableBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: '',
      showPlayer: false,
      playerID: '',
      showPlayers: '',
    };
  }
  componentWillMount(props) {
    this.setState({
      players: this.props.players,
      showPlayers: this.props.showPlayers,
    });
  }

  handleListItemClick = (event, index) => {
    this.setState({
      showPlayers: !this.state.showPlayers,
      playerID: event.target.parentElement.id,
    });
  };
  showPlayers = () => {
    this.setState({
      showPlayers: true,
      playerID: null,
    });
  };

  render() {
    return (
      <div>
        {!this.state.showPlayer || this.state.showPlayers ? (
          <table
            id="player-table-body"
            role="presentation"
            className="table table--body"
          >
            <tbody>
              {this.props.players.map(
                ({ id, name, country, winnings, imageUrl }) => (
                  <tr
                    key={id}
                    role="row"
                    id={id}
                    className="table__row"
                    onClick={this.handleListItemClick}
                  >
                    <td role="gridcell" className="table__avatar">
                      <Avatar src={imageUrl} />
                    </td>
                    <td role="gridcell" className="table__player">
                      {name}
                    </td>
                    <td role="gridcell" className="table__winnings">
                      {winnings.toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </td>
                    <td role="gridcell" className="table__native">
                      <div className="country">
                        <Avatar>
                          <Flags code={country} alt="" />
                        </Avatar>
                        {country}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : null}
        {this.state.playerID ? (
          <div>
            <PlayerView
              id={this.state.playerID}
              pageReturn={this.showPlayers}
              players={this.props.players}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

TableBody.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;
