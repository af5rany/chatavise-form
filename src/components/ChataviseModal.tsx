import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styles from "./ChataviseModal.module.css";

type FormData = {
  userName: string;
  email: string;
  comment: string;
};

function ChataviseModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const successToast = useRef<Toast>(null);

  const schema = z.object({
    userName: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be 3 or more chars long" })
      .max(30, { message: "Name must be 15 or less chars long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    comment: z
      .string()
      .nonempty({ message: "Comment is required" })
      .min(6, { message: "Comment must be 6 or more chars long" }),
  });

  useEffect(() => {
    if (toastVisible) {
      successToast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Message sent successfully",
        life: 3000,
      });

      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }
  }, [toastVisible]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const handleShowModal = () => setModalVisible(true);
  const handleHideModal = () => {
    setModalVisible(false);
    reset({}, { keepValues: true, keepErrors: false });
  };
  const handleSubmitModal = () => {
    setModalVisible(false);
    reset();
  };

  const handleOnSubmit = (data: FormData) => {
    console.log(data);
    handleSubmitModal();
    setToastVisible(true);
  };

  return (
    <>
      {toastVisible && <Toast ref={successToast} />}
      <Button
        onClick={() => handleShowModal()}
        className={styles.customButtonClass}
        icon="pi pi-reply"
      />
      {modalVisible && (
        <Dialog
          header="FeedBack"
          visible={modalVisible}
          position={"bottom-right"}
          onHide={() => handleHideModal()}
          draggable={false}
          dismissableMask={true}
          resizable={false}
        >
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className={styles.formContainer}>
              <InputText
                style={{ marginTop: "0.1rem" }}
                keyfilter="alphanum"
                placeholder="username"
                {...register("userName")}
                invalid={errors.userName ? true : false}
              />
              {errors.userName && (
                <p className={styles.errorText}>{errors.userName.message}</p>
              )}
              <InputText
                keyfilter="email"
                placeholder="email"
                {...register("email")}
                invalid={errors.email ? true : false}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
              <InputTextarea
                keyfilter="alphanum"
                placeholder="comment"
                {...register("comment")}
                invalid={errors.comment ? true : false}
              />
              {errors.comment && (
                <p className={styles.errorText}>{errors.comment.message}</p>
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
      )}
    </>
  );
}

export default ChataviseModal;

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
