import React from "react";

import api from "../api";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import BadgeDetails from "./BadgeDetails";


class BadgeDetailContainer extends React.Component{
    state={
        loading:true,
        error:null,
        data:undefined,
        modalIsOpen: false,
    };
    componentDidMount(){
        this.fetchData();
    }
    fetchData = async ()=>{
        this.setState({
            loading: true,
            error:null
        });
        try {
            const data = await api.badges.read(this.props.match.params.badge_id);
            this.setState({loading:false, data:data});
        } catch (error) {
            this.setState({loading:false, error:error});
        }
    }
    handleOpenModal = (e)=>{
        this.setState({modalIsOpen: true});
    }
    handleCloseModal = (e)=>{
        this.setState({modalIsOpen: false});
    }
    handleDeleteBadge = async (e)=>{
        this.setState({loading:true,error:null});
        try {
            api.badges.remove(this.props.match.params.badge_id);
            this.setState({loading:false})
            this.props.history.push('/badges');
        } catch (error) {
            this.setState({loading:false, error:error});
            
        }
    }
    render(){
        if (this.state.loading) {
            return <PageLoading/>
        }
        if (this.state.error) {
            return <PageError error={this.state.error} />
        }
        // const badge = this.state.data;
        return (
            <BadgeDetails badge={this.state.data} onCloseModal={this.handleCloseModal} onOpenModal={this.handleOpenModal} modalIsOpen={this.state.modalIsOpen} onDeleteBadge={this.handleDeleteBadge}/>
        );
    }
}

export default BadgeDetailContainer;