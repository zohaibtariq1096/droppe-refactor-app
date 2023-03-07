import * as React from "react";
import Button from "./button";
import styles from "./form.module.css";

type IFormProps = {
  onSubmit: (payload: { title: string; description: string; price: string }) => void;
}

export const Form: React.FC<IFormProps> = ({ onSubmit }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const priceInputRef = React.useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleInputRef.current?.value;
    const price = priceInputRef.current?.value;
    const description = descriptionTextareaRef.current?.value;

    if (!title) {
      alert("Your product needs a title");
      return;
    }

    if (!price || !description) {
      alert("Your product needs some content");
      return;
    }

    onSubmit({
      title,
      price,
      description,
    });

    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <span className={styles.label}>Product title: *</span>

      <input
        ref={titleInputRef}
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
      />

      <span className={styles.label}>Product details: *</span>

      <input
        ref={priceInputRef}
        placeholder="Price..."
        defaultValue=""
        className={styles.input}
      />

      <textarea
        ref={descriptionTextareaRef}
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
      />

      <Button>Add a product</Button>
    </form>
  );
};
