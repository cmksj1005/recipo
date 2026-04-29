# Recipo 🍳

🔗 Live Demo: https://recipo.ca

## Overview

Recipo is an AI-powered web application that converts YouTube cooking videos into structured recipes.  
Users can simply paste a video URL, and the application extracts key information such as the recipe title, ingredients, and step-by-step instructions.

This project demonstrates my ability to build a full-stack application integrating modern frontend frameworks, backend APIs, and AI services.

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **AI Integration:** OpenAI API
- **Data Processing:** YouTube Transcript Extraction
- **Deployment:** Microsoft Azure
- **Version Control:** GitHub

## Features

### AI-Powered Recipe Extraction

- Converts YouTube cooking videos into structured recipes
- Automatically detects non-cooking content
- Generates recipe title, ingredients, and instructions

### Clean User Interface

- Simple and intuitive input (Google-style search bar)
- Displays embedded video alongside generated recipe
- Fast and responsive user experience

### Structured Data Processing

- Designed a strict output format for consistent AI responses
- Transforms unstructured transcript data into clean, readable recipes

### API Integration

- Handles client → server → AI request flow
- Uses asynchronous processing for efficient data handling

### Error Handling

- Prevents invalid inputs (non-cooking videos)
- Provides feedback to users when extraction fails

## How It Works

1. User inputs a YouTube video URL
2. The application extracts the video transcript
3. The transcript is sent to the OpenAI API
4. AI processes the content and returns structured data
5. The frontend displays the recipe and video

## Purpose

The goal of this project is to demonstrate my ability to build a complete, production-ready application that integrates AI with modern web technologies.
