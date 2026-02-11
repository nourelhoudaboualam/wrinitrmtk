import React, { useState } from 'react';
import ProposalCard from './components/ProposalCard';
import Celebration from './components/Celebration';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[5%] left-[10%] text-6xl animate-bounce opacity-40">🍑</div>
      <div className="absolute top-[15%] right-[20%] text-5xl animate-pulse opacity-30">🍆</div>
      <div className="absolute bottom-[20%] left-[15%] text-7xl animate-bounce delay-300 opacity-50">🍑</div>
      <div className="absolute bottom-[10%] right-[5%] text-5xl animate-pulse delay-700 opacity-20">🍆</div>

      {accepted ? (
        <Celebration />
      ) : (
        <ProposalCard onAccept={() => setAccepted(true)} />
      )}
    </div>
  );
};

export default App;