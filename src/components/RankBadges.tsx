// SVG rank badge components — no background, just the badge shape

interface BadgeProps {
    className?: string;
}

export const BronzeBadge = ({ className = "w-8 h-8" }: BadgeProps) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Wooden hexagon */}
        <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="3" />
        <polygon points="50,12 83,29 83,71 50,88 17,71 17,29" fill="#A0724A" stroke="#8B5E3C" strokeWidth="1" />
        {/* Silver star */}
        <polygon
            points="50,25 56,40 72,40 59,50 63,65 50,56 37,65 41,50 28,40 44,40"
            fill="#B0B8C4"
            stroke="#8899AA"
            strokeWidth="1.5"
        />
        <polygon
            points="50,30 54,41 66,41 57,49 60,61 50,54 40,61 43,49 34,41 46,41"
            fill="#D0D8E4"
            stroke="none"
        />
    </svg>
);

export const SilverBadge = ({ className = "w-8 h-8" }: BadgeProps) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Blue metallic hexagon */}
        <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="#3B82F6" stroke="#6B7FAA" strokeWidth="4" />
        <polygon points="50,12 83,29 83,71 50,88 17,71 17,29" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1.5" />
        {/* Metallic star */}
        <polygon
            points="50,22 57,38 74,38 61,49 65,66 50,55 35,66 39,49 26,38 43,38"
            fill="#C0C8D4"
            stroke="#8090A0"
            strokeWidth="1.5"
        />
        <polygon
            points="50,28 55,40 67,40 58,48 61,60 50,53 39,60 42,48 33,40 45,40"
            fill="#E8ECF2"
            stroke="none"
        />
    </svg>
);

export const GoldBadge = ({ className = "w-8 h-8" }: BadgeProps) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Green hexagon with gold spikes */}
        <polygon points="50,2 93,20 97,50 93,80 50,98 7,80 3,50 7,20" fill="#D97706" stroke="#B45309" strokeWidth="2" />
        <polygon points="50,10 85,25 85,75 50,90 15,75 15,25" fill="#16A34A" stroke="#15803D" strokeWidth="2" />
        <polygon points="50,16 80,28 80,72 50,84 20,72 20,28" fill="#22C55E" stroke="#16A34A" strokeWidth="1" />
        {/* Bronze/gold star */}
        <polygon
            points="50,22 57,38 74,38 61,49 65,66 50,55 35,66 39,49 26,38 43,38"
            fill="#D97706"
            stroke="#B45309"
            strokeWidth="1.5"
        />
        <polygon
            points="50,28 55,40 67,40 58,48 61,60 50,53 39,60 42,48 33,40 45,40"
            fill="#FBBF24"
            stroke="none"
        />
    </svg>
);

export const PlatinumBadge = ({ className = "w-8 h-8" }: BadgeProps) => (
    <svg viewBox="0 0 110 100" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Wing accents */}
        <path d="M15,50 Q0,35 5,20 Q10,30 25,35 Z" fill="#A0AAC0" opacity="0.7" />
        <path d="M95,50 Q110,35 105,20 Q100,30 85,35 Z" fill="#A0AAC0" opacity="0.7" />
        {/* Purple shield */}
        <polygon points="55,5 95,25 95,75 55,95 15,75 15,25" fill="#7C3AED" stroke="#9CA0B8" strokeWidth="4" />
        <polygon points="55,13 88,30 88,70 55,87 22,70 22,30" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="1.5" />
        {/* Pink star */}
        <polygon
            points="55,22 62,38 79,38 66,49 70,66 55,55 40,66 44,49 31,38 48,38"
            fill="#D946EF"
            stroke="#A855F7"
            strokeWidth="1.5"
        />
        <polygon
            points="55,28 60,40 72,40 63,48 66,60 55,53 44,60 47,48 38,40 50,40"
            fill="#F0ABFC"
            stroke="none"
        />
    </svg>
);

export const LegendaryBadge = ({ className = "w-8 h-8" }: BadgeProps) => (
    <svg viewBox="0 0 120 110" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Golden wings */}
        <path d="M18,55 Q-5,30 8,10 Q15,28 30,35 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
        <path d="M102,55 Q125,30 112,10 Q105,28 90,35 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
        {/* Bottom ribbon */}
        <rect x="35" y="80" width="50" height="18" rx="3" fill="#B91C1C" stroke="#991B1B" strokeWidth="1" />
        <rect x="40" y="83" width="40" height="4" rx="1" fill="#EF4444" opacity="0.5" />
        {/* Red shield */}
        <polygon points="60,8 100,28 100,72 60,92 20,72 20,28" fill="#DC2626" stroke="#F59E0B" strokeWidth="4" />
        <polygon points="60,16 92,32 92,68 60,84 28,68 28,32" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
        {/* Gold star */}
        <polygon
            points="60,24 67,40 84,40 71,51 75,68 60,57 45,68 49,51 36,40 53,40"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="1.5"
        />
        <polygon
            points="60,30 65,42 77,42 68,50 71,62 60,55 49,62 52,50 43,42 55,42"
            fill="#FDE68A"
            stroke="none"
        />
    </svg>
);
