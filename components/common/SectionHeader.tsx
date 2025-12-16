import Image from "next/image";
import Link from "next/link";

const SectionHeader = ({ title, path }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg leading-[145%]">{title}</h3>
      {path && (
        <Link
          href={path}
          className="text-xs leading-[145%] font-semibold items-center flex gap-x-1"
        >
          See all {title.toLowerCase()}
          <Image
            className={`size-4.5 rotate-270`}
            src="/icons/chevron-down.svg"
            alt="chevron down icon"
            width={18}
            height={18}
            priority
          />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
