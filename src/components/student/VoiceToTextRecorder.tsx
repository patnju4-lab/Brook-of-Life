import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Square, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  Check, 
  AlertCircle, 
  BookOpen, 
  Layers, 
  FileText,
  HelpCircle,
  Clock,
  Send,
  Zap
} from 'lucide-react';

interface VoiceToTextRecorderProps {
  onTranscriptChange: (text: string, isAppend?: boolean) => void;
  onAudioRecorded?: (audioUrl: string, durationSeconds: number, termsDetected: string[]) => void;
  currentText?: string;
  placeholder?: string;
  autoStartOnMount?: boolean;
}

const COMMON_THEOLOGICAL_TERMS = [
  'Hermeneutics',
  'Exegesis',
  'Christology',
  'Pneumatology',
  'Eschatology',
  'Theopneustos',
  'Homoousios',
  'Sola Scriptura',
  'Sanctification',
  'Justification',
  'Covenantal',
  'Hypostatic Union',
  'Soteriology',
  'Apologetics'
];

const SAMPLE_SPOKEN_PROMPTS = [
  "In this reflection on Romans 12:1-2, I observed that Paul's call to present our bodies as living sacrifices directly links orthodox doctrine to sacrificial ethics.",
  "Examining the Carmen Christi in Philippians 2:5-11 demonstrates how Christ voluntarily veiled His manifest glory without relinquishing His divine essence.",
  "Our pastoral practicum in ministry leadership highlighted the critical balance between prophetic boldness and Christlike pastoral empathy."
];

