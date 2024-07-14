import { Card, CardContent } from "@/components/ui/card";
import CTA from "./CTA";


export default function DashboardMain() {
    return (
        <div className="flex mx-8 bg-[#fff] p-7 rounded-3xl shadow-custom-1">
            <div>
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Hello John,</h1>
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
            </div>


            {/* Right */}
            <div>Right</div>
        </div>
    )
}