// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";
//
// function Profile() {
//     const [portfolio, setPortfolio] = useState([]);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const querySnapshot = await getDocs(collection(db, "portfolio"));
//             const data = querySnapshot.docs.map((doc) => doc.data());
//             setPortfolio(data);
//         };
//         fetchData();
//     }, []);
//
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 p-8">
//             {portfolio.map((item, index) => (
//                 <div
//                     key={index}
//                     className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
//                 >
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
//                         {item.name}
//                     </h1>
//                     <h2 className="text-xl text-blue-600 font-semibold mb-4 text-center">
//                         {item.title}
//                     </h2>
//                     <p className="text-gray-700 text-center mb-6">{item.about}</p>
//
//                     <div className="mb-4">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                             Skills
//                         </h3>
//                         <ul className="flex flex-wrap justify-center gap-2">
//                             {item.skills.map((skill, i) => (
//                                 <li
//                                     key={i}
//                                     className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
//                                 >
//                                     {skill}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                             Hobbies
//                         </h3>
//                         <ul className="flex flex-wrap justify-center gap-2">
//                             {item.hobbies.map((hobby, i) => (
//                                 <li
//                                     key={i}
//                                     className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
//                                 >
//                                     {hobby}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// export default Profile;
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

function Profile() {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(db, "portfolio"));
                setPortfolio(snapshot.docs.map((doc) => doc.data()));
            } catch (err) {
                console.error("Error loading portfolio:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            {portfolio.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
                >
                    <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.title}</p>

                    <p className="mt-4 text-slate-700">{item.about}</p>

                    {Array.isArray(item.skills) && (
                        <div className="mt-4">
                            <h4 className="text-xs tracking-[0.3em] text-slate-500 mb-2">
                                SKILLS
                            </h4>
                            <ul className="flex flex-wrap gap-2">
                                {item.skills.map((skill, i) => (
                                    <li
                                        key={i}
                                        className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-xs font-medium"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Profile;
