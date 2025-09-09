const CreationSectionTitle = ({ title, subtitle }) => {
  return (
    <div className="font-inter text-[#3F3F3F]">
      <p className="font-bold text-lg">{title}</p>
      <p className="opacity-50">{subtitle}</p>
    </div>
  );
};

export default CreationSectionTitle;
