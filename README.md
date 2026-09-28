# Doctor Booking App — Full Stack (Backend + Frontend + Admin/Doctor Panel)

Is zip me teen alag apps hain:

```
backend/    -> Node.js + Express + MongoDB API (payment ke saath)
frontend/   -> Patient-facing website (jo pehle se tha, ab real backend se connected hai)
admin/      -> Admin panel + Doctor panel (ek hi app, do alag-alag logins)
```

Teeno alag process hain, teeno ko **alag-alag terminal me** run karna hoga.

---

## 1) Backend setup (`backend/`)

```bash
cd backend
npm install
cp .env.example .env
```

`.env` file kholo aur ye values bharo:

| Variable | Kahan se milega |
|---|---|
| `MONGODB_URI` | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) me free cluster bana lo, "Connect > Drivers" se URI copy karo (bina database name ke — code khud `/doctor-booking` append karta hai) |
| `JWT_SECRET` | Koi bhi lamba random string likh do |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin panel me login karne ke liye — jo chaho wahi rakho |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | [Razorpay Dashboard → API Keys](https://dashboard.razorpay.com/app/keys) se (test mode keys free hain) |

Phir run karo:

```bash
npm run server   # nodemon ke saath (auto-restart), ya
npm start        # normal
```

Backend `http://localhost:4000` par chalega. Doctor/user images `http://localhost:4000/uploads/...` par serve hoti hain.

---

## 2) Patient frontend setup (`frontend/`)

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` me:
```
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx   # same key_id jo backend me daala
```

```bash
npm run dev
```

Yeh `http://localhost:5173` par chalega — patients yahan account banayenge, doctor browse karenge, slot book karenge, aur "Pay Online" se Razorpay se payment karenge.

---

## 3) Admin + Doctor panel setup (`admin/`)

```bash
cd admin
npm install
cp .env.example .env
```

`.env` me:
```
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

Yeh `http://localhost:5174` par chalega. Login screen par do options hain:
- **Admin** — backend `.env` ke `ADMIN_EMAIL` / `ADMIN_PASSWORD` se login karo. Yahan se naya doctor add karo (photo ke saath — yahi photo patient side pe dikhti hai), sab doctors/appointments dekho.
- **Doctor** — jab admin ek doctor add karta hai, wahi email/password se doctor is panel me login kar sakta hai (bilkul alag session/token — patient ya admin se koi mix-up nahi hota). Doctor apne appointments dekh sakta hai, complete/cancel kar sakta hai, apni fee/address edit kar sakta hai.

---

## Kaise use karein (end-to-end test)

1. Backend + admin + frontend teeno start karo.
2. Admin panel (`localhost:5174`) me Admin login karo, "Add Doctor" se ek doctor add karo (image upload zaroor karo).
3. Patient frontend (`localhost:5173`) kholo — wahi doctor list me dikhega, uski photo bhi dikhegi.
4. Naya patient account banao, doctor select karo, slot book karo.
5. "My Appointments" me jaake "Pay Online" click karo — Razorpay test checkout khulega (test card details Razorpay docs me milte hain).
6. Wapas Doctor panel (usi doctor ke email/password se login) kholo — wahi appointment "Doctor Appointments" me dikhega, "Complete" kar sakte ho.

---

## Kya-kya bana hai (summary)

- **Teen alag login/roles**: Patient (`token`), Doctor (`dtoken`), Admin (`atoken`) — teeno ke liye alag JWT, alag middleware, alag routes.
- **Images**: Multer se upload hoti hain, backend `/uploads` folder me save hoti hain aur `/uploads/<file>` URL se static serve hoti hain — isliye har jagah (doctor list, doctor profile, appointments, patient profile) image sahi se show hoti hai.
- **Payment**: Razorpay order create + verify — patient "My Appointments" se pay karta hai, payment hone ke baad appointment "Paid" ho jaata hai.
- **Admin**: doctor add/list, sab appointments dekhna/cancel karna, dashboard stats.
- **Doctor**: apne appointments dekhna, complete/cancel karna, apni profile (fee/address/availability) update karna, dashboard stats.

## Deploy karte waqt

- Backend kahin bhi (Render, Railway, VPS) deploy karo, `.env` wahi set karo.
- `frontend/.env` aur `admin/.env` me `VITE_BACKEND_URL` ko backend ke live URL se replace karo, phir `npm run build` karke `dist/` folder ko kisi static host (Vercel/Netlify) par daal do.
- Production me Razorpay ke live keys use karo (`rzp_live_...`), test keys nahi.
