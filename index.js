require('dotenv').config();
const server = require('./server');
const PORT = process.env.PORT || 3000;

console.log(`🔌 App corriendo en modo ${process.env.NODE_ENV} en http://0.0.0.0:${PORT}`);
server.listen(PORT, () => {
  console.log(`✅ Servidor vivo en http://0.0.0.0:${PORT}`);
});
