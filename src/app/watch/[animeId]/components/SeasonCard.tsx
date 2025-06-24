import Image from "next/image";

const SeasonCard: React.FC<{ poster: string; name: string; isCurrent: boolean }> = ({ poster, name, isCurrent }) => (
  <div className={`flex relative flex-col w-48 items-center space-y-2 cursor-pointer rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg ${isCurrent ? "border-emerald-500 border-2" : "border-blue-500"} border bg-gray-800`}>
    <Image className="object-cover rounded w-full h-24 blur-xs grayscale-75 contrast-150 brightness-50" src={poster} alt={name} width={64} height={96} />
    <p className={`${isCurrent ? "text-emerald-500" : "text-[#e2efff]"} text-sm font-semibold -translate-y-1/2 text-wrap absolute top-1/2 w-24 text-center`}>{name}</p>
  </div>
);

export default SeasonCard;