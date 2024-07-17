import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-8 md:py-8 lg:py-8">
      <div className="grid gap-4">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Unlock Premium Features</h2>
          <p className="max-w-[600px] text-[#8C8C91] mb-5">
            Get access to advanced summarizing, custom reporting, and team collaboration tools with our premium plan.
          </p>
        </div>
        <div className="w-full max-w-sm">
          <Link href="/dashboard/pricing">
          <button
            type="submit"
            className="w-full rounded-md bg-[#f05a24] py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Sign Up for Premium
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}