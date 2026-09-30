export const imageUrl = (path) => {
   if (!path) return "";
   if (/^https?:\/\//i.test(path)) return path;
   return (import.meta.env.VITE_BACKEND_URL || "") + path;
};