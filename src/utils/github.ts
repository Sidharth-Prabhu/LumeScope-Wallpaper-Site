import type { Wallpaper } from "../types";

const GITHUB_API_URL = "https://api.github.com/repos/D3Ext/aesthetic-wallpapers/contents/pages";
const RAW_URL_BASE = "https://raw.githubusercontent.com/D3Ext/aesthetic-wallpapers/main/images/";

export async function fetchWallpapersFromGitHub(): Promise<Wallpaper[]> {
  const allWallpapers: Wallpaper[] = [];
  
  const parseContent = (content: string, category: string) => {
    const blocks = content.split(/tags: /g).slice(1);
    blocks.forEach(block => {
      const tagSection = block.split(/\n|<br/)[0];
      const tags = tagSection
        .match(/`(.*?)`/g)
        ?.map(t => t.replace(/`/g, "").trim()) || [];

      const imgMatch = block.match(/<img src="(.*?)"/);
      if (imgMatch) {
        const url = imgMatch[1];
        const filename = url.split("/").pop() || "";
        if (filename && !filename.includes(".gitkeep")) {
          allWallpapers.push({
            filename,
            url: `${RAW_URL_BASE}${filename}`,
            tags,
            category,
          });
        }
      }
    });
  };

  try {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) {
      console.warn("GitHub API rate limited or failed. Trying direct fallbacks...");
      throw new Error("API Limit");
    }
    const pages = await response.json();
    const mdFiles = pages.filter((f: any) => 
      f.name.endsWith(".md") && !["Contributing.md", "Stargazers.md", "Live.md"].includes(f.name)
    );

    const filePromises = mdFiles.map(async (file: any) => {
      try {
        const contentResponse = await fetch(file.download_url);
        const content = await contentResponse.text();
        parseContent(content, file.name.replace(".md", ""));
      } catch (e) {
        console.error(`Error parsing file ${file.name}:`, e);
      }
    });

    await Promise.all(filePromises);
  } catch (error) {
    // FALLBACK: Directly fetch key pages if API fails
    const fallbackPages = ["Page1.md", "Page2.md", "Mobile.md", "Unix.md"];
    const fallbackPromises = fallbackPages.map(async (page) => {
      try {
        const url = `https://raw.githubusercontent.com/D3Ext/aesthetic-wallpapers/main/pages/${page}`;
        const res = await fetch(url);
        const content = await res.text();
        parseContent(content, page.replace(".md", ""));
      } catch (e) {
        console.error(`Fallback fetch failed for ${page}:`, e);
      }
    });
    await Promise.all(fallbackPromises);
  }

  // Final check: if still empty, use some hardcoded defaults to at least show something
  if (allWallpapers.length === 0) {
    console.error("Critical: Could not fetch any wallpapers from GitHub.");
  }

  return allWallpapers;
}
