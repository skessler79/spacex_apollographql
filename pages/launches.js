import React,{ useState, Fragment } from 'react';
import Head from 'next/head'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import LaunchInfo from '../components/launchInfo';
import Loading from '../components/loading';
import Navbar from '../components/navBar';
import LaunchCard from '../components/launchCard';

const siteTitle = 'SpaceX Rockets and Launches'

const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache()
});

const Rockets_list = gql`
    {
        launches(limit: 40) {
            mission_name
            rocket {
                rocket_name
            }
            launch_date_utc
            id
            launch_success
        }
    }
`

const useStyles = makeStyles(theme =>({
root:{
margin:' 0px auto',
display: 'flex',
flexWrap: 'wrap',
background:'linear-gradient(to left,#465664,#0b0808 50%,#465664)',
minHeight:'90vh',
overflow:'hidden',
},
  card: {
    display: 'flex',
  margin:' 15px 4%',
  flex:' 1 35%',
  borderRadius:' 10px',
  overflow:' hidden',
  position: 'relative',
  boxShadow:' 0 10px 20px 5px rgba(0, 0, 0, 0.3)',
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
  maxWidth:'30px',
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
  fontSize:' 0.8rem',
  alignSelf: 'center',
  padding:'10px',
  marginBottom: '5px',
  textAlign: 'center',
}

}))

function Rockets () {
    const styles = useStyles();
    const [state,setState] = useState("");
    
    const openModal = (id) => () => setState(id);
    const closeModal = () => setState("");

    const { loading, error, data } = useQuery(Rockets_list);
    
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

 return ( 
  <div className={styles.root} >
{ data.launches.map(({ mission_name, rocket, id, launch_success }) => (
                <LaunchCard 
                name={mission_name}
                rocket={rocket}
                launch_success={launch_success}
                id={id}
                key={id}
                click={openModal(id)}
                />
       ))}
    {state ?<LaunchInfo id={state} close={closeModal}/> : null}

      </div>)
}

export default function Launches()
{
    return(
        <div>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Navbar name="Launches"/>
            <ApolloProvider client={client}>
                <Rockets />
            </ApolloProvider>
        </div>
        
    );
}