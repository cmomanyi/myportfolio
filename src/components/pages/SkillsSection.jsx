import SectionCard from "../sections/SectionCard";

export default function SkillsSection({ data, innerRef }) {
    return (
        <SectionCard id="skills" title="SKILLS" innerRef={innerRef}>
            <ul className="flex flex-wrap gap-2">
                {data.map((skill, i) => (
                    <li
                        key={i}
                        className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-sm"
                    >
                        {skill}
                    </li>
                ))}
            </ul>
        </SectionCard>
    );
}