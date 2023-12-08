import { useState } from "react";
import styles from "../../pages/styles/dynamicGroupPageReusable.module.css/createGroupPostForm/createGroupPostForm.module.css";
import { CreateStory } from "../../typesAndInterfaces/createStory";
import postUserStoryFn from "../../lib/story/postUserStory";
import stylesOne from "../../components/story/styles/uploadArea.module.css";

// there's no form 2. 1 is added for naming purpose only
export const UploadStoryArea = ({
  profileImg,
}: {
  profileImg: string | null;
}) => {
  const [formDataInputs, setFormDataInputs] = useState<CreateStory>({
    story: "",
    detail: "",
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
      if (key === "story") {
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
      await postUserStoryFn(formDataBody);

      // reset the form
      setFormDataInputs({
        story: "",
        detail: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={stylesOne.container}
    >
      <div>{profileImg && <img src={profileImg} alt="profile" />}</div>
      <div className="mb-3">
        <label htmlFor="story"></label>
        <input onChange={handleChange} type="file" id="story" name="story" />
      </div>

      <button type="submit">Add story</button>
    </form>
  );
};
