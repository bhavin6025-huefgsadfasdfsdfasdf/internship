/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  /* Standard Webpack-based CSS processing for Tailwind 4 stability in Next 14 */
};

export default nextConfig;
