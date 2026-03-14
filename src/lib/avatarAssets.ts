import beard5184768 from "../assets/avatars/beard_5184768.png";
import boy6247196 from "../assets/avatars/boy_6247196.png";
import boy6453081 from "../assets/avatars/boy_6453081.png";
import boy706836 from "../assets/avatars/boy_706836.png";
import clown1589797 from "../assets/avatars/clown_1589797.png";
import dracula1224011 from "../assets/avatars/dracula_1224011.png";
import man4323002 from "../assets/avatars/man_4323002.png";
import man945230 from "../assets/avatars/man_945230.png";
import merchant1090567 from "../assets/avatars/merchant_1090567.png";
import pirate1999508 from "../assets/avatars/pirate_1999508.png";
import rockabilly9600935 from "../assets/avatars/rockabilly_9600935.png";
import woman706803 from "../assets/avatars/woman_706803.png";
import woman706806 from "../assets/avatars/woman_706806.png";

const avatarAssetMap: Record<string, string> = {
    "beard_5184768.png": beard5184768,
    "boy_6247196.png": boy6247196,
    "boy_6453081.png": boy6453081,
    "boy_706836.png": boy706836,
    "clown_1589797.png": clown1589797,
    "dracula_1224011.png": dracula1224011,
    "man_4323002.png": man4323002,
    "man_945230.png": man945230,
    "merchant_1090567.png": merchant1090567,
    "pirate_1999508.png": pirate1999508,
    "rockabilly_9600935.png": rockabilly9600935,
    "woman_706803.png": woman706803,
    "woman_706806.png": woman706806,
};

export function getAvatarAsset(avatar: string | null | undefined) {
    if (!avatar) return null;
    if (/^https?:\/\//i.test(avatar)) return avatar;

    const normalized = avatar.split("/").pop() || avatar;
    return avatarAssetMap[normalized] ?? null;
}
