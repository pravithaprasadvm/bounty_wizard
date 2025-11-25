import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/FormControls';

export default function Dashboard() {
  const nav = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-4">This is a simple dashboard. Click below to start creating a bounty.</p>
      <Button onClick={()=> nav('/step/1')}>Create Bounty</Button>
    </div>
  );
}
