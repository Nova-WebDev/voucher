FROM voucher-python-base:latest

WORKDIR /app

COPY . .

CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
