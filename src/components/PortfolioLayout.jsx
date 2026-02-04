import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const sectionsConfig = [
    { id: "summary", label: "SUMMARY" },
    { id: "overview", label: "OVERVIEW" },
    { id: "workHistory", label: "WORK HISTORY" },
    { id: "education", label: "EDUCATION" },
    { id: "skills", label: "SKILLS" },
    { id: "affiliations", label: "AFFILIATIONS" },
    { id: "timeline", label: "TIMELINE" },
];

function PortfolioLayout() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // refs for scrolling to sections
    const sectionRefs = useRef({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const docRef = doc(db, "profile", "main");
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setData(snap.data());
                } else {
                    console.warn("No profile document found, using fallback data.");
                    setData({
                        name: "CHRISTINE MOMANYI",
                        location: "Pelham, AL",
                        title: "Software Engineer",
                        summary:
                            "Knowledgeable software engineer with robust background in backend development. Demonstrated proficiency in creating scalable server-side applications and optimizing database queries.",
                        overview:
                            "I enjoy solving problems, working with cloud technology, and building secure, reliable systems. Outside of work I love traveling, content creation, and mentoring others.",
                        workHistory:
                            "Gogo Business Aviation – Backend Engineer\nKemper – Application Developer\nProspect33 – Salesforce Developer",
                        education:
                            "B.Sc. in Computer Science (or your degree here). Add more details from your resume.",
                        skills: ["Java", "Python", "AWS", "React", "FastAPI", "Spring Boot"],
                        affiliations:
                            "Toastmasters International member. Include meetups, tech communities, etc.",
                        timeline:
                            "2018 – Started as Developer\n2020 – Joined Gogo\n2024 – VA systems work, etc.",
                    });
                }
            } catch (err) {
                console.error("Error loading profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleScrollTo = (id) => {
        const el = sectionRefs.current[id];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (loading || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <p className="text-gray-600">Loading portfolio...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 py-8 px-4 md:px-0">
                {/* LEFT SIDEBAR */}
                <aside className="md:w-1/4 bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-6 hidden md:block">
                    <nav className="space-y-3 text-sm tracking-wide">
                        {sectionsConfig.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => handleScrollTo(section.id)}
                                className="block w-full text-left text-gray-500 hover:text-gray-900 hover:font-semibold transition"
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 space-y-6">
                    {/* HERO / HEADER */}
                    <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="relative">
                            {/* Banner image */}
                            <img
                                src="/profbackground.jpg"
                                alt="City skyline"
                                className="w-full h-52 object-cover"
                            />

                            {/* Circular profile photo */}
                            <div className="absolute -bottom-12 left-6">
                                <img
                                    src="/Profile_pic.JPG"
                                    alt={data.name}
                                    className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
                                />
                            </div>
                        </div>

                        {/* Name / Location / Button */}
                        <div className="pt-16 pb-6 px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold tracking-wide">
                                    {data.name}
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    📍 {data.location || "Location"}
                                </p>
                            </div>

                            <button
                                className="self-start md:self-auto bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-2 rounded-full shadow-md transition"
                                onClick={() => {
                                    const el = document.getElementById("contact");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                CONTACT ME
                            </button>
                        </div>
                    </section>

                    {/* SUMMARY */}
                    <SectionCard
                        id="summary"
                        title="SUMMARY"
                        innerRef={(el) => (sectionRefs.current["summary"] = el)}
                    >
                        <p className="text-gray-700 whitespace-pre-line">{data.summary}</p>
                    </SectionCard>

                    {/* OVERVIEW */}
                    <SectionCard
                        id="overview"
                        title="OVERVIEW"
                        innerRef={(el) => (sectionRefs.current["overview"] = el)}
                    >
                        <p className="text-gray-700 whitespace-pre-line">{data.overview}</p>
                    </SectionCard>

                    {/* WORK HISTORY */}
                    <SectionCard
                        id="workHistory"
                        title="WORK HISTORY"
                        innerRef={(el) => (sectionRefs.current["workHistory"] = el)}
                    >
                        <p className="text-gray-700 whitespace-pre-line">
                            {data.workHistory}
                        </p>
                    </SectionCard>

                    {/* EDUCATION */}
                    <SectionCard
                        id="education"
                        title="EDUCATION"
                        innerRef={(el) => (sectionRefs.current["education"] = el)}
                    >
                        <p className="text-gray-700 whitespace-pre-line">
                            {data.education}
                        </p>
                    </SectionCard>

                    {/* SKILLS */}
                    <SectionCard
                        id="skills"
                        title="SKILLS"
                        innerRef={(el) => (sectionRefs.current["skills"] = el)}
                    >
                        {Array.isArray(data.skills) ? (
                            <ul className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <li
                                        key={i}
                                        className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-700">{data.skills}</p>
                        )}
                    </SectionCard>

                    {/* AFFILIATIONS */}
                    <SectionCard
                        id="affiliations"
                        title="AFFILIATIONS"
                        innerRef={(el) => (sectionRefs.current["affiliations"] = el)}
                    >
                        <p className="text-gray-700 whitespace-pre-line">
                            {data.affiliations}
                        </p>
                    </SectionCard>

                    {/* TIMELINE */}
                    <SectionCard
                        id="timeline"
                        title="TIMELINE"
                        innerRef={(el) => (sectionRefs.current["timeline"] = el)}
                    >
                        <p className="text-gray-700 whitespace-pre-line">
                            {data.timeline}
                        </p>
                    </SectionCard>

                    {/* CONTACT SECTION (simple placeholder for now) */}
                    <SectionCard
                        id="contact"
                        title="CONTACT"
                        innerRef={(el) => (sectionRefs.current["contact"] = el)}
                    >
                        <p className="text-gray-700">
                            You can reach me at:{" "}
                            <a
                                href="mailto:ktondeh@gmail.com"
                                className="text-blue-600 underline"
                            >
                                ktondeh@gmail.com
                            </a>
                        </p>
                    </SectionCard>
                </main>
            </div>
        </div>
    );
}

function SectionCard({ id, title, children, innerRef }) {
    return (
        <section
            id={id}
            ref={innerRef}
            className="bg-white rounded-2xl shadow-sm p-6"
        >
            <h2 className="text-sm font-semibold text-gray-500 tracking-[0.2em] mb-3 flex items-center gap-2">
                {title}
            </h2>
            <div>{children}</div>
        </section>
    );
}

export default PortfolioLayout;
// import React, { useEffect, useState, useRef } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
//
// const sections = [
//     { id: "summary", label: "SUMMARY" },
//     { id: "overview", label: "OVERVIEW" },
//     { id: "workHistory", label: "WORK HISTORY" },
//     { id: "education", label: "EDUCATION" },
//     { id: "skills", label: "SKILLS" },
//     { id: "affiliations", label: "AFFILIATIONS" },
//     { id: "timeline", label: "TIMELINE" },
//     { id: "contact", label: "CONTACT" },
// ];
//
// function PortfolioLayout() {
//     const [data, setData] = useState(null);
//     const sectionRefs = useRef({});
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const snap = await getDoc(doc(db, "profile", "main"));
//                 if (snap.exists()) {
//                     setData(snap.data());
//                 }
//             } catch (err) {
//                 console.error("Error loading profile:", err);
//             }
//         };
//         fetchProfile();
//     }, []);
//
//     const scrollTo = (id) =>
//         sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
//
//     if (!data) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 Loading portfolio…
//             </div>
//         );
//     }
//
//     return (
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex gap-8">
//             {/* Sidebar */}
//             <aside className="hidden md:block w-1/4">
//                 <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
//                     <nav className="space-y-4 text-xs tracking-[0.25em]">
//                         {sections.map((s) => (
//                             <button
//                                 key={s.id}
//                                 onClick={() => scrollTo(s.id)}
//                                 className="block text-left text-slate-400 hover:text-slate-900 transition"
//                             >
//                                 {s.label}
//                             </button>
//                         ))}
//                     </nav>
//                 </div>
//             </aside>
//
//             {/* Main */}
//             <main className="flex-1 space-y-8">
//                 {/* Header */}
//                 <section className="bg-white rounded-xl shadow-sm overflow-hidden">
//                     <img
//                         src="/profbackground.jpg"
//                         alt="Banner"
//                         className="w-full h-52 object-cover"
//                     />
//                     <div className="p-6 flex justify-between items-center">
//                         <div>
//                             <h1 className="text-3xl font-bold text-slate-900">
//                                 {data.name}
//                             </h1>
//                             <p className="text-sm text-slate-500 mt-2">📍 {data.location}</p>
//                         </div>
//                         <button
//                             onClick={() => scrollTo("contact")}
//                             className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow"
//                         >
//                             CONTACT ME
//                         </button>
//                     </div>
//                 </section>
//
//                 {sections.slice(0, -1).map((s) => (
//                     <Section
//                         key={s.id}
//                         id={s.id}
//                         title={s.label}
//                         innerRef={(el) => (sectionRefs.current[s.id] = el)}
//                     >
//                         {Array.isArray(data[s.id]) ? (
//                             <ul className="flex flex-wrap gap-2">
//                                 {data[s.id].map((item, i) => (
//                                     <li
//                                         key={i}
//                                         className="bg-slate-100 px-4 py-1.5 rounded-full text-xs"
//                                     >
//                                         {item}
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-slate-700 whitespace-pre-line">
//                                 {data[s.id]}
//                             </p>
//                         )}
//                     </Section>
//                 ))}
//
//                 <Section
//                     id="contact"
//                     title="CONTACT"
//                     innerRef={(el) => (sectionRefs.current.contact = el)}
//                 >
//                     <a
//                         href="mailto:ktondeh@gmail.com"
//                         className="text-blue-600 underline"
//                     >
//                         ktondeh@gmail.com
//                     </a>
//                 </Section>
//             </main>
//         </div>
//     );
// }
//
// function Section({ id, title, children, innerRef }) {
//     return (
//         <section
//             id={id}
//             ref={innerRef}
//             className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8"
//         >
//             <h2 className="text-xs font-semibold tracking-[0.3em] text-slate-500 mb-4">
//                 {title}
//             </h2>
//             {children}
//         </section>
//     );
// }
//
// export default PortfolioLayout;
