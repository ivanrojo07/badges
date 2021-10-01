import React from "react";
import BadgeForm from "../components/BadgeForm";
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';

import header from '../images/platziconf-logo.svg';

import './styles/BadgeNew.css';

import api from "../api";
import md5 from "md5";


class BadgeNew extends React.Component{
    state = {
        loading: false,
        error_api:null,
        form:{
            first_name:"",
            last_name:"",
            job_title:"",
            twitter:"",
            email:"",
            avatarUrl:""
        }
    };
    handleChange = e=>{
        // Opcion 1
        // const nextForm = this.state.form
        // nextForm[e.target.name]= e.target.value;
        // this.setState({form:nextForm});
        this.setState({
            form:{
                ... this.state.form,
                [e.target.name]:e.target.value,
            }
        });
    };
    handleSubmit = async (e)=>{
        
        e.preventDefault();
        this.setState({
            loading: true,
            error_api:null
        })
        try{
            let hash = md5(this.state.form.email);
            this.state.form.avatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon`;
            await api.badges.create(this.state.form);
            this.setState({
                loading:false,
                error_api:null
            });
            this.props.history.push('/badges');
        }
        catch(e){
            this.setState({
                error_api:e,
                loading: false,
            });
            console.log(this.state);
            alert(this.state)
        }
    }
    render(){
        if(this.state.loading){
            return <PageLoading/>
        }
        return (
            <div>
                <div className="BadgeNew__hero">
                    <img className="img-fluid BadgeNew__hero-image" src={header} alt="Logo"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge name={this.state.form.first_name || "FIRST NAME"} last_name={this.state.form.last_name || "LAST NAME"} twitter={this.state.form.twitter || "TWITTER"} job_title={this.state.form.job_title || "JOB TITLE"} email={this.state.form.email || "mail@mail.com"} />
                        </div>
                        <div className="col-6">
                            <BadgeForm error={this.state.error_api} onChange={this.handleChange} onSubmit={this.handleSubmit} formValues={this.state.form}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BadgeNew;