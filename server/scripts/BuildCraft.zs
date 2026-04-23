#Name: BuildCraft.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'BuildCraft.zs'...");


recipes.remove(<buildcraftcore:marker_connector>);
recipes.addShaped(<buildcraftcore:marker_connector>, [
  [<minecraft:redstone_torch>],
  [<ore:gearWood>],
  [<buildcraftcore:wrench>]
]);

mods.jei.JEI.removeAndHide(<buildcraftcore:gear_wood>);
mods.jei.JEI.removeAndHide(<buildcraftcore:gear_stone>);
mods.jei.JEI.removeAndHide(<buildcraftcore:gear_iron>);
mods.jei.JEI.removeAndHide(<buildcraftcore:gear_gold>);
mods.jei.JEI.removeAndHide(<buildcraftcore:gear_diamond>);


print("Initialized 'BuildCraft.zs'");
