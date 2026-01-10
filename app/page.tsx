import Link from 'next/link';
import { ArrowRight, BarChart3, Globe2, ShieldCheck, Database, Layers } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            The Beta Phase is Live
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl mx-auto">
            Transparency for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Fractional Real Estate</span> Market
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Chastor gives you the clarity you need in an exponentially growing market.
            Compare platforms, analyze opportunities, and invest with confidence in tokenized real estate and crowdfunding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/platforms"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary/90 rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
              Explore Platforms
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#vision"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-all border border-border"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Vision / Features Grid */}
      <section id="vision" className="py-24 bg-card/30 border-y border-border/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Chastor?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The market for fractional real estate is fragmented and opaque. We are building the definitive source of truth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Globe2 className="h-10 w-10 text-blue-500" />}
              title="Centralized Market Data"
              description="Access a comprehensive database of platforms from around the world in one place. No more jumping between dozens of tabs."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-green-500" />}
              title="Trust & Safety"
              description="Filter out the noise and identify legitimate opportunities. We aggregate validation data to help you avoid scams."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-purple-500" />}
              title="Data-Driven Decisions"
              description="Compare fees, historical returns, and asset types to maximize your portfolio's profitability."
            />
          </div>
        </div>
      </section>

      {/* Roadmap / Coming Soon */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Building the Future of <br />Real Estate Intelligence</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We are just getting started. Currently, we track the major platforms in the ecosystem.
                Soon, we will launch detailed project-level analytics, allowing you to search for specific properties across all platforms.
              </p>

              <div className="space-y-4">
                <RoadmapItem
                  icon={<Layers className="h-5 w-5 text-primary" />}
                  title="Platform Database"
                  status="Live"
                  active={true}
                />
                <RoadmapItem
                  icon={<Database className="h-5 w-5 text-muted-foreground" />}
                  title="Project Aggregation"
                  status="Coming Soon"
                  active={false}
                />
                <RoadmapItem
                  icon={<BarChart3 className="h-5 w-5 text-muted-foreground" />}
                  title="Advanced Analytics & API"
                  status="Planned"
                  active={false}
                />
              </div>
            </div>
            <div className="relative">
              {/* Abstract visual representation of "Connecting Data" */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 shadow-2xl">
                <div className="absolute top-0 right-0 p-32 bg-primary/10 blur-3xl rounded-full pointer-events-none"></div>
                <div className="space-y-4 font-mono text-sm text-green-400 opacity-80">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Tokenized_Asset_01</span>
                    <span>12.5% Yield</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Crowd_Project_Alpha</span>
                    <span>10.2% Yield</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Equity_Share_Bloc</span>
                    <span>Looking for data...</span>
                  </div>
                  <div className="animate-pulse pt-4 text-primary">
                    &gt; Aggregating global sources...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/50">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chastor. All rights reserved.
          </div>
        </div>
      </footer>

    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-card hover:bg-secondary/50 transition-colors p-8 rounded-2xl border border-border flex flex-col items-start text-left shadow-sm">
      <div className="p-3 bg-background rounded-xl border border-border shadow-sm mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function RoadmapItem({ icon, title, status, active }: { icon: React.ReactNode, title: string, status: string, active: boolean }) {
  return (
    <div className={`flex items-center p-4 rounded-xl border ${active ? 'bg-primary/5 border-primary/20' : 'bg-transparent border-transparent'} transition-all`}>
      <div className={`mr-4 p-2 rounded-full ${active ? 'bg-primary/20' : 'bg-secondary'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className={`font-semibold ${active ? 'text-primary' : 'text-foreground'}`}>{title}</h4>
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
        {status}
      </span>
    </div>
  )
}
