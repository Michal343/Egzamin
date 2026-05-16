import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Monitor, Network, Menu, X, Terminal, Users, Sun, Moon, Router  } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import { useLocalStorage } from 'usehooks-ts'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Możesz wybrać inny motyw, np. vscDarkPlus (podobny do VS Code), dracula, oneDark itp.
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


const categories = [
  {
    name: 'Ubuntu Serwer',
    topics: [
      // { id: 'testowy', title: 'Podstawowe Polecenia', icon: <Terminal size={18} /> },
      { id: 'L_podstawowe_polecenia', title: 'Podstawowe Polecenia', icon: <Terminal size={18} /> },
      { id: 'L_uzytkownicy_i_grupy', title: 'Użytkownicy i Grupy', icon: <Users size={18} /> },
      { id: 'L_konfiguracja_sieci', title: 'Konfiguracja Sieci', icon: <Network size={18} /> },
      { id: 'L_serwer_dhcp', title: 'Serwer DHCP', icon: <Router  size={18} /> },
      { id: 'L_serwer_dns', title: 'Serwer DNS', icon: <Router  size={18} /> },
    ]
  },
  {
    name: 'Windows Serwer',
    topics: [
      { id: 'active_directory', title: 'Active Directory', icon: <Users size={18} /> },
      { id: 'dns_windows', title: 'Konfiguracja DNS', icon: <Network size={18} /> },
      { id: 'zasady_grup', title: 'GPO - Zasady Grup', icon: <Monitor size={18} /> },
    ]
  }
];

const App = () => {
  const [activeTopic, setActiveTopic] = useState(categories[0].topics[0]);
  const [content, setContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // Efekt do ładowania Markdown
  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(`/Egzamin/content/${activeTopic.id}.md`);
        if (!response.ok) throw new Error("Nie znaleziono pliku");
        const text = await response.text();
        setContent(text);
        // console.log(response)
      } catch (err) {
        setContent("# Błąd\nNie udało się załadować treści.");
      }
    };
    loadMarkdown();
  }, [activeTopic]);

  // Efekt do obsługi klas ciemnego motywu w Tailwind
  useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}, [theme]);

 

  // Przełączanie trybu ciemnego
  const toggleDarkMode = () => {
  setTheme(prev => prev === 'light' ? 'dark' : 'light');
};


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* SIDEBAR */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 dark:bg-black text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="text-blue-400" /> INF.02 Master
          </h1>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}><X /></button>
        </div>
        
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h2 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {category.name}
              </h2>
              <div className="space-y-1">
                {category.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => { setActiveTopic(topic); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
                      activeTopic.id === topic.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {topic.icon}
                    <span className="text-sm font-medium">{topic.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 justify-between shrink-0 transition-colors">
          <div className="flex items-center gap-4">
            <button className="md:hidden dark:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu />
            </button>
            <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
              Egzamin INF.02 <span className="mx-2">/</span> 
              <span className="text-slate-900 dark:text-slate-100 font-semibold">{activeTopic.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => toggleDarkMode(theme === 'light')}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-blue-400 transition-all cursor-pointer"
            >
              {theme=='light' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="hidden sm:block">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase">Tryb Nauki</span>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-4 md:p-12 bg-slate-50 dark:bg-slate-950 transition-colors">
          <article className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Nagłówki
                  h1: ({ node, ...props }) => <h1 className="text-4xl font-black mb-6 text-slate-900 dark:text-white" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100 border-b border-slate-300 dark:border-slate-700 pb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600 dark:text-blue-400" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="text-lg font-medium mt-4 mb-1 text-slate-700 dark:text-slate-300" {...props} />,

                  // Tekst i listy
                  p: ({ node, ...props }) => <p className="leading-relaxed mb-4 text-slate-700 dark:text-slate-300 text-base" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4 space-y-2 text-slate-700 dark:text-slate-300" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4 space-y-2 text-slate-700 dark:text-slate-300" {...props} />,
                  li: ({ node, ...props }) => <li className="pl-1" {...props} />,

                  // Kod
                  code: ({ node, inline, className, children, ...props }) => {
                    const isInline = !className;
                    
                    // Wyciągamy język (np. "language-js", "language-nginx"), który markdown przekazuje w className
                    const match = /language-(\w+)/.exec(className || '');

                    return isInline ? (
                      // Kod inline zostaje prosty, z Twoim różowym kolorem
                      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-pink-600 dark:text-pink-400 font-mono text-sm border border-slate-200 dark:border-slate-700" {...props}>
                        {children}
                      </code>
                    ) : (
                      // Blok kodu używa teraz SyntaxHighlighter
                      <SyntaxHighlighter
                        style={coldarkDark}                 // Styl kolorowania
                        language={match ? match[1] : ''}    // Automatycznie wykryty język (np. javascript, bash)
                        PreTag="div"                        // Zapobiega domyślnemu renderowaniu dodatkowego <pre> przez highlighter
                        className="rounded-xl my-6 border border-slate-200 dark:border-slate-700 text-sm"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    );
},

                  // Cytaty
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-4 py-2 pr-2 italic text-slate-600 dark:text-slate-400 my-6 rounded-r-md" {...props} />
                  ),

                  // Tabele
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-8 shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
                      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => <thead className="bg-slate-50 dark:bg-slate-800/50" {...props} />,
                  th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider" {...props} />,
                  td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800" {...props} />,

                  // Inne
                  hr: ({ node, ...props }) => <hr className="my-8 border-t-2 border-slate-100 dark:border-slate-800" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-300 dark:decoration-blue-700 underline-offset-4 transition-colors" {...props} />,
                  img: ({ node, ...props }) => <img className="rounded-xl shadow-md my-8 mx-auto border border-slate-200 dark:border-slate-700" {...props} alt={props.alt || "Grafika edukacyjna"} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
                  em: ({ node, ...props }) => <em className="italic text-slate-800 dark:text-slate-200" {...props} />,
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