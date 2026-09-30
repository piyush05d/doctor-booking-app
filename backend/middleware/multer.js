import multer from "multer";
import path from "path";

// Vercel pe disk pe file save nahi hoti, isliye memory mein rakhte hain
const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ok = allowed.test(path.extname(file.originalname).toLowerCase());
  if (ok) return callback(null, true);
  callback(new Error("Only image files (jpg, jpeg, png, webp) are allowed"));
};

// Vercel ki request limit 4.5MB hai, isliye 4MB rakha
const upload = multer({ storage, fileFilter, limits: { fileSize: 4 * 1024 * 1024 } });

export default upload;