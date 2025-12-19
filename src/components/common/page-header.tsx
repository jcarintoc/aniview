interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  className = "mb-6",
}: PageHeaderProps) => {
  return (
    <div className={className}>
      <h1 className="text-2xl sm:text-3xl font-bold font-secondary">{title}</h1>
      {description && (
        <p className="text-white/60 text-sm mt-1">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
