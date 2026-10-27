import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /now was removed, but the link had been shared and real visitors still
      // land on it. 307 rather than 308: browsers cache a permanent redirect
      // forever, and this one should stay easy to undo if the page comes back.
      {
        source: "/now",
        destination: "/",
        permanent: false,
      },
      // The resume is generated at /api/resume now. public/resume.pdf is a
      // stale copy that older links still point at — redirects run before the
      // filesystem, so this wins over the file on disk.
      {
        source: "/resume.pdf",
        destination: "/api/resume",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
