#!/bin/bash
#
# audioSprite.sh
# requires SoX (available from http://sox.sourceforge.net/)
#
# Generate an audio spritesheet in wav format and json metadata file from the given input files in wav format
# inputs: a list of wav files (you can use wildcards, e.g. *.wav, but be careful you don't include a previous out.wav!)
#    The JSON object's properties are the base names of the files, so you should take care that no two files have the 
#      same name when the path and extension are removed or the JSON produced will be invalid.
#    e.g. audioSprite.sh *.wav
# outputs: 
#    out.json: a JSON file with the following structure (overwrites previous file at out.json):
#        { 
#            filename: {
#                s: 12.125572, //the position of this sprite in the spritesheet, in seconds
#                d: 1.451254  //the duration of this sprite, in seconds
#            },
#            ...
#        }
#    out.wav: the generated audio sprite. Use oggenc2, lame etc to compress to the required production format(s).
#

# options
channels=1
tmpdir='/tmp/audiosprite'
paddeddir='padded'
padding='0.4'
outfile='out.wav'
jsonfile='out.json'

if [[ -f $outfile || -d $outfile ]]; then
    read -p $outfile' already exists: overwrite (y/n)? '
    if [[ "$REPLY" != "y" ]]; then
        echo $REPLY
        echo 'audioSprite aborted'
        exit 0
    fi
fi

if [[ -f $jsonfile || -d $jsonfile ]]; then
    read -p $jsonfile' already exists: overwrite (y/n)? '
    if [[ "$REPLY" != "y" ]]; then
        echo $REPLY
        echo 'audioSprite aborted'
        exit 0
    fi
fi

>$outfile       #ensure outfile exists and is empty

jsondata='{'
offset=0        #cumulative offset
first=true
lastfile=''

mkdir -p $tmpdir'/'$paddeddir

sox -n -c $channels $outfile trim 0 0  #write an empty wav file to wavfile
for f in $@     #loop over inputs to generate JSON
do
    if [[ "$f" != "$outfile" ]]; then
        # len is the length of this sprite
        len=`soxi -D $f`

        # no comma before the first property in JSON
        if [[ ! $first ]]; then
            jsondata=$jsondata','
        else
            first=false
        fi

        # find the base name of the input file
        filename=`basename $f .wav`

        # append JSON
        jsondata=$jsondata'"'$filename'":{"s":'$offset',"d":'$(echo $len' + 0.8' | bc)'}'

        # add the length of this sound plus the padding to the offset
        offset=$(echo $offset' + '$len' + '$padding' + '$padding | bc)

        # write the current sound with padding on both ends to tmpdir/padded/filename.wav
        sox $f $tmpdir'/'$paddeddir'/'$filename'.wav' pad $padding $padding
        
        if [[ "$lastfile" == "" ]]; then
            # move the padded sound to tmpdir/filename
            cp $tmpdir'/'$paddeddir'/'$filename'.wav' $tmpdir'/'$filename'.wav'
        else
            # concat tmpdir/lastfilename and the padded sound to tmpdir/filename
            sox $lastfile $tmpdir'/'$paddeddir'/'$filename'.wav' $tmpdir'/'$filename'.wav'
        fi
        
        #set up for next iteration
        lastfile=$tmpdir'/'$filename'.wav'
    fi
done

jsondata=$jsondata'}'

#write the output files
echo $jsondata > $jsonfile
mv $lastfile $outfile

rm -rf $tmpdir