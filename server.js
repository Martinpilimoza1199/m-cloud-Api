const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 8080;

// Data zako za Supabase
const supabaseUrl = 'https://ftqxafzcoipouiygxulh.supabase.co';
const supabaseKey = 'Sb_publishable_yTQY-Q5Hb36e1g4QHWazqg_Ktt2Emcx';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send('M-Cloud Server is LIVE on Cloud!');
});

// Sehemu ya kupokea SMS
app.post('/api/sms', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sms_logs')
            .insert([req.body]);
            
        if (error) throw error;
        res.json({ status: 'success', message: 'Imeingia Cloud!' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
