#!/bin/bash

# Set PYTHONPATH to include directories from sys.path
export PYTHONPATH="/Library/Frameworks/Python.framework/Versions/3.9/lib/python39.zip:/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9:/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/lib-dynload:/Users/sammyfrankel/Library/Python/3.9/lib/python/site-packages:/Library/Frameworks/Python.framework/Versions/3.9/lib/python3.9/site-packages"

# Run Java command with specified environment variables
/usr/bin/env \
PYTHONPATH="$PYTHONPATH" \
/Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home/bin/java @/var/folders/ch/sxhxbs9565x95rpfg11fq3y00000gn/T/cp_divc1tgi003ja4k9i4wcmv7bt.argfile Data