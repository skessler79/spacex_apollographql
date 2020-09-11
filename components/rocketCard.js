import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//import starship from '../images/starship.png'

const useStyles = makeStyles(theme =>({
    
    card: {
        display: 'flex',
        margin:' 50px 2%',
        flex:' 20 18%',
        borderRadius:' 20px',
        overflow:' hidden',
        position: 'relative',
        boxShadow:' 0 10px 20px 5px rgba(0, 0, 0, 2.3)',
        background: '#333',
        transition: 'transform 0.25s ease-in-out',
        justifyContent:'center',
        cursor: 'pointer',
        
        '&:hover':{
            transform:'scale(1.035)',
        },
        '& img':{
            width:'100%',
            height:'100%',
            //maxWidth:'100px',
        },
        [theme.breakpoints.down('sm')]: {
            flex:' 1 50%',
            height:'300px',
            
        }
    },
    
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'absolute',
        color: 'white',
        top: 0,
        opacity:0,
        bottom: 0,
        left: 0,
        right: 0,
        height:' 100%',
        width: '100%',
        transition: 'opacity 0.1s ease',
        background: 'linear-gradient(to top,rgba(10, 10, 10, 0.85),rgba(10, 10, 10, 0.5))',
        '&:hover':{
            opacity:1,
        }
    },
    name: {
        fontSize:' 2.1rem',
        alignSelf: 'center',
        padding:'10px',
        marginTop: '200px',
        textAlign: 'center',
    },

    country: {
        fontSize:' 1.5rem',
        alignSelf: 'center',
        padding:'10px',
        marginBottom: '20px',
        textAlign: 'center',
    }
    
}))

const RocketCard = (props) => {
    const styles = useStyles();
    var rocket_img = "https://upload.wikimedia.org/wikipedia/commons/b/b7/Starship_2019.png";
    switch(props.id) {
        case "falcon1":
            rocket_img = "https://i.redd.it/e8knepu9gni31.jpg";
            break;
        case "falcon9":
            rocket_img = "https://cdn.vox-cdn.com/thumbor/R-RWJIRnTzAkZG1I0dGJmZw0EbU=/0x0:3000x2000/1400x1400/filters:focal(1260x760:1740x1240):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/53935211/25787998624_3ca213be1e_o.0.jpg";
            break;
        case "falconheavy":
            rocket_img = "https://upload.wikimedia.org/wikipedia/commons/6/60/Falcon-heavy-crop.jpg";
            break;
        case "starship":
            rocket_img = "https://upload.wikimedia.org/wikipedia/commons/b/b7/Starship_2019.png";
            break;
        default:
            rocket_img = "https://i.redd.it/e8knepu9gni31.jpg";
            break;
    }
    
    return (
        <div className={styles.card}  onClick={ props.click} >      
            <img src={rocket_img}/>
            <div className={styles.details} >
                <span className={styles.name}>
                    {props.name} 
                </span>
                <span className={styles.country}>
                    <p>{props.country}</p> 
                </span>
            </div>
        </div>
        )
    }
    
    export default RocketCard;