import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Clock, AlertTriangle, X, Beaker } from 'lucide-react';

const TestExecution = ({ conditions, reagents, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [notification, setNotification] = useState(null);
  const [phase, setPhase] = useState('conditioning'); // 'conditioning' or 'flotation'
  const [completedEvents, setCompletedEvents] = useState([]);
  const [flotationStartTime, setFlotationStartTime] = useState(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  // Get all conditioning events sorted by time
  const getConditioningEvents = useCallback(() => {
    const events = [];

    // Add reagent events
    Object.entries(reagents || {}).forEach(([type, reagentList]) => {
      reagentList.forEach(reagent => {
        if (reagent.time) {
          events.push({
            time: parseFloat(reagent.time) * 60,
            type: 'reagent',
            name: reagent.name,
            volume: reagent.volume,
            completed: false
          });
        }
      });
    });

    return events.sort((a, b) => a.time - b.time);
  }, [reagents]);

  // Get last conditioning event time plus buffer time
  const getFlotationStartTime = useCallback(() => {
    const events = getConditioningEvents();
    const lastEventTime = events.length > 0 ? events[events.length - 1].time : 0;
    return lastEventTime + (parseFloat(conditions.bufferTime || 2) * 60);
  }, [getConditioningEvents, conditions.bufferTime]);

  // Check for water additions and scrapes during flotation
  const checkFlotationEvents = useCallback((flotationTime) => {
    // Check water additions
    conditions.waterAdditions?.forEach(addition => {
      const additionTime = parseFloat(addition.time) * 60;
      if (Math.floor(flotationTime) === Math.floor(additionTime) && 
          !completedEvents.includes(`water-${additionTime}`)) {
        showNotification(
          `Add ${addition.type} water (${addition.volume} mL)`,
          'water'
        );
        setCompletedEvents(prev => [...prev, `water-${additionTime}`]);
      }
    });

    // Check scraping intervals
    if (conditions.frothPullRate) {
      const scrapeInterval = 60 / parseFloat(conditions.frothPullRate);
      if (flotationTime > 0 && flotationTime % Math.floor(scrapeInterval) === 0) {
        const scrapeNumber = Math.floor(flotationTime / scrapeInterval);
        
        // Check if there's a water addition at the same time
        const waterAdditionAtSameTime = conditions.waterAdditions?.find(addition => 
          Math.floor(parseFloat(addition.time) * 60) === Math.floor(flotationTime)
        );

        if (waterAdditionAtSameTime) {
          showNotification(
            `Scrape #${scrapeNumber} and add ${waterAdditionAtSameTime.type} water (${waterAdditionAtSameTime.volume} mL)`,
            'combined'
          );
        } else {
          showNotification(`Scrape #${scrapeNumber}`, 'scrape');
        }
      }
    }
  }, [conditions.waterAdditions, conditions.frothPullRate, completedEvents, showNotification]);

  const checkEvents = useCallback((currentTime) => {
    if (phase === 'conditioning') {
      // Check conditioning events
      const events = getConditioningEvents();
      events.forEach(event => {
        if (Math.floor(event.time) === currentTime && !completedEvents.includes(event.time)) {
          showNotification(
            `Add ${event.name} (${event.volume} mL)`,
            'reagent'
          );
          setCompletedEvents(prev => [...prev, event.time]);
        }
      });

      // Check if conditioning phase is complete
      const flotationStart = getFlotationStartTime();
      if (currentTime >= flotationStart) {
        setPhase('flotation');
        setFlotationStartTime(currentTime);
        showNotification('Conditioning complete. Starting flotation test.', 'info');
      }
    } else {
      // Check flotation events
      const flotationTime = currentTime - flotationStartTime;
      checkFlotationEvents(flotationTime);

      // Check if test is complete
      if (flotationTime >= parseFloat(conditions.totalFlotationTime) * 60) {
        setIsRunning(false);
        showNotification('Flotation test complete!', 'info');
      }
    }
  }, [
    phase,
    getConditioningEvents,
    getFlotationStartTime,
    completedEvents,
    showNotification,
    checkFlotationEvents,
    conditions.totalFlotationTime,
    flotationStartTime
  ]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          checkEvents(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, checkEvents]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning && time === 0) {
      showNotification('Starting conditioning phase. Follow reagent addition instructions.', 'info');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-card p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Test Execution</h3>
            <p className="text-sm text-gray-400">
              {phase === 'conditioning' ? 'Conditioning Phase' : 'Flotation Phase'}
            </p>
          </div>
          <button 
            className="btn btn-sm btn-ghost"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Phase Indicator */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center space-x-2">
            {phase === 'conditioning' ? (
              <Beaker className="h-5 w-5 text-primary" />
            ) : (
              <Clock className="h-5 w-5 text-success" />
            )}
            <div>
              <p className="text-sm text-gray-400">Current Phase</p>
              <p className="text-lg font-semibold text-white">
                {phase === 'conditioning' ? 'Reagent Conditioning' : 'Flotation Test'}
              </p>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-primary mb-4">
            {formatTime(time)}
          </div>
          <div className="text-sm text-gray-400 mb-4">
            {phase === 'flotation' && (
              <>Flotation Time: {formatTime(time - flotationStartTime)}</>
            )}
          </div>
          <button 
            className={`btn ${isRunning ? 'btn-error' : 'btn-primary'} btn-lg`}
            onClick={toggleTimer}
          >
            {isRunning ? (
              <>
                <Pause className="h-6 w-6 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-6 w-6 mr-2" />
                {time === 0 ? 'Start Test' : 'Resume'}
              </>
            )}
          </button>
        </div>

        {/* Notification Area */}
        {notification && (
          <div className={`glass-card p-4 mb-4 border-l-4 ${
            notification.type === 'reagent' ? 'border-primary' :
            notification.type === 'water' ? 'border-blue-500' :
            notification.type === 'scrape' ? 'border-green-500' :
            notification.type === 'combined' ? 'border-purple-500' :
            'border-gray-500'
          }`}>
            <div className="flex items-center">
              {notification.type === 'reagent' && <Beaker className="h-5 w-5 text-primary mr-2" />}
              {notification.type === 'water' && <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />}
              {notification.type === 'scrape' && <Clock className="h-5 w-5 text-green-500 mr-2" />}
              {notification.type === 'combined' && (
                <div className="flex">
                  <Clock className="h-5 w-5 text-purple-500 mr-1" />
                  <AlertTriangle className="h-5 w-5 text-purple-500 mr-2" />
                </div>
              )}
              <p className="text-white">{notification.message}</p>
            </div>
          </div>
        )}

        {/* Progress Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <label className="text-sm font-medium text-gray-400">Phase Progress</label>
            <div className="text-xl font-bold text-white">
              {phase === 'conditioning' ? (
                `${completedEvents.length} of ${getConditioningEvents().length} additions`
              ) : (
                `${formatTime(time - flotationStartTime)} / ${conditions.totalFlotationTime}:00`
              )}
            </div>
          </div>
          <div className="glass-card p-4">
            <label className="text-sm font-medium text-gray-400">Next Event</label>
            <div className="text-xl font-bold text-white">
              {phase === 'conditioning' ? (
                time >= getFlotationStartTime() ? 
                  'Start Flotation' : 
                  `Buffer Time: ${formatTime(getFlotationStartTime() - time)}`
              ) : (
                'Monitoring Scrapes'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecution;