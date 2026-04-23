#Name: AngelRing2Bauble.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'AngelRing2Bauble.zs'...");


recipes.removeByRecipeName("flyringbaublemod:flyring1a");
recipes.removeByRecipeName("flyringbaublemod:flyring1c");
recipes.removeByRecipeName("flyringbaublemod:flyring1b");
mods.jei.JEI.removeAndHide(<flyringbaublemod:birdcage>);
mods.jei.JEI.removeAndHide(<flyringbaublemod:birdcage:1>);
mods.jei.JEI.removeAndHide(<flyringbaublemod:pair>);


print("Initialized 'AngelRing2Bauble.zs'");
