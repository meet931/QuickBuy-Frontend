import Link from "next/link";
import React from "react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="grid justify-center p-4 gap-8 bg-gray-200 text-base-content">
      <div className="flex items-center justify-center gap-10">
        <Link href={"#"} className="hover:underline">
          About us
        </Link>
        <Link href={"#"} className="hover:underline">
          Contact
        </Link>
        <Link href={"#"} className="hover:underline">
          Jobs
        </Link>
        <Link href={"#"} className="hover:underline">
          Press kit
        </Link>
      </div>
      <div>
        <div className="flex items-center justify-center gap-8">
          <Link href={"#"} target="_blank">
            <Instagram />
          </Link>
          <Link href={"#"} target="_blank">
            <Twitter />
          </Link>
          <Link href={"#"} target="_blank">
            <Linkedin />
          </Link>
        </div>
      </div>
      <div>
        <p>
          Copyright © 2025 - All right reserved by <span>Ved Patel</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