export const VoiceToTextRecorder: React.FC<VoiceToTextRecorderProps> = ({
  onTranscriptChange,
  onAudioRecorded,
  currentText = '',
  placeholder = 'Speak your reflection or sermon outline...'
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [detectedTerms, setDetectedTerms] = useState<string[]>([]);
  const [speechApiSupported, setSpeechApiSupported] = useState(true);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState<number[]>(new Array(16).fill(15));
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Initialize Speech Recognition on mount
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechApiSupported(false);
    }

    return () => {
      stopAllMedia();
    };
  }, []);

  // Update detected theological terms whenever currentText or interim changes
  useEffect(() => {
    const combined = `${currentText} ${interimTranscript}`.toLowerCase();
    const found = COMMON_THEOLOGICAL_TERMS.filter(term => 
      combined.includes(term.toLowerCase())
    );
    setDetectedTerms(found);
  }, [currentText, interimTranscript]);

  // Handle Recording Timer
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  const stopAllMedia = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch (e) {
        // ignore
      }
    }
  };

  const startVisualizer = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateWave = () => {
        if (!isRecording) return;
        analyser.getByteFrequencyData(dataArray);
        // sample 16 points
        const points = [];
        const step = Math.floor(dataArray.length / 16);
        for (let i = 0; i < 16; i++) {
          const val = dataArray[i * step] || 0;
          // map to percentage height (15% to 100%)
          points.push(Math.max(15, Math.min(100, Math.round((val / 255) * 100))));
        }
        setVolumeLevel(points);
        animationFrameRef.current = requestAnimationFrame(updateWave);
      };
      updateWave();
    } catch (e) {
      // AudioContext may fail in some iframe security policies, fallback to simulated wave
      simulateWaveform();
    }
  };

  const simulateWaveform = () => {
    const interval = setInterval(() => {
      if (!isRecording) {
        clearInterval(interval);
        return;
      }
      const randomBars = Array.from({ length: 16 }, () => 
        Math.floor(20 + Math.random() * 75)
      );
      setVolumeLevel(randomBars);
    }, 120);
  };

  const startRecording = async () => {
    setIsPermissionDenied(false);
    setInterimTranscript('');
    setFeedbackMessage(null);

    let stream: MediaStream | null = null;
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        
        // Start real Audio MediaRecorder
        audioChunksRef.current = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          if (onAudioRecorded) {
            onAudioRecorded(url, recordingTime, detectedTerms);
          }
        };

        mediaRecorder.start(250);
        startVisualizer(stream);
      }
    } catch (err: any) {
      console.warn('Microphone access note:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setIsPermissionDenied(true);
      }
      // Continue with speech recognition or simulation
      simulateWaveform();
    }

    // Start Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let interim = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript + ' ';
            } else {
              interim += transcript;
            }
          }

          if (final.trim()) {
            onTranscriptChange(final.trim(), true);
          }
          setInterimTranscript(interim);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          if (event.error === 'not-allowed') {
            setIsPermissionDenied(true);
          }
        };

        recognition.onend = () => {
          if (isRecording && !isPaused) {
            try {
              recognition.start();
            } catch (e) {
              // ignore
            }
          }
        };

        recognition.start();
      } catch (e) {
        console.warn('SpeechRecognition failed to start:', e);
      }
    } else {
      setSpeechApiSupported(false);
    }

    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsPaused(true);
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }
    setIsPaused(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setInterimTranscript('');
    stopAllMedia();
    setVolumeLevel(new Array(16).fill(15));
    setFeedbackMessage('Spoken reflection transcribed successfully!');
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleInsertSamplePrompt = (sampleText: string) => {
    onTranscriptChange(sampleText, true);
    setFeedbackMessage('Spoken sample reflection appended to your draft!');
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleInsertTheologicalTerm = (term: string) => {
    onTranscriptChange(` ${term} `, true);
  };

  const handleClearAudio = () => {
    setAudioUrl(null);
    setRecordingTime(0);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
  };

  const toggleAudioPlayback = () => {
    if (!audioPlayerRef.current || !audioUrl) return;
    if (isPlayingAudio) {
      audioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;
  const estimatedWpm = recordingTime > 5 ? Math.round((wordCount / (recordingTime / 60))) : 0;

  return (
    <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-5 space-y-4 shadow-xl text-slate-200">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272a] pb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            isRecording 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' 
              : 'bg-[#c4a47c]/20 text-[#c4a47c] border border-[#c4a47c]/30'
          }`}>
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-cinzel text-sm font-bold text-white tracking-wide">
                Voice-to-Text Reflection Studio
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#c4a47c]/15 text-[#c4a47c] border border-[#c4a47c]/25">
                AI Oral Practicum
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Record spoken exegesis, homiletical thesis, or ministry reflections with real-time transcription.
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-3 self-end sm:self-center">
          {isRecording && (
            <div className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/50 text-rose-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>{formatTime(recordingTime)}</span>
            </div>
          )}
          
          <div className="text-[11px] text-slate-400 font-mono text-right">
            <span>{wordCount} words</span>
            {estimatedWpm > 0 && <span className="ml-1 text-slate-500">({estimatedWpm} WPM)</span>}
          </div>
        </div>
      </div>

      {/* Permission or Browser Notice */}
      {isPermissionDenied && (
        <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl text-xs text-amber-200 flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-amber-300">Microphone Permission Needed</div>
            <p className="text-[11px] text-amber-200/80">
              Please click the lock/settings icon in your browser address bar to allow microphone access, or use the quick theological voice prompts below.
            </p>
          </div>
        </div>
      )}

      {/* Waveform & Recording Control Stage */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 space-y-4">
        {/* Real-time Audio Waveform Visualizer */}
        <div className="h-14 bg-[#0e0e10] rounded-lg border border-[#27272a] flex items-center justify-center px-4 space-x-1.5 overflow-hidden">
          {volumeLevel.map((heightPercent, idx) => (
            <div
              key={idx}
              className={`w-2.5 rounded-full transition-all duration-75 ${
                isRecording 
                  ? isPaused
                    ? 'bg-amber-600/50'
                    : 'bg-gradient-to-t from-[#c4a47c] to-amber-300 shadow-[0_0_8px_rgba(196,164,124,0.4)]' 
                  : 'bg-slate-800'
              }`}
              style={{ height: `${isRecording ? heightPercent : 15}%` }}
            />
          ))}
        </div>

        {/* Live Interim Transcript Bubble */}
        {isRecording && interimTranscript && (
          <div className="p-3 bg-[#0a0a0c] border border-[#c4a47c]/30 rounded-xl text-xs text-amber-100/90 italic flex items-center space-x-2 animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c] animate-ping shrink-0" />
            <span className="text-[11px] font-mono text-[#c4a47c] font-bold shrink-0">Live:</span>
            <span className="line-clamp-2">"{interimTranscript}"</span>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center space-x-2">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="px-4 py-2.5 bg-gradient-to-r from-[#c4a47c] to-[#b39166] hover:from-[#d5b58d] hover:to-[#c4a47c] text-[#0a0a0b] font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-[#c4a47c]/10 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mic className="w-4 h-4 text-[#0a0a0b]" />
                <span>Start Voice Recording</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg shadow-rose-900/30 cursor-pointer transition-all"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Finish & Transcribe</span>
                </button>

                {isPaused ? (
                  <button
                    type="button"
                    onClick={resumeRecording}
                    className="px-3 py-2.5 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Resume</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pauseRecording}
                    className="px-3 py-2.5 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </button>
                )}
              </div>
            )}

            {/* Recorded Audio Playback Chip */}
            {audioUrl && !isRecording && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#0e0e10] border border-[#27272a] rounded-xl text-xs">
                <audio
                  ref={audioPlayerRef}
                  src={audioUrl}
                  onEnded={() => setIsPlayingAudio(false)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={toggleAudioPlayback}
                  className="p-1.5 rounded-lg bg-[#c4a47c]/20 hover:bg-[#c4a47c]/30 text-[#c4a47c] cursor-pointer"
                  title="Play recorded audio"
                >
                  {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-[#c4a47c]" />}
                </button>
                <div className="text-[11px] font-mono text-slate-300">
                  <span>Spoken Audio ({formatTime(recordingTime)})</span>
                </div>
                <button
                  type="button"
                  onClick={handleClearAudio}
                  className="p-1 text-slate-500 hover:text-rose-400 text-[10px] cursor-pointer"
                  title="Discard audio"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Punctuation & Formatting Tools */}
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-[10px] text-slate-500 font-mono hidden md:inline">Spoken Shortcuts:</span>
            <button
              type="button"
              onClick={() => onTranscriptChange('. ', true)}
              className="px-2 py-1 bg-[#27272a] hover:bg-[#3f3f46] text-slate-300 rounded-lg text-[11px] cursor-pointer font-mono"
              title="Insert period"
            >
              [ . ]
            </button>
            <button
              type="button"
              onClick={() => onTranscriptChange(', ', true)}
              className="px-2 py-1 bg-[#27272a] hover:bg-[#3f3f46] text-slate-300 rounded-lg text-[11px] cursor-pointer font-mono"
              title="Insert comma"
            >
              [ , ]
            </button>
            <button
              type="button"
              onClick={() => onTranscriptChange('\n\n', true)}
              className="px-2.5 py-1 bg-[#27272a] hover:bg-[#3f3f46] text-slate-300 rounded-lg text-[11px] cursor-pointer font-mono"
              title="Insert new paragraph"
            >
              Paragraph ↵
            </button>
          </div>
        </div>
      </div>

      {/* Theological Vocabulary Assistant & Quick Injection */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-slate-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#c4a47c]" />
            <span>Theological Terminology Quick-Assist:</span>
          </div>
          {detectedTerms.length > 0 && (
            <span className="text-[10px] text-emerald-400 font-mono">
              ✓ {detectedTerms.length} doctrinal terms integrated
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {COMMON_THEOLOGICAL_TERMS.map(term => {
            const isUsed = detectedTerms.includes(term);
            return (
              <button
                key={term}
                type="button"
                onClick={() => handleInsertTheologicalTerm(term)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition cursor-pointer flex items-center space-x-1 ${
                  isUsed
                    ? 'bg-emerald-950/60 border border-emerald-700/60 text-emerald-300'
                    : 'bg-[#18181b] border border-[#27272a] text-slate-400 hover:text-[#c4a47c] hover:border-[#c4a47c]/40'
                }`}
                title={`Click to insert "${term}" into reflection`}
              >
                {isUsed && <Check className="w-2.5 h-2.5 text-emerald-400" />}
                <span>{term}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested Spoken Reflection Templates / Prompts */}
      <div className="pt-2 border-t border-[#27272a]/60 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#c4a47c]" />
            <span>Oral Practicum Reflection Prompts:</span>
          </div>
          <span className="text-[10px] text-slate-500">Tap to load theological template</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {SAMPLE_SPOKEN_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleInsertSamplePrompt(prompt)}
              className="text-left p-2.5 rounded-xl bg-[#18181b]/70 hover:bg-[#1f1f23] border border-[#27272a] hover:border-[#c4a47c]/30 text-[11px] text-slate-400 hover:text-slate-200 transition cursor-pointer line-clamp-2 leading-relaxed"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMessage && (
        <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}
    </div>
  );
};
