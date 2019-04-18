import React from 'react';
import PropTypes from 'prop-types';
import './EditForm.scss';
import { COUNTRIES } from '../../constants';

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
    let countryList = Object.keys(COUNTRIES);
    let correctCountry = countryList.includes(this.state.country);
    let countryCode = this.state.country;
    let name = this.state.name;
    let winningsInput = this.state.winnings;

    //If form is going to be used for a player already existing
    if (this.props.id && correctCountry) {
      let data = {
        name: name.toString(),
        country: countryCode.toUpperCase().toString(),
        winnings: winningsInput,
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
      if (!correctCountry) {
        this.setState({
          countryCodeError: 'Country Code is invalid',
        });
      } else {
        let data = {
          name: this.state.name.toString(),
          country: this.state.country.toUpperCase().toString(),
          winnings: this.state.winnings,
        };
        this.setState({
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
            return res.json();
          })
          .then(text => {
            this.props.pageReturn();
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
      <form className="form" onSubmit={this.handleSaveEdit}>
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
                  maxLength="2"
                  type="text"
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
                  type="number"
                  autoComplete="on"
                />
              </div>
              <div className="field-wrap">
                <label>imageUrl</label>
                <input
                  name="imageUrl"
                  value={this.state.imageUrl || ''}
                  onChange={this.onChange}
                  autoComplete="on"
                />
              </div>
              <button type="submit" className="button button-block">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
FormBody.propTypes = {
  pageReturn: PropTypes.func.isRequired,
};

export default FormBody;
