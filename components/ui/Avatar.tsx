import Image from "next/image";

const AVATAR_SRC = "/assets/images/avatar.png";
const AVATAR_WIDTH = 1024;
const AVATAR_HEIGHT = 1536;

interface AvatarProps {
  readonly className?: string;
}

export function Avatar({ className = "" }: AvatarProps) {
  return (
    <Image
      src={AVATAR_SRC}
      alt="Retrato de Ignacio Navarria"
      width={AVATAR_WIDTH}
      height={AVATAR_HEIGHT}
      unoptimized
      className={`h-[4.5rem] w-12 shrink-0 object-contain ${className}`}
    />
  );
}
