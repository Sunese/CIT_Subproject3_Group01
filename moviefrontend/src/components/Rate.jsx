import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Rating } from 'react-simple-star-rating'

function RatingComponent() {
    const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
  }

  const handleReset = () => {
    // Set the initial value
    setRating(0)
  }

  return (
    <>
      <Rating className="mb-3" onClick={handleRating} initialValue={rating} iconsCount={10} />
      {rating == 0 ? (
        <>
        <br/>
        <br/>
        <br/>
        </>
      ) : (
        <Button className="mb-1" variant="danger" onClick={handleReset}>Remove rating</Button>
        )}
    </>
  )
}

const Rate = ({isAddRating}) => {
  
    const addRating = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Add Rating</Popover.Header>
        <Popover.Body>
          <RatingComponent/>
        </Popover.Body>
      </Popover>
    )
  
    const editRating = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Edit Rating</Popover.Header>
        <Popover.Body>
          <RatingComponent/>
        </Popover.Body>
      </Popover>
    )
  
    return (
      <>
      {isAddRating ? (<OverlayTrigger trigger="click" placement="right" overlay={addRating}>
          <Button variant="primary">Add Rating</Button>
      </OverlayTrigger>
      ) : (<OverlayTrigger trigger="click" placement="right" overlay={editRating}>
          <Button variant="primary">Edit Rating</Button>
      </OverlayTrigger>)
      }
      </>
    );
  }
  
Rate.propTypes = {
    isAddRating: PropTypes.bool.isRequired
};


export default Rate;