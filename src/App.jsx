import { useState, useEffect } from 'react';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Descriptions from './components/Descriptions/Descriptions';
import Notification from './components/Notification/Notification';

const App = () => {

  const initializeFeedbackCounts = () => {
    const storedCounts = JSON.parse(localStorage.getItem('feedbackCounts'));

    if (storedCounts) {
      return storedCounts;
    } else {
      return {
        good: 0,
        neutral: 0,
        bad: 0
      };
    }
  };

  const [feedbackCounts, setFeedbackCounts] = useState(initializeFeedbackCounts);

  const updateFeedback = (feedbackType) => {
    setFeedbackCounts((prevCounts) => ({
      ...prevCounts,
      [feedbackType]: prevCounts[feedbackType] + 1
    }));
  };

  const totalFeedback = feedbackCounts.good + feedbackCounts.neutral + feedbackCounts.bad;

  const handleReset = () => {
    setFeedbackCounts({
      good: 0,
      neutral: 0,
      bad: 0
    });
  };

  const positivePercentage = Math.round(((feedbackCounts.good + feedbackCounts.neutral) / totalFeedback) * 100);

  useEffect(() => {

    localStorage.setItem('feedbackCounts', JSON.stringify(feedbackCounts));
  }, [feedbackCounts]);

  return (
    <>
      <Descriptions />
      <Options updateFeedback={updateFeedback} handleReset={handleReset} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback feedbackCounts={feedbackCounts} totalFeedback={totalFeedback} positivePercentage={positivePercentage} />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </>
  );
};

export default App;