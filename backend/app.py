from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime
import os
from fastapi.middleware.cors import CORSMiddleware
import shutil
import google.generativeai as genai
import base64
from PIL import Image
from google.generativeai.types import HarmCategory, HarmBlockThreshold

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "./uploads/"
GEMINI_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  

genai.configure(api_key=GEMINI_API_KEY)

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.post("/upload-pill")
async def upload_pill(pill_image: UploadFile = File(...)):
    """
    Endpoint to upload the pill image
    """
    try:
        file_path = os.path.join(UPLOAD_FOLDER, pill_image.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(pill_image.file, buffer)

        return {"message": "Pill image uploaded successfully!", "pill_image_uri": file_path}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to upload image")

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.post("/verify-pill")
async def verify_pill(reference_image: UploadFile = File(...), captured_image: UploadFile = File(...)):
    """
    Endpoint to verify the captured pill against the reference pill using Gemini AI
    """
    try:
        print("Saving reference and captured images...")
        reference_path = os.path.join(UPLOAD_FOLDER, reference_image.filename)
        captured_path = os.path.join(UPLOAD_FOLDER, captured_image.filename)

        with open(reference_path, "wb") as buffer:
            shutil.copyfileobj(reference_image.file, buffer)
        with open(captured_path, "wb") as buffer:
            shutil.copyfileobj(captured_image.file, buffer)

        ref_img = Image.open(reference_path)
        cap_img = Image.open(captured_path)

        model = genai.GenerativeModel('gemini-1.5-flash')

        prompt = """
        Compare the two pill images provided. Perform the following analysis:
        1. Count the number of pills visible in each image.
        2. Identify and compare the colors of the pills.
        3. Describe the shape and size of the pills.
        4. Note any distinguishing features, such as markings, textures, or logos.
        5. Determine if the pills in both images appear to be the same based on the above characteristics.
        Provide a detailed explanation of similarities and differences.
        """

        safety_settings = {
            # HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,  
            # HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE, 
            # HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, 
            # HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE 
        }

        print("Sending request to Gemini AI model with adjusted safety settings...")
        response = model.generate_content([prompt, ref_img, cap_img], safety_settings=safety_settings)

        print("Processing response from Gemini AI model...")
        analysis = response.text

      
        match = "+++" in analysis.lower() or "similar characteristics" in analysis.lower()

        return {
            "match": match,
            "analysis": analysis
        }

    except Exception as e:
        print(f"Error during verification: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to verify pill: {str(e)}")
