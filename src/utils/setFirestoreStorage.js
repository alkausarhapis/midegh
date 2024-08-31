import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase"; // Import Firebase configuration

/**
 * Fungsi untuk mengunggah gambar ke Firebase Storage dan mengembalikan URL gambar.
 * @param {File} img - File gambar yang akan diunggah.
 * @param {string} id - ID unik untuk nama file di Storage.
 * @param {string} col - Nama koleksi atau folder di Storage.
 * @param {string} prevImage - (Opsional) Nama file gambar sebelumnya yang akan dihapus.
 * @returns {Promise<string>} - URL download dari gambar yang diunggah.
 */
export default async function setFirestoreStorage(
  img,
  id,
  col,
  prevImage = null
) {
  try {
    // Hapus gambar sebelumnya jika ada
    if (prevImage) {
      const prevImageRef = ref(storage, `${col}/${prevImage}`);
      await deleteObject(prevImageRef);
    }

    // Membuat referensi ke file di Firebase Storage
    const storageRef = ref(storage, `${col}/${id}`);
    // Mengunggah file ke Firebase Storage
    const uploadTask = await uploadBytesResumable(storageRef, img);
    // Mendapatkan URL download gambar yang diunggah
    const url = await getDownloadURL(uploadTask.ref);
    return url;
  } catch (error) {
    console.error("Error handling Firebase Storage: ", error);
    throw new Error("Failed to upload image to Firebase Storage.");
  }
}
