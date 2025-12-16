import { cn } from "@/lib/utils";

const PageHeader = ({ title, description, className }) => {
  return (
    <div className={cn("flex flex-col gap-y-1", className)}>
      <h1 className="font-semibold text-2xl tracking-[-2%]">{title}</h1>
      <p className="leading-[145%] text-[#475367]">{description}</p>
    </div>
  );
};

export default PageHeader;
