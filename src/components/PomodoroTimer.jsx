import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause,faRefresh, faForward, faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'


function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('focus');
  const [sessionCount, setSessionCount] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio URLs - replace these with your own sound file URLs
  const START_SOUND_URL = '../../public/audio/small-bell-ring-01a.wav';
  const COMPLETE_SOUND_URL = '../../public/audio/small-bell-ring-01a.wav';
  const TICK_SOUND_URL = '';
  // Timer settings
  const FOCUS_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;
  const SESSIONS_BEFORE_LONG_BREAK = 4;

  // Simple audio play function
  const playSound = useCallback((soundUrl) => {
    if (!soundEnabled || !soundUrl) return;
    
    try {
      const audio = new Audio(soundUrl);
      audio.volume = 0.7;
      
      // Handle user interaction requirement for audio
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio played successfully');
          })
          .catch(error => {
            console.log('Audio play failed:', error.message);
          });
      }
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  }, [soundEnabled]);

  // Get next session details
  const getNextSession = useCallback(() => {
    if (sessionType === 'focus') {
      const nextCount = sessionCount + 1;
      setSessionCount(nextCount);
      
      if (nextCount >= SESSIONS_BEFORE_LONG_BREAK) {
        setSessionCount(0);
        return { type: 'break', time: LONG_BREAK };
      } else {
        return { type: 'break', time: SHORT_BREAK };
      }
    } else {
      return { type: 'focus', time: FOCUS_TIME };
    }
  }, [sessionType, sessionCount]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer controls
  const startTimer = () => {
    setIsActive(true);
    playSound(START_SOUND_URL);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    const currentTime = sessionType === 'focus' ? FOCUS_TIME : 
                       sessionCount >= SESSIONS_BEFORE_LONG_BREAK ? LONG_BREAK : SHORT_BREAK;
    setTimeLeft(currentTime);
  };

  const skipSession = () => {
    setIsActive(false);
    const nextSession = getNextSession();
    setSessionType(nextSession.type);
    setTimeLeft(nextSession.time);
    
    if (sessionType === 'focus') {
      setCompletedSessions(prev => prev + 1);
    }
  };

  // Handle session completion
  const completeSession = useCallback(() => {
    setIsActive(false);
    playSound(COMPLETE_SOUND_URL);
    
    if (sessionType === 'focus') {
      setCompletedSessions(prev => prev + 1);
    }
    
    const nextSession = getNextSession();
    
    setTimeout(() => {
      setSessionType(nextSession.type);
      setTimeLeft(nextSession.time);
      
      if (nextSession.type === 'focus') {
        setIsActive(true);
        setTimeout(() => playSound(START_SOUND_URL), 100);
      }
    }, 1500);
  }, [sessionType, getNextSession, playSound, START_SOUND_URL, COMPLETE_SOUND_URL]);

  // Main timer effect
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          
          // Optional: play tick sound every minute
          if (newTime > 0 && newTime % 60 === 0 && TICK_SOUND_URL) {
            playSound(TICK_SOUND_URL);
          }
          
          return newTime;
        });
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      completeSession();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, completeSession, playSound, TICK_SOUND_URL]);

  // Calculate progress (0-100%)
  const currentMaxTime = sessionType === 'focus' ? FOCUS_TIME : 
                         sessionCount >= SESSIONS_BEFORE_LONG_BREAK ? LONG_BREAK : SHORT_BREAK;
  const progress = ((currentMaxTime - timeLeft) / currentMaxTime) * 100;
  
  // Calculate circle circumference and dash array
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        
        {/* Session Type */}
        <div className="text-center mb-12">
          <h1 className="text-lg font-medium text-gray-900 mb-1">
            {sessionType === 'focus' ? 'Focus' : sessionCount >= SESSIONS_BEFORE_LONG_BREAK ? 'Long Break' : 'Short Break'}
          </h1>
          <p className="text-sm text-gray-500">{sessionCount + 1} of {SESSIONS_BEFORE_LONG_BREAK}</p>
        </div>

        {/* Timer Circle */}
        <div className="relative mb-12">
          <div className="w-64 h-64 mx-auto relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={sessionType === 'focus' ? '#000000' : '#6b7280'}
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-mono font-light text-gray-900">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          {!isActive ? (
            <button
              onClick={startTimer}
              className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <span className="ml-1"><FontAwesomeIcon icon={faPlay} className="w-4 h-4 " /></span>
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <span className="text-lg"><FontAwesomeIcon icon={faPause} className="w-4 h-4" /></span>
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="w-16 h-16 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <span className="text-lg"><FontAwesomeIcon icon={faRefresh} className="w-4 h-4" /></span>
          </button>
          
          <button
            onClick={skipSession}
            className="w-16 h-16 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <span className="text-lg"><FontAwesomeIcon icon={faForward} className="w-4 h-4" /></span>
          </button>
        </div>

        {/* Sound Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              soundEnabled 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {soundEnabled ? <FontAwesomeIcon icon={faVolumeHigh} className="w-4 h-4" /> : <FontAwesomeIcon icon={faVolumeXmark} className="w-4 h-4" />}
          </button>
        </div>

        {/* Session Progress */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(SESSIONS_BEFORE_LONG_BREAK)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < sessionCount ? 'bg-black' : 
                i === sessionCount ? 'bg-gray-400' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="text-center text-sm text-gray-500">
          <p>Completed sessions: {completedSessions}</p>
        </div>

      </div>
    </div>
  );
}

export default PomodoroTimer;