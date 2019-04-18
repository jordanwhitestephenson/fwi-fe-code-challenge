import React from 'react';
import PropTypes from 'prop-types';
import './EditForm.scss';
import { default as UUID } from 'node-uuid';

class FormBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country: '',
      winnings: '',
      imageUrl: '',
      countryCodeError: '',
      winningError: '',
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
    e.preventDefault();
    //If form is going to be used for a player already existing
    const name = this.state.name;
    const countryCode = this.state.country;
    const winningsInput = this.state.winnings;
    if (this.props.id) {
      const data = {
        id: this.props.id,
        name: this.state.name,
        country: countryCode,
        winnings: this.state.winnings,
        imageUrl: this.state.imageUrl,
      };
      this.props.pageReturn();
      this.props.getFormData(data);
    } else {
      var data = {
        name: this.state.name.toString(),
        country: this.state.country.toString(),
        winnings: this.state.winnings,
      };
      if (!countryCode || countryCode.length > 2 || countryCode.length === 1) {
        this.setState({
          countryCodeError: 'Please enter a correct Country Code',
        });
      }
      if (!winningsInput || typeof winningsInput !== 'number') {
        this.setState({
          winningError: 'Please enter correct winnings input',
        });
      } else {
        this.setState({
          winningError: null,
          countryCodeError: null,
        });
        fetch('http://localhost:3001/players/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(res => {
            this.props.pageReturn();
            return res.json();
          })
          .then(text => {
            this.props.addPlayer(text);
          })
          .catch(err => {
            console.log(err);
            alert('Profile update failed, please try again!');
          });
      }
    }
  }

  render() {
    return (
      <div class="form">
        {this.state.error}
        <div class="tab-content">
          <div id="signup">
            <h1>{this.props.formName}</h1>
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
                {this.state.countryCodeError}
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
                {this.state.winningError}
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
FormBody.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default FormBody;
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
