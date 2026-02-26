import { Facebook, Instagram, Twitter } from 'lucide-react';

const teamData = [
    {
        id: 1,
        name: "Henry Walker",
        role: "EXECUTIVE OFFICER",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        socials: { fb: "#", ig: "#", x: "#" }
    },
    {
        id: 2,
        name: "Anna Lee",
        role: "PROJECT LEAD",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        socials: { fb: "#", ig: "#", x: "#" }
    },
    {
        id: 3,
        name: "Leo Martinez",
        role: "TECHNICAL ADVISER",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        socials: { fb: "#", ig: "#", x: "#" }
    },
    {
        id: 4,
        name: "Tim Morrison",
        role: "HEAD OF COMMUNICATIONS",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        socials: { fb: "#", ig: "#", x: "#" }
    },
    {
        id: 5,
        name: "Sarah Chen",
        role: "AI RESEARCHER",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        socials: { fb: "#", ig: "#", x: "#" }
    },
    {
        id: 6,
        name: "David Kim",
        role: "ML ENGINEER",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        socials: { fb: "#", ig: "#", x: "#" }
    },
    {
        id: 7,
        name: "Elena Rossi",
        role: "UX DESIGNER",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        socials: { fb: "#", ig: "#", x: "#" }
    }
];

const TeamCard = ({ member }: { member: typeof teamData[0] }) => {
    return (
        <div className="group flex flex-col items-center p-4 rounded-xl border transition-all duration-300 bg-[#07130D] border-white/10 hover:bg-[#0A261A]/80 hover:border-[#00F5D4]/30">
            <div className="w-full aspect-square overflow-hidden rounded-lg mb-5 bg-[#0f1916]">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>
            <h3 className="text-white font-bold text-[15px] mb-1 tracking-wide">{member.name}</h3>
            <p className="text-[#00F5D4] text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-6">
                {member.role}
            </p>
            <div className="flex items-center gap-6 mt-auto text-white/50 mb-1">
                <a href={member.socials.fb} className="hover:text-white transition-colors" aria-label="Facebook"><Facebook size={14} /></a>
                <a href={member.socials.ig} className="hover:text-white transition-colors" aria-label="Instagram"><Instagram size={14} /></a>
                <a href={member.socials.x} className="hover:text-white transition-colors" aria-label="Twitter"><Twitter size={14} /></a>
            </div>
        </div>
    );
};

export default function TeamSection() {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#040C08]">
            {/* Bottom glowing aura */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[70%] h-[400px] bg-[#00F5D4]/15 rounded-[100%] blur-[120px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-3">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Awesome <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-emerald-400">Team</span>
                    </h2>
                    <p className="text-sm md:text-base text-slate-400 font-medium">
                        A team of learning experts is at your service!<br />
                        Meet our staff and become a member of our community
                    </p>
                </div>

                {/* Responsive Flex Grid */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-5">
                    {teamData.map((member) => (
                        <div key={member.id} className="w-full max-w-[260px] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]">
                            <TeamCard member={member} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
