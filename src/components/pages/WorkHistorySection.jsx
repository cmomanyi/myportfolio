// import React, { useEffect, useState } from "react";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../../firebaseConfig";
//
// function WorkHistorySection({ innerRef }) {
//
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//
//         const fetchJobs = async () => {
//
//             try {
//
//                 const q = query(
//                     collection(db, "resume", "main", "experience"),
//                     orderBy("order")
//                 );
//
//                 const snap = await getDocs(q);
//
//                 const results = snap.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));
//
//                 setJobs(results);
//
//             } catch (err) {
//                 console.error("Error loading experience:", err);
//             } finally {
//                 setLoading(false);
//             }
//
//         };
//
//         fetchJobs();
//
//     }, []);
//
//     if (loading) {
//         return (
//             <section className="bg-white rounded-xl shadow-sm p-6">
//                 Loading work history...
//             </section>
//         );
//     }
//
//     return (
//         <section
//             ref={innerRef}
//             id="workHistory"
//             className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8"
//         >
//
//             <h2 className="text-xs font-semibold tracking-[0.3em] text-slate-500 mb-6">
//                 WORK HISTORY
//             </h2>
//             <div className="space-y-8">
//
//                 {jobs.map(job => (
//
//                     <div key={job.id}>
//
//                         <div className="flex justify-between items-start">
//
//                             <div>
//                                 <h3 className="text-lg font-semibold text-slate-900">
//                                     {job.role}
//                                 </h3>
//
//                                 <p className="text-sm text-slate-600">
//                                     {job.company}
//                                 </p>
//                             </div>
//
//                             <div className="text-sm text-slate-500">
//                                 {job.startDate} — {job.endDate}
//                             </div>
//
//                         </div>
//
//                         {/* BULLET POINTS */}
//
//                         <ul className="mt-3 space-y-2 list-disc list-inside text-slate-700">
//
//                             {job.description?.map((item, index) => (
//                                 <li key={index}>
//                                     {item}
//                                 </li>
//                             ))}
//
//                         </ul>
//
//                     </div>
//
//                 ))}
//
//             </div>
//
//         </section>
//     );
// }
//


import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function WorkHistorySection({ innerRef }) {

    const [jobs, setJobs] = useState([]);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {

        const fetchJobs = async () => {

            const q = query(
                collection(db, "resume", "main", "experience"),
                orderBy("order")
            );

            const snap = await getDocs(q);

            const results = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setJobs(results);
        };

        fetchJobs();

    }, []);

    const toggleDescription = (id) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <section
            ref={innerRef}
            id="workHistory"
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
        >

            <h2 className="text-sm font-semibold tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
                💼 WORK HISTORY
            </h2>

            <div className="space-y-8">

                {jobs.map(job => (

                    <div
                        key={job.id}
                        className="border rounded-lg p-6 bg-slate-50"
                    >

                        {/* Header */}

                        <div className="flex gap-4 items-start">

                            <div className="bg-blue-100 p-3 rounded-lg">
                                <span className="text-blue-600 text-lg">💼</span>
                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-slate-900">
                                    {job.role}
                                </h3>

                                <p className="text-sm text-slate-600">
                                    {job.company}
                                </p>

                                <p className="text-sm text-slate-400 mt-1">
                                    {job.startDate} — {job.endDate}
                                </p>

                            </div>

                        </div>

                        {/* Divider */}

                        <div className="border-t border-slate-200 my-4" />

                        {/* Description */}

                        {expanded[job.id] && (

                            <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">

                                {job.description?.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}

                            </ul>

                        )}

                        {/* Toggle */}

                        <button
                            onClick={() => toggleDescription(job.id)}
                            className="text-blue-600 text-sm mt-4 hover:underline"
                        >
                            {expanded[job.id] ? "Hide Description" : "Show Description"}
                        </button>

                    </div>

                ))}

            </div>

        </section>
    );
}
// export default WorkHistorySection;