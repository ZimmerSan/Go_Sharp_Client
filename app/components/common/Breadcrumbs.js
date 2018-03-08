import React from 'react';
import {Link} from "react-router";

class BreadCrumbs extends React.Component {
    render() {
        let self = this;
        return (
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <h2>{self.props.pageTitle}</h2>
                    <ol className="breadcrumb">
                        <li className="active">
                            <Link to="/">Home</Link>
                        </li>
                        {self.props.elements.map((e, index) =>
                            index !== self.props.elements.length - 1
                                ? <li><Link to={e.link}>{e.name}</Link></li>
                                : <li className='active'><strong>{e.name}</strong></li>
                        )}
                    </ol>
                </div>
                <div className="col-lg-2">

                </div>
            </div>
        )
    }
}

export default BreadCrumbs