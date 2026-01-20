import { CtaButtonLink, TextLink } from "@/components/link";
import { TypebotLogoFull } from "@/components/TypebotLogo";
import { registerUrl } from "../../constants";
import gradientSeparatorSrc from "./assets/gradient-separator.png";

export const Footer = () => {
  return (
    <footer className="dark flex flex-col pb-12">
      <img src={gradientSeparatorSrc} alt="separator" className="w-full h-2" />
      <div className="flex flex-col max-w-7xl mx-auto px-6 md:px-4 w-full">
        <div className="flex flex-col md:flex-row gap-12 py-12 items-start md:items-center justify-between">
          <TypebotLogoFull className="mt-1" />
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
            <TextLink
              to="/pricing"
              className="text-muted-foreground font-normal"
              size="sm"
            >
              Pricing
            </TextLink>
            <CtaButtonLink href={registerUrl} size="sm">
              Get started free
            </CtaButtonLink>
          </div>
        </div>
        <p className="text-foreground/70 text-sm">
          Made By{" "}
          <a
            href="https://softwar.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            SoftWar
          </a>{" "}
          –{" "}
          <a
            href="https://www.linkedin.com/in/abdelrahman-abdelazeiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Abdelrahman Z. Abdelazeiz
          </a>
        </p>
      </div>
    </footer>
  );
};
