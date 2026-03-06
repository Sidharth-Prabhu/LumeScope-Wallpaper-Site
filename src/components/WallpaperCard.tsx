import { motion } from "framer-motion";
import { Download, ExternalLink, ImageIcon } from "lucide-react";
import { BASE_URL } from "../constants";
import { useState } from "react";

interface WallpaperCardProps {
  filename: string;
  tags?: string[];
  onClick?: () => void;
}

export function WallpaperCard({ filename, tags = [], onClick }: WallpaperCardProps) {
  const imageUrl = `${BASE_URL}${filename}`;
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const displayName = filename
    .replace(/\.[^/.]+$/, "")
    .replace(/_/g, " ")
    .replace(/-/g, " ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/5 shadow-2xl transition-all duration-500 perspective-1000 cursor-pointer"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#222]">
            <ImageIcon className="w-8 h-8 text-white/20 animate-pulse" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={displayName}
          onLoad={() => setIsLoading(false)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 backdrop-blur-sm transition-opacity duration-300"
        >
          <div className="flex gap-4">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
              title="View Original"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement("a");
                link.href = imageUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors border border-blue-400/20"
              title="Download"
            >
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 px-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-white/10 border border-white/10 rounded-full text-[10px] text-white/80 uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="p-4 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
        <h3 className="text-white font-medium truncate text-sm capitalize">
          {displayName}
        </h3>
        <p className="text-white/40 text-[10px] mt-1 uppercase tracking-widest font-bold">
          {filename.split(".").pop()}
        </p>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 -z-10" />
    </motion.div>
  );
}
