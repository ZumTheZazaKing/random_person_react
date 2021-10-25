import { useContext, useEffect, useState } from "react";
import { Context } from "../data/context";

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

            <p className="desc">{desc}</p>
            <p className="title">{title}</p>

            <button name="name" onMouseOver={(e) => inspect(e)}>Name</button>
            <button name="email" onMouseOver={(e) => inspect(e)}>Email</button>
            <button name="age" onMouseOver={(e) => inspect(e)}>Age</button>
            <button name="place" onMouseOver={(e) => inspect(e)}>Place</button>
            <button name="phone" onMouseOver={(e) => inspect(e)}>Phone</button>
            <button name="password" onMouseOver={(e) => inspect(e)}>Password</button>
            <br/><br/>
            <button onClick={() => generateRandomPerson()}>Generate</button>

        </div> : "Loading..."}
    </div>)
}