import React,{useState} from 'react';
import Head from 'next/head'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import RocketInfo from '../components/rocketInfo';
import Loading from '../components/loading';
import Navbar from '../components/navBar';
import RocketCard from '../components/rocketCard';

const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache()
});

const siteTitle = 'SpaceX Rockets and Launches'

const Rockets_list = gql`
    {
        rockets {
            name
            country
            id
        }
    }
`
const useStyles = makeStyles(theme =>({
root:{
margin:' 0px auto',
display: 'flex',
flexWrap: 'wrap',
background:'linear-gradient(to left,#465664,#0b0808 50%,#465664)',
minHeight:'93vh',
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
{ data.rockets.map(({ name, country, id }) => (
                <RocketCard 
                name={name}
                country={country}
                id={id}
                key={id}
                click={openModal(id)}
                />
       ))}
    {state ?<RocketInfo id={state} close={closeModal}/> : null}

      </div>)
}

export default function Home()
{
    var test = "Rockets"
    return(
        <div>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Navbar name="Rockets"/>
            <ApolloProvider client={client}>
                <Rockets name={test} />
            </ApolloProvider>
        </div>  
    );
}