# 🍃 MongoDB Atlas Setup Guide (Required)

Since we are moving to a professional deployment, we need a cloud database. **MongoDB Atlas** is the industry standard and offers a **Forever Free** tier.

Follow these exact steps to get your **Connection String**.

### Step 1: Create Account
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Sign up (Google/GitHub login is fastest).
3.  Fill in the welcome questionnaire (you can select "Learning/Student").

### Step 2: Deploy Free Database
1.  On the dashboard, click **+ Create**.
2.  Select **M0 Free** (the free tier option).
3.  **Provider**: AWS.
4.  **Region**: Choose `mumbai` (closest to Sri Lanka) or `singapore`.
5.  Click **Create Deployment**.

### Step 3: Create Database User
1.  You will be asked to "Security Quickstart".
2.  **Username**: `admin`
3.  **Password**: Click "Autogenerate Secure Password" (COPY THIS NOW!).
    *   *Save this password safely, we need it in 2 minutes.*
4.  Click **Create Database User**.

### Step 4: Network Access
1.  In the "Network Access" section (still on Quickstart page).
2.  Keep "My Local Environment" selected.
3.  **IMPORTANT**: Also click **"Allow Access from Anywhere"** (0.0.0.0/0).
    *   *Why?* To let Vercel/Render connect to your database.
4.  Click **Finish and Close**.

### Step 5: Get Connection String
1.  On your Cluster dashboard, click **Connect** (Green button).
2.  Select **Drivers**.
3.  You will see a string like:
    `const uri = "mongodb+srv://admin:<db_password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";`
4.  **COPY THIS STRING.**

### Step 6: Send it to Me
Reply to me with the Connection String (replace `<db_password>` with your real password if you want, or just paste it and I will explain where to put it).

> **Note**: I cannot proceed with the final deployment until we have this string.
