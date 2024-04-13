import { z } from "zod";

export const FormDataSchema = z.object({
    name: z.string().nonempty("Name Is Required."),
    message: z
        .string()
        .nonempty("Message Is Required.")
        .min(6, { message: "Message Must Be At Least 6 Characters." })
});

export const ContactFormSchema = z.object({
    name: z.string().nonempty("Name Is Required."),
    email: z.string().nonempty("Email Is Required.").email("Invalid Email."),
    message: z
        .string()
        .nonempty("Message Is Required.")
        .min(6, { message: "Message Must Be At Least 6 Characters." })
});