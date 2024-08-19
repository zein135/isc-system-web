import React, { useState } from 'react';
import { EventDetails } from '../../models/eventInterface.ts';

interface EventFormProps {
  onSubmit: (eventDetails: EventDetails) => void;
  onCancel?: () => void; 
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel }) => {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    title: "",
    date: "",
    duration: "",
    scholarshipHours: "",
    location: "",
    maxParticipants: 0,
    maxSubstitutes: 0,
    description: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setEventDetails((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? +value : value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(eventDetails);
    setEventDetails({
      title: "",
      date: "",
      duration: "",
      scholarshipHours: "",
      location: "",
      maxParticipants: 0,
      maxSubstitutes: 0,
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>CREAR EVENTO</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <label>
          Nombre del evento:
          <input
            type="text"
            name="title"
            placeholder="Ingrese el nombre del evento..."
            value={eventDetails.title}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            name="date"
            value={eventDetails.date}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
        <label>
          Horas Becarias:
          <input
            type="text"
            name="scholarshipHours"
            placeholder="Ingrese las horas becarias..."
            value={eventDetails.scholarshipHours}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
        <label>
          Duración:
          <input
            type="text"
            name="duration"
            placeholder="Ingrese la duración del evento..."
            value={eventDetails.duration}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
        <label>
          Descripción del evento:
          <input
            type="text"
            name="description"
            placeholder="Ingrese la descripción del evento..."
            value={eventDetails.description}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
        <label>
          N° de Becarios:
          <input
            type="number"
            name="maxParticipants"
            placeholder="Ingrese el número de becarios participantes..."
            value={eventDetails.maxParticipants}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
        <label>
          Responsable:
          <input
            type="text"
            name="location"
            placeholder="Ingrese el nombre del responsable..."
            value={eventDetails.location}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ padding: '12px 24px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '4px', fontSize: '16px' }}>
            Cancelar
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          style={{ padding: '12px 24px', backgroundColor: '#202121', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', marginLeft: onCancel ? '8px' : '0' }}
        >
          CREAR
        </button>
      </div>
    </form>
  );
};

export default EventForm;
