import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, ArrowLeft, Search, MoreVertical, User, Bot, Clock, Check, CheckCheck, Phone, Video, Paperclip, Smile, Mic } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatBot {
  id: string;
  name: string;
  avatar: string;
  description: string;
  personality: string;
  triggers: string[];
  responses: string[];
  color: string;
  status: 'online' | 'offline' | 'typing';
  lastSeen?: Date;
  messages: Message[];
}

const initialBots: ChatBot[] = [
  {
    id: 'sarah',
    name: 'Sarah - Assistant',
    avatar: '👩‍💼',
    description: 'Professional assistant for work and productivity',
    personality: 'Professional, organized, and helpful',
    triggers: ['help', 'work', 'task', 'schedule', 'meeting', 'productivity', 'organize'],
    responses: [
      'I\'m here to help you stay organized! What can I assist you with today?',
      'Let me help you tackle that task efficiently. What do you need?',
      'I\'m your productivity partner! How can I make your day better?',
      'Ready to help you get things done! What\'s on your agenda?',
    ],
    color: 'from-blue-500 to-blue-600',
    status: 'online',
    messages: [
      {
        id: '1',
        text: 'Hi! I\'m Sarah, your professional assistant. I\'m here to help you with work, productivity, and staying organized. How can I assist you today?',
        sender: 'bot',
        timestamp: new Date(Date.now() - 300000),
        status: 'read'
      }
    ]
  },
  {
    id: 'alex',
    name: 'Alex - Tech Guru',
    avatar: '👨‍💻',
    description: 'Your go-to tech expert for coding and development',
    personality: 'Geeky, knowledgeable, and passionate about technology',
    triggers: ['code', 'programming', 'tech', 'bug', 'development', 'software', 'computer'],
    responses: [
      'Hey there, fellow developer! What coding challenge can I help you solve?',
      'Tech question? You\'ve come to the right bot! What\'s the issue?',
      'Let\'s debug this together! What programming problem are you facing?',
      'Code never lies, but it can be tricky! How can I help you today?',
    ],
    color: 'from-purple-500 to-purple-600',
    status: 'online',
    messages: [
      {
        id: '1',
        text: 'Hey! I\'m Alex, your tech guru! 💻 I love talking about programming, debugging, and all things tech. Got any coding questions for me?',
        sender: 'bot',
        timestamp: new Date(Date.now() - 240000),
        status: 'read'
      }
    ]
  },
  {
    id: 'maya',
    name: 'Maya - Wellness Coach',
    avatar: '🧘‍♀️',
    description: 'Mindfulness and wellness companion',
    personality: 'Calm, supportive, and encouraging',
    triggers: ['stress', 'relax', 'meditation', 'wellness', 'health', 'mindful', 'calm'],
    responses: [
      'Take a deep breath... I\'m here to help you find your inner peace. How are you feeling?',
      'Wellness is a journey, not a destination. What would you like to work on today?',
      'Remember to be kind to yourself. How can I support your wellbeing today?',
      'Let\'s focus on what makes you feel centered and calm. What\'s on your mind?',
    ],
    color: 'from-green-500 to-green-600',
    status: 'online',
    messages: [
      {
        id: '1',
        text: 'Namaste! 🙏 I\'m Maya, your wellness companion. I\'m here to help you with mindfulness, stress relief, and overall wellbeing. How are you feeling today?',
        sender: 'bot',
        timestamp: new Date(Date.now() - 180000),
        status: 'read'
      }
    ]
  },
  {
    id: 'chef',
    name: 'Chef Marco',
    avatar: '👨‍🍳',
    description: 'Culinary expert and recipe master',
    personality: 'Passionate, creative, and food-loving',
    triggers: ['food', 'recipe', 'cook', 'kitchen', 'meal', 'ingredient', 'dish'],
    responses: [
      'Buongiorno! Ready to create something delicious? What are you cooking today?',
      'The kitchen is calling! What culinary adventure shall we embark on?',
      'Food is love made visible! How can I help you in the kitchen today?',
      'From my kitchen to yours - what recipe magic can we create together?',
    ],
    color: 'from-orange-500 to-orange-600',
    status: 'online',
    messages: [
      {
        id: '1',
        text: 'Ciao! 🍝 I\'m Chef Marco! I\'m passionate about cooking and love sharing recipes. Whether you\'re a beginner or a seasoned cook, I\'m here to help you create amazing dishes!',
        sender: 'bot',
        timestamp: new Date(Date.now() - 120000),
        status: 'read'
      }
    ]
  },
  {
    id: 'luna',
    name: 'Luna - Creative Muse',
    avatar: '🎨',
    description: 'Artistic inspiration and creative guidance',
    personality: 'Imaginative, inspiring, and artistic',
    triggers: ['art', 'creative', 'design', 'inspiration', 'draw', 'paint', 'music'],
    responses: [
      'Creativity flows through you! What artistic vision shall we bring to life today?',
      'Every blank canvas is an opportunity! What creative project inspires you?',
      'Art is the language of the soul. How can I help you express yourself today?',
      'Let your imagination run wild! What creative adventure are we going on?',
    ],
    color: 'from-pink-500 to-pink-600',
    status: 'online',
    messages: [
      {
        id: '1',
        text: 'Hello, beautiful soul! ✨ I\'m Luna, your creative muse. I\'m here to inspire your artistic journey, whether it\'s visual arts, music, writing, or any creative expression!',
        sender: 'bot',
        timestamp: new Date(Date.now() - 60000),
        status: 'read'
      }
    ]
  },
  {
    id: 'max',
    name: 'Max - Fitness Buddy',
    avatar: '💪',
    description: 'Your personal fitness and motivation coach',
    personality: 'Energetic, motivating, and health-focused',
    triggers: ['fitness', 'workout', 'exercise', 'gym', 'health', 'strong', 'training'],
    responses: [
      'Let\'s get moving! What fitness goal are we crushing today? 💪',
      'Your body can do it. It\'s your mind you need to convince! Ready to train?',
      'Every workout is progress! How can I help you stay active today?',
      'Strength doesn\'t come from what you can do, it comes from overcoming what you thought you couldn\'t!',
    ],
    color: 'from-red-500 to-red-600',
    status: 'online',
    messages: [
      {
        id: '1',
        text: 'Hey champion! 🏆 I\'m Max, your fitness buddy! Ready to crush some goals together? Whether you\'re just starting or you\'re a fitness pro, I\'m here to keep you motivated!',
        sender: 'bot',
        timestamp: new Date(Date.now() - 30000),
        status: 'read'
      }
    ]
  }
];

