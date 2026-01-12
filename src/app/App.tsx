import { useState } from 'react';
import {
  Bot,
  MessageSquare,
  Network,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface AIAssistant {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  features: string[];
  color: string;
  url: string;
}

const aiAssistants: AIAssistant[] = [
  {
    id: 'cozi',
    name: '智造坊',
    icon: Bot,
    tagline: '轻量智能助手',
    description: '智造坊 提供简洁流畅的对话体验，适合快速问答与日常协作。',
    features: [
      '快速对话响应',
      '基础知识检索',
      '多场景轻量支持'
    ],
    color: 'from-blue-500 to-cyan-500',
    url: 'http://124.221.68.59:8888/'
  },
  {
    id: 'suna',
    name: '智述',
    icon: MessageSquare,
    tagline: '对话与创意',
    description: '智述 擅长创意生成与对话交流，支持多轮上下文。',
    features: [
      '多轮对话与记忆',
      '创意写作辅助',
      '多语言交流'
    ],
    color: 'from-purple-500 to-pink-500',
    url: 'http://47.122.30.2:3009/'
  },
  {
    id: 'ragflow',
    name: '智源',
    icon: Network,
    tagline: '检索增强生成',
    description: '智源 专注于结合检索与生成，提升答案的准确性与可溯源性。',
    features: [
      '文档检索与引用',
      '可溯源回答',
      '多格式知识库支持'
    ],
    color: 'from-amber-500 to-orange-500',
    url: 'http://124.221.68.59:8080/'
  }
];

export default function App() {
  const [selectedAssistant, setSelectedAssistant] = useState<AIAssistant>(aiAssistants[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectAssistant = (assistant: AIAssistant) => {
    setSelectedAssistant(assistant);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="size-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Mobile */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-indigo-600" />
            <h1 className="font-semibold text-slate-900"> 智衍AI多智能体平台</h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            切换助手
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg max-h-[60vh] overflow-y-auto">
            {aiAssistants.map((assistant) => {
              const Icon = assistant.icon;
              const isSelected = selectedAssistant.id === assistant.id;
              return (
                <button
                  key={assistant.id}
                  onClick={() => handleSelectAssistant(assistant)}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-colors border-b border-slate-100 ${isSelected
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${assistant.color} text-white`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{assistant.name}</div>
                    <div className="text-xs text-slate-500">{assistant.tagline}</div>
                  </div>
                  {isSelected && <ChevronRight className="size-5" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="h-full lg:h-screen flex flex-col lg:flex-row">
        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-slate-200 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-4 z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <Sparkles className="size-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-900"> 智衍AI多智能体平台</h1>
              </div>
            </div>
          </div>

          {/* Assistant List */}
          <nav className="p-3 space-y-2">
            {aiAssistants.map((assistant) => {
              const Icon = assistant.icon;
              const isSelected = selectedAssistant.id === assistant.id;
              return (
                <button
                  key={assistant.id}
                  onClick={() => handleSelectAssistant(assistant)}
                  className={`w-full p-3 rounded-lg transition-all duration-200 ${isSelected
                    ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${assistant.color} text-white`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                        {assistant.name}
                      </div>
                    </div>
                    {isSelected && (
                      <ChevronRight className="size-4 text-indigo-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 overflow-hidden bg-white">
          {/* Top Bar with Assistant Info */}
          <div className="border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedAssistant.color} text-white`}>
                  {(() => {
                    const Icon = selectedAssistant.icon;
                    return <Icon className="size-5" />;
                  })()}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {selectedAssistant.name}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {selectedAssistant.tagline}
                  </p>
                </div>
              </div>
              <a
                href={selectedAssistant.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:shadow-lg bg-gradient-to-r ${selectedAssistant.color}`}
              >
                <span>在新窗口打开</span>
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="h-[calc(100vh-73px)] lg:h-[calc(100vh-73px)]">
            <iframe
              key={selectedAssistant.id}
              src={selectedAssistant.url}
              title={selectedAssistant.name}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            />
          </div>
        </main>
      </div>
    </div>
  );
}