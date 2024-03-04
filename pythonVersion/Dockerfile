FROM python:3.9-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir streamlit pandas plotly matplotlib mpld3

EXPOSE 8501

ENV NAME World

CMD ["streamlit", "run", "app.py"]
