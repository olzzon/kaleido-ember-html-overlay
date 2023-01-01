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


