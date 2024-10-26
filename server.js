import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://festusekuruemu:cNAze7ud2Jio97JN@cluster0.83dqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Define the Sensor Data Schema and Model
const sensorDataSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    co: Number,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

// POST Route to Receive Sensor Data
app.post('/sensor-data', async (req, res) => {
    const { temperature, humidity, co } = req.body;

    try {
        const newSensorData = new SensorData({ temperature, humidity, co });
        await newSensorData.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
