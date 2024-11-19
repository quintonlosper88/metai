import React from 'react';
import { 
  Users, Calculator, Newspaper, Brain,
  Award, Briefcase, Video, FileCheck,
  BarChart2, FileText, Beaker, Database,
  BookOpen, Building2, Play, Wrench,
  Search, Zap, Clock, TrendingUp
} from 'lucide-react';

const featureCategories = [
  {
    title: "Social App Features",
    icon: Users,
    color: "text-blue-500",
    features: [
      { name: "Professional Profile", description: "Specialized fields for metallurgists", icon: Award },
      { name: "Experience Tracking", description: "Track process types and equipment experience", icon: FileCheck },
      { name: "Project Showcase", description: "Share anonymized before/after results", icon: BarChart2 },
      { name: "Equipment Expertise", description: "Earn and display expertise badges", icon: Award },
      { name: "Mentorship Program", description: "Connect with industry mentors", icon: Users },
      { name: "Job Board", description: "Industry-specific opportunities", icon: Briefcase },
      { name: "Virtual Events", description: "Conferences and webinars", icon: Video },
      { name: "Certification Verification", description: "Verify professional certifications", icon: FileCheck }
    ]
  },
  {
    title: "Metallurgical Tools",
    icon: Calculator,
    color: "text-green-500",
    features: [
      { name: "Flowsheet Builder", description: "Create interactive process flowsheets", icon: FileText },
      { name: "Process Simulation", description: "Real-time process modeling", icon: Beaker },
      { name: "Data Trending", description: "Historical data analysis", icon: TrendingUp },
      { name: "Performance Benchmarking", description: "Equipment benchmarking tools", icon: BarChart2 },
      { name: "Report Generation", description: "Automated PDF reports", icon: FileText },
      { name: "Mobile Data Collection", description: "User-friendly mobile forms", icon: Database },
      { name: "Lab Integration", description: "Connect with lab equipment", icon: Beaker },
      { name: "Mass Balance", description: "Automated calculations", icon: Calculator }
    ]
  },
  {
    title: "Blog + News",
    icon: Newspaper,
    color: "text-amber-500",
    features: [
      { name: "Technical Papers", description: "Access research repository", icon: BookOpen },
      { name: "Case Studies", description: "Industry case study database", icon: Building2 },
      { name: "Equipment Reviews", description: "Detailed comparisons", icon: Wrench },
      { name: "Industry News", description: "Latest updates and news", icon: Newspaper },
      { name: "Conference Updates", description: "Event highlights and coverage", icon: Video },
      { name: "Regulatory Tracker", description: "Stay compliant with updates", icon: FileCheck },
      { name: "Training Materials", description: "Interactive learning resources", icon: BookOpen },
      { name: "Video Library", description: "Tutorial and training videos", icon: Play }
    ]
  },
  {
    title: "AI Capabilities",
    icon: Brain,
    color: "text-purple-500",
    features: [
      { name: "Troubleshooting AI", description: "Process optimization assistant", icon: Wrench },
      { name: "Equipment Advisor", description: "Selection recommendations", icon: Search },
      { name: "Pattern Recognition", description: "Data pattern analysis", icon: Zap },
      { name: "Case Matching", description: "Find similar case studies", icon: Search },
      { name: "Performance Prediction", description: "Predictive analytics", icon: TrendingUp },
      { name: "Maintenance Scheduling", description: "Smart maintenance planning", icon: Clock },
      { name: "Literature Analysis", description: "Research summarization", icon: BookOpen },
      { name: "Process Optimization", description: "AI-driven recommendations", icon: Brain }
    ]
  }
];

const DetailedFeatures = () => {
  return (
    <section id="detailed-features" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comprehensive Platform Features
          </h2>
          <p className="text-gray-400">
            Everything you need to optimize your metallurgical processes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featureCategories.map((category, idx) => (
            <div key={idx} className="glass-card rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
              </div>
              
              <div className="p-4 h-[400px] overflow-y-auto custom-scrollbar">
                <div className="grid gap-4">
                  {category.features.map((feature, featureIdx) => (
                    <div 
                      key={featureIdx}
                      className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <feature.icon className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="text-white font-semibold">{feature.name}</h4>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;