import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Target, Coffee, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FocusMode = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
  const [sessions, setSessions] = useState(0);

  const modes = {
    work: { duration: 25 * 60, label: 'Focus Time', color: 'from-indigo-600 to-purple-600', icon: Target },
    shortBreak: { duration: 5 * 60, label: 'Short Break', color: 'from-green-500 to-emerald-600', icon: Coffee },
    longBreak: { duration: 15 * 60, label: 'Long Break', color: 'from-blue-500 to-cyan-600', icon: Zap },
  };

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      // Timer completed
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      
      // After 4 work sessions, take a long break
      if (newSessions % 4 === 0) {
        setMode('longBreak');
        setTime(modes.longBreak.duration);
      } else {
        setMode('shortBreak');
        setTime(modes.shortBreak.duration);
      }
    } else {
      setMode('work');
      setTime(modes.work.duration);
    }

    // Play notification sound (optional)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: mode === 'work' ? 'Time for a break!' : 'Time to focus!',
        icon: '/favicon.ico',
      });
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(modes[mode].duration);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTime(modes[newMode].duration);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((modes[mode].duration - time) / modes[mode].duration) * 100;
  const ModeIcon = modes[mode].icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${modes[mode].color} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-12">
          {Object.entries(modes).map(([key, { label, icon: Icon }]) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                mode === key
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {label}
              </div>
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="mb-12">
          <div className="relative inline-block">
            {/* Progress Circle */}
            <svg className="w-80 h-80 transform -rotate-90">
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="white"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 140}`}
                strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>

            {/* Time Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <ModeIcon className="w-12 h-12 text-white mb-4" />
              <div className="text-8xl font-bold text-white mb-2">
                {formatTime(time)}
              </div>
              <div className="text-2xl text-white/80">
                Session {sessions + 1}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="bg-white text-gray-900 px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3"
          >
            {isActive ? (
              <>
                <Pause className="w-6 h-6" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                Start
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all flex items-center gap-3"
          >
            <RotateCcw className="w-6 h-6" />
            Reset
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 flex justify-center gap-8">
          <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl">
            <div className="text-4xl font-bold text-white mb-1">{sessions}</div>
            <div className="text-white/80">Completed</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl">
            <div className="text-4xl font-bold text-white mb-1">{Math.floor(sessions * 25 / 60)}h</div>
            <div className="text-white/80">Total Time</div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
          <h3 className="text-white font-semibold mb-2">💡 Pomodoro Tips</h3>
          <ul className="text-white/80 text-sm space-y-1 text-left">
            <li>• Focus on one task during work sessions</li>
            <li>• Take breaks seriously - step away from screen</li>
            <li>• After 4 sessions, take a longer break</li>
            <li>• Stay hydrated and stretch during breaks</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
