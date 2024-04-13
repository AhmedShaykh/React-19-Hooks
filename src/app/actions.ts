"use server";
import ContactFormEmail from "@/emails/ContactFormEmail";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
import { ContactFormSchema } from "@/lib/schema";
import { Resend } from "resend";
import { z } from "zod";

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: ContactFormInputs) {

    const result = ContactFormSchema.safeParse(data);

    if (result.success) {

        const { name, email, message } = result.data;

        try {

            const data = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: "ahmed.xhaykh4@gmail.com",
                subject: "Contact Form Submission",
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                react: ContactFormEmail({ name, email, message })
                // react: MagicLinkEmail({})
            });

            return { success: true, data };

        } catch (error) {

            return { success: false, error };

        }
    }

    if (result.error) {

        return { success: false, error: result.error.format() };

    }

};