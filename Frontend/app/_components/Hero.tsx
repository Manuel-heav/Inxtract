import Testimonials from "@/components/Testimonials";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Hero(){
    return (
        <div className="w-[95%] m-auto mt-7">
            <div className="flex gap-20 w-[80%] mt-16">
                <div className="flex-5">
                    <h1 className="font-semibold">AI-Powered Summaries Simplified</h1>
                    <h1 className="text-5xl font-semibold leading-tight mt-4">Explore content more deeply and effectively</h1>
                </div>

                <p className="w-96 text-[#8C8C91]">AI-powered tool for summarizing research papers, academic papers and  scientific articles. Simplifies content consumption for busy professionals and students alike.</p>
            </div>
            
        <div className="flex mt-5 gap-16">
            <div>
                <div className="flex items-center gap-2">
                    <Link href="/dashboard">
                        <h2 className="cursor-pointer p-3 bg-[#F05A24] text-white rounded-full">Start For Free</h2>
                    </Link>
                    <h2 className="cursor-pointer p-3 bg-transparent rounded-full border">Learn More</h2>
                </div>

                <div>
                    <Testimonials />
                </div>
            </div>

            <div className="p-4 flex flex-col items-end bg-[url('/hero.png')] bg-cover w-[100%] rounded-xl">
            <Card className="mb-3">
                <CardContent className="w-80 flex flex-col justify-between p-6">
                    <h1 className="font-bold">Summary average</h1>
                    <p className="text-[#8C8C91] mt-4 mb-4">Users shorten content by an average of 78% using Inxtract, boosting efficiency.</p>
                    <h1 className="text-center text-6xl font-bold text-[#F05a24]">78%</h1>
                    <h1 className="text-center mt-4 border border-gray-300 rounded-full p-2 cursor-pointer">Read More</h1>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="w-80 flex flex-col justify-between p-6">
                    <h1 className="text-center text-4xl font-bold text-[#F05a24]">1543+</h1>
                    <p>Summaries generated this week in the first release</p>
                </CardContent>
              </Card>
            </div>

        </div>

        </div>
    )
}