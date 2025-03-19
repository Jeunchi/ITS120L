const sdk = require("node-appwrite");

const client = new sdk.Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("67d957050035ac972c15")
    .setKey("standard_bec29db743ef1c8e1d18682d25febb7726958c93caed451ed962c45f1a055a757b5379c4cb82edcf4c717fab133c8b384b9ea0c37accf5dbaca2ad4aaf8c438fbc8992fd57946338a2621e4f31d96014b112a329b48e11aec8f373c34feca80f9306b7dc5b6904dc83906fe45bd881838b99ab6b4cc50f64d707132a77e1f107");

const database = new sdk.Databases(client);

async function updatePerCourse() {
    try {
        // Fetch student logs
        let logs = await database.listDocuments("67da12c50024066b85ca"); // studentlog

        let groupedData = {};

        logs.documents.forEach(log => {
            let date = log.date;  // Ensure 'date' exists in studentlog
            let course = log.course;

            if (!groupedData[date]) {
                groupedData[date] = { Date: date, GrandTotal: 0 };
            }

            if (!groupedData[date][course]) {
                groupedData[date][course] = 0;
            }

            groupedData[date][course]++;
            groupedData[date].GrandTotal++;
        });

        // Insert or update records in percourse
        for (let date in groupedData) {
            await database.createDocument(
                "67da3ede0001bb8fe393", // percourse collection ID
                "unique()",  // Auto-generate ID
                groupedData[date]
            );
        }

        console.log("Student records updated successfully in percourse.");
    } catch (error) {
        console.error("Error updating percourse:", error);
    }
}

updatePerCourse();
