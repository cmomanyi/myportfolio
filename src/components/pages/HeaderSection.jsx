import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";


function HeaderSection({ scrollTo }) {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {
            try {

                const docRef = doc(db, "resume", "profile");
                const snap = await getDoc(docRef);

                if (snap.exists()) {
                    setProfile(snap.data());
                }

            } catch (err) {
                console.error("Error loading profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                Loading header...
            </div>
        );
    }

    if (!profile) return null;

    return (
        <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">

            {/* Banner */}
            <img
                src="/profbackground.jpg"
                alt="Banner"
                className="w-full h-52 object-cover"
            />

            {/* Header content */}
            <div className="p-6 flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {profile.name}
                    </h1>

                    <p className="text-sm text-slate-500 mt-2">
                        📍 {profile.location}
                    </p>

                    <p className="text-sm text-slate-600 mt-1">
                        {profile.title}
                    </p>
                </div>

                {/* Contact Button */}
                <button
                    onClick={() => scrollTo("contact")}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow"
                >
                    CONTACT ME
                </button>

            </div>

        </section>
    );
}

export default HeaderSection;

// import "../../style/HeaderSection.css";
//
// function HeaderSection({ profile, scrollTo }) {
//
//     if (!profile) return null;
//
//     return (
//         <section className="header-section">
//
//             <div className="profile-image-wrapper">
//
//                 <img
//                     src="/profbackground.jpg"
//                     alt="Banner"
//                     className="header-banner"
//                 />
//
//                 <img
//                     src="/Profile_pic.JPG"
//                     alt="Profile"
//                     className="profile-image"
//                 />
//
//             </div>
//
//             <div className="header-content">
//
//                 <div>
//                     <h1 className="header-name">{profile.name}</h1>
//                     <p className="header-title">{profile.title}</p>
//                     <p className="header-location">📍 {profile.location}</p>
//                 </div>
//
//                 <button
//                     className="contact-button"
//                     onClick={() => scrollTo("contact")}
//                 >
//                     CONTACT ME
//                 </button>
//
//             </div>
//
//         </section>
//     );
// }
//
// export default HeaderSection;