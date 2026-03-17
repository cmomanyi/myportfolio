import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function SummarySection({ innerRef }) {

    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchSummary = async () => {

            try {

                const docRef = doc(db, "resume", "summary");
                const snap = await getDoc(docRef);

                if (snap.exists()) {
                    setSummary(snap.data().text);
                }

            } catch (err) {
                console.error("Error loading summary:", err);
            } finally {
                setLoading(false);
            }

        };

        fetchSummary();

    }, []);

    if (loading) {
        return (
            <section className="bg-white rounded-xl shadow-sm p-6">
                Loading summary...
            </section>
        );
    }

    return (
        <section
            ref={innerRef}
            id="summary"
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8"
        >

            <h2 className="text-xs font-semibold tracking-[0.3em] text-slate-500 mb-4">
                PROFESSIONAL SUMMARY
            </h2>

            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {summary}
            </p>

        </section>
    );
}

export default SummarySection;