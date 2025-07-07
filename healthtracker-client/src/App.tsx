import React from 'react';
import './App.css';
import CreateAppointmentModal from './CreateAppointmentModal';

// Need to tell Typescript what type of array we have below
type Appointment = {
    id: string;
    date: string;
    time: string;
    doctorFirst: string;
    doctorLast: string;
    patientFirst: string;
    patientLast: string;
};

function App() {
    const [appointments, setAppointments] = React.useState<Appointment[]>([]);
    const [showModal, setShowModal] = React.useState(false);

    // Fetches all appointments and updates variable
    function fetchAll() {
        fetch('http://localhost:5168/appointments')
            .then(results => results.json())
            .then(data => {
                setAppointments(data);
            }); 
    }

    React.useEffect(() => {
        fetchAll();
    }, [])

    function handleDelete(id: string) {
        fetch(`http://localhost:5168/appointments/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.ok) {
                    setAppointments(prev => prev.filter(app => app.id !== id));
                }
            });
    }


    return (
        <div className="App">
            <button onClick={() => setShowModal(true)}>+ New Appointment</button>
            {showModal && (
            <CreateAppointmentModal
                onClose={() => setShowModal(false)}
                onCreate={(newData) => {
                    fetch('http://localhost:5168/appointments', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newData),
                    })
                        .then(res => res.json())
                        .then(added => setAppointments(prev => [...prev, added]));
                }}
            />
)}
            

            <button onClick={fetchAll}>Refresh</button>
            <h2>Appointments</h2>
            <div id="appointments_container">
                {appointments.map((item, index) => (
                    <div key={index} className="appointment">
                        <div>{item.date} @ {item.time}</div>
                        <div>Doctor: {item.doctorFirst} {item.doctorLast}</div>
                        <div>Patient: {item.patientFirst} {item.patientLast}</div>
                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
