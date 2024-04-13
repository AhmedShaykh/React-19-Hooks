"use client";
import React, { useState, useEffect, useCallback } from "react";
import { PaginationSection } from "./PaginationSection";
import { Card } from "@/Components/ui/card";
import { faker } from "@faker-js/faker";
import Image from "next/image";

const Paginations = () => {

    const [isClient, setIsClient] = useState(false);

    const [data, setData] = useState<{ image: string }[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [postsPerPage, setPostsPerPage] = useState(6);

    const generateFakeData = useCallback((): any => {

        const newImage = faker.image.urlPicsumPhotos();

        const isDuplicate = data.some((user) => user.image === newImage);

        if (!isDuplicate) {

            setData((prevData) => {

                const newItem = { image: newImage };

                const newData = [...prevData, newItem];

                localStorage.setItem("fakeUserData", JSON.stringify(newData));

                return newData;

            });

            return { image: newImage };

        } else {

            return generateFakeData();

        }

    }, [data]);

    const resetLocalStorage = () => {
        localStorage.removeItem("fakeUserData");
        setData([]);
    };

    useEffect(() => {

        const storedData = localStorage.getItem("fakeUserData");

        if (storedData) {
            setData(JSON.parse(storedData));
            setIsClient(true);
        } else {
            const newData = Array.from({ length: 50 }, generateFakeData);
            setData(newData);
            localStorage.setItem("fakeUserData", JSON.stringify(newData));
            setIsClient(true);
        }

    }, [generateFakeData]);

    const lastPostIndex = currentPage * postsPerPage;

    const firstPostIndex = lastPostIndex - postsPerPage;

    const currentPosts = data.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            {isClient && (
                <>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 w-full px-20 py-6">
                        {currentPosts.map((data, idx) => {
                            return (
                                <Card
                                    className="items-start flex overflow-hidden"
                                    key={idx}
                                >
                                    <div className="group flex transform flex-col overflow-hidden transition-all duration-200">
                                        <div className="overflow-hidden rounded-sm">
                                            <Image
                                                className="h-full w-full transform object-cover transition-all duration-200 group-hover:scale-105"
                                                src={data.image}
                                                width={650}
                                                height={500}
                                                alt="Image"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <PaginationSection
                        totalPosts={data.length}
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </>
    )
};

export default Paginations;