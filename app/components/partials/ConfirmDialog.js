import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {deleteSiteTemplate} from "../../api/SiteTemplateRequests";

export default class ConfirmDeleteDialog extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        deleteSiteTemplate(this.props.template.Id, () => window.location = '/siteTemplates');
    };

    render() {
        let self = this;

        return (
                <Modal {...self.props}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Delete {self.props.template.Title}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={self.props.onHide}>Cancel</Button>
                        <Button bsStyle="danger" onClick={self.onSubmit}>
                            <i className="fa fa-trash"/> Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
        );
    };
}
