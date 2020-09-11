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
import YouTube from 'react-youtube';

const ROCKET_INFO = gql `
query Rocket($id: ID!){
    launch(id: $id) {
        details
        mission_name
        rocket {
          rocket_name
        }
        launch_success
        launch_site {
          site_name
        }
        launch_date_utc
        links {
            video_link
            wikipedia
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
        margin: 10,
        flex:'1 25%',
    }
}))



const Launch = (props) => {
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
                <h2>{data.launch.mission_name}</h2>
            </div>    
            <div className={styles.modal_body}>
                <p>{data.launch.details}</p>
            <div className={styles.modal_item}>
                <h4>Launch Info</h4>
                <ul>
                    <li>Status: {(data.launch.launch_success)?"Success":"Failed"}</li>
                    <li>Launch Date (UTC): {data.launch.launch_date_utc}</li>
                    <li>Launch Site: {data.launch.launch_site.site_name}</li>
                    <li>Rocket: {data.launch.rocket.rocket_name}</li>
                </ul>
            </div>

            
            
            </div> 
            <YouTube videoId={data.launch.links.video_link.replace("https://www.youtube.com/watch?v=", "")} />
            <div className={styles.modal_footer}>
            <Button variant="contained" color="secondary" className={styles.close} onClick={props.close} >
            CLOSE 
            </Button>
            <Button  variant="contained"><a href={data.launch.links.wikipedia} target="_blank"  rel="noopener noreferrer">Read more about {data.launch.mission_name} on Wikipedia</a></Button>
            </div>
            </animated.div>
            </div>
            </>)  
        }
        export default Launch;