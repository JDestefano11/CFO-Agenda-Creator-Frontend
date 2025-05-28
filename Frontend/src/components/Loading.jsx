import React, { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';

const Loading = ({ duration = 20, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentStage, setCurrentStage] = useState('Starting analysis...');
  const [analysisStages, setAnalysisStages] = useState([
    { id: 1, name: 'Extracting document content', completed: false },
    { id: 2, name: 'Processing structured data', completed: false },
    { id: 3, name: 'Identifying key topics', completed: false },
    { id: 4, name: 'Extracting financial figures', completed: false },
    { id: 5, name: 'Generating action items', completed: false },
    { id: 6, name: 'Creating history entry', completed: false }
  ]);

  // Simulate analysis progress
  useEffect(() => {
    const simulateAnalysisProgress = () => {
      // Update stages based on progress
      if (progress > 15 && !analysisStages[0].completed) {
        setAnalysisStages(prev => {
          const updated = [...prev];
          updated[0].completed = true;
          return updated;
        });
        setCurrentStage('Processing structured data...');
      } else if (progress > 30 && !analysisStages[1].completed) {
        setAnalysisStages(prev => {
          const updated = [...prev];
          updated[1].completed = true;
          return updated;
        });
        setCurrentStage('Identifying key topics...');
      } else if (progress > 45 && !analysisStages[2].completed) {
        setAnalysisStages(prev => {
          const updated = [...prev];
          updated[2].completed = true;
          return updated;
        });
        setCurrentStage('Extracting financial figures...');
      } else if (progress > 60 && !analysisStages[3].completed) {
        setAnalysisStages(prev => {
          const updated = [...prev];
          updated[3].completed = true;
          return updated;
        });
        setCurrentStage('Generating action items...');
      } else if (progress > 75 && !analysisStages[4].completed) {
        setAnalysisStages(prev => {
          const updated = [...prev];
          updated[4].completed = true;
          return updated;
        });
        setCurrentStage('Creating history entry...');
      } else if (progress > 90 && !analysisStages[5].completed) {
        setAnalysisStages(prev => {
          const updated = [...prev];
          updated[5].completed = true;
          return updated;
        });
        setCurrentStage('Completing analysis...');
      }
    };

    // Update progress and time left
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + (100 / (duration * 10));
        const cappedProgress = newProgress > 100 ? 100 : newProgress;
        simulateAnalysisProgress();
        return cappedProgress;
      });
      
      setTimeLeft(prevTimeLeft => {
        const newTimeLeft = prevTimeLeft - 0.1;
        return newTimeLeft < 0 ? 0 : newTimeLeft;
      });
    }, 100);

    // Call onComplete after duration
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (onComplete) {
        onComplete();
      }
    }, duration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onComplete, progress, analysisStages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center p-6">
      <div className="container max-w-2xl mx-auto z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full mx-auto relative z-10 border border-indigo-100 text-center">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Analyzing Your Document</h2>
          <p className="text-indigo-600 mb-8">
            Our AI is processing your document. This will take approximately {Math.ceil(timeLeft)} seconds.
          </p>
          
          <div className="relative pt-1 mb-8">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-50">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
              <div 
                style={{ width: `${progress}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300 ease-in-out"
              ></div>
            </div>
          </div>
          
          <div className="flex justify-center items-center mb-4">
            <FiLoader className="animate-spin text-indigo-600 mr-2" size={24} />
            <span className="text-indigo-800">{currentStage}</span>
          </div>
          
          <div className="mt-6 space-y-4 bg-indigo-50 p-4 rounded-lg">
            <p className="text-indigo-800 text-sm">
              <span className="font-medium">Analysis Progress:</span> Our AI is extracting key financial data, identifying important topics, and preparing a comprehensive analysis.
            </p>
            <div className="space-y-2">
              {analysisStages.map(stage => (
                <div key={stage.id} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${stage.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {stage.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${stage.completed ? 'text-green-700' : 'text-gray-600'}`}>
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
