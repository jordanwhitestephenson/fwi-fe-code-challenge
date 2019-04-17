import React from 'react';
import PropTypes from 'prop-types';
import './EditForm.scss';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country: '',
      winnings: '',
      imageUrl: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
  }
  componentDidMount() {
    this.setState({
      name: this.props.name,
      country: this.props.country,
      winnings: this.props.winnings,
      imageUrl: this.props.imageUrl,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSaveEdit(e) {
    const data = {
      id: this.props.id,
      name: this.state.name,
      country: this.state.country,
      winnings: this.state.winnings,
      imageUrl: this.state.imageUrl,
    };
    this.props.getFormData(data);
    this.props.pageReturn();
  }

  render() {
    return (
      <div class="form">
        <div class="tab-content">
          <div id="signup">
            <h1>Edit</h1>
            <div>
              <div class="top-row field-wrap">
                <div class="">
                  <label>Name</label>
                  <input
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    required
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="field-wrap">
                <label>Country</label>
                <input
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  required
                  autocomplete="off"
                />
              </div>
              <div class="field-wrap">
                <label>Winnings</label>
                <input
                  name="winnings"
                  value={this.state.winnings}
                  onChange={this.onChange}
                  required
                  autocomplete="off"
                />
              </div>
              <div class="field-wrap">
                <label>imageUrl</label>
                <input
                  name="imageUrl"
                  value={this.state.imageUrl}
                  onChange={this.onChange}
                  required
                  autocomplete="off"
                />
              </div>
              <button onClick={this.handleSaveEdit} class="button button-block">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default connectAdvanced(dispatch => {
//   let result;
//   const actions = bindActionCreators(
//     { getPlayer, deletePlayer, editPlayer },
//     dispatch
//   );
//   return (state, props) => {
//     const player = state.player;
//     const players = state.players;
//     const nextResult = { ...props, ...actions, player, players };

//     if (!shallowEqual(result, nextResult)) {
//       result = nextResult;
//     }
//     return result;
//   };
// })(PlayerView);
export default EditForm;
