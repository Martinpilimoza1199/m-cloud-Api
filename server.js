const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
// Render hutoa PORT yenyewe, 8080 ni mbadala tu
const PORT = process.env.PORT || 8080;

// Data zako za Supabase (Zimebaki zile zile)
const supabaseUrl = 'https://ftqxafzcoipouiygxulh.supabase.co';
const supabaseKey = 'Sb_publishable_yTQY-Q5Hb36e1g4QHWazqg_Ktt2Emcx';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Ukurasa wa nyumbani wa Seva
app.get('/', (req, res) => {
    res.send('M-Cloud Server is LIVE on Cloud!');
});

// 1. SEHEMU YA KUPOKEA SMS (Kutoka kwenye simu/App kwenda Cloud)
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

// 2. SEHEMU YA KUSOMA SMS (Inayotumiwa na App yako kuonyesha list ya SMS)
// Hii ndiyo njia (Route) iliyokuwa inasababisha "Cannot GET /api/pwa/sms"
app.get('/api/pwa/sms', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sms_logs')
            .select('*')
            .order('created_at', { ascending: false }); // Inapanga kuanzia mpya zaidi

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Sehemu ya picha (Kama utaitumia baadae)
app.get('/api/pwa/images', (req, res) => {
    res.json([]); // Kwa sasa inarudisha list tupu
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
