import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

function Profile() {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "portfolio"));
            const data = querySnapshot.docs.map(doc => doc.data());
            setPortfolio(data);
        };
        fetchData();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {portfolio.map((item, index) => (
                <div key={index}>
                    <h1>{item.name}</h1>
                    <h2>{item.title}</h2>
                    <p>{item.about}</p>
                    <h3>Skills</h3>
                    <ul>
                        {item.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                    <h3>Hobbies</h3>
                    <ul>
                        {item.hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Profile;
