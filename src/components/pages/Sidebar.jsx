import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r p-6">

            <h2 className="text-lg font-bold mb-6">Portfolio</h2>

            <nav className="space-y-4">

                <Link to="/summary" className="block text-slate-600 hover:text-blue-600">
                    Summary
                </Link>

                <Link to="/work-history" className="block text-slate-600 hover:text-blue-600">
                    Work History
                </Link>

                <Link to="/education" className="block text-slate-600 hover:text-blue-600">
                    Education
                </Link>

                <Link to="/contact" className="block text-slate-600 hover:text-blue-600">
                    Contact
                </Link>

            </nav>

        </aside>
    );
}