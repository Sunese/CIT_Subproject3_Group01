import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const addBookmark = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Add Note</Popover.Header>
            <Popover.Body>
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows="3" />
            </Form.Group>
            </Form>
            </Popover.Body>
            <Button variant="primary">Save</Button>
        </Popover>
    )
        
const editBookmark = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Edit Note</Popover.Header>
            <Popover.Body>
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows="3" />
            </Form.Group>
            </Form>
            </Popover.Body>
            <Button variant="primary">Save</Button>
            <Button variant="danger">Remove</Button>
        </Popover>
)

const Bookmark = ({isAddBookmark}) => (
    <>
    {isAddBookmark ? (<OverlayTrigger trigger="click" placement="right" overlay={addBookmark}>
        <Button variant="primary">Add Bookmark</Button>
    </OverlayTrigger>
    ) : (<OverlayTrigger trigger="click" placement="right" overlay={editBookmark}>
        <Button variant="primary">Edit Bookmark</Button>
    </OverlayTrigger>)
    }
    </>
    );

Bookmark.propTypes = {
    isAddBookmark: PropTypes.bool.isRequired,
};

export default Bookmark;