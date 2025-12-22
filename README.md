my personal portfolio website; built with react + vite and deployed with vercel.

still a work in progress.

you can run this website in your dev env with the following:

# 1. Clone the repo
git clone https://github.com/kevinclb/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variable for the LLM feature
export OPENAI_API_KEY=your_key_here
# Or create a .env file with: OPENAI_API_KEY=your_key_here

# 4. Run with Vercel dev (needed for /api/ask endpoint)
npx vercel dev

# Or just the frontend (no LLM feature):
npm run dev
