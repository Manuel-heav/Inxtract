"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import Topbar from "../_components/Topbar";
import { DocumentForm } from "@/form/DocumentForm";
import Link from "next/link";
interface Document {
    title: string;
    aiResponse: string;
    time: string;
}

export default function DocumentSummarize() {
    const { userId } = useAuth();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    console.log(documents);

    useEffect(() => {
        if (userId) {
            const fetchDocuments = async () => {
                try {
                    const raw = JSON.stringify({ userId: userId }); // Ensure the key matches the backend expectation
                    const requestOptions: RequestInit = {
                        method: "POST",
                        body: raw,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        redirect: "follow",
                    };
                    const response = await fetch("http://localhost:5268/api/conversations/list", requestOptions);
                    if (!response.ok) {
                        throw new Error(`Network response was not ok, status: ${response.status}`);
                    }
                    const result: Document[] = await response.json();
                    setDocuments(result);
                } catch (error) {
                    console.error("Error fetching documents:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchDocuments();
        }
    }, [userId]);

    return (
        <div>
            <Topbar />
            <div className="flex gap-12 mx-8 bg-[#fff] p-7 rounded-3xl shadow-custom-1">
                <div className="w-[20%]">
                    <h1 className="text-xl font-bold tracking-tighter">Analyzed documents</h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        documents.map((doc, index) => (
                            <CardItem key={index} title={doc.title} description={doc.aiResponse} time={doc.time} />
                        ))
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Collaborate on your research</h1>
                    <p className="text-[#8C8C91] mb-5">Work on one document with your colleagues.</p>
                    <DocumentForm />
                </div>
            </div>
        </div>
    );
}

interface CardItemProps {
    title: string;
    description: string;
    time: string;
}

function CardItem({ title, description, time }: CardItemProps) {
    const formattedTime = getTimeDifferenceFromTitle(title);
    const formattedText = cleanText(description);

    return (
        <Link href="/dashboard/summarize">
        <div className="flex flex-col gap-2 mb-5 mt-5 cursor-pointer">
            <div className="flex gap-2 items-center">
                <div className="bg-[#F0F4F9] text-black w-12 h-12 rounded-xl flex items-center justify-center">AI</div>
                <div>
                    <h2 className="font-bold">{formattedText?.split(' ').slice(100, 102).join(' ')}...</h2>
                    <p className="text-[#8C8C91]">{formattedTime}</p>
                </div>
            </div>
            <p className="text-[#8C8C91]">...{formattedText?.split(' ').slice(100, 115).join(' ')}...</p>
        </div>
        </Link>
    );
}

function cleanText(text: String) {
    return text.replace(/\\n/g, " ").replace(/\\/g, "").trim();
}
function getTimeDifferenceFromTitle(title: String) {
    const dateTimeString = title.split("_").slice(1).join("_"); // Extract the date and time part
    const formattedString = dateTimeString.replace(/_/g, "-").replace("-", "T") + ":00Z";
    const analyzedDate = new Date(formattedString);
    const now = new Date();

    const timeDifference = Math.abs(now.getTime() - analyzedDate.getTime());
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes ago`;
    } else {
        return "Just now";
    }
}
