
export default function LatestSummaries() {
    return (
        <div className="gap-5 rounded-xl border border-[#8C8C91] p-4">
            <div className="flex justify-between w-[100%] mb-2">
                <div>
                    <h2 className="font-bold mb-2">Latest summaries <span className="text-xs p-1 rounded-full text-[#8C8C91] border border-[#8C8C91]">91 summaries</span></h2>
                    <p className="text-[#8C8C91]">Check out recent summaries</p>
                </div>

                <div className="flex px-2 py-4 rounded-xl h-5 items-center space-x-4 text-sm border border-[#8C8C91]">
                    <div className="cursor-pointer">All</div>
                    <div className="cursor-pointer">Articles</div>
                    <div className="cursor-pointer">Videos</div>
                    <div className="cursor-pointer">Docs</div>
                 </div>
            </div>

            <div>
    <div className="flex flex-col gap-8 mt-5">
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
                <div className="bg-[#F0F4F9] text-black w-12 h-12 rounded-xl flex items-center justify-center">AI</div>
                <div>
                    <h2 className="font-bold">AI in Healthcare</h2>
                    <p className="text-[#8C8C91]">2 hours ago</p>
                </div>
            </div>
            <p className="text-[#8C8C91]">Artificial Intelligence (AI) is transforming healthcare with applications ranging from diagnostic tools to personalized treatment plans. Recent studies highlight AI's role in predicting patient outcomes and improving efficiency in medical imaging.</p>
        </div>

        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
                <div className="bg-[#F0F4F9] text-black w-12 h-12 rounded-xl flex items-center justify-center">BT</div>
                <div>
                    <h2 className="font-bold">Blockchain Technology</h2>
                    <p className="text-[#8C8C91]">4 hours ago</p>
                </div>
            </div>
            <p className="text-[#8C8C91]">Blockchain technology is revolutionizing industries by providing secure and transparent transactions. Recent research focuses on blockchain's potential to enhance supply chain management and ensure data integrity in financial services.</p>
        </div>

        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
                <div className="bg-[#F0F4F9] text-black w-12 h-12 rounded-xl flex items-center justify-center">CR</div>
                <div>
                    <h2 className="font-bold">Climate Change</h2>
                    <p className="text-[#8C8C91]">6 hours ago</p>
                </div>
            </div>
            <p className="text-[#8C8C91]">Climate change remains a critical global issue, with recent studies emphasizing the urgency of reducing greenhouse gas emissions. Research highlights the impact of climate change on natural ecosystems and the importance of adopting sustainable practices.</p>
        </div>
    </div>
</div>


        </div>
    )
}