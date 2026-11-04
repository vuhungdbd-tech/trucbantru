export default async function handler(req, res) {
  // Thay thế URL Web App Google Apps Script của bạn vào đây
  const GOOGLE_SCRIPT_URL = "https://script.google.com/a/~/macros/s/AKfycbzSvpvf6fR7HMn1kdyGNfVQUz6y8o4yhiRNAZ6_Gj5IrfugWBKaleE3SKwxaRPY6SWFdA/exec";

  if (req.method === 'POST') {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
