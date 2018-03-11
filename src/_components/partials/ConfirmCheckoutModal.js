import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import {siteTemplateService} from "../../_services/site-template.service";
import {history} from '../../_helpers'

export default class ConfirmCheckoutModal extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        siteTemplateService
            .deleteOne(this.props.template.id)
            .then(history.push('/siteTemplates'));
    };

    render() {
        const {template} = this.props;

        return (
        <div className="modal inmodal fade" id="confirmCheckoutModal" tabIndex="-1" role="dialog"  aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        <i className="fa fa-warning modal-icon"/>
                        <h4 className="modal-title">Confirm delete</h4>
                    </div>
                    <div className="modal-body">
                        <p>You are going to <strong>delete</strong> item <strong>{template.title}</strong>. Confirm the action please.</p>
                    </div>
                    <div className="modal-footer">
                        <Button bsStyle="white" data-dismiss="modal">Cancel</Button>
                        <Button bsStyle="danger" onClick={this.onSubmit}>
                            <i className="fa fa-trash"/> Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        );
    };
}
