const fetch = require('node-fetch');

const eipServiceSid = process.env.TWILIO_EIP_SERVICE_SID;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const encodedCreds = Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64');

module.exports = {
    getToken: async (transcriptSid, userId) => {
        const rsp = await fetch(
            'https://preview.twilio.com/transcriptions/Tokens/Generate',
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${encodedCreds}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service_sid: eipServiceSid,
                    transcript_sid: transcriptSid,
                    metadata: {
                        userId
                    }
                })
            }
        );

        if (rsp.ok) {
            const { token } = await rsp.json();
            return token;
        } else {
            throw new Error('failed to generate token');
        }
    },

    getTranscripts: async () => {
        const rsp = await fetch(
            `https://preview.twilio.com/transcriptions/Services/${eipServiceSid}/Transcripts`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Basic ${encodedCreds}`,
                },
            }
        )

        if (rsp.ok) {
            const { transcripts } = await rsp.json();
            return transcripts;
        } else {
            throw new Error('failed to fetch transcripts');
        } 
    },
};