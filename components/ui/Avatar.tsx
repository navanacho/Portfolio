import Image from "next/image";

const AVATAR_SRC = "/assets/images/avatar.png";
const AVATAR_SIZE = 96;

interface AvatarProps {
  readonly className?: string;
}

export function Avatar({ className = "" }: AvatarProps) {
  return (
    <Image
      src={AVATAR_SRC}
      alt="Retrato de Ignacio Navarria"
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      unoptimized
      className={`h-24 w-24 rounded-full border border-primary/40 object-cover ${className}`}
    />
  );
}
