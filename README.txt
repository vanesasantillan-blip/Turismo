TRAVELAI - ASISTENTE INTELIGENTE DE TURISMO

ARCHIVOS
- public/index.html: estructura de la página.
- public/styles.css: diseño y adaptación a celulares.
- public/script.js: chat, validación, historial y modo oscuro.
- server.js: servidor que conecta la página con la IA.
- .env.example: ejemplo de configuración de la clave.
- package.json: dependencias y comando para iniciar.

REQUISITOS
1. Instalar Node.js.
2. Abrir una terminal dentro de la carpeta TravelAI.
3. Ejecutar: npm install
4. Crear un archivo llamado .env copiando el contenido de .env.example.
5. Colocar en OPENAI_API_KEY una clave propia de la API de OpenAI.
6. Ejecutar: npm start
7. Abrir http://localhost:3000 en el navegador.

IMPORTANTE
La clave de API es privada. No la escribas en public/script.js, no la compartas
y no subas el archivo .env a GitHub. El uso de la API puede tener costos y
requiere que la cuenta tenga acceso y facturación configurados.

El historial de chat se guarda en sessionStorage, por lo que se conserva durante
la sesión del navegador y se borra al cerrar la sesión. El modo oscuro también
se conserva durante la sesión.

Para publicar la web en internet se necesita un servicio que permita ejecutar
Node.js (un hosting estático como GitHub Pages no ejecuta server.js).
