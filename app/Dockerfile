# Use the official Python 3.9 image
FROM python:3.9

# Set the working directory
WORKDIR /usr/src/app

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libc-dev \
    libjpeg-dev \
    zlib1g-dev \
    libgeos-dev \
    libgdal-dev \
    libffi-dev \
    && apt-get clean

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 4. Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# 5. Copy project files
COPY . .

# 6. Expose port
EXPOSE 8000

# 7. Run with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
