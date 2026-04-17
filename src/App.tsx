import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Share2, 
  WifiOff, 
  Puzzle, 
  Archive, 
  History, 
  Send, 
  MousePointer2,
  FileCode,
  FileJson,
  Book,
  Globe,
  FileEdit,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Video
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content?: string | string[];
  points?: { text: string; subtext?: string; icon: React.ReactNode }[];
  type: 'title' | 'content' | 'steps' | 'formats' | 'summary' | 'conclusion';
  duration: number; // in seconds
  script: string; // Text for voiceover
}

const slides: Slide[] = [
  {
    id: 1,
    title: "DOWNLOAD AS FEATURE IN GOOGLE DOCS",
    subtitle: "A Guide to Exporting Your Documents",
    type: 'title',
    duration: 8,
    script: "Welcome to our guide on the Download as feature in Google Docs. Let's learn how to export your documents professionally."
  },
  {
    id: 2,
    title: "What is Download as?",
    content: "Download as is a powerful feature in Google Docs that allows you to save your document in various file formats for different uses and purposes.",
    points: [
      { text: "Flexible Tool", subtext: "Gives you the freedom to export work as PDF, Word, plain text, and more.", icon: <Puzzle className="w-8 h-8 text-blue-500" /> },
      { text: "Universal Compatibility", subtext: "Ensures compatibility with any software or workflow you need.", icon: <Share2 className="w-8 h-8 text-green-500" /> }
    ],
    type: 'content',
    duration: 10,
    script: "So, what exactly is Download as? It's a powerful tool that gives you the freedom to save your work in various formats, ensuring your documents work with any software or workflow you need."
  },
  {
    id: 3,
    title: "Why Use Download as?",
    points: [
      { text: "Share documents easily", subtext: "Reach users who don't have Google Docs access using compatible formats.", icon: <Share2 className="w-8 h-8 text-blue-500" /> },
      { text: "Access work offline", subtext: "Download files to view and edit without an internet connection.", icon: <WifiOff className="w-8 h-8 text-indigo-500" /> },
      { text: "Software Compatibility", subtext: "Export to formats that work with Microsoft Office, Adobe, and more.", icon: <Puzzle className="w-8 h-8 text-emerald-500" /> }
    ],
    type: 'content',
    duration: 12,
    script: "Why should you use it? It allows you to share documents with users who don't have Google Docs, access your work offline, and maintain compatibility with tools like Microsoft Office and Adobe."
  },
  {
    id: 4,
    title: "Why Use Download as?",
    points: [
      { text: "Archiving and backup", subtext: "Create permanent copies of important documents in stable formats.", icon: <Archive className="w-8 h-8 text-amber-500" /> },
      { text: "Version control", subtext: "Save snapshots of your document at different stages to track changes.", icon: <History className="w-8 h-8 text-rose-500" /> },
      { text: "Professional delivery", subtext: "Export polished PDFs for presentations, reports, and official submissions.", icon: <Send className="w-8 h-8 text-sky-500" /> }
    ],
    type: 'content',
    duration: 10,
    script: "It's also essential for archiving, version control, and professional delivery of polished P D F documents for reports and submissions."
  },
  {
    id: 5,
    title: "How to Access Download as",
    points: [
      { text: "Step 1: Click File Menu", subtext: "Open your document and click on \"File\" in the top menu bar.", icon: <MousePointer2 className="w-8 h-8 text-blue-500" /> },
      { text: "Step 2: Hover Over Download", subtext: "Find and hover over the \"Download\" option in the dropdown.", icon: <Download className="w-8 h-8 text-indigo-500" /> },
      { text: "Step 3: Select Format", subtext: "Choose your desired file format from the submenu options.", icon: <FileEdit className="w-8 h-8 text-green-500" /> }
    ],
    type: 'steps',
    duration: 12,
    script: "Accessing it is simple. First, click the File menu. Next, hover over the Download option. Finally, select your desired format from the submenu."
  },
  {
    id: 6,
    title: "Available Formats - Part 1",
    points: [
      { text: "PDF (.pdf)", subtext: "Best for final versions. Preserves formatting exactly. Universally viewable.", icon: <FileText className="w-10 h-10 text-red-500" /> },
      { text: "Microsoft Word (.docx)", subtext: "Ideal for editing and collaboration with Microsoft users.", icon: <FileEdit className="w-10 h-10 text-blue-600" /> }
    ],
    type: 'formats',
    duration: 8,
    script: "Let's look at available formats. P D F is best for final versions, while Microsoft Word is ideal for editing and collaborating with office users."
  },
  {
    id: 7,
    title: "Available Formats - Part 2",
    points: [
      { text: "Plain Text (.txt)", subtext: "Simple text with no formatting. Maximum compatibility across all systems.", icon: <FileText className="w-10 h-10 text-slate-500" /> },
      { text: "Rich Text Format (.rtf)", subtext: "Basic formatting preserved. Compatible with most word processors.", icon: <FileCode className="w-10 h-10 text-purple-500" /> }
    ],
    type: 'formats',
    duration: 8,
    script: "Plain Text offers maximum compatibility for simple content, and Rich Text Format preserves basic styling while remaining widely compatible."
  },
  {
    id: 8,
    title: "Available Formats - Part 3",
    points: [
      { text: "Web Page (.html)", subtext: "For web publishing and online sharing.", icon: <Globe className="w-10 h-10 text-orange-500" /> },
      { text: "EPUB", subtext: "For e-readers and digital books.", icon: <Book className="w-10 h-10 text-emerald-500" /> },
      { text: "OpenDocument (.odt)", subtext: "Open-source alternative for LibreOffice and others.", icon: <FileJson className="w-10 h-10 text-blue-400" /> }
    ],
    type: 'formats',
    duration: 10,
    script: "You can also export as a Web Page for online sharing, E PUB for digital books, or Open Document format for open-source office suites."
  },
  {
    id: 9,
    title: "Quick Tips for Choosing Formats",
    points: [
      { text: "Use PDF for final docs", subtext: "Prevents unwanted edits and looks identical everywhere.", icon: <FileText className="w-8 h-8 text-red-500" /> },
      { text: "Use Word for collaboration", subtext: "Maintains formatting and allows easy editing by others.", icon: <FileEdit className="w-8 h-8 text-blue-600" /> },
      { text: "Use Plain Text for simplicity", subtext: "When you only need the words without any styling.", icon: <FileText className="w-8 h-8 text-slate-400" /> }
    ],
    type: 'summary',
    duration: 10,
    script: "Some quick tips: Use P D F for final docs to prevent edits. Use Word for collaboration. And choose Plain Text when you only need the words."
  },
  {
    id: 10,
    title: "MASTER THE DOWNLOAD AS FEATURE",
    subtitle: "Share. Save. Succeed.",
    type: 'conclusion',
    duration: 8,
    script: "You've now mastered the Download as feature. Share your documents with confidence and succeed in your workflow."
  }
];

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecordingMode, setIsRecordingMode] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const totalDuration = slides.reduce((acc, s) => acc + s.duration, 0);

  // Initialize Speech
  useEffect(() => {
    if (isPlaying && !isMuted) {
      speak(slides[currentSlideIndex].script);
    }
  }, [currentSlideIndex, isPlaying, isMuted]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = isMuted ? 0 : 0.8;
      
      // Select a cleaner voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;

      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSlideProgress((prev) => {
          const currentSlide = slides[currentSlideIndex];
          const increment = (100 / (currentSlide.duration * 100)); // 10ms intervals
          
          if (prev + increment >= 100) {
            handleNextSlide();
            return 0;
          }
          return prev + increment;
        });

        setOverallProgress((prev) => {
          const increment = (100 / (totalDuration * 100));
          if (prev + increment >= 100) return 100;
          return prev + increment;
        });
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSlideIndex]);

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setSlideProgress(0);
    } else {
      setIsPlaying(false);
      setOverallProgress(100);
      setSlideProgress(100);
      window.speechSynthesis.cancel();
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setSlideProgress(0);
      const elapsedBefore = slides.slice(0, currentSlideIndex - 1).reduce((acc, s) => acc + s.duration, 0);
      setOverallProgress((elapsedBefore / totalDuration) * 100);
    }
  };

  const handleRestart = () => {
    setCurrentSlideIndex(0);
    setSlideProgress(0);
    setOverallProgress(0);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (!isMuted) window.speechSynthesis.cancel();
    setIsMuted(!isMuted);
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans overflow-hidden bg-slate-900 text-white selection:bg-blue-500/30 font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white/90 font-display">Google Docs Guide</h1>
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Audio Training Module</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsRecordingMode(!isRecordingMode)}
            className={`p-2 rounded-full transition-all ${isRecordingMode ? 'text-blue-400 bg-blue-400/20 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-white/30 bg-white/5 hover:bg-white/10'}`}
            title={isRecordingMode ? "Exit Recording Mode" : "Enter Recording Mode (Hides UI)"}
          >
            <Video className="w-4 h-4" />
          </button>
          
          {!isRecordingMode && (
            <div className="flex items-center gap-1 border-l border-white/10 pl-2">
              <button 
                onClick={toggleMute}
                className={`p-2 rounded-full transition-all ${isMuted ? 'text-white/30 bg-white/5' : 'text-emerald-400 bg-emerald-400/10'}`}
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}

          <div className="hidden sm:flex flex-col items-end border-l border-white/10 pl-4 ml-2">
            <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Slide</span>
            <span className="text-xl font-display font-bold tabular-nums">
              {currentSlideIndex + 1}<span className="text-xs text-white/20 ml-0.5">/ {slides.length}</span>
            </span>
          </div>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-12 overflow-hidden">
        <AnimatePresence mode="wait text-center">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl"
          >
            {currentSlide.type === 'title' || currentSlide.type === 'conclusion' ? (
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block p-4 bg-blue-500/20 rounded-3xl mb-4"
                >
                  <Download className="w-16 h-16 text-blue-400 mx-auto" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60"
                >
                  {currentSlide.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-white/60 font-medium font-sans"
                >
                  {currentSlide.subtitle}
                </motion.p>
                
                {currentSlide.type === 'conclusion' && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={handleRestart}
                    className="mt-12 flex items-center gap-2 mx-auto px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-100 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restart Presentation
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-12">
                   <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
                  >
                    Module {currentSlideIndex + 1}
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
                  >
                    {currentSlide.title}
                  </motion.h2>
                  {currentSlide.content && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl text-white/60 mb-10 max-w-3xl leading-relaxed"
                    >
                      {currentSlide.content}
                    </motion.p>
                  )}
                </div>

                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentSlide.points?.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="mb-4">{point.icon}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{point.text}</h3>
                      <p className="text-sm text-white/50 leading-relaxed font-sans">{point.subtext}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Captions Overlay */}
        {!isMuted && isPlaying && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`caption-${currentSlideIndex}`}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 py-3 bg-black/60 backdrop-blur-md rounded-xl text-center border border-white/10 z-20"
          >
            <p className="text-xs text-white/80 italic font-sans leading-snug">"{currentSlide.script}"</p>
          </motion.div>
        )}
      </main>

      {/* Progress Bars */}
      {!isRecordingMode && (
        <footer className="relative z-10 p-6 space-y-4">
          {/* Next Slide Preview / Controls */}
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
               <button onClick={handlePrevSlide} disabled={currentSlideIndex === 0} className="text-white/40 hover:text-white disabled:opacity-0 transition-opacity p-2 text-xs font-bold uppercase tracking-widest">
                Back
               </button>
               <button onClick={handleNextSlide} disabled={currentSlideIndex === slides.length - 1} className="text-white/40 hover:text-white disabled:opacity-0 transition-opacity p-2 text-xs font-bold uppercase tracking-widest">
                Skip
               </button>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] text-white/40 uppercase font-bold block mb-1">Up Next</span>
              <span className="text-xs font-semibold text-white/80">
                {currentSlideIndex < slides.length - 1 ? slides[currentSlideIndex + 1].title : "End of Guide"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {/* Slide Progress */}
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${slideProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Overall Progress */}
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/40">
              <span>Overall Training Progress</span>
              <span className="tabular-nums font-mono">{Math.round(overallProgress)}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white/20"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
