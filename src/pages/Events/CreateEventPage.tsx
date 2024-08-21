import React from 'react';
import EventForm from '../../components/formulario/FormEvent.tsx';
import { EventDetails } from '../../models/eventInterface.ts';

const CreateEventPage: React.FC = () => {
  const handleFormSubmit = (newEvent: EventDetails) => {
    console.log("Nuevo evento agregado:", newEvent);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Crear Nuevo Evento</h1>
      <EventForm onSubmit={handleFormSubmit} onCancel={() => window.history.back()} />
    </div>
  );
};

export default CreateEventPage;
