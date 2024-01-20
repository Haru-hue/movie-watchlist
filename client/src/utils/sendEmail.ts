import emailjs from "@emailjs/browser";

const serviceKey = process.env.NEXT_PUBLIC_SERVICE_KEY || "";
const templateKey = process.env.NEXT_PUBLIC_TEMPLATE_KEY || "";
const emailKey = process.env.NEXT_PUBLIC_EMAIL_KEY || "";

export const sendEmail = (props: EmailParams) => {
  const templateParams: EmailParams = {
    to_name: props.to_name,
    to_email: props.to_email,
    message: props.message,
  };
  console.log(templateParams.message)
  emailjs
    .send(serviceKey, templateKey, templateParams, emailKey)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
};
