import { CustomLogo } from "@/features/ui";
import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineFacebook,
} from "react-icons/ai";

const socialItems = [
  { icon: AiOutlineFacebook, href: "/" },
  { icon: AiOutlineInstagram, href: "/" },
  { icon: AiOutlineLinkedin, href: "/" },
];

const navItems = [
  { name: "Trabaja con nosotros", href: "/trabajaConNosotros" },
  { name: "Quienes somos", href: "/about" },
  { name: "Blog", href: "/blog" },
];

function Footer() {
  return (
    <footer className="text-white bg-secondary py-6 flex flex-col gap-6">
      <div className="flex justify-evenly items-center max-sm:flex-col gap-4">
        <div className="py-2 flex flex-col gap-4">
          <CustomLogo width={200} />
          <div className="flex justify-center gap-4">
            {socialItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <item.icon className="text-2xl" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-sm:items-center">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <p className="text-center text-sm">
        Copyright © {new Date().getFullYear()} FisiomFulness
      </p>
    </footer>
  );
}

export default Footer;
