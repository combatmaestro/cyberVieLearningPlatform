import React from 'react'
import { Box, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import logo from './BuildMyCareerLogo.png'
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MailIcon from '@material-ui/icons/Mail';
// import PhoneIcon from '@material-ui/icons/Phone';


const useStyles = makeStyles((theme) => ({
    root:{
        paddingTop:80,
        paddingBottom:80,
        paddingInline:theme.spacing(10),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // boxShadow: "0px 8.84527px 17.6905px rgba(0, 0, 0, 5)",
        // backgroundColor:"#EBF3FF",
        height: 100,
        [theme.breakpoints.down(426)]: {
            paddingInline:"40px",
            gap:30
          },
          [theme.breakpoints.down(321)]: {
            paddingInline:"10px",
            gap:30
          },
       
    },
    icons:{
        padding:"4px 4px",
        border:"2px solid #11dbdb",
        borderRadius:"8px",
        [theme.breakpoints.down(426)]: {
            padding: "1px 4px",
          },
    },


    image:{
        width:"100%",
        height:"100%",
        [theme.breakpoints.down(426)]: {
            width:"70%",
            height:"70%",
          },
    },


    iconBox:{
        display: 'flex',
        marginTop:15,
        alignItems: 'center',
        cursor: 'pointer',
        gap:10
    },
    contactInfo:{
        display: 'flex',
        alignItems:"center",
        gap:10,
        marginBlock:5
    },


    right:{
        display:"flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },


    socialIcons:{
        color:"#11dbdb",
        fontSize:"22px",
        [theme.breakpoints.down(426)]: {
            fontSize:"16px",
          },
    },


    text:{
        [theme.breakpoints.down(426)]: {
            fontSize:"0.875rem",
          },
       
          [theme.breakpoints.down(321)]: {
            fontSize:"0.675rem",
          },
       
    }




}))


function Footer() {
    const classes = useStyles();
  return (
    <Box className={classes.root}>
        <Box className={classes.left} style={{width:150}}>
            <img src={logo} className={classes.image} style={{objectFit:"cover"}}/>
            <Typography variant='body2' gutterBottom className={classes.text}>
                A cyber security firm
            </Typography>
            <div className={classes.iconBox}>
                <div className={classes.icons}>
                    <a href='https://www.instagram.com/cybervie_/' target='_blank'>
                    <InstagramIcon className={classes.socialIcons}/>
                    </a>
                </div>
                <div className={classes.icons}>
                    <a href='https://www.linkedin.com/company/cybervie-com/mycompany/' target='_blank'>
                    <LinkedInIcon className={classes.socialIcons}/>
                    </a>
                </div>
                <div className={classes.icons}>
                    <a href='https://www.youtube.com/results?search_query=cybervie+academy' target='_blank'>
                        <YouTubeIcon className={classes.socialIcons}/>
                    </a>
                </div>
            </div>
        </Box>
        <Box className={classes.right}>
            <Typography variant='h6' style={{marginBottom:10}} className={classes.text}>
                Contact Us
            </Typography>
                <div className={classes.contactInfo}>
                <MailIcon style={{fontSize:18}}/>
                <Typography variant='body2' className={classes.text}>info@cybervie.com</Typography>
                </div>
                {/* <div className={classes.contactInfo}>
                <PhoneIcon style={{fontSize:18}}/>
                <Typography variant='body2' className={classes.text}>+91 9000 878 798</Typography>
                </div> */}
        </Box>
    </Box>
  )
}


export default Footer





