import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export function Sidebar() {
  return (
    <div className="absolute top-0 left-0 h-full w-64 border-r text-foreground">
      <div className="px-4 py-3 border-b">
        <img src="/logo.png" className="h-10 ml-5 mb-12 mt-5" />
        <h2 className="cursor-pointer p-3 bg-[#F05A24] text-white rounded-full text-center">New Summarize</h2>
      </div>
      <div className="flex flex-col justify-between h-[70vh]">
            <nav className="grid gap-2 p-4">
              <Link href="#" className="flex items-center gap-3 p-1 rounded-md hover:bg-muted" prefetch={false}>
                <LayoutGridIcon className="w-5 h-5 text-muted-foreground" />
                <span>Dashboard</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 p-1 rounded-md hover:bg-muted" prefetch={false}>
                <BookOpenIcon className="w-5 h-5 text-muted-foreground" />
                <span>Articles</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 p-1 rounded-md hover:bg-muted" prefetch={false}>
                <VideoIcon className="w-5 h-5 text-muted-foreground" />
                <span>Videos</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 p-1 rounded-md hover:bg-muted" prefetch={false}>
                <FileTextIcon className="w-5 h-5 text-muted-foreground" />
                <span>Documents</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 p-1 rounded-md hover:bg-muted" prefetch={false}>
                <CopyIcon className="w-5 h-5 text-muted-foreground" />
                <span>Plagiarism Checker</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 p-1 rounded-md hover:bg-muted" prefetch={false}>
                <CodeIcon className="w-5 h-5 text-muted-foreground" />
                <span>Developer API</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 p-1 rounded-md hover:bg-muted" prefetch={false}>
                <LayoutGridIcon className="w-5 h-5 text-muted-foreground" />
                <span>Learn More</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 p-1 rounded-md hover:bg-muted" prefetch={false}>
                <FileTextIcon className="w-5 h-5 text-muted-foreground" />
                <span>Contact Us</span>
              </Link>
            </nav>
            <div className="border-t p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Personal</div>
                <Progress value={75} className="w-full mx-4" />
                <div className="text-sm font-medium">75%</div>
              </div>
              <Button variant="secondary" className="mt-3 w-full">
              19 summaries used of 30
              </Button>
            </div>
      </div>
    </div>
  );
}

function BookOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CopyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function LayoutGridIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function VideoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
