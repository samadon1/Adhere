# Adhere

Adhere is an AI-powered medication adherence assistant that uses computer vision to help patients stay on schedule and personalize their healthcare journey.

![Adhere thumb](https://github.com/user-attachments/assets/e4c83b37-5a0c-4217-8977-8133ba52f386)


## Problem

Poor medication adherence leads to over $500 billion in healthcare costs in the United States alone. Currently, there's no effective way for real-time monitoring and intervention to improve adherence rates.

## Solution

Adhere is an AI assistant application that leverages computer vision technology to:

1. Help patients stay on their medication schedule
2. Personalize patient journeys
3. Provide real-time monitoring and intervention

## Features

- Computer vision-based medication recognition
- Personalized medication reminders
- Real-time adherence tracking
- AI-powered intervention suggestions
- User-friendly mobile application interface

## Team

- Godwin Chan
- Samuel Donkor

## Project Status

This project was developed during the AI + Global Health Hack event in September 2024. It is currently in prototype stage.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- pip
- npm or yarn

### Backend Setup (FastAPI)

1. Clone the repository:
   ```
   git clone https://github.com/your-username/adhere.git
   cd adhere/backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

The backend should now be running on `http://localhost:8000`.

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install dependencies:
   ```
   npm install
   # or, if using yarn:
   # yarn install
   ```

3. Start the React development server:
   ```
   npm start
   # or, if using yarn:
   # yarn start
   ```

The frontend should now be running on `http://localhost:3000`.

## Contributing

We welcome contributions to the Adhere project! Please read our contributing guidelines to get started.

## License

(License information would go here)

## Acknowledgements

- AI + Global Health Hack organizers
- OKB Hope Foundation
- All mentors and judges who provided valuable feedback

For more information or to get involved, please contact [contact information].
