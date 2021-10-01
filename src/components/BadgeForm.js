import React from "react";

class BadgeForm extends React.Component{

    handleClick = (e)=>{
        console.log("button was clicked");
    };
   

    render(){
        return (
            <React.Fragment>
                <h1>BadgeForm</h1>
                <form onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input onChange={this.props.onChange} type="text" className="form-control" value={this.props.formValues.first_name} name="first_name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input onChange={this.props.onChange} type="text" className="form-control" value={this.props.formValues.last_name} name="last_name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={this.props.onChange} type="email" className="form-control" value={this.props.formValues.email} name="email" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="job_title">Job Title</label>
                        <input onChange={this.props.onChange} type="text" className="form-control" value={this.props.formValues.job_title} name="job_title" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="twitter">Twitter Account</label>
                        <input onChange={this.props.onChange} type="text" className="form-control" value={this.props.formValues.twitter} name="twitter" />
                    </div>
                    <button type="submit" onClick={this.handleClick} className="btn btn-primary">Save</button>
                </form>
                {this.props.error && (
                    <p className="text-danger">{this.props.error.message}</p>
                )}
            </React.Fragment>
        )
    }
}

export default BadgeForm;