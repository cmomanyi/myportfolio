import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function EducationSection({ innerRef }) {

    const [schools, setSchools] = useState([]);

    useEffect(() => {

        const fetchEducation = async () => {

            const q = query(
                collection(db, "resume", "main", "education"),
                orderBy("order")
            );

            const snap = await getDocs(q);

            const results = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setSchools(results);

        };

        fetchEducation();

    }, []);

    return (
        <section
            ref={innerRef}
            id="education"
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
        >

            <h2 className="text-sm font-semibold tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
                🎓 EDUCATION
            </h2>

            <div className="space-y-8">

                {schools.map(school => (

                    <div
                        key={school.id}
                        className="border rounded-lg p-6 bg-slate-50"
                    >

                        <div className="flex gap-4 items-start">

                            <div className="bg-indigo-100 p-3 rounded-lg">
                                🎓
                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-slate-900">
                                    {school.degree}
                                </h3>

                                <p className="text-sm text-slate-600">
                                    {school.school}
                                </p>

                                <p className="text-sm text-slate-400 mt-1">
                                    {school.startYear} — {school.endYear}
                                </p>

                            </div>

                        </div>

                        {school.description && (

                            <>
                                <div className="border-t border-slate-200 my-4" />

                                <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm">

                                    {school.description.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}

                                </ul>

                            </>

                        )}

                    </div>

                ))}

            </div>

        </section>
    );
}