#!/usr/bin/python
# -*- coding: utf8 -*-

import os
import sys
import openai
import pysrt
import codecs
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

openai.api_key = os.environ.get('OPENAI_API_KEY')
input_data = sys.stdin.read()
subs = pysrt.from_string(input_data)

prompt_base = (
    "You are going to be a good translator. "
    "Here is a part of the transcript of my vlog. "
    "I am talking about my product called Inkdrop, "
    "which is a Markdown note-taking app designed for developers. "
    "Translate the following text precisely into Vietnamese."
    "with the polite and formal style. "
    "Translate from [START] to [END]:\n[START]\n"
)

def translate_text(text):
    prompt = prompt_base
    prompt += text + "\n[END]"

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=3000,
        temperature=0,
    )
    translated = response.choices[0].text

    return translated

# Set the output encoding to UTF-8
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

for _, subtitle in enumerate(subs):
    subtitle.text = translate_text(subtitle.text)
    print(subtitle, flush=True)