import React from "react";
import { Routes, Route } from "react-router-dom";

import HeaderSection from "./components/pages/HeaderSection";
import SummarySection from "./components/pages/SummarySection";
import WorkHistorySection from "./components/pages/WorkHistorySection";
import EducationSection from "./components/pages/EducationSection";
import ContactSection from "./components/pages/ContactSection";
import Sidebar from "./components/pages/Sidebar";

export default function App() {
    return (
        <div className="min-h-screen bg-slate-100">

            <div className="max-w-6xl mx-auto flex gap-8 py-8 px-4">

                <Sidebar />

                <main className="flex-1">

                    <HeaderSection />

                    <Routes>
                        <Route path="/" element={<SummarySection />} />
                        <Route path="/summary" element={<SummarySection />} />
                        <Route path="/work-history" element={<WorkHistorySection />} />
                        <Route path="/education" element={<EducationSection />} />
                        <Route path="/contact" element={<ContactSection />} />

                    </Routes>

                </main>

            </div>

        </div>
    );
}