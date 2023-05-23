# -*- coding: utf-8 -*-
import os
import openai
import sys
import codecs
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

openai.api_key = os.environ.get('OPENAI_API_KEY')
video_id = sys.argv[1]
audio_file_path = os.path.join(os.getcwd(), "tmp", video_id + ".m4a")

audio_file = open(audio_file_path, "rb")
transcript = openai.Audio.transcribe(
    file=audio_file,
    model="whisper-1",
    response_format='srt',
    prompt=(
        'I am a programmer. My name is LocSon. '
        'This is a code translate tool, etc. '
        'I study at the University of Science, Vietnam National University, Ho Chi Minh City.'
    )
)
# Set the output encoding to UTF-8
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())
print(transcript)