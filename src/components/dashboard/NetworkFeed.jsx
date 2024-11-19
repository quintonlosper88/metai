import React from 'react';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

const NetworkFeed = () => {
  const posts = [
    {
      id: 1,
      author: 'Sarah Chen',
      role: 'Process Engineer',
      time: '2 hours ago',
      content: 'Latest findings on crusher liner wear patterns and their impact on performance. We\'ve observed a 15% increase in throughput after implementing the new maintenance schedule.',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: 'Michael Rodriguez',
      role: 'Senior Metallurgist',
      time: '5 hours ago',
      content: 'Sharing our recent success with the flotation circuit optimization project. Key takeaways and data analysis attached.',
      likes: 31,
      comments: 12
    },
    {
      id: 3,
      author: 'Emma Thompson',
      role: 'Research Metallurgist',
      time: '1 day ago',
      content: 'New paper published on sustainable practices in mineral processing. Looking for feedback from the community.',
      likes: 45,
      comments: 15
    }
  ];

  return (
    <div className="glass-card rounded-xl">
      <div className="px-6 py-4 border-b border-gray-800">
        <h3 className="text-xl font-bold text-white">Network Feed</h3>
      </div>
      <div className="divide-y divide-gray-800">
        {posts.map((post) => (
          <div key={post.id} className="p-6">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-sm font-medium text-white">{post.author}</p>
                  <p className="text-xs text-gray-400">{post.role}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
                <p className="text-sm text-gray-300">{post.content}</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-sm text-gray-400 hover:text-primary">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {post.likes}
                  </button>
                  <button className="flex items-center text-sm text-gray-400 hover:text-primary">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {post.comments}
                  </button>
                  <button className="flex items-center text-sm text-gray-400 hover:text-primary">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkFeed;