AutoKitty/KittenManager

This repository has 8 different functionality modules, and 5 feature modules that are used by them in the background. The syntax for use is: "node startKittenManager.js "functionality to use" "module specific parameters" "

It uses 16 gas by default (changeable in code, later on maybe it can be set in the config file/module). Uses a breeding fee of 0.008 by default, this needs to change if the fee is raised, or the transactions will be rejected(!).

To use the modules in this repository you will have to get the right kitten id text files into the "kittens" directory (the default ones are my own). https://github.com/EirikUlversoy/cryptokitties-download-all-cats can do this for you, after it finishes just copy all the resulting files into the "kittens" directory.

Genes and mutation combos are nearly up to date, and can be modified in the genedecoder and the mutation-dictionary-module modules.

After running "npm install" in both the main folder and the "fancyfier" subfolder, and having the correct kitten-id files, you should be ready to use any of the functionalities listed below:


FUNCTIONALITIES:

1. "node startKittenManager.js one-mutation "Trait" "Generation" "Max Cooldown(one cat)" T1(for tier 1, optional. Allows 1st level mutations in higher than generation one)"

Uses the simple-mutation-module.

This usage option finds mutation pairs. For generation 0 it uses a preset list to decide what genes are acceptable for use(goes for max gene possible, so R3 only genes get lower thresholds). For generations higher than 0 it uses cats with dominant genes as a default. It attempts to make the best pairs first, by score. So purebred cats will get priority. It chooses the cat with the fastest cooldown to be the mother. Argument 5 sets max cooldown for one of the cats but is optional. Used for speed.

2. "node startKittenManager.js all-mutations "Generation" "Max Cooldown (one cat)" T1(for tier 1, optional)"

Uses the simple-mutation-module.

This usage option finds all mutation pairs in a generation. It is useful for higher generation mutations that are rarer. Usage example: breed all T2 mutations for generation 1. It has a minimum demand of dominant genes just like option 1. It chooses the cat with the fastest cooldown to be the mother. Argument 5 sets max cooldown for one of the cats but is optional. Used for speed. Doesn't mutate Manx because it is so common/old. Can be changed in the code. Shows an overview of available mutations first, then does the actual mutation attempts. Numbers in the overview are not dependent on the cooldown setting, so the amount can vary if you are strict on cooldowns.

3. "node startKittenManager.js pure-mutation "Generation" "Already present mutations (used for higher generations)"

Uses the pure-mutation-module.

This usage option scores all cats of a generation against each other. At its current settings it prioritizes the highest combination of R2 and R3 mutations. To change these you will have to look at the code (for now). It stores these in a list of breeding pairs. These are put into '/kitten_pairs/saved_breeding_pairs.txt' by default. These can be used as input by the load-pairs functionality.

4. "node startKittenManager load-pairs"

Uses the simple-mutation-module.

Simply loads the pairs made with option 3 and breeds them directly. Can also use custom pairs, if they are saved in the correct format. It does some checks(related, can breed, etc) but it skips the "ownership" check.

5. "node startKittenManager buy-clock-cats "Price-roof(max price)" "Cat Amount"  "Minimum points" "Traits-filename(optional)""

Uses the buy-clock-cats-module.

The traits file should contain Traits separated by commas and no spaces, with a capital starting letter. Example: "Butterscotch,Vigilante". If the traits file is not included it will use the points. With the traitfile loaded it ignores the points. Cat amount decides how many cats to buy.

6. "node startKittenManager make-fancy-cat "Generation-from" "Generation-to" "Dominantcount"(R1 count usually) "Fancy-name" "

Uses the make-fancy-cat-module

This module finds the best fancy cat candidates. To add fancy cats you will have to add entries to the dictionary in the module itself. (in the function "startFancyCatProcess"). It has some default threshold values for what % is acceptable to breed, but it can be customized in the "fancyfier" module. This module will be becoming more user-friendly with time. Lulu, Purrspero, Raspoutine and Swish are included. Example usage: "node startKittenManager make-fancy-cat 2 5 2 Raspoutine". The Dominantcount argument is used for filtering cats - most people can set it at 0 or 1, it is mainly useful to reduce the amount of cats searched by pre-filtering them for needed traits. At higher generations it can make it very fast.

7. "node startKittenManager show-available-mutations "Generation" "

Uses show-available-mutations-module.

Shows all mutations possible for the generation by counting out both traits and displaying the lowest number. Outputs a list. Useful to see low gen mutation pairs. This is what is shown before the all-mutations mode runs.

8. "node startKittenManager send-cats "Filename" "Address"(optional) "

Uses send-cats-module.

Sends to strays for days account by default, change this in the config module file or give an address argument. Takes a list of catIDS separated by commas, and sends them to the address.

9. "node startKittenManager list-auctions "Filename" "Price" "

Uses list-auctions-module.

Lists kittens at a fixed price for a fixed amount of time. (which doesnt matter as the price is fixed). Might be improved at a later date. Can also be easily customized in the module itself for now. Filename is the file located under "kittens/cats_to_auction". The file should have kitten ids separated with commas.

10. "node startKittenManager trait-search "Trait" "Generation" "Cooldown" "

Uses trait-search-module.

Searches for cats with the highest score of a given trait (purebreds will be on top), within a given generation and with a given cooldown.
Example usage: "node startKittenManager trait-search Ragdoll 0 5"

SHARED MODULES:

fancyfier
- used for fancy chasing

transact-and-verify-module
- used to execute breeding actions. Eventually it should also contain auctions, sending cats and other transaction types.

utilities
- misc functions that are useful

mutation-dictionary-module
- Has all of the mutation combinations. This is where updated mutations should be put.

genedecoder
- Almost every functionality module uses this in some form. It does all the gene reading operations, and has a lot of different search functions. It also stores genename -> KAI notation mappings. 

breeder
- Has most of the breeding logic, and is used in many other modules.

kitten-loader
- Own module for the kitten input operations

auctioneer
- Small module used for triggering auction transactions. Can be put into the transact-and-verify-module eventually.

config-module
- Configuration options like addresses, but also the ABIs for all the contracts.

ak-comparators
- A few comparison functions that are used elsewhere

