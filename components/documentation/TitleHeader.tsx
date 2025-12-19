const TitleHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <header className="mb-20">
      <h1 className="mb-2.5 relative -mt-2 text-3xl leading-[1.2] font-bold">
        {title}
      </h1>
      {subtitle && <p className="mt-5 text-lg leading-6.5">{subtitle}</p>}
    </header>
  );
};

export default TitleHeader;
