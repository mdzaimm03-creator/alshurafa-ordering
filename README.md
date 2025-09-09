
# Al Shurafa Ordering (React + WhatsApp COD)

## 1) Edit WhatsApp Number
Open `src/config.js` and change:
```
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";
```
Use your country code without plus sign.

## 2) Deploy on Vercel
- Import this repo on Vercel
- Build command: `npm run build`
- Output directory: `build` (Create React App default)

## Notes
- The Order page creates a WhatsApp message with cart summary + address. You receive it on your WhatsApp.
- COD only (no online payment).
