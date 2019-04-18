import React from 'react';
import PropTypes from 'prop-types';
import FormBody from './FormBody.jsx';

function PlayerCard(props) {
  const { data } = props;
  const handleExit = () => {
    props.pageReturn();
  };
  const getFormData = data => {
    props.getFormData(data);
  };

  return (
    <div className="menu-ui" id={data.id}>
      <button className="back-btn" onClick={handleExit}>
        Return to Players
      </button>
      <div className="menu-wrapper">
        <div className="profile-info">
          <div className="profile-img">
            <img src={data.imageUrl} alt={data.name} />
          </div>
          <div className="profile-author">
            <h2 className="player__name">{data.name}</h2>
            <p className="player__job-title">Winnings: {data.winnings}</p>
            <p className="player__job-title">Country: {data.country}</p>
          </div>
        </div>

        <div className="menu-content">
          {!props.showEditSection ? (
            <div className="group">
              <div className="edit-btn" onClick={props.handleEditClick}>
                Edit User
              </div>
              <div className="logout-btn" onClick={props.handleDeleteClick}>
                Delete User
              </div>
            </div>
          ) : (
            <div className="edit_form">
              <FormBody
                getFormData={getFormData}
                pageReturn={handleExit}
                id={data.id}
                name={data.name}
                country={data.country}
                winnings={data.winnings}
                imageUrl={data.imageUrl}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

PlayerCard.propTypes = {
  class: PropTypes.object.isRequired,
};

export default PlayerCard;
