//server.js
const express = require("express");
const mysql = require('mysql');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})



app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Query Error: ", err);
            return res.status(500).json({ message: "Database query failed", error: err });
        }
        console.log("Data Inserted: ", data);
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email,req.body.password ], (err, data) => {
        if (err) {
            console.error("Query Error: ", err);
            return res.status(500).json({ message: "Database query failed", error: err });
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});

app.get('/', (req, res) => {
    return res.json("From Backend side");
});

app.post('/studentrecords', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `course`, `year_level`, `time_in`, `time_out` , `date`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.course,
        req.body.year_level,
        req.body.time_in,
        req.body.time_out,
        req.body.date
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Query Error: ", err);
            return res.status(500).json({ message: "Database query failed", error: err });
        }
        console.log("Data Inserted: ", data);
        return res.json(data);
    });
});

// API endpoint to fetch data
app.get('/records', async (req, res) => {
    const sql = "SELECT id, name, email, course, year_level, time_in, time_out, date FROM student_info";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get('/userperhour', async (req, res) => {
    // Use explicit casting if needed
    const sql = `
        SELECT 
            Date, 
            TimeRange, 
            CAST(ABM AS SIGNED) as ABM, 
            CAST(ACMAN AS SIGNED) as ACMAN,
            CAST(ADA AS SIGNED) as ADA,
            CAST(AMPSY AS SIGNED) as AMPSY,
            CAST(BIO AS SIGNED) as BIO,
            CAST(BMCS AS SIGNED) as BMCS,
            CAST(CS AS SIGNED) as CS,
            CAST(CE AS SIGNED) as CE,
            CAST(CS_O AS SIGNED) as CS_O,
            CAST(IE AS SIGNED) as IE,
            CAST(IE_O AS SIGNED) as IE_O,
            CAST(\`IS\` AS SIGNED) as \`IS\`,
            CAST(IT AS SIGNED) as IT,
            CAST(GrandTotal AS SIGNED) as GrandTotal
        FROM usercountsperhour
    `;
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Database Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        
        console.log("Sample database record:", data[0]);
        return res.json(data);
    });
});

app.get('/usersperprogram', async (req, res) => {
    // Use explicit casting if needed
    const sql = `
        SELECT 
            Date, 
            CAST(ABM AS SIGNED) as ABM, 
            CAST(ACMAN AS SIGNED) as ACMAN,
            CAST(ADA AS SIGNED) as ADA,
            CAST(AMPSY AS SIGNED) as AMPSY,
            CAST(BIO AS SIGNED) as BIO,
            CAST(BMCS AS SIGNED) as BMCS,
            CAST(CS AS SIGNED) as CS,
            CAST(CE AS SIGNED) as CE,
            CAST(CS_O AS SIGNED) as CS_O,
            CAST(IE AS SIGNED) as IE,
            CAST(IE_O AS SIGNED) as IE_O,
            CAST(\`IS\` AS SIGNED) as \`IS\`,
            CAST(IT AS SIGNED) as IT,
            CAST(GrandTotal AS SIGNED) as GrandTotal
        FROM usersperprogram
    `;
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Database Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        
        console.log("Sample database record:", data[0]);
        return res.json(data);
    });
});
app.listen(8081, ()=> {
    console.log("listening")
})


db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to the database");
    }
});
