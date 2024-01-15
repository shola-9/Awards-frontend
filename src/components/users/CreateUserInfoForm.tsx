import { useState } from "react";
import styles from "../../pages/styles/dynamicGroupPageReusable.module.css/createGroupPostForm/createGroupPostForm.module.css";
import { CreateUserInfoForm } from "../../typesAndInterfaces/createUserInfoForm";
import postUserinfoFn from "../../lib/user/postUsersInfo";
import SubHeading from "../app/SubHeading";

// there's no form 2. 1 is added for naming purpose only
const CreateUserInfoForm1 = () => {
  const [formDataInputs, setFormDataInputs] = useState<CreateUserInfoForm>({
    user_img: "",
    user_phone_number: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
      if (key === "user_img") {
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
      await postUserinfoFn(formDataBody);

      // reset the form
      setFormDataInputs({
        user_img: "",
        user_phone_number: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SubHeading value="Create profile" />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles.clubPostForm}
      >
        <h4>
          You will start seeing more interesting information here once you
          complete your profile.
        </h4>
        <div className={styles.buttonsArea}>
          <div>
            <label
              htmlFor="user_phone_number"
              className="form-label"
            >
              Telephone
            </label>
            <input
              onChange={handleChange}
              id="user_phone_number"
              name="user_phone_number"
              value={formDataInputs.user_phone_number}
              placeholder="Write tel..."
              type="tel"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="user_img"
              className="form-label"
            >
              Image
            </label>
            <input
              onChange={handleChange}
              type="file"
              id="user_img"
              name="user_img"
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
          >
            Create Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateUserInfoForm1;
