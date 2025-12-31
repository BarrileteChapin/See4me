import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import phoneMountVideo from '@/assets/phone-mount-demo.mp4';

const Landing = () => {
  const teamMembers = [
    { name: 'Victor Pimshin', role: 'Developer' },
    { name: 'Bakyt Naurzalinov', role: 'Developer' },
    { name: 'Carlos León', role: 'Developer' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="py-12 px-6 text-center border-b border-border">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          See For Me
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered visual assistance for the visually impaired. Mount your device, and let technology be your eyes.
        </p>
      </header>

      {/* Two-Step Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Step 1: Mounting */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-full mb-3">
                Step 1
              </span>
              <h2 className="text-3xl font-bold mb-2">Mount Your Device</h2>
              <p className="text-muted-foreground">
                Attach your smartphone to a white cane using our universal mount. 
                The adjustable grip securely holds any device.
                <span className="block mt-2 text-sm italic">Coming soon — currently a concept prototype.</span>
              </p>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-border bg-muted">
              <video
                src={phoneMountVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Step 2: Testing */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-full mb-3">
                Step 2
              </span>
              <h2 className="text-3xl font-bold mb-2">Start Exploring</h2>
              <p className="text-muted-foreground">
                Open the app and let AI describe your surroundings. 
                Real-time object detection and voice narration guide your way.
              </p>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-border bg-muted flex flex-col">
              {/* App Preview */}
              <div className="flex-1 bg-card flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2">Camera Ready</p>
                  <p className="text-sm text-muted-foreground mb-6">AI Vision & Object Detection</p>
                  <Link to="/app">
                    <Button size="lg" className="text-lg px-8">
                      Try the App
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Team Section */}
      <section className="border-t border-border py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">The Team</h2>
          <p className="text-muted-foreground mb-12">Built with care by</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-muted-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          See For Me — Making the world more accessible through AI
        </p>
      </footer>
    </div>
  );
};

export default Landing;
