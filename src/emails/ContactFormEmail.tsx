import { FC } from "react";

interface ContactFormEmailProps {
    name: string;
    email: string;
    message: string;
};

const ContactFormEmail: FC<Readonly<ContactFormEmailProps>> = ({
    name,
    email,
    message
}) => (
    <div>
        <h1>Contact Form Submission</h1>
        <p>
            From <strong>{name}</strong> At {email}
        </p>

        <h2>Message:</h2>
        <p>{message}</p>
    </div>
);

export default ContactFormEmail;