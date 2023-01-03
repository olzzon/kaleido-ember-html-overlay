# VSM controlled - KALEIDO HTML OVERLAY

Generate you own HTML overlay for your video stream.

### Using CasparCG and Decklink with Internal Keying support

run "kaleido-ember-win-x64.exe" on your CasparCG machine.
Setup Decklink to use internal keyer (only some Decklink cards support this)

Call command:
play 1-11 [html] http://localhost:3000

Calling layout from Lawo Ember viewer:
run ember viewer.
Add connection:
localhost: 9000

### Changing layout
The htmloverlay-settings.json i located in your homefolder, and can be edited. Changes can be seen live either in CCG or in a browser using "http://localhost:3000"
The file will be crerated with defualt layout at first run.

### Settings Format
The htmloverlay-settings.json file has this structure, and a default is created at first run.
(comments in versal)
```
{
    "globalSettings": {
        "fontFamily": "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
        "borderWidth": "2px",
        "borderRadius": "5px"
    },
    "sources": [
        {
SOURCE ELEMENTS ARE LABELS AND TALLY FIELD WITHIN A SOURCE:
            "sourceElements": [
                {
CLOCK ELEMENTS MUST INCLUDE A clockTimeZone AND clockFormat:
                    "clockTimeZone": "Europe/Copenhagen",
                    "clockFormat": "dk",
                    "height": 150,
                    "width": 900,
                    "positionX": 10,
                    "positionY": 100,
                    "color": "#ffffff",
                    "fontSizePercentage": 110,
                    "backgroundColor": "#000000aa"
                },
LABEL ELEMENTS MUST INCLUDE A labelIndex (Ember label 1-4)
                {
                    "labelIndex": 0,
                    "height": 30,
                    "width": 200,
                    "positionX": 210,
                    "positionY": 490,
                    "color": "#ffffff",
                    "backgroundColor": "#000000aa"
                },
                {
                    "labelIndex": 1,
                    "height": 30,
                    "width": 200,
                    "positionX": 490,
                    "positionY": 490,
                    "color": "#ffffff",
                    "backgroundColor": "#000000aa"
                },
                {
                    "labelIndex": 2,
                    "height": 30,
                    "width": 20,
                    "positionX": 180,
                    "positionY": 490,
                    "color": "#ff0000",
                    "backgroundColor": "transparent",
TALLY INDEX MUST INCLUDE THE INDEX OF THE TALLY & COLOR IN THE TALLYCOLORS ARRAY:
                    "tallyIndex": 0
                },
                {
                    "labelIndex": 3,
                    "height": 30,
                    "width": 20,
                    "positionX": 700,
                    "positionY": 490,
                    "color": "#ff0000",
                    "backgroundColor": "transparent",
                    "tallyIndex": 1
                }
            ],
EMBER STATE INDEX IS THE INDEX OF THE EMBER STATE IN THE EMBER STATES ARRAY IN THE SOURCE, IF NOT SET, THE EMBER STATE WILL BE HIDDEN, THIS IS THE REFERENCE TO THE EMBER STATE
            "emberStateIndex": 0,
            "positionX": 1,
            "positionY": 2,
            "width": 952,
            "height": 532,
            "tallyColors": [
                "red",
                "green",
                "blue",
                "yellow"
            ]
        },
        {
            "sourceElements": [
        
        ...
        ...
        ...

    ]
}
 ```