function App() {
  const [bots, setBots] = useState<ChatBot[]>(initialBots);
  const [selectedBot, setSelectedBot] = useState<ChatBot | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedBot?.messages]);

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBotResponse = (userMessage: string, bot: ChatBot): string => {
    const lowerMessage = userMessage.toLowerCase();
    const isTriggered = bot.triggers.some(trigger => 
      lowerMessage.includes(trigger.toLowerCase())
    );

    if (isTriggered) {
      return bot.responses[Math.floor(Math.random() * bot.responses.length)];
    }

    // Default responses for each bot
    const defaultResponses = {
      'sarah': 'I understand! While that\'s not my specialty, I\'m always here to help with work and productivity matters. Is there anything work-related I can assist you with?',
      'alex': 'Interesting! Though that\'s outside my tech expertise, I\'m always excited to chat about programming and development. Got any coding questions?',
      'maya': 'I hear you. While that\'s not directly related to wellness, remember that every conversation is an opportunity for mindfulness. How are you feeling right now?',
      'chef': 'Ah, I see! While that\'s not about cooking, food brings people together in many ways. Are you hungry? I could suggest something delicious!',
      'luna': 'How fascinating! Even though that\'s not directly about art, everything can be inspiration for creativity. What creative projects are you working on?',
      'max': 'I got you! While that\'s not fitness-related, remember that mental health is just as important as physical health. How about we talk about staying active?'
    };

    return defaultResponses[bot.id as keyof typeof defaultResponses] || 
           'Thanks for sharing! How can I help you with what I do best?';
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedBot) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    // Update bot's messages
    setBots(prev => prev.map(bot => 
      bot.id === selectedBot.id 
        ? { ...bot, messages: [...bot.messages, userMessage] }
        : bot
    ));

    const currentMessage = inputText;
    setInputText('');

    // Update message status
    setTimeout(() => {
      setBots(prev => prev.map(bot => 
        bot.id === selectedBot.id 
          ? { 
              ...bot, 
              messages: bot.messages.map(m => 
                m.id === userMessage.id ? { ...m, status: 'sent' } : m
              )
            }
          : bot
      ));
    }, 500);

    setTimeout(() => {
      setBots(prev => prev.map(bot => 
        bot.id === selectedBot.id 
          ? { 
              ...bot, 
              messages: bot.messages.map(m => 
                m.id === userMessage.id ? { ...m, status: 'delivered' } : m
              )
            }
          : bot
      ));
    }, 1000);

    setTimeout(() => {
      setBots(prev => prev.map(bot => 
        bot.id === selectedBot.id 
          ? { 
              ...bot, 
              messages: bot.messages.map(m => 
                m.id === userMessage.id ? { ...m, status: 'read' } : m
              )
            }
          : bot
      ));
    }, 1500);

    // Bot typing and response
    setTimeout(() => {
      setIsTyping(true);
      setBots(prev => prev.map(bot => 
        bot.id === selectedBot.id ? { ...bot, status: 'typing' as const } : bot
      ));

      setTimeout(() => {
        const botResponse = getBotResponse(currentMessage, selectedBot);
        const botMessage: Message = {
          id: Date.now().toString() + '_bot',
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
          status: 'read'
        };

        setBots(prev => prev.map(bot => 
          bot.id === selectedBot.id 
            ? { 
                ...bot, 
                messages: [...bot.messages, botMessage],
                status: 'online' as const
              }
            : bot
        ));
        
        setIsTyping(false);
      }, 2000 + Math.random() * 1000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-300" />;
    }
  };

  const getLastMessage = (bot: ChatBot) => {
    const lastMessage = bot.messages[bot.messages.length - 1];
    if (!lastMessage) return 'No messages yet';
    
    const preview = lastMessage.text.length > 50 
      ? lastMessage.text.substring(0, 50) + '...' 
      : lastMessage.text;
    
    return lastMessage.sender === 'user' ? `You: ${preview}` : preview;
  };

  const getLastMessageTime = (bot: ChatBot) => {
    const lastMessage = bot.messages[bot.messages.length - 1];
    if (!lastMessage) return '';
    
    const now = new Date();
    const messageTime = lastMessage.timestamp;
    const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes < 1 ? 'now' : `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  if (selectedBot) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedBot(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedBot.color} flex items-center justify-center text-white text-lg shadow-md`}>
              {selectedBot.avatar}
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">{selectedBot.name}</h2>
              <p className="text-sm text-gray-500">
                {selectedBot.status === 'typing' ? 'typing...' : 
                 selectedBot.status === 'online' ? 'online' : 
                 `last seen ${selectedBot.lastSeen?.toLocaleTimeString() || 'recently'}`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {selectedBot.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {message.sender === 'bot' && (
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${selectedBot.color} flex items-center justify-center text-white text-sm shadow-md`}>
                    {selectedBot.avatar}
                  </div>
                )}
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl shadow-sm max-w-full ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{message.text}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.sender === 'user' && (
                      <div className="flex items-center">
                        {getStatusIcon(message.status)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-pulse">
              <div className="flex items-end space-x-2 max-w-xs">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${selectedBot.color} flex items-center justify-center text-white text-sm shadow-md`}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-sm border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-3">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 max-h-32"
                rows={1}
                style={{ minHeight: '48px' }}
              />
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            {inputText.trim() ? (
              <button
                onClick={handleSendMessage}
                className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-200">
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-semibold">WhatsApp Bots</h1>
              <p className="text-green-100 text-sm">{bots.length} bots available</p>
            </div>
          </div>
          <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search bots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Bot List */}
      <div className="bg-white">
        {filteredBots.map((bot) => (
          <div
            key={bot.id}
            onClick={() => setSelectedBot(bot)}
            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
          >
            <div className="relative">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${bot.color} flex items-center justify-center text-white text-xl shadow-md`}>
                {bot.avatar}
              </div>
              {bot.status === 'online' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 ml-4 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">{bot.name}</h3>
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                  {getLastMessageTime(bot)}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate mt-1">
                {getLastMessage(bot)}
              </p>
              <p className="text-xs text-gray-400 truncate mt-1">
                {bot.description}
              </p>
            </div>
            {bot.messages.length > 1 && (
              <div className="ml-2 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                {bot.messages.filter(m => m.sender === 'bot' && m.status !== 'read').length || ''}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBots.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg font-medium">No bots found</p>
          <p className="text-sm">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}

export default App;