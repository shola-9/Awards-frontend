import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import privilegeCheckFn from "../../lib/user/privilegeCheck";
import { Link, useNavigate } from "react-router-dom";
import { CreatePost } from "../../typesAndInterfaces/createPost";
import createPostFn from "../../lib/posts/createPost";
import styles from "../styles/formKF3.module.css";

export const AdminHome = () => {
  const [formData, setFormData] = useState<CreatePost>({
    name: "",
    sub_heading: "",
    year: "",
    picture: "",
    tag: "winners",
  });
  const [post, setPost] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      privilegeCheckFn()
        .then((data) => {
          if (data.privilege === "euser") {
            navigate("/");
          }
        })
        .catch((error) => {
          navigate("/");
        });
    } catch (error) {
      navigate("/");
    }
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
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: fileList,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataBody = new FormData();
    for (const key in formData) {
      if (key === "picture") {
        const value = formData[key];
        if (value instanceof FileList) {
          const fileList = value as FileList;
          for (let i = 0; i < fileList.length; i++) {
            formDataBody.append(key, fileList[i]);
          }
        } else if (typeof value === "string") {
          formDataBody.append(key, value);
        }
      } else {
        formDataBody.append(key, String(formData[key]));
      }
    }

    formDataBody.append("post", post);
    try {
      await createPostFn(formDataBody);

      // reset the form
      setFormData({
        name: "",
        sub_heading: "",
        post: "",
        year: "",
        picture: "",
        tag: "winners",
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={styles.containerKF3}
    >
      <div className={styles.navbar}>
        <Link to="/admin">Home</Link>
        <Link to="/admin">Home</Link>
        <Link to="/admin">Home</Link>
      </div>
      <h1>Add Post to Winners on Home Page</h1>
      <section>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            aria-required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sub_heading">Sub heading</label>
          <input
            type="text"
            name="sub_heading"
            value={formData.sub_heading}
            required
            aria-required
            onChange={handleChange}
          />
        </div>
        <div>
          <ReactQuill
            theme="snow"
            value={post}
            onChange={setPost}
          />
        </div>

        <div>
          <label htmlFor="year">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            required
            aria-required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="picture"></label>
          <input
            required
            aria-required
            onChange={handleChange}
            type="file"
            id="picture"
            name="picture"
          />
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            required
            aria-required
            onChange={handleChange}
          />
        </div>
        <div>
          <button>submit</button>
        </div>
      </section>
    </form>
  );
};
