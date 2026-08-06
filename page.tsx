'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [posts, setPosts] = useState([{id: 1, user: "Chhavi", text: "Nova Studio से पहली पोस्ट 🚀"}]);
  const [newPost, setNewPost] = useState("");

  // डेटा सेव करने के लिए
  useEffect(() => {
    const savedPosts = localStorage.getItem("marsPosts");
    if(savedPosts) setPosts(JSON.parse(savedPosts));
  }, []);

  useEffect(() => {
    localStorage.setItem("marsPosts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if(!isLoggedIn){ 
      alert("पहले Login करो भाई"); 
      return; 
    }
    if(newPost.trim() === "") return;
    setPosts([{id: Date.now(), user: userName, text: newPost},...posts]);
    setNewPost("");
  }

  const handleLogin = () => {
    const name = prompt("अपना नाम डालो:");
    if(name){
      setUserName(name);
      setIsLoggedIn(true);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 p-4 border-b border-gray-700 backdrop-blur-lg bg-slate-900/50 flex justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          🚀 Mars Social
        </h1>
        <button 
          onClick={handleLogin}
          className="bg-indigo-600 px-4 py-1 rounded-lg">
          {isLoggedIn? userName : "Login"}
        </button>
      </nav>

      <div className="max-w-2xl mx-auto p-4">
        {/* Post Box */}
        <div className="bg-slate-800/60 backdrop-blur-lg p-4 rounded-2xl border-gray-700 mb-6">
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="क्या चल रहा है..." 
            className="w-full bg-slate-900 rounded-xl p-3 outline-none resize-none"
            rows={3}
          />
          <button 
            onClick={handlePost}
            className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 py-2 rounded-xl font-bold hover:scale-105 transition">
            Post करो
          </button>
        </div>

        {/* Feed */}
        {posts.map(post => (
          <div key={post.id} className="bg-slate-800/60 backdrop-blur-lg p-4 rounded-2xl border-gray-700 mb-4">
            <div className="font-bold text-indigo-300">@{post.user}</div>
            <p className="mt-2">{post.text}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
