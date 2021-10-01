import React from 'react';
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import confLogo from '../images/platziconf-logo.svg'
import './styles/BadgeDetail.css';
import DeleteBadgeModal from '../components/DeleteBadgeModal';

function BadgeDetails(props){
    const badge = props.badge
    return ( <React.Fragment>
        <div className="BadgeDetails__hero">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src={confLogo} alt="Logo de la conferencia" />
                    </div>
                    <div className="col-6 BadgeDetails__hero-attendant-name">
                        <h1>{badge.first_name} {badge.last_name}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <Badge name={badge.first_name} last_name={badge.last_name} email={badge.email} twitter={badge.twitter} job_title={badge.job_title} />
                </div>
                <div className="col-6">
                    <h2>Actions</h2>
                    <div>
                        <Link className="btn btn-primary mb-4" to={`/badges/${badge.id}/edit`}>Edit</Link>

                    </div>
                    <div>
                        <Link className="btn btn-danger mb-4" onClick={props.onOpenModal} >Eliminar</Link>
                        <DeleteBadgeModal isOpen={props.modalIsOpen}  onClose={props.onCloseModal} onDeleteBadge={props.onDeleteBadge} />
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>) 
}

export default BadgeDetails;