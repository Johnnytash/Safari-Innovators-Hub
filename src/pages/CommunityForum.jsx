import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Share2, Award, Send } from 'lucide-react';
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const CommunityForum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    { id: 1, author: 'John Doe', content: 'Has anyone had success with crowdfunding in Kenya?', comments: [], likes: 5, shares: 2, isFeatured: true },
    { id: 2, author: 'Jane Smith', content: 'Looking for a co-founder for my EdTech startup. Any interested developers?', comments: [], likes: 3, shares: 1, isFeatured: false },
  ]);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([
        { id: Date.now(), author: user?.name || 'Anonymous', content: newPost, comments: [], likes: 0, shares: 0, isFeatured: false },
        ...posts
      ]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleShare = async (postId) => {
    const post = posts.find(p => p.id === postId);
    const shareUrl = `${window.location.origin}/post/${postId}`;
    const shareText = `Check out this post: "${post.content}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share Post',
          text: shareText,
          url: shareUrl,
        });
        toast.success('Post shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
        fallbackShare(shareUrl);
      }
    } else {
      fallbackShare(shareUrl);
    }

    setPosts(posts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  const fallbackShare = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy link. Please try again.');
    });
  };

  const handleReply = (postId, replyContent) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: Date.now(), author: user?.name || 'Anonymous', content: replyContent }] }
        : post
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Community Forum
      </motion.h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostSubmit}>
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts, questions, or ideas..."
              className="mb-4"
            />
            <Button type="submit">Post</Button>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <PostList posts={posts} handleLike={handleLike} handleShare={handleShare} handleReply={handleReply} />
        </TabsContent>
        <TabsContent value="featured">
          <PostList posts={posts.filter(post => post.isFeatured)} handleLike={handleLike} handleShare={handleShare} handleReply={handleReply} />
        </TabsContent>
        <TabsContent value="popular">
          <PostList posts={posts.sort((a, b) => b.likes - a.likes)} handleLike={handleLike} handleShare={handleShare} handleReply={handleReply} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PostList = ({ posts, handleLike, handleShare, handleReply }) => (
  <div className="space-y-6">
    {posts.map(post => (
      <Post key={post.id} post={post} handleLike={handleLike} handleShare={handleShare} handleReply={handleReply} />
    ))}
  </div>
);

const Post = ({ post, handleLike, handleShare, handleReply }) => {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const onReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      handleReply(post.id, replyContent);
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{post.author}</h3>
                {post.isFeatured && (
                  <Badge variant="secondary">
                    <Award className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <p className="mt-2">{post.content}</p>
              <div className="mt-4 flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowReplyForm(!showReplyForm)}>
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {post.comments.length}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare(post.id)}>
                  <Share2 className="h-4 w-4 mr-1" />
                  {post.shares}
                </Button>
              </div>
              {showReplyForm && (
                <form onSubmit={onReplySubmit} className="mt-4 flex items-center">
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-grow mr-2"
                  />
                  <Button type="submit" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
              {post.comments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-100 p-2 rounded">
                      <p className="font-semibold text-sm">{comment.author}</p>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityForum;
