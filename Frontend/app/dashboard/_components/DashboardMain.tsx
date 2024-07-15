"use client"
import { Card, CardContent } from "@/components/ui/card";
import CTA from "./CTA";
import LatestSummaries from "./LatestSummaries";
import { PlanSidebar } from "@/components/component/plan-sidebar";
import { useUser } from "@clerk/clerk-react";


export default function DashboardMain() {
    const { isSignedIn, user } = useUser();
    return (
        <div className="flex gap-5 mx-8 bg-[#fff] p-7 rounded-3xl shadow-custom-1">
            <div className="w-[65%]">
                {
                    isSignedIn && <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Hello {user.fullName},</h1>
                }
                <p className="text-[#8C8C91] mb-5">Explore content more deeply and effectively</p>

                <div className="flex gap-2">
                    <Card className="mb-3 rounded-3xl bg-[#FBE9D0]">
                        <CardContent className="w-60 h-60 flex flex-col justify-between p-6">
                            <div>
                                <h1 className="font-bold">Articles</h1>
                                <p>Number of analyzed articles</p>
                            </div>
                            <h1 className="text-4xl font-bold">55</h1>
                        </CardContent>
                    </Card>

                    <Card className="mb-3 rounded-3xl bg-[#CFDEFC]">
                        <CardContent className="w-60 h-60 flex flex-col justify-between p-6">
                            <div>
                                <h1 className="font-bold">Summary average</h1>
                                <p>Number of analyzed articles</p>
                            </div>
                            <h1 className="text-4xl font-bold">24</h1>
                        </CardContent>
                    </Card>

                    <Card className="mb-3 rounded-3xl bg-[#E4E3E8]">
                        <CardContent className="w-60 h-60  flex flex-col justify-between p-6">
                            <div>
                                <h1 className="font-bold">Summary average</h1>
                                <p>Number of analyzed articles</p>
                            </div>
                            <h1 className="text-4xl font-bold">16</h1>
                        </CardContent>
                    </Card>
                </div>
                <CTA />
                <LatestSummaries />

            </div>


            {/* Right */}
            <div>
                <h1 className="bg-[#202939] w-full rounded-full py-2 px-24 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mb-5 text-2xl">1543+ <span className="text-sm">summaries</span></h1>
                <h1 className="mb-5 bg-[#F0F4F9] text-black w-full rounded-full py-3 px-24 font-medium shadow-sm transition-colors focus-visible:outline-none text-2xl focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">16 hours <span className="text-sm">saved</span></h1>
            
                <PlanSidebar />
            </div>
        </div>
    )
}