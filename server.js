const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
// Render hutoa PORT yenyewe, 8080 ni mbadala tu
const PORT = process.env.PORT || 8080;

// Data zako za Supabase
const supabaseUrl = 'https://ftqxafzcoipouiygxulh.supabase.co';
const supabaseKey = 'Sb_publishable_yTQY-Q5Hb36e1g4QHWazqg_Ktt2Emcx';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Ukurasa wa nyumbani wa Seva
app.get('/', (req, res) => {
    res.send('M-Cloud Server is LIVE on Cloud!');
});

/**
 * 1. SEHEMU YA KUPOKEA SMS
 * Inatumika kutuma SMS kutoka kwenye simu kwenda Supabase
 */
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

/**
 * 2. SEHEMU YA KUSOMA SMS (Route mpya)
 * Inatumiwa na App yako ya Netlify kuonyesha list ya SMS
 */
app.get('/api/pwa/sms', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sms_logs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Sehemu ya picha (Inarudisha list tupu kwa sasa)
app.get('/api/pwa/images', (req, res) => {
    res.json([]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
