import { useContext, useEffect, useState } from "react";
import { Context } from "../data/context";
import Button from '@mui/material/Button';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LockIcon from '@mui/icons-material/Lock';

export function Main(){

    let { result, setResult } = useContext(Context);

    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("")

    useEffect(() => {
        generateRandomPerson();
    },[])

    const generateRandomPerson = () => {
        setResult("")
        fetch("https://randomuser.me/api/")
        .then(res => res.json())
        .then(data => {
            setResult(data.results[0]);
            setDesc("My name is");
            setTitle(`${data.results[0].name.first} ${data.results[0].name.last}`)
        })
    }

    const inspect = e => {
        switch(e.target.name){

            case 'name':
                setDesc("My name is");
                setTitle(`${result.name.first} ${result.name.last}`);
                break;
            case 'email':
                setDesc("My email is");
                setTitle(result.email);
                break;
            case 'age':
                setDesc("My age is");
                setTitle(result.dob.age);
                break;
            case 'place':
                setDesc("I live in");
                setTitle(`${result.location.state}, ${result.location.country}`);
                break;
            case 'phone':
                setDesc("My phone is");
                setTitle(result.phone);
                break;
            case 'password':
                setDesc("My password is");
                setTitle(result.login.password);
                break;

            default:
                return
        }
    }
    
    return (<div id="Main">
        { result ? <div id="info">

            <img src={result.picture.large} alt="profilePic"/>
            <br/><br/>
            <p className="desc">{desc}</p>
            <h2 className="title">{title}</h2>
            <br/><br/>
            <button name="name" onMouseOver={(e) => inspect(e)}><PersonIcon sx={{fontSize: 40}}/></button>
            <button name="email" onMouseOver={(e) => inspect(e)}><EmailIcon sx={{fontSize: 40}}/></button>
            <button name="age" onMouseOver={(e) => inspect(e)}><EventBusyIcon sx={{fontSize: 40}}/></button>
            <button name="place" onMouseOver={(e) => inspect(e)}><LocationOnIcon sx={{fontSize: 40}}/></button>
            <button name="phone" onMouseOver={(e) => inspect(e)}><PhoneEnabledIcon sx={{fontSize: 40}}/></button>
            <button name="password" onMouseOver={(e) => inspect(e)}><LockIcon sx={{fontSize: 40}}/></button>
            <br/><br/><br/>
            <Button variant="contained" className="generate"  onClick={() => generateRandomPerson()}>Generate</Button>

        </div> : <h3>Loading...</h3>}
    </div>)
}