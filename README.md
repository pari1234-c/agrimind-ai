# AgriMind AI – Intelligent Crop Recommendation Agent

## Project Title
**AgriMind AI – Intelligent Crop Recommendation Agent**

## Problem Statement
Farmers and agricultural practitioners often face challenges in determining the most suitable crops for their specific land conditions. Incorrect crop selection can lead to poor yields, financial losses, and soil degradation. There is a need for an accessible, data-driven system to guide agricultural decisions based on environmental and soil parameters.

## Objectives
- To develop an AI-driven agent capable of evaluating multiple agricultural parameters.
- To recommend the most suitable crops based on a multidimensional suitability algorithm.
- To provide a modern, easy-to-use, and highly accessible web interface for end-users.
- To deploy the solution on a reliable cloud platform (Vercel) for global availability.

## Features
- **AI Agent Workflow:** Simulates an intelligent agent that receives inputs, validates data, evaluates against a knowledge base, and formulates recommendations.
- **Agricultural Parameters Input:** Collects Nitrogen, Phosphorus, Potassium, Temperature, Humidity, Soil pH, and Rainfall.
- **Suitability Ranking:** Calculates and presents a percentage-based suitability score for the top 3 recommended crops.
- **Agent Execution Trace:** A real-time transparent log showing the internal steps the AI Agent takes to formulate the recommendation.
- **Modern Responsive UI:** Built with React, Tailwind CSS, and Lucide icons for an aesthetically pleasing dashboard.

## Technologies Used
- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** Next.js API Routes (Serverless Functions)
- **Deployment:** Vercel
- **Icons:** Lucide React

## System Architecture
1. **User Interface (Client):** A React-based responsive form collects 7 key environmental parameters.
2. **API Route (Serverless Backend):** The Next.js API route `/api/recommend` receives the data.
3. **AI Agent Logic (Algorithm):** Evaluates the inputs against an internal crop profile database utilizing a normalized distance-scoring algorithm to calculate suitability.
4. **Response Generation:** The agent returns a JSON payload containing the ranked crops, generated explanation, and execution trace.
5. **Presentation (Client):** The UI dynamically updates to display the recommendations, confidence bars, and the agent's thought process.

## Installation Steps
1. Make sure Node.js (v18+) is installed.
2. Clone or extract the project repository.
3. Open a terminal in the project directory (`agrimind-ai`).
4. Run `npm install` to install all dependencies.
5. Run `npm run dev` to start the local development server.
6. Open your browser and navigate to `http://localhost:3000`.

## Usage Instructions
1. Open the application.
2. In the "Soil & Environment" panel, enter your local soil parameters (e.g., N: 90, P: 42, K: 43).
3. Enter environmental parameters (e.g., Temperature: 25, Humidity: 80, pH: 6.5, Rainfall: 200).
4. Click the "Recommend Crops" button.
5. Observe the "Agent Execution Trace" to see the agent's real-time processing.
6. Review the Top 3 crop recommendations and read the provided explanation.

## Deployment Instructions (Vercel)
This project is pre-configured for Vercel deployment. No local-only dependencies (like Python's Gradio) are used, making it 100% serverless-ready.

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AgriMind AI"
   ```
   - Create a new repository on GitHub and push the code there.

2. **Deploy on Vercel:**
   - Log in to your [Vercel account](https://vercel.com).
   - Click "Add New..." -> "Project".
   - Import the GitHub repository you just created.
   - Vercel will automatically detect the framework as **Next.js**.
   - Click **Deploy**. Vercel will automatically build the project and assign a public live URL (e.g., `https://agrimind-ai.vercel.app`).
   - No environment variables are required for the base recommendation engine.

## Limitations
- The current knowledge base contains a predefined set of 10 crops (Rice, Maize, Wheat, Cotton, Sugarcane, Chickpea, Kidney Beans, Pigeon Peas, Mango, Coffee).
- The suitability score is calculated via a heuristic algorithm mapping against optimal ranges, rather than a predictive machine learning model trained on large-scale historical yields.
- Designed as an educational prototype; results should be verified by soil tests and experts in a real-world scenario.

## Future Scope
- **Machine Learning Integration:** Replace the heuristic algorithm with a TensorFlow.js or Scikit-Learn (via external Python API) trained model on the full Crop Recommendation Dataset.
- **Weather API Integration:** Automatically fetch current Temperature, Humidity, and Rainfall using the user's geolocation.
- **Extended Knowledge Base:** Add hundreds of new crop varieties, fertilizers, and pesticide recommendations.

---
### Viva Demonstration Tips
During your college presentation:
1. **Show the UI first:** Input a valid set of data (e.g. N: 90, P: 42, K: 43, Temp: 25, Hum: 80, pH: 6.5, Rain: 200). 
2. **Highlight the Agent Trace:** Point out the dark terminal window showing how the "AI Agent" receives, validates, scans, and computes the data.
3. **Explain the Architecture Shift:** Mention that you started with a Python/Gradio script, but to achieve a professional, globally scalable application, you migrated the agent logic into a Next.js Serverless framework suitable for Vercel.
4. **Discuss the Algorithm:** Briefly explain that the agent compares user inputs to optimal crop boundaries and calculates a percentage suitability score.
