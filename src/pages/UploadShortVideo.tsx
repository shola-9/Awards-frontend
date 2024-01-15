import { useState } from "react";
import uploadShortVideoFn from "../lib/shortVideos/upload";
import SubHeading from "../components/app/SubHeading";
import styles from "./styles/uploadShortVideo.module.css";

interface CreateShortVideo {
  detail: string;
  video: FileList | string;
  [key: string]: string | number | FileList;
}
const UploadShortVideo = () => {
  const [formDataInputs, setFormDataInputs] = useState<CreateShortVideo>({
    detail: "",
    video: "",
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = event.target;

    if (type === "file") {
      const fileList = (event.target as HTMLInputElement).files;
      if (fileList) {
        setFormDataInputs((prevFormData) => ({
          ...prevFormData,
          [name]: fileList,
        }));
      }
    } else {
      setFormDataInputs((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataBody = new FormData();
    for (const key in formDataInputs) {
      if (key === "video") {
        const value = formDataInputs[key];
        if (value instanceof FileList) {
          const fileList = value as FileList;
          for (let i = 0; i < fileList.length; i++) {
            formDataBody.append(key, fileList[i]);
          }
        } else if (typeof value === "string") {
          formDataBody.append(key, value);
        }
      } else {
        formDataBody.append(key, String(formDataInputs[key]));
      }
    }

    try {
      // Assuming uploadShortVideoFn is your function to handle file uploads
      await uploadShortVideoFn(formDataBody);

      // reset the form
      setFormDataInputs({
        detail: "",
        video: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.uploadShortVideoContainer}>
      <SubHeading value="Upload Short Video" />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles.form}
      >
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="detail" className="form-label"></label>
            <textarea
              onChange={handleChange}
              id="detail"
              name="detail"
              value={formDataInputs.detail}
              placeholder="Write Something..."
            />
          </div>
          <div className="mb-3">
            {/* Wrap the file input inside a label */}
            <label
              htmlFor="video"
              className={`${styles.videoInput} ${styles.customStyles4UploadBtn}`}
            >
              + Upload
              <input
                onChange={handleChange}
                type="file"
                id="video"
                name="video"
                className={styles.hiddenInput}
              />
            </label>
          </div>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Post
        </button>
      </form>
    </div>
  );
};

export default UploadShortVideo;
