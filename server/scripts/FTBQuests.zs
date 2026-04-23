#Name: FTBQuests.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'FTBQuests.zs'...");

recipes.remove(<ftbquests:chest>);
<ftbquests:chest>.addTooltip(format.darkRed("Disabled due to bug!"));


print("Initialized 'FTBQuests.zs'");
