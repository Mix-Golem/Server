import { imageUploader } from "../../config/s3.config";
import util from "util";

export async function s3Uploader(req, res) {
	const upload = util.promisify(imageUploader.single("image"));

	try {
		// Wait for the upload to complete
		await upload(req, res);

		// Check if file was uploaded
		if (!req.file) {
			throw new Error("File upload failed");
		}

		// Return the file URL
		const url = req.file.location;
		return url;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const profileUploader = async (req, res) => {
	const upload = util.promisify(imageUploader.single("image"));

	try {
		// Wait for the upload to complete
		await upload(req, res);

		// Check if file was uploaded
		if (!req.file) {
			throw new Error("File upload failed");
		}

		// Return the file URL
		const url = req.file.location;
		return url;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
