import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";

type FormData = {
  userName: string;
  email: string;
  comment: string;
};

function App() {
  const [visible, setVisible] = useState(false);

  const schema = Joi.object({
    userName: Joi.string().min(3).max(30).required().messages({
      // "string.empty": "Please enter your UserName",
      // "string.min": "Please enter a valid UserName",
    }),
    email: Joi.string()
      .required()
      .pattern(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/
      )
      .messages({
        // "string.empty": "Please enter your email address",
        // "string.pattern.base": "Please enter a valid email address",
      }),
    comment: Joi.string().min(6).required().messages({
      // "string.empty": "Please enter your Comment",
      // "string.pattern.base": "Please enter a valid Comment",
      // "string.min": "Please enter a valid Comment",
    }),
  }).messages({
    "string.empty": "{{#label}} is required ",
    "string.min": "{{#label}} is too short",
    "string.max": "{{#label}} is too long",
    "string.pattern.base": "{{#label}} must be a valid email address",
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const handleShowModal = () => setVisible(true);
  const handleHideModal = () => {
    setVisible(false);
    reset({}, { keepValues: true, keepErrors: false });
  };

  const handleOnSubmit = (data: FormData) => {
    console.log(data);
    reset();
    setVisible(false);
  };

  return (
    <div>
      <Button
        onClick={() => handleShowModal()}
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
        }}
        icon="pi pi-reply"
      />
      <Dialog
        header="FeedBack"
        visible={visible}
        position={"bottom-right"}
        onHide={() => handleHideModal()}
        draggable={false}
        dismissableMask={true}
        resizable={false}
        // style={{ width: "30vw", height: "80vh" }}
        // footer={footerContent}
      >
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <InputText
              style={{
                marginTop: "0.1rem",
              }}
              keyfilter="alphanum"
              placeholder="username"
              {...register("userName")}
              invalid={errors.userName ? true : false}
            />
            {errors.userName && (
              <p
                style={{
                  fontSize: "12px",
                  color: "red",
                  margin: 0,
                }}
              >
                {errors.userName.message}
              </p>
            )}
            <InputText
              keyfilter="email"
              placeholder="email"
              {...register("email")}
              invalid={errors.email ? true : false}
            />
            {errors.email && (
              <p
                style={{
                  fontSize: "12px",
                  color: "red",
                  margin: 0,
                }}
              >
                {errors.email.message}
              </p>
            )}
            <InputTextarea
              keyfilter="alphanum"
              placeholder="comment"
              {...register("comment")}
              invalid={errors.comment ? true : false}
            />
            {errors.comment && (
              <p
                style={{
                  fontSize: "12px",
                  color: "red",
                  margin: 0,
                }}
              >
                {errors.comment.message}
              </p>
            )}
            <Button
              type="submit"
              label="Submit"
              severity="secondary"
              style={{ marginTop: "0.5rem" }}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default App;

{
  /* <span className="p-float-label" style={{ marginTop: "1.5rem" }}>
              <InputText
                id="username"
                {...register("userName")}
                invalid={errors.userName ? true : false}
              />
              <label htmlFor="username">Username</label>
            </span>
            <span className="p-float-label" style={{ marginTop: "1.5rem" }}>
              <InputText
                id="Email"
                {...register("email")}
                invalid={errors.email ? true : false}
              />
              <label htmlFor="email">Email</label>
            </span>
            <span className="p-float-label" style={{ marginTop: "1.5rem" }}>
              <InputText
                id="comment"
                {...register("comment")}
                invalid={errors.comment ? true : false}
              />
              <label htmlFor="comment">Comment</label>
            </span> */
}
