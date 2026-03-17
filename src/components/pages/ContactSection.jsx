import React from "react";

export default function ContactSection({ profile, innerRef }) {

    if (!profile) return null;

    return (
        <section
            ref={innerRef}
            id="contact"
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
        >

            <h2 className="text-sm font-semibold tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
                📬 CONTACT
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Email */}
                <div className="bg-slate-50 p-5 rounded-lg border">
                    <p className="text-xs text-slate-500 uppercase mb-1">
                        Email
                    </p>

                    <a
                        href={`mailto:${profile.email}`}
                        className="text-blue-600 font-medium hover:underline"
                    >
                        {profile.email}
                    </a>
                </div>

                {/* LinkedIn */}
                <div className="bg-slate-50 p-5 rounded-lg border">
                    <p className="text-xs text-slate-500 uppercase mb-1">
                        LinkedIn
                    </p>

                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        View Profile
                    </a>
                </div>

                {/* GitHub */}
                <div className="bg-slate-50 p-5 rounded-lg border">
                    <p className="text-xs text-slate-500 uppercase mb-1">
                        GitHub
                    </p>

                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        View Repositories
                    </a>
                </div>

                {/* Location */}
                <div className="bg-slate-50 p-5 rounded-lg border">
                    <p className="text-xs text-slate-500 uppercase mb-1">
                        Location
                    </p>

                    <p className="text-slate-700">
                        📍 {profile.location}
                    </p>
                </div>

            </div>

        </section>
    );
}