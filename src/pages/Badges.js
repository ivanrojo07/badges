import React from "react";
import {Link} from "react-router-dom";
import BadgesList from "../components/BadgesList";
import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import api from "../api";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import MiniLoader from "../components/MiniLoader";

class Badges extends React.Component{
    
    constructor(props){
        super(props);
        console.log('1. constructor()');
        this.state = {
            loading: true,
            error:null,
            data: undefined
        };
    }
    render(){
        console.log('2. render')
        if( this.state.loading === true && !this.state.data){
            return <PageLoading/>
        }
        if(this.state.error){
            return <PageError error={this.state.error}/>
        }
        return (
            <div>
                <div className="badges">
                    <div className="Badges__hero">
                        <div className="badges__container">
                            <img src={confLogo} alt="Conf Logo" className="Badges_conf-logo" />
                        </div>
                    </div>
                </div>
                <div className="Badge__container">
                    <div className="Badges__buttons">
                        <Link to="/badges/new" className="btn btn-primary">New Badge</Link>
                    </div>
                </div>
                <div className="Badges__list">
                    <div className="Badges__container">
                        <BadgesList badges={this.state.data} />    
                        {this.state.loading && <MiniLoader/>}
                    </div>
                </div>
            </div>
        );
    };
    componentDidMount(){
        console.log('3. ComponentDidMount()');
        this.fetchData();
        this.interval_id = setInterval(this.fetchData,5000);
        // this.timeoutId = setTimeout(()=>{
        //     this.setState({
        //         data:[
        //             {
        //               id: '2de30c42-9deb-40fc-a41f-05e62b5939a7',
        //               name: 'Freda',
        //               last_name: 'Grady',
        //               job_title: 'Legacy Brand Director',
        //               twitter: 'FredaGrady22221-7573',
        //               avatarUrl:
        //                 'https://www.gravatar.com/avatar/f63a9c45aca0e7e7de0782a6b1dff40b?d=identicon',
        //             },
        //             {
        //               id: 'd00d3614-101a-44ca-b6c2-0be075aeed3d',
        //               name: 'Major',
        //               last_name: 'Rodriguez',
        //               job_title: 'Human Research Architect',
        //               twitter: 'MajorRodriguez61545',
        //               avatarUrl:
        //                 'https://www.gravatar.com/avatar/d57a8be8cb9219609905da25d5f3e50a?d=identicon',
        //             },
        //             {
        //               id: '63c03386-33a2-4512-9ac1-354ad7bec5e9',
        //               name: 'Daphney',
        //               last_name: 'Torphy',
        //               job_title: 'National Markets Officer',
        //               twitter: 'DaphneyTorphy96105',
        //               avatarUrl:
        //                 'https://www.gravatar.com/avatar/e74e87d40e55b9ff9791c78892e55cb7?d=identicon',
        //             },
        //           ]
        //     })
        // },3000);
    };
    
    fetchData = async ()=>{
        this.setState({loading: true, error:null});
        try{
            const data = await api.badges.list()
            this.setState({loading: false, data:data});
        }
        catch(error){
            this.setState({loading:false, error:error})
        }
    }

    componentDidUpdate(prevProps, prevState){
        console.log('5. componentDidUpdate()')
        console.log({prevProps: prevProps,prevState: prevState})
        console.log({props:this.props,state:this.state});
    };
    componentWillUnmount(){
        console.log('6. componentWillUnmount');
        // window.clearTimeout(this.timeoutId);
        clearInterval(this.interval_id)
    }
};

export default Badges;