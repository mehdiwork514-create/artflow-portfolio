"use client";

import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";
import {
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  telegram: TelegramIcon,
};

const hoverStyles: Record<SocialLink["icon"], string> = {
  github: "hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:shadow-indigo-500/20 group-hover:text-indigo-300",
  linkedin: "hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-blue-500/20 group-hover:text-blue-300",
  twitter: "hover:border-sky-500/40 hover:bg-sky-500/10 hover:shadow-sky-500/20 group-hover:text-sky-300",
  telegram: "hover:border-sky-400/40 hover:bg-sky-500/10 hover:shadow-sky-500/20 group-hover:text-sky-300",
};

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className={cn(
              "group relative flex h-12 w-12 items-center justify-center rounded-full glass transition-all duration-300 hover:shadow-lg",
              hoverStyles[link.icon],
            )}
          >
            <Icon className="h-5 w-5 text-muted transition-colors" />
          </a>
        );
      })}
    </div>
  );
}
