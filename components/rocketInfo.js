import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import {useSpring, animated} from 'react-spring';
import Button from '@material-ui/core/Button';

const ROCKET_INFO = gql `
query Rocket($id: ID!){
    rocket(id:$id ) {
        active
        cost_per_launch
        name
        success_rate_pct
        first_flight
        description
        stages
        height {
            meters
        }
        diameter {
            meters
        }
        boosters
        first_flight
        wikipedia
        engines {
            number
            type
            propellant_1
            propellant_2
            thrust_to_weight
            thrust_vacuum {
                kN
            }
        }
        mass {
            kg
        }
        payload_weights {
            kg
            name
        }
    }
}
`

const useStyles = makeStyles(theme =>({
    
    modal:{
        position: 'fixed',
        zIndex: 1,
        paddingTop: '150px',
        left: 0,
        top: 0,
        width: '100%',
        height:' 100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.7)',
        '& h4':{
            fontSize:'1.625rem',
            fontWeight:'Bolder',
            fontFamily:'Arial',
            color: 'black'
        },
        '& a':{
            float:'center',
            textDecoration:'none',
            color:'black'
        }
    },
    modal_content:{
        position: 'relative',
        backgroundColor:' #fefefe',
        margin: 'auto',
        padding: 0,
        border:' 1px solid #888',
        width:' 80%',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,5.19)',
    },
    modal_header: {
        padding:' 2px 16px',
        backgroundColor: '#252525',
        color: 'white',
        fontSize:'1.225rem'
    },
    modal_footer:{
        padding:' 50px 15px',
        backgroundColor: '#252525',
        color: 'white',
    },
    close: {
        color: 'white',
        float: 'right',
        fontWeight: 'bold',
        '&:hover,&:focus': {
            color: '#000',
            textDecoration: 'none',
            cursor: 'pointer',
        },
    },
    modal_body:{
        padding: '2px 16px',
        display:'flex',
        flexWrap:'wrap',
        fontFamily:'Arial',
        fontSize:'1.225rem'
    },
    modal_item:{
        flex:'1 25%',
    }
}))



const Rocket = (props) => {
    const styles = useStyles();
    const animation = useSpring({to:{top:0, opacity:1},from:{top:'100px', opacity:0}, config: {duration:350 }})
    const { loading, error, data } = useQuery(ROCKET_INFO, {
        variables:{id:props.id}
    }); 
    if (loading) return true;
    if (error) return <p>Error :(</p>;
        
        return (
            <>
            <div className={styles.modal} >
                <animated.div style={animation} className={styles.modal_content}>
            <div className={styles.modal_header}>   
                <h2>{data.rocket.name}</h2>
            </div>    
            <div className={styles.modal_body}>
                <p>{data.rocket.description}</p>
            <div className={styles.modal_item}>
                <h4>Specs</h4>
                <ul>
                    <li>Height: {data.rocket.height.meters}m</li>
                    <li>Diameter: {data.rocket.diameter.meters}m</li>
                    <li>Mass: {data.rocket.mass.kg}kg</li>
                    <li>Boosters: {data.rocket.boosters}</li>
                    <li>Stages: {data.rocket.stages}</li>
                    <li>Success Rate: {data.rocket.success_rate_pct}%</li>
                    <li>First Flight: {data.rocket.first_flight}</li>
                    <li>Cost per Launch: ${new Intl.NumberFormat().format(data.rocket.cost_per_launch)}</li>
                </ul>
            </div>
            <div className={styles.modal_item}>
                <h4>Engines</h4>
                <ul>
                    <li>Type: {data.rocket.engines.type}</li>
                    <li>Engines: {data.rocket.engines.number}</li>
                    <li>Propellant 1: {data.rocket.engines.propellant_1}</li>
                    <li>Propellant 2: {data.rocket.engines.propellant_2}</li>
                    <li>Thrust to Weight: {data.rocket.engines.thrust_to_weight}</li>
                    <li>Thrust in Vacuum: {data.rocket.engines.thrust_vacuum.kN}kN</li>
                </ul>
            </div>
            <div className={styles.modal_item}>
            <h4>Payload Weights</h4>
            {data.rocket.payload_weights.map(weight => (
                <ul key={'weight-' + weight.id}>
                    <li>Orbit: {weight.name}</li>
                    <li>Payload: {weight.kg}kg</li>
                </ul>
            ))}
            </div>
            
            </div> 
            <div className={styles.modal_footer}>
            <Button variant="contained" color="secondary" className={styles.close} onClick={props.close} >
            CLOSE 
            </Button>
            <Button  variant="contained"><a href={data.rocket.wikipedia} target="_blank"  rel="noopener noreferrer">Read more about {data.rocket.name} on Wikipedia</a></Button>
            
            </div>
            </animated.div>
            </div>
            </>)  
        }
        export default Rocket;