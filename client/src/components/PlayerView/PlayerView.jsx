import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { getPlayer, deletePlayer, editPlayer } from '../../actions/actions';
import PlayerCard from './PlayerCard';
import './PlayerCard.scss';

class PlayerView extends React.Component {
  state = {
    open: false,
    currentUser: '',
    showEditSection: false,
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

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      currentUser: nextProps,
    });
  }
  handleDeleteClick = data => {
    this.props.deletePlayer(this.props.id);
    this.props.pageReturn(data);
  };

  handleEditClick = data => {
    this.setState({
      showEditSection: true,
    });
  };
  getFormData = data => {
    this.props.editPlayer(this.props.id, data);
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
              showEditSection={this.state.showEditSection}
              getFormData={this.getFormData}
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
  const actions = bindActionCreators(
    { getPlayer, deletePlayer, editPlayer },
    dispatch
  );
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
