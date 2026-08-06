'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [wallet, setWallet] = useState(0);
  const [posts, setPosts] = useState([{id: 1, user: "Chhavi", text: "Nova Studio से पहली पोस्ट 🚀"}]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const savedPosts = localStorage.getItem("marsPosts");
    const savedWallet = localStorage.getItem("wallet");
    const savedLogin = localStorage.getItem("userName");
    if(savedPosts) setPosts(JSON.parse(savedPosts));
    if(savedWallet) setWallet(Number(savedWallet));
    if(savedLogin){
      setUserName(savedLogin);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("marsPosts", JSON.stringify(posts));
    localStorage.setItem("wallet", wallet.toString());
  }, [posts, wallet]);

  const handlePost = () => {
    if(!isLoggedIn){ 
      alert("पहले Login करो भाई"); 
      return; 
    }
    if(newPost.trim() === "") return;
    setPosts([{id: Date.now(), user: userName, text: newPost},...posts]);
    setNewPost("");
    setWallet(wallet + 1);
  }

  const handleLogin = () => {
    const name = prompt("अपना नाम डालो:");
    if(name){
      setUserName(name);
      setIsLoggedIn(true);
      localStorage.setItem("userName", name);
      if(!localStorage.getItem("bonusGiven")){
        setWallet(100);
        localStorage.setItem("bonusGiven", "yes");
        alert("बधाई हो! ₹100 बोनस मिल गया 🎉");
      }
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest");
    localStorage.removeItem("userName");
  }

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if(file){
      setNewPost(newPost + ` [फोटो: ${file.name}] `);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <nav className="sticky top-0 p-4 border-b border-gray-700 backdrop-blur-lg bg-slate-900/50 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          🚀 Mars Social
        </h1>
        <div className="flex gap-3 items-center">
          <div className="text-yellow-400 font-bold">💰 ₹{wallet}</div>
          {isLoggedIn? 
            <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded-lg">{userName} | Logout</button>
            : 
            <button onClick={handleLogin} className="bg-indigo-600 px-4 py-1 rounded-lg">Login</button>
          }
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-slate-800/60 backdrop-blur-lg p-4 rounded-2xl border-gray-700 mb-6">
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="क्या चल रहा है..." 
            className="w-full bg-slate-900 rounded-xl p-3 outline-none resize-none"
            rows={3}
          />
          <input type="file" accept="image/*" onChange={handleImage} className="mt-2 text-sm w-full"/>
          <button 
            onClick={handlePost}
            className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 py-2 rounded-xl font-bold hover:scale-105 transition">
            Post करो + ₹1 कमाओ
          </button>
        </div>

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
