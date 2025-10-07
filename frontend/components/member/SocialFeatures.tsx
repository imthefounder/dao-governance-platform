import React, { useState } from 'react';
import { DiscussionThread, DiscussionReply, MemberProfile } from '@/types/dao-features';

interface SocialFeaturesProps {
  discussions: DiscussionThread[];
  currentUser: MemberProfile;
  onCreateThread: (title: string, content: string, tags: string[]) => void;
  onReply: (threadId: string, content: string, parentId?: string) => void;
  onVote: (threadId: string, replyId: string | null, type: 'up' | 'down') => void;
}

export const SocialFeatures: React.FC<SocialFeaturesProps> = ({
  discussions,
  currentUser,
  onCreateThread,
  onReply,
  onVote
}) => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'create' | 'profiles'>('discussions');
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newThread, setNewThread] = useState({ title: '', content: '', tags: '' });
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const DiscussionsTab = () => (
    <div className="space-y-6">
      {selectedThread ? (
        // Thread Detail View
        (() => {
          const thread = discussions.find(d => d.id === selectedThread);
          if (!thread) return null;

          return (
            <div className="space-y-6">
              {/* Back Button */}
              <button
                onClick={() => setSelectedThread(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to discussions
              </button>

              {/* Thread Header */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{thread.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By {thread.authorProfile.username}</span>
                      <span>{formatTimeAgo(thread.timestamp)}</span>
                      <span>{thread.replies.length} replies</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onVote(thread.id, null, 'up')}
                      className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-green-50 transition-colors"
                    >
                      <span>👍</span>
                      <span className="text-sm">{thread.upvotes}</span>
                    </button>
                    <button
                      onClick={() => onVote(thread.id, null, 'down')}
                      className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      <span>👎</span>
                      <span className="text-sm">{thread.downvotes}</span>
                    </button>
                  </div>
                </div>
                <div className="prose max-w-none text-gray-700">
                  {thread.content}
                </div>
                {thread.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {thread.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Replies */}
              <div className="space-y-4">
                {thread.replies.map(reply => (
                  <div key={reply.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {reply.authorProfile.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{reply.authorProfile.username}</div>
                          <div className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onVote(thread.id, reply.id, 'up')}
                          className="flex items-center space-x-1 px-1 py-1 rounded hover:bg-green-50 transition-colors"
                        >
                          <span className="text-sm">👍</span>
                          <span className="text-xs">{reply.upvotes}</span>
                        </button>
                        <button
                          onClick={() => onVote(thread.id, reply.id, 'down')}
                          className="flex items-center space-x-1 px-1 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          <span className="text-sm">👎</span>
                          <span className="text-xs">{reply.downvotes}</span>
                        </button>
                        <button
                          onClick={() => setReplyingTo(reply.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                    <div className="text-gray-700">{reply.content}</div>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Add a reply</h4>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => {
                      onReply(thread.id, replyContent, replyingTo || undefined);
                      setReplyContent('');
                      setReplyingTo(null);
                    }}
                    disabled={!replyContent.trim()}
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        // Discussion List View
        <div className="space-y-4">
          {discussions.map(thread => (
            <div key={thread.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => setSelectedThread(thread.id)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{thread.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{thread.content}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>By {thread.authorProfile.username}</span>
                    <span>{formatTimeAgo(thread.timestamp)}</span>
                    <span>{thread.replies.length} replies</span>
                    <span>{thread.upvotes - thread.downvotes} votes</span>
                  </div>
                  {thread.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {thread.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {thread.authorProfile.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {discussions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">💬</div>
              <p>No discussions yet. Start the conversation!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const CreateTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Start a New Discussion</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newThread.title}
              onChange={(e) => setNewThread(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What would you like to discuss?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={newThread.content}
              onChange={(e) => setNewThread(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your thoughts, ask questions, or start a debate..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              type="text"
              value={newThread.tags}
              onChange={(e) => setNewThread(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="governance, treasury, proposal (comma-separated)"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Add relevant tags to help others find your discussion</p>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => {
                const tags = newThread.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
                onCreateThread(newThread.title, newThread.content, tags);
                setNewThread({ title: '', content: '', tags: '' });
                setActiveTab('discussions');
              }}
              disabled={!newThread.title.trim() || !newThread.content.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Start Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfilesTab = () => (
    <div className="space-y-6">
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">👥</div>
        <p>Member profiles and directory coming soon!</p>
        <p className="text-sm mt-1">Browse and connect with other DAO members</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: '💬', component: DiscussionsTab },
    { id: 'create', label: 'Create Thread', icon: '✏️', component: CreateTab },
    { id: 'profiles', label: 'Member Profiles', icon: '👥', component: ProfilesTab },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="text-2xl mr-2">🌐</span>
        Community & Social
      </h3>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {tabs.find(tab => tab.id === activeTab)?.component()}
      </div>
    </div>
  );
};