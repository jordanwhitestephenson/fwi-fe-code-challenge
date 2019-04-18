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
    const countryCode = this.state.country;
    const winningsInput = this.state.winnings;
    if (this.props.id) {
      let data = {
        name: this.state.name.toString(),
        country: countryCode.toString(),
        winnings: this.state.winnings,
        imageUrl: this.state.imageUrl.toString(),
      };
      fetch(`http://localhost:3001/players/${this.props.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => {
          this.props.pageReturn();
          return res.json();
        })
        .then(result => {
          this.props.getFormData(result);
        })
        .catch(err => console.log(err));
    } else {
      let data = {
        name: this.state.name.toString(),
        country: this.state.country.toString(),
        winnings: this.state.winnings,
      };
      if (!countryCode || countryCode.length > 2 || countryCode.length === 1) {
        this.setState({
          countryCodeError: 'Please enter a correct Country Code',
        });
      }

      if (!winningsInput || typeof parseInt(winningsInput) !== 'number') {
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
      <div className="form">
        {this.state.error}
        <div className="tab-content">
          <div id="signup">
            <h1>{this.props.formName}</h1>
            <div>
              <div className="top-row field-wrap">
                <div className="">
                  <label>Name</label>
                  <input
                    name="name"
                    value={this.state.name || ''}
                    onChange={this.onChange}
                    required
                    autoComplete="on"
                  />
                </div>
              </div>
              <div className="field-wrap">
                {this.state.countryCodeError}
                <label>Country</label>
                <input
                  name="country"
                  value={this.state.country || ''}
                  onChange={this.onChange}
                  required
                  autoComplete="on"
                />
              </div>
              <div className="field-wrap">
                {this.state.winningError}
                <label>Winnings</label>
                <input
                  name="winnings"
                  value={this.state.winnings || ''}
                  onChange={this.onChange}
                  required
                  autoComplete="on"
                />
              </div>
              <div className="field-wrap">
                <label>imageUrl</label>
                <input
                  name="imageUrl"
                  value={this.state.imageUrl || ''}
                  onChange={this.onChange}
                  required
                  autoComplete="on"
                />
              </div>
              <button
                onClick={this.handleSaveEdit}
                className="button button-block"
              >
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
  pageReturn: PropTypes.func.isRequired,
};

export default FormBody;
