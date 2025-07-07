import React from 'react';

type AppointmentInput = {
    date: string;
    time: string;
    doctorFirst: string;
    doctorLast: string;
    patientFirst: string;
    patientLast: string;
};

type Props = {
    onClose: () => void;
    onCreate: (newAppointment: AppointmentInput) => void;
};

export default function CreateAppointmentModal({ onClose, onCreate }: Props) {
    const [form, setForm] = React.useState<AppointmentInput>({
        date: '',
        time: '',
        doctorFirst: '',
        doctorLast: '',
        patientFirst: '',
        patientLast: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onCreate(form);
        onClose(); // Close the modal after submission
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Create Appointment</h3>
                <form id="appointment_form" onSubmit={handleSubmit}>
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                    <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                    <input placeholder="Doctor First" value={form.doctorFirst} onChange={(e) => setForm({ ...form, doctorFirst: e.target.value })} />
                    <input placeholder="Doctor Last" value={form.doctorLast} onChange={(e) => setForm({ ...form, doctorLast: e.target.value })} />
                    <input placeholder="Patient First" value={form.patientFirst} onChange={(e) => setForm({ ...form, patientFirst: e.target.value })} />
                    <input placeholder="Patient Last" value={form.patientLast} onChange={(e) => setForm({ ...form, patientLast: e.target.value })} />
                    <div>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

