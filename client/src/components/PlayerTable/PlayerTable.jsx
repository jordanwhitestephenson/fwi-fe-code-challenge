import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { COUNTRIES } from '../../constants';
import { fetchPlayersSuccess } from '../../actions/actions';
import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class PlayerTable extends PureComponent {
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        country: PropTypes.oneOf(Object.keys(COUNTRIES)),
        winnings: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
    fetchPlayersSuccess: PropTypes.func.isRequired,
  };
  state = {
    players: '',
    showPlayers: false,
  };
  componentDidMount() {
    const { fetchPlayersSuccess } = this.props;
    fetch('http://localhost:3001/players?size=10', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data) {
          fetchPlayersSuccess(data);
          return data;
        }
        throw new Error(data.message);
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.players !== this.state.players) {
      this.setState({
        players: nextProps.players,
      });
    }
  }
  render() {
    const { players } = this.props;
    if (this.state.players) {
      return (
        <div
          id="player-table-grid"
          role="grid"
          aria-label="Poker Players"
          className="player-table"
        >
          <TableHeader />
          <TableBody players={players} showPlayers={this.state.showPlayers} />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators({ fetchPlayersSuccess }, dispatch);

  return (state, props) => {
    const players = state.playerIds.map(id => state.players[id]);
    const nextResult = { ...props, ...actions, players };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PlayerTable);
