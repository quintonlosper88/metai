import React from 'react';
import { MessageSquare, Users, Lightbulb } from 'lucide-react';

const Community = () => {
  return (
    <section id="community" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-gray-400">
            Connect with industry experts and share knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card text-center">
            <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Discussion Forums
            </h3>
            <p className="text-gray-400">
              Engage in technical discussions and problem-solving
            </p>
          </div>

          <div className="feature-card text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Expert Network
            </h3>
            <p className="text-gray-400">
              Build connections with industry professionals
            </p>
          </div>

          <div className="feature-card text-center">
            <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Knowledge Sharing
            </h3>
            <p className="text-gray-400">
              Share experiences and learn from others
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;