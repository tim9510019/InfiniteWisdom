import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

type SocialLink = {
  platform: "facebook" | "instagram" | "github" | "linkedIn" | "twitter";
  url: string;
  icon: React.ReactNode;
  iconAlt: "facebook" | "instagram" | "github" | "linkedIn" | "twitter";
};

export const socialLinks: SocialLink[] = [
  // {
  //   platform: "facebook",
  //   url: "https://www.facebook.com/profile.php?id=100003234932687",
  //   icon: <FaFacebook size={25} />,
  //   iconAlt: "facebook",
  // },
  // {
  //   platform: "instagram",
  //   url: "https://www.instagram.com/john_lifetraveler/",
  //   icon: <FaInstagram size={25} />,
  //   iconAlt: "instagram",
  // },
  {
    platform: "github",
    url: "https://github.com/tim9510019",
    icon: <FaGithub size={25} />,
    iconAlt: "github",
  },
  {
    platform: "twitter",
    url: "https://x.com/chenzhengting1",
    icon: <FaXTwitter size={25} />,
    iconAlt: "twitter",
  },
  {
    platform: "linkedIn",
    url: "https://www.linkedin.com/in/jeng-ting-chen-b05658123/",
    icon: <FaLinkedin size={25} />,
    iconAlt: "linkedIn",
  },
];

type NavLink = {
  label: string;
  url: string;
};

export const navLinks: NavLink[] = [
  // { label: "財經資訊宇宙", url: "/categories/財經資訊宇宙" },
  // { label: "量子計算宇宙", url: "/categories/量子計算宇宙" },
  // { label: "人工智慧宇宙", url: "/categories/人工智慧宇宙" },
  // { label: "易經推演宇宙", url: "/categories/易經推演宇宙" },

];
