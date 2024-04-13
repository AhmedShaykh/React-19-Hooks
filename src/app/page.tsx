import ContactForm from "@/Components/ContactForm";

const Home = () => {
    return (
        <div className="py-20 flex flex-col items-center gap-16">
            <div className="container md:max-w-4xl">
                <h1 className="mb-10 px-2 text-3xl text-center font-bold">
                    Contact Us
                </h1>

                <ContactForm />
            </div>
        </div>
    )
};

export default Home;