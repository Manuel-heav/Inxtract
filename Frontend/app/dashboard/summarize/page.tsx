import { SummaryForm } from "@/form/SummaryForm";
import Topbar from "../_components/Topbar";

export default function DashboardSummarize(){
    return(
        <div>
            <Topbar />

            <div className=" mx-8 bg-[#fff] p-7 rounded-3xl shadow-custom-1">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Summary Article</h1>
                    <p className="text-[#8C8C91] mb-5">Explore content more deeply and effectively.</p>
                </div>
                <SummaryForm />
            </div>
        </div>
    )
}