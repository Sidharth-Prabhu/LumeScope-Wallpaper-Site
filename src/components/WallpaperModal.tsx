import { motion } from "framer-motion";
import { X, Download, ExternalLink, Maximize2 } from "lucide-react";
import { BASE_URL } from "../constants";
import { useMemo } from "react";
import type { Wallpaper } from "../types";

interface WallpaperModalProps {
  filename: string;
  tags?: string[];
  category?: string;
  wallpapers: Wallpaper[];
  onClose: () => void;
  onSelect: (filename: string) => void;
}

export function WallpaperModal({ filename, tags = [], category = "Unknown", wallpapers, onClose, onSelect }: WallpaperModalProps) {
  const imageUrl = `${BASE_URL}${filename}`;

  const displayName = filename
    .replace(/\.[^/.]+$/, "")
    .replace(/_/g, " ")
    .replace(/-/g, " ");

  // Simple "similarity" logic based on tags or category
  const similarWallpapers = useMemo(() => {
    let similar = wallpapers.filter(
      (w) => w.filename !== filename && (
        w.category === category || 
        tags.some(tag => w.tags.some(t => t.toLowerCase() === tag.toLowerCase()))
      )
    );
    
    if (similar.length < 4) {
      const others = wallpapers.filter(
        (w) => w.filename !== filename && !similar.find(s => s.filename === w.filename)
      );
      similar = [...similar, ...others.sort(() => 0.5 - Math.random())];
    }
    
    return similar.slice(0, 8);
  }, [filename, tags, category, wallpapers]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white capitalize leading-none">{displayName}</h2>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-md text-[10px] uppercase font-bold tracking-widest">
                {category}
              </span>
              {tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-white/5 text-white/40 border border-white/5 rounded-md text-[10px] uppercase font-bold tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="overflow-y-auto custom-scrollbar">
          {/* Main Image Display */}
          <div className="relative group aspect-video md:aspect-[21/9] w-full bg-black flex items-center justify-center overflow-hidden">
            <img
              src={imageUrl}
              alt={displayName}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-6 right-6 flex gap-3">
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all font-medium"
              >
                <Maximize2 className="w-4 h-4" /> View Full
              </a>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = imageUrl;
                  link.download = filename;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full border border-blue-400/20 transition-all font-medium shadow-lg shadow-blue-600/20"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>

          {/* Similar Wallpapers Section */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-white/60 mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/20" />
              Similar Wallpapers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarWallpapers.map((w) => (
                <motion.div
                  key={w.filename}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(w.filename)}
                  className="aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/5 relative group"
                >
                  <img
                    src={`${BASE_URL}${w.filename}`}
                    alt={w.filename}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
