import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-6">Messaging App</h1>
            <Input />
            <Messages />
        </div>
    )
}

const Input = () => {
    // const from = `sfljl`
    const [to, setTo] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const messageHandler = async () => {
        const res = await axios.post('http://localhost:3000/messages', { from, to, title, description });
        if (!res.data.success) console.log(`Failed to post message`);
        alert('Message sent successfully');
        setTo('');
        setTitle('');
        setDescription('');
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-8">
            <input
                type="text"
                placeholder="Receiver Id"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                onClick={messageHandler}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
                Send Message
            </button>
        </div>
    )
}

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const pathname = location.pathname.replace(/^\//, '');

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axios.get(`http://localhost:3000/messages/${pathname}`);
            setMessages(res.data.messages);
        }
        fetchMessages();
    }, [pathname]);

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            {messages.length === 0 ? (
                <p className="text-gray-400">No messages Yet.</p>
            ) : (
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded">
                            <h3 className="font-bold text-indigo-400">{message.title}</h3>
                            <p className="text-gray-300">{message.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home
