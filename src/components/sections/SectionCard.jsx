export default function SectionCard({ title, children, icon: Icon }) {
    return (
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 hover:shadow-md transition">

            <div className="flex items-center gap-3 mb-6">

                {Icon && <Icon className="w-6 h-6 text-blue-500" />}

                <h2 className="text-sm font-semibold tracking-[0.25em] text-slate-500">
                    {title}
                </h2>

            </div>

            {children}

        </section>
    );
}