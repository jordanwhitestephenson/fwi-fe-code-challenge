import React from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';
import PlayerView from '../PlayerView/PlayerView';
import FormBody from '../PlayerView/FormBody';
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
      showAddPlayer: false,
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
      showAddPlayer: false,
    });
  };
  showAddPlayer = () => {
    this.setState({
      showAddPlayer: !this.state.showAddPlayer,
    });
  };

  render() {
    return (
      <div>
        {this.state.showAddPlayer ? (
          <FormBody
            formName="Add Player"
            pageReturn={this.showPlayers}
            addPlayer={this.props.addPlayer}
          />
        ) : !this.state.showPlayer ||
          this.state.showPlayers ||
          !this.state.showAddPlayer ? (
          <div>
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
          </div>
        ) : null}
        <button className="button button-block" onClick={this.showAddPlayer}>
          {this.state.showAddPlayer ? 'Go Back' : 'Add User'}
        </button>
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
