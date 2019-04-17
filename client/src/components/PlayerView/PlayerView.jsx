import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { getPlayer, deletePlayer } from '../../actions/actions';
import PlayerCard from './PlayerCard';
import './PlayerCard.scss';
import { DELETE_PLAYER } from '../../actions/types';

class PlayerView extends React.Component {
  state = {
    open: false,
    currentUser: '',
  };
  componentDidMount() {
    const { getPlayer } = this.props;
    fetch(`http://localhost:3001/players/${this.props.id}`, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data) {
          getPlayer(data);
          this.setState({
            currentUser: data,
          });
          return data;
        }
        throw new Error(data.message);
      });
  }
  handleEditClick = data => {
    console.log(data);
  };
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      currentUser: nextProps,
    });
  }
  handleDeleteClick = data => {
    this.props.deletePlayer(this.props.id);
    this.props.pageReturn(data);
  };

  render() {
    const playerObject = Object.keys(this.props.player).length;
    return (
      <div>
        {playerObject ? (
          <div>
            <PlayerCard
              pageReturn={this.props.pageReturn}
              data={this.state.currentUser}
              handleEditClick={this.handleEditClick}
              handleDeleteClick={this.handleDeleteClick}
            />
          </div>
        ) : (
          <div>User Deleted </div>
        )}
      </div>
    );
  }
}

PlayerView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connectAdvanced(dispatch => {
  let result;
  const actions = bindActionCreators({ getPlayer, deletePlayer }, dispatch);
  return (state, props) => {
    const player = state.player;
    const players = state.players;
    const nextResult = { ...props, ...actions, player, players };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }
    return result;
  };
})(PlayerView);
