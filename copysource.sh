#!/bin/bash

sed -e 's"export"// export"g' ../voiceeditor/src/voice.js > voice.js
sed -e 's"export"// export"g' ../voiceeditor/src/voicebutton.js > voicebutton.js
cp ../voiceeditor/public/voicedata.json .

