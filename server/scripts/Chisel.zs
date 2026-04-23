#Name: Chisel.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Chisel.zs'...");


mods.jei.JEI.removeAndHide(<chisel:block_charcoal2:1>);

recipes.addShaped(<chisel:basalt2:7> *8, [
  [<ore:stone>, <ore:stone>, <ore:stone>],
  [<ore:stone>, <ore:dyeBlack>, <ore:stone>],
  [<ore:stone>, <ore:stone>, <ore:stone>]
]);

recipes.addShaped(<chisel:limestone2:7> *8, [
  [<ore:stone>, <ore:stone>, <ore:stone>],
  [<ore:stone>, <ore:dyeYellow>, <ore:stone>],
  [<ore:stone>, <ore:stone>, <ore:stone>]
]);

recipes.addShaped(<chisel:marble2:7> *8, [
  [<ore:stone>, <ore:stone>, <ore:stone>],
  [<ore:stone>, <ore:dyeWhite>, <ore:stone>],
  [<ore:stone>, <ore:stone>, <ore:stone>]
]);

print("Initialized 'Chisel.zs'");
