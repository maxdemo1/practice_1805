import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const storage = multer.diskStorage({
  destination: path.resolve("temp"),
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const suffics = crypto.randomUUID();
    const filename = `${req.params.id}_${suffics}${ext}`;
    cb(null, filename);
  },
});

export default multer({ storage });
