import SubHeading from "../components/app/SubHeading";
import styles from "./styles/createGroupPage/form.module.css";
import styles1 from "./styles/createGroupPage/wallpaperAndImgArea.module.css";
import styles2 from "./styles/createGroupPage/tagsArea.module.css";
import styles3 from "./styles/createGroupPage/formTextInputArea.module.css";
import { useState } from "react";
import createClubFn from "../lib/club/createClub";
import { CreateClub } from "../typesAndInterfaces/createClub";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formDataInputs, setFormDataInputs] = useState<CreateClub>({
    club_name: "",
    about_club: "",
    club_allow_invite: false,
    club_location: "",
    club_tag: "fashion",
    club_rules_and_regulation: "",
    club_type: "public",
    club_img: "",
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
      if (key === "club_img") {
        const value = formDataInputs[key];
        if (value instanceof FileList) {
          const fileList = value as FileList;
          for (let i = 0; i < fileList.length; i++) {
            formDataBody.append(key, fileList[i]);
          }
        } else if (typeof value === "string") {
          // If the value is already a string, it means a picture URL was provided.
          // In that case, directly set the field without appending to the FormData.
          formDataBody.append(key, value);
        }
      } else {
        formDataBody.append(key, String(formDataInputs[key]));
      }
    }

    try {
      const data = await createClubFn(formDataBody);
      navigate(`/group/${data.message.insertId}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SubHeading value="Create a new group" />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles.form}
      >
        <div className={styles.firstDiv}>
          <div>
            <label htmlFor="club_name" className="form-label"></label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="club_name"
              name="club_name"
              value={formDataInputs.club_name}
              placeholder="Group name"
            />
          </div>
          <div>
            <label htmlFor="about_club" className="form-label"></label>
            <textarea
              onChange={handleChange}
              className="form-control"
              id="about_club"
              name="about_club"
              value={formDataInputs.about_club}
              placeholder="Description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="club_img" className="form-label"></label>
            <input
              onChange={handleChange}
              type="file"
              className="form-control"
              id="club_img"
              name="club_img"
            />
          </div>
          <div>
            <label htmlFor="club_location" className="form-label"></label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="club_location"
              name="club_location"
              value={formDataInputs.club_location}
              placeholder="Location"
            />
          </div>
          <div>
            <label htmlFor="club_tag" className="form-label"></label>
            <select
              name="club_tag"
              id="club_tag"
              onChange={handleChange}
              value={formDataInputs.club_tag}
            >
              <option value="Fashion">Fashion</option>
              <option value="Dance">Dance</option>
              <option value="Education">Education</option>
              <option value="Music">Music</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="club_rules_and_regulation"
              className="form-label"
            ></label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="club_rules_and_regulation"
              name="club_rules_and_regulation"
              value={formDataInputs.club_rules_and_regulation}
              placeholder="Rules and regulation"
            />
          </div>
          <div>
            <label htmlFor="club_type" className="form-label"></label>
            <select
              name="club_type"
              id="club_type"
              onChange={handleChange}
              value={formDataInputs.club_type}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <div className={styles.checkboxDiv}>
          <input
            onChange={handleChange}
            type="checkbox"
            className="form-control"
            id="club_allow_invite"
            name="club_allow_invite"
            checked={formDataInputs.club_allow_invite}
          />
          <label htmlFor="club_allow_invite" className="form-label">
            Allow members to invite their connections Group members can invite
            to the group. All requests to join will still require admin
            approval.
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateGroup;
