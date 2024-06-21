import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path'

const app = express();
const PORT = 3000;
const DB_FILE = path.resolve(__dirname, './db.json');
const dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));

app.use(express.json());

 // 1. PING CALLING ENDPOINT
app.get('/ping', (req: Request, res: Response) => {
    res.json({ success: true });
});

// 2. SUBMITTING ENDPOINT 
app.post('/submit', (req: Request, res: Response) => {
    try {
        const { name, email, phone, github_link, stopwatch_time } = req.body;
        const newSubmission = { name, email, phone, github_link, stopwatch_time };

        const submissions = dbData.submissions.filter((submission: any) => submission.email === email);

        if (submissions.length !== 0) 
          return   res.status(500).json({ message: 'Email Already Exist ', submission: newSubmission });
        
        dbData.submissions.push(newSubmission);

        fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2));

        res.status(201).json({ message: 'Submission saved successfully', submission: newSubmission });
    } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ message: 'Failed to save submission', error: error instanceof Error ? error.message : "Unknown error occurred" });
    }
});



// 3. Retrieval of Data thorugh Queries --> email , index 
app.get('/read', (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;
        const index = Number(req.query.index);



        if (email) {

            const submissions = dbData.submissions.filter((submission: any) => submission.email === email);

            if (submissions.length === 0) {
                return res.status(404).json({ message: 'No submissions found for the given email' });
            }

            res.json(submissions[0]);
        }




        if (index < 0 || index >= dbData.submissions.length) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        else {

            const submissions = dbData.submissions[index]
            return res.json(submissions);
        }




    } catch (error: any) {
        console.error('Error reading submissions by email:', error);
        res.status(500).json({ message: 'Failed to read submissions', error: error instanceof Error ? error.message : "Unknown error occurred" });
    }
    
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});