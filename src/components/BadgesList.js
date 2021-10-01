import React from "react";
import { Link } from "react-router-dom";

import './styles/BadgesList.css';

function useSearchBadges(badges){
    const [query,setQuery] = React.useState('')
    const [filteredResults, setFilteredResults] = React.useState(badges)
    React.useMemo(()=>{
        const result = badges.filter((element)=>{
            return `${element.first_name} ${element.last_name}`.toLowerCase().includes(query.toLowerCase());
        })
        setFilteredResults(result);
    },[badges,query]);
    
    return {query, setQuery, filteredResults}
}

function BadgesList(props){

    const badges = props.badges
    const {query, setQuery, filteredResults} = useSearchBadges(badges)
    if(filteredResults.length === 0){
        return (
            <React.Fragment>

                <div className="form-group">
                    <label htmlFor="">Filter Badges</label>
                    <input type="text" value={query} onChange={(e)=>{
                        setQuery(e.target.value)
                    }} className="form-control mt-3 mb-3" />
                </div>
                <h3>No badges found</h3>
                <Link to="/badges/new" className="btn btn-primary">Create a Badge</Link>
            </React.Fragment>
        )
    }
    return (
        <div className="BadgesList">
            <div className="form-group">
                <label htmlFor="">Filter Badges</label>
                <input type="text" value={query} onChange={(e)=>{
                    setQuery(e.target.value)
                }} className="form-control mt-3 mb-3" />
            </div>
            <ul className="list-unstyled">
                {filteredResults.map((badge)=>{
                    return (
                        <li key={badge.id}>
                            <div className="BadgesListItem">
                                <img
                                className="BadgesListItem__avatar"
                                src={badge.avatarUrl}
                                alt={`${badge.first_name} ${badge.last_name}`}
                                />

                                <div>
                                <strong>
                                    {badge.first_name} {badge.last_name}
                                </strong>
                                <br />@{badge.twitter}
                                <br />
                                {badge.job_title}
                                </div>
                            </div>
                            <Link to={`/badges/${badge.id}`} className="btn btn-primary">Show</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

};

export default BadgesList;