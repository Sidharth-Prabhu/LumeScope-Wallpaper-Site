import { motion, AnimatePresence } from "framer-motion";
import { Background } from "./components/Background";
import { WallpaperCard } from "./components/WallpaperCard";
import { WallpaperModal } from "./components/WallpaperModal";
import { AboutModal } from "./components/AboutModal";
import { Search, Sparkles, Layout, Compass, Info, Github, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { fetchWallpapersFromGitHub } from "./utils/github";
import type { Wallpaper } from "./types";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await fetchWallpapersFromGitHub();
      setWallpapers(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(wallpapers.map((w) => w.category));
    return ["All", ...Array.from(cats)].sort();
  }, [wallpapers]);

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter((w) => {
      const matchesSearch = w.filename.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           w.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === "All" || w.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, wallpapers, activeCategory]);

  const selectedWallpaperData = useMemo(() => {
    return wallpapers.find(w => w.filename === selectedWallpaper);
  }, [selectedWallpaper, wallpapers]);

  return (
    <div className="min-h-screen font-sans bg-transparent text-white relative overflow-hidden">
      <Background />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-300">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            LUMESCOPE
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60"
        >
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
            <Compass className="w-4 h-4" /> Discover
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> New
          </a>
          <button 
            onClick={() => setIsAboutOpen(true)}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <Info className="w-4 h-4" /> About
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search wallpapers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm outline-none focus:ring-2 ring-blue-500/50 w-48 md:w-64 transition-all"
            />
          </div>
          <a
            href="https://github.com/D3Ext/aesthetic-wallpapers"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </motion.div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-20 text-center relative">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent"
          >
            ELEVATE YOUR SPACE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Discover a curated collection of aesthetic wallpapers for your desktop and mobile devices. 
            All sourced from <span className="text-white border-b border-white/20">D3Ext/aesthetic-wallpapers</span> on GitHub.
          </motion.p>
        </section>

        {/* Categories / Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border transition-all text-sm font-medium ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-white/40 animate-pulse">Fetching aesthetic collection...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredWallpapers.map((w) => (
              <WallpaperCard 
                key={w.filename} 
                filename={w.filename}
                tags={w.tags}
                onClick={() => setSelectedWallpaper(w.filename)}
              />
            ))}
          </motion.div>
        )}

        {!isLoading && filteredWallpapers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-xl italic">No wallpapers found matching your search...</p>
          </div>
        )}

        <AnimatePresence>
          {selectedWallpaper && selectedWallpaperData && (
            <WallpaperModal
              filename={selectedWallpaper}
              tags={selectedWallpaperData.tags}
              category={selectedWallpaperData.category}
              wallpapers={wallpapers}
              onClose={() => setSelectedWallpaper(null)}
              onSelect={(name) => setSelectedWallpaper(name)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 backdrop-blur-md bg-black/40 relative z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span>Built with React & Framer Motion</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span>2026 LumeScope</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors">About</button>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
