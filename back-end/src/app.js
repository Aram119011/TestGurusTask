const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const blockRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/api', blockRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
