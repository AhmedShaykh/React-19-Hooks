"use client";
import { sendEmail } from "@/app/actions";
import { ContactFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

const ContactForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(ContactFormSchema)
    });

    const processForm: SubmitHandler<ContactFormInputs> = async data => {

        const result = await sendEmail(data);

        if (result?.success) {

            console.log({ data: result.data });

            toast.success("Email Sent!");

            reset();

            return;

        }

        console.log(result?.error);

        toast.error("Something Went Wrong!");

    }

    return (
        <form
            className="mx-auto flex flex-1 flex-col gap-4 text-gray-200 sm:w-1/2"
            onSubmit={handleSubmit(processForm)}
        >
            <div>
                <input
                    className="w-full rounded-lg p-3"
                    placeholder="Enter Name"
                    {...register("name")}
                />
                {errors.name?.message && (
                    <p className="ml-1 mt-1 text-sm text-red-400">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <input
                    className="w-full rounded-lg p-3"
                    placeholder="Enter Email"
                    {...register("email")}
                />
                {errors.email?.message && (
                    <p className="ml-1 mt-1 text-sm text-red-400">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <textarea
                    className="w-full rounded-lg p-3"
                    placeholder="Enter Message"
                    {...register("message")}
                    rows={5}
                    cols={5}
                />
                {errors.message?.message && (
                    <p className="ml-1 text-sm text-red-400">{errors.message.message}</p>
                )}
            </div>

            <button
                className="rounded-lg border border-black bg-black py-2.5 font-medium text-white transition-colors hover:bg-black/40 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form>
    )
};

export default ContactForm;