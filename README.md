AutoKitty/KittenManager

This repository has 8 different functionality modules, and 5 feature modules that are used by them in the background. The syntax for use is: "node startKittenManager.js "functionality to use" "module specific parameters" "

It uses 16 gas by default (changeable in code, later on maybe it can be set in the config file/module). Uses a breeding fee of 0.008 by default, this needs to change if the fee is raised, or the transactions will be rejected(!).

To use the modules in this repository you will have to get the right kitten id text files into the "kittens" directory (the default ones are my own). https://github.com/EirikUlversoy/cryptokitties-download-all-cats can do this for you, after it finishes just copy all the resulting files into the "kittens" directory.

Genes and mutation combos are nearly up to date, and can be modified in the genedecoder and the mutation-dictionary-module modules.

After running "npm install" in both the main folder and the "fancyfier" subfolder, and having the correct kitten-id files, you should be ready to use it

