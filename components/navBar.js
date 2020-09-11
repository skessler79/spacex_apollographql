// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
// }));

// const MyNavbar = ( props ) => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar variant="dense">
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" color="inherit">
//               <a href="../launches">test</a>
//             {props.name}
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// export default MyNavbar;


// import { BrowserRouter, Route, Link } from 'react-router-dom';

// import React from 'react';
// import {makeStyles} from '@material-ui//core/styles';
// import {useSpring, animated} from 'react-spring'
// const stylesNav = makeStyles ({
//     root:{
//         display:'flex',
//         margin:0,
//         padding:'.375em',
//         backgroundColor:'#000',
//         listStyleType:'none',
//         justifyContent:' space-around',

//         '& li':{
//             marginTop:0,

//         },
//         '& li>a':{
//             display:'block',
//             padding:'.5em 1em',
//             color:'white',
//             textDecoration:'none',
//             transition: 'opacity .6s linear',
//         },
//         '& a:link': {

//             fontWeight:'bold',
//             textDecoration:'none',
//         },

//         ' & a:hover': {
//             textDecoration:'none',
//             color:'grey',
//         },
//         '& a:active': {
//             color:'#b81414',
//         },
//     },
//     nav:{
//         gridColumn:'1/7',
//         gridRow:'span 1',
//     }

// })

// const Nav = () => {
//     const classes = stylesNav();
//     const props = useSpring({opacity: 1, from: {opacity: 0}});
//     return 	(

//         <nav className={classes.nav}>
//             <animated.ul className={classes.root} style={props}>
//                 <li><Link href="/rockets">Rockets</Link></li>
//                 <li><a href="/rockets">Rockets</a></li>
//             </animated.ul>
//         </nav>

//         )
//     }

//     export default Nav;

//     //

import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'

export default function Navbar({}) {
    const [input,setInput] = useState("")
    
    // function getSearch(){
    //     searchName = input
    // }
    
    return (
        <div>
        <Head>
            {/*<title>{SiteName}</title>*/}
        </Head>
        <nav class="flex items-center justify-between flex-wrap bg-gray-900 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <img src="https://i.imgur.com/e6Q1hgl.png" alt="Image not found"/>
                <span class="font-semibold text-xl tracking-tight"></span>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-lg lg:flex-grow">
                    <a href="./" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6">
                        Rockets
                    </a>
                    <a href="./launches" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6">
                        Launches
                    </a>
                    <a href="./blog" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Blog
                    </a>
                </div>
                <div>
                    <a href="https://www.youtube.com/user/spacexchannel" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                        SpaceX YouTube Channel
                    </a>
                </div>
            </div>
        </nav>
        <style jsx global>{`
        html,
        body {
            background-color: #fffaf0;
        }
        `}</style>
        </div>
        )
    }