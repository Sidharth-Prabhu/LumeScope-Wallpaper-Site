import { motion } from "framer-motion";
import { X, Github, ExternalLink, Heart, Code2, Globe } from "lucide-react";

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
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
        className="relative w-full max-w-2xl bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20 rotate-12">
            <Globe className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-black tracking-tighter text-white mb-2">ABOUT LUMESCOPE</h2>
          <p className="text-white/40 text-sm mb-8 uppercase tracking-widest font-bold">Aesthetic Wallpaper Explorer</p>

          <div className="space-y-6 text-left w-full">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Github className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white uppercase tracking-tight">The Collection</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                This project is a curated fork of the amazing collection from 
                <a 
                  href="https://github.com/D3Ext/aesthetic-wallpapers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 underline underline-offset-4 ml-1 transition-colors"
                >
                  D3Ext/aesthetic-wallpapers
                </a>. 
                The wallpapers are dynamically fetched and categorized from the original repository to provide you with the latest aesthetic visuals.
              </p>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Code2 className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white uppercase tracking-tight">The Developer</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Created with passion by <strong>Sidharth P L</strong>. This site explores modern web technologies like React, Three.js, and Framer Motion to create an immersive browsing experience.
              </p>
              <a 
                href="https://github.com/Sidharth-Prabhu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-white transition-all border border-white/10"
              >
                <Github className="w-4 h-4" /> Follow on GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-2 text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Sidharth P L
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
