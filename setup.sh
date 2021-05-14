#!/bin/bash
echo "Initiating setup";
cat .env.example >> .env
sudo npm -g i npm@latest
npm install
mkdir -p fileSystem/{certificateTemplates,csvTemplates}
mkdir keys
mkdir src/scripts/{generated_certificates}
cd src/scripts
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ../..
echo "Finished setup";
