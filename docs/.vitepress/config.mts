import { defineConfig } from "vitepress";

const hostname = "https://get-or-throw.codecompose.dev";

export default defineConfig({
  title: "Get-Or-Throw",
  description:
    "Safe indexed access for TypeScript with noUncheckedIndexedAccess",
  base: "/",
  cleanUrls: true,

  sitemap: {
    hostname,
  },

  transformHead({ pageData }) {
    const canonicalUrl = `${hostname}/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "");

    return [["link", { rel: "canonical", href: canonicalUrl }]];
  },

  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Usage", link: "/usage" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "API", link: "/api" },
          { text: "Why Get-Or-Throw?", link: "/reasoning" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/0x80/get-or-throw" },
    ],
  },
});
