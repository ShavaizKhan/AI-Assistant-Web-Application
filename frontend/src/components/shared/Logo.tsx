import React from "react";
import {Link} from "react-router-dom"
import Typography from "@mui/material/Typography";
const Logo = () => {
    return <div style={{display: "flex", marginRight:"auto", alignItems:"center",gap:"8px"}}>
        <Link to={'/'}>
            <img src="logo.png" alt="logo" width={"40px"} height={"40px"} className="image-inverted"/>
        </Link>{" "}
        <Typography sx={{display: {md:"block", sm: "none", xs: "none"} , marginRight:"auto", fontWeight:"800", textShadow: "2px 2px 20px #000"}}>
            <span style={{fontSize: "20px"}}>MERN</span>-GPT
        </Typography>
    </div>
};

export default Logo;