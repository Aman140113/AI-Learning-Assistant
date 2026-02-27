import { Linkedin, } from 'lucide-react';

const teamData = [
    {
        id: 1,
        name: "OM Shankar Thakur",
        role: "AI Lead",
        image: "src/assets/Team/Om.jpg",
        socials: { ig: "https://www.linkedin.com/in/om-shankar-86981b224/" }
    },
    {
        id: 2,
        name: "Aman Mansuri",
        role: "Fontend and AI Developer",
        image: "src/assets/Team/Aman.jpg",
        socials: { ig: "https://www.linkedin.com/in/aman-mansuri140103/"}
    },
    {
        id: 3,
        name: "Shree Shetty",
        role: "UI/UX and Frontend Developer",
        image: "src/assets/Team/ShreeShetty.jpg",
        socials: { ig: "https://www.linkedin.com/in/shree-shetty-359a5734/"}
    },
    {
        id: 4,
        name: "Bhagyashree Patil ",
        role: "Data Analyst",
        image: "src/assets/Team/Bhagyashree.png",
        socials: { ig: "https://www.linkedin.com/in/bhagyashree-patil-393029287/" }
    },
    {
        id: 5,
        name: "Vivek Kumar",
        role: "Data Analyst",
        image: "src/assets/Team/VivekNew.jpg",
        socials: { ig: "#" }
    },
    {
        id: 6,
        name: "Rohit Kumbhakar",
        role: "Backend Developer",
        image: "src/assets/Team/Rohit.jpg",
        socials: {fig: "https://www.linkedin.com/in/rohitkumbhakar181305" }
    },
    {
        id: 7,
        name: "Akash Singh",
        role: "Backend Developer",
        image: "src/assets/Team/Akash.png",
        socials: { ig: "https://www.linkedin.com/in/akashraj77312"}
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
                <a href={member.socials.ig} className="hover:text-white transition-colors" aria-label="Instagram"><Linkedin size={14} /></a>
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
