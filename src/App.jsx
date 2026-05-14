import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Monitor, Network, HardDrive, Menu, X, FlaskConical, Terminal, Users  } from 'lucide-react';
import remarkGfm from 'remark-gfm'

// Przykładowe dane tematów (Docelowo możesz to trzymać w osobnym pliku JSON)
const topics = [
  // { id: 'procesory', title: 'Budowa i rodzaje procesorów', icon: <HardDrive size={20} /> },
  // { id: 'systemy', title: 'Instalacja systemów operacyjnych', icon: <Monitor size={20} /> },
  // { id: 'sieci', title: 'Topologie i media transmisyjne', icon: <Network size={20} /> },
  // { id: 'testowy', title: 'Testowy plik', icon: <FlaskConical size={20} /> },
  // { id: 'Zarzadzanie_Systemem', title: 'Zarządzanie Systemem', icon: <Terminal  size={20} /> },
  { id: 'podstawowe_polecenia', title: 'Podstawowe Polecenia', icon: <Terminal  size={20} /> },
  { id: 'uzytkownicy_i_grupy', title: 'Użytkownicy i Grupy', icon: <Users   size={20} /> },
  { id: 'konfiguracja_sieci', title: 'Konfiguracja Sieci', icon: <Network   size={20} /> },
];

const App = () => {
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [content, setContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Symulacja ładowania pliku .md
 useEffect(() => {
  // 1. Definiujemy funkcję asynchroniczną wewnątrz efektu
  const loadMarkdown = async () => {
    try {
      // Ścieżka do pliku w folderze /public/content/
      const response = await fetch(`/content/${activeTopic.id}.md`);
      
      if (!response.ok) {
        throw new Error("Nie znaleziono pliku tematu");
      }

      const text = await response.text();
      setContent(text);
    } catch (err) {
      console.error("Błąd ładowania pliku:", err);
      setContent("# Błąd\nNie udało się załadować treści dla tego tematu.");
    }
  };

  loadMarkdown();
}, [activeTopic]); // Efekt odpali się za każdym razem, gdy zmienisz temat
  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
      
      {/* SIDEBAR */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="text-blue-400" /> INF.02 Master
          </h1>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}><X /></button>
        </div>
        
        <nav className="p-4 space-y-2">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => { setActiveTopic(topic); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeTopic.id === topic.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              {topic.icon}
              <span className="text-sm font-medium">{topic.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu />
          </button>
          <div className="text-sm text-slate-500">
            Egzamin INF.02 <span className="mx-2">/</span> 
            <span className="text-slate-900 font-semibold">{activeTopic.title}</span>
          </div>
          <div className="hidden sm:block">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Tryb Nauki</span>
          </div>
        </header>

        {/* Content Area */}
       {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-6 md:p-12">
          <article className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            
            {/* TUTAJ ZMIANA: Kontener div zamiast className w ReactMarkdown */}
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Nagłówki
                  h1: ({ node, ...props }) => <h1 className="text-4xl font-black mb-6 text-slate-900 " {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800 border-b-1 border-gray-300 pb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="text-lg font-medium mt-4 mb-1 text-slate-700" {...props} />,

                  // Tekst i listy
                  p: ({ node, ...props }) => <p className="leading-relaxed mb-4 text-slate-700 text-base" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4 space-y-2 text-slate-700" {...props} />,
                  li: ({ node, ...props }) => <li className="pl-1" {...props} />,

                  // Kod
                  code: ({ node, inline, className, children, ...props }) => {
                    const isInline = !className; // react-markdown v9+ oznacza bloki kodu klasą language-xxx
                    return isInline ? (
                      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-sm border border-slate-200" {...props}>
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-slate-100 text-pink-600 p-4 rounded-xl my-6 overflow-x-auto border border-slate-200">
                        <code className="font-mono text-sm leading-relaxed" {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  },

                  // Cytaty (np. ważne ostrzeżenia/uwagi)
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 pr-2 italic text-slate-600 my-6 rounded-r-md" {...props} />
                  ),

                  // Tabele (kluczowe przy porównywaniu parametrów procesorów/pamięci)
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-8 shadow-sm border border-slate-200 rounded-lg">
                      <table className="min-w-full divide-y divide-slate-200" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => <thead className="bg-slate-50" {...props} />,
                  th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider" {...props} />,
                  td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-slate-600 border-t border-slate-100" {...props} />,

                  // Inne
                  hr: ({ node, ...props }) => <hr className="my-8 border-t-2 border-slate-100" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 underline-offset-4 transition-colors" {...props} />,
                  img: ({ node, ...props }) => <img className="rounded-xl shadow-md my-8 mx-auto border border-slate-200" {...props} alt={props.alt || "Grafika edukacyjna"} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                  em: ({ node, ...props }) => <em className="italic text-slate-800" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

          </article>
        </section>
      </main>
    </div>
  );
};

export default App;