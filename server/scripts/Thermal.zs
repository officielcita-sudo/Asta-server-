#Name: Thermal.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Thermal.zs'...");


//Coal coke
recipes.remove(<thermalfoundation:material:802>);
recipes.addShapeless(<thermalfoundation:material:802>*9, [<ore:blockFuelCoke>]);

recipes.remove(<thermalfoundation:storage_resource:1>);
recipes.addShaped(<thermalfoundation:storage_resource:1>, [
  [<thermalfoundation:material:802>, <thermalfoundation:material:802>, <thermalfoundation:material:802>],
  [<thermalfoundation:material:802>, <thermalfoundation:material:802>, <thermalfoundation:material:802>],
  [<thermalfoundation:material:802>, <thermalfoundation:material:802>, <thermalfoundation:material:802>]
]);

//Gears
recipes.remove(<thermalfoundation:material:23>);
recipes.addShaped(<thermalfoundation:material:23>, [
  [null, <ore:stone>, null],
  [<ore:stone>, null, <ore:stone>],
  [null, <ore:stone>, null]
]);

recipes.remove(<thermalfoundation:material:24>);
recipes.addShaped(<thermalfoundation:material:24>, [
  [null, <ore:ingotIron>, null],
  [<ore:ingotIron>, <thermalfoundation:material:23>, <ore:ingotIron>],
  [null, <ore:ingotIron>, null]
]);

recipes.remove(<thermalfoundation:material:25>);
recipes.addShaped(<thermalfoundation:material:25>, [
  [null, <ore:ingotGold>, null],
  [<ore:ingotGold>, <thermalfoundation:material:23>, <ore:ingotGold>],
  [null, <ore:ingotGold>, null]
]);

recipes.remove(<thermalfoundation:material:26>);
recipes.addShaped(<thermalfoundation:material:26>, [
  [null, <ore:gemDiamond>, null],
  [<ore:gemDiamond>, <thermalfoundation:material:23>, <ore:gemDiamond>],
  [null, <ore:gemDiamond>, null]
]);

recipes.remove(<thermalfoundation:material:27>);
recipes.addShaped(<thermalfoundation:material:27>, [
  [null, <ore:gemEmerald>, null],
  [<ore:gemEmerald>, <thermalfoundation:material:23>, <ore:gemEmerald>],
  [null, <ore:gemEmerald>, null]
]);

recipes.remove(<thermalfoundation:material:256>);
recipes.addShaped(<thermalfoundation:material:256>, [
  [null, <ore:ingotCopper>, null],
  [<ore:ingotCopper>, <thermalfoundation:material:23>, <ore:ingotCopper>],
  [null, <ore:ingotCopper>, null]
]);

recipes.remove(<thermalfoundation:material:257>);
recipes.addShaped(<thermalfoundation:material:257>, [
  [null, <ore:ingotTin>, null],
  [<ore:ingotTin>, <thermalfoundation:material:23>, <ore:ingotTin>],
  [null, <ore:ingotTin>, null]
]);

recipes.remove(<thermalfoundation:material:258>);
recipes.addShaped(<thermalfoundation:material:258>, [
  [null, <ore:ingotSilver>, null],
  [<ore:ingotSilver>, <thermalfoundation:material:23>, <ore:ingotSilver>],
  [null, <ore:ingotSilver>, null]
]);

recipes.remove(<thermalfoundation:material:259>);
recipes.addShaped(<thermalfoundation:material:259>, [
  [null, <ore:ingotLead>, null],
  [<ore:ingotLead>, <thermalfoundation:material:23>, <ore:ingotLead>],
  [null, <ore:ingotLead>, null]
]);

recipes.remove(<thermalfoundation:material:260>);
recipes.addShaped(<thermalfoundation:material:260>, [
  [null, <ore:ingotAluminum>, null],
  [<ore:ingotAluminum>, <thermalfoundation:material:23>, <ore:ingotAluminum>],
  [null, <ore:ingotAluminum>, null]
]);

recipes.remove(<thermalfoundation:material:261>);
recipes.addShaped(<thermalfoundation:material:261>, [
  [null, <ore:ingotNickel>, null],
  [<ore:ingotNickel>, <thermalfoundation:material:23>, <ore:ingotNickel>],
  [null, <ore:ingotNickel>, null]
]);

recipes.remove(<thermalfoundation:material:262>);
recipes.addShaped(<thermalfoundation:material:262>, [
  [null, <ore:ingotPlatinum>, null],
  [<ore:ingotPlatinum>, <thermalfoundation:material:23>, <ore:ingotPlatinum>],
  [null, <ore:ingotPlatinum>, null]
]);

recipes.remove(<thermalfoundation:material:263>);
recipes.addShaped(<thermalfoundation:material:263>, [
  [null, <ore:ingotIridium>, null],
  [<ore:ingotIridium>, <thermalfoundation:material:23>, <ore:ingotIridium>],
  [null, <ore:ingotIridium>, null]
]);

recipes.remove(<thermalfoundation:material:264>);
recipes.addShaped(<thermalfoundation:material:264>, [
  [null, <ore:ingotMithril>, null],
  [<ore:ingotMithril>, <thermalfoundation:material:23>, <ore:ingotMithril>],
  [null, <ore:ingotMithril>, null]
]);

recipes.remove(<thermalfoundation:material:288>);
recipes.addShaped(<thermalfoundation:material:288>, [
  [null, <ore:ingotSteel>, null],
  [<ore:ingotSteel>, <thermalfoundation:material:23>, <ore:ingotSteel>],
  [null, <ore:ingotSteel>, null]
]);

recipes.remove(<thermalfoundation:material:289>);
recipes.addShaped(<thermalfoundation:material:289>, [
  [null, <ore:ingotElectrum>, null],
  [<ore:ingotElectrum>, <thermalfoundation:material:23>, <ore:ingotElectrum>],
  [null, <ore:ingotElectrum>, null]
]);

recipes.remove(<thermalfoundation:material:290>);
recipes.addShaped(<thermalfoundation:material:290>, [
  [null, <ore:ingotInvar>, null],
  [<ore:ingotInvar>, <thermalfoundation:material:23>, <ore:ingotInvar>],
  [null, <ore:ingotInvar>, null]
]);

recipes.remove(<thermalfoundation:material:291>);
recipes.addShaped(<thermalfoundation:material:291>, [
  [null, <ore:ingotBronze>, null],
  [<ore:ingotBronze>, <thermalfoundation:material:23>, <ore:ingotBronze>],
  [null, <ore:ingotBronze>, null]
]);

recipes.remove(<thermalfoundation:material:292>);
recipes.addShaped(<thermalfoundation:material:292>, [
  [null, <ore:ingotConstantan>, null],
  [<ore:ingotConstantan>, <thermalfoundation:material:23>, <ore:ingotConstantan>],
  [null, <ore:ingotConstantan>, null]
]);

recipes.remove(<thermalfoundation:material:293>);
recipes.addShaped(<thermalfoundation:material:293>, [
  [null, <ore:ingotSignalum>, null],
  [<ore:ingotSignalum>, <thermalfoundation:material:23>, <ore:ingotSignalum>],
  [null, <ore:ingotSignalum>, null]
]);

recipes.remove(<thermalfoundation:material:294>);
recipes.addShaped(<thermalfoundation:material:294>, [
  [null, <ore:ingotLumium>, null],
  [<ore:ingotLumium>, <thermalfoundation:material:23>, <ore:ingotLumium>],
  [null, <ore:ingotLumium>, null]
]);

recipes.remove(<thermalfoundation:material:295>);
recipes.addShaped(<thermalfoundation:material:295>, [
  [null, <ore:ingotEnderium>, null],
  [<ore:ingotEnderium>, <thermalfoundation:material:23>, <ore:ingotEnderium>],
  [null, <ore:ingotEnderium>, null]
]);

mods.thermalexpansion.Pulverizer.removeRecipe(<minecraft:cobblestone>);
mods.thermalexpansion.Pulverizer.removeRecipe(<minecraft:gravel>);
mods.thermalexpansion.Pulverizer.addRecipe(<minecraft:gravel>, <minecraft:cobblestone>, 4000);
mods.thermalexpansion.Pulverizer.addRecipe(<minecraft:dirt>, <minecraft:gravel>, 4000);
mods.thermalexpansion.Pulverizer.addRecipe(<minecraft:sand>, <minecraft:dirt>, 4000);
mods.thermalexpansion.Pulverizer.addRecipe(<exnihilocreatio:block_dust>, <minecraft:sand>, 4000);

//mods.thermalexpansion.Insolator.addRecipe(IItemStack primaryOutput, IItemStack primaryInput, IItemStack secondaryInput, int energy, @Optional IItemStack secondaryOutput, @Optional int secondaryChance);
mods.thermalexpansion.Insolator.addRecipe(<mysticalagriculture:grains_of_infinity_essence>, <thermalfoundation:fertilizer>, <mysticalagriculture:grains_of_infinity_seeds>, 9600, <mysticalagriculture:grains_of_infinity_seeds>, 100);
mods.thermalexpansion.Insolator.addRecipe(<mysticalagriculture:grains_of_infinity_essence> *2, <thermalfoundation:fertilizer:1>, <mysticalagriculture:grains_of_infinity_seeds>, 14400, <mysticalagriculture:grains_of_infinity_seeds>, 100);
mods.thermalexpansion.Insolator.addRecipe(<mysticalagriculture:grains_of_infinity_essence> *3, <thermalfoundation:fertilizer:2>, <mysticalagriculture:grains_of_infinity_seeds>, 19200, <mysticalagriculture:grains_of_infinity_seeds>, 100);

//TP Steel recipe
recipes.addShaped(<thermalfoundation:material:160> * 2, [
 [<minecraft:coal:1>, <minecraft:coal:1>, <minecraft:coal:1>],
 [<minecraft:iron_ingot>, <tp:stone_hammer>, <minecraft:iron_ingot>],
 [<minecraft:coal:1>, <minecraft:coal:1>, <minecraft:coal:1>]
]);
recipes.addShaped(<thermalfoundation:material:160> * 2, [
 [<minecraft:coal>, <minecraft:coal>, <minecraft:coal>],
 [<minecraft:iron_ingot>, <tp:stone_hammer>, <minecraft:iron_ingot>],
 [<minecraft:coal>, <minecraft:coal>, <minecraft:coal>]
]);

mods.thermalexpansion.InductionSmelter.removeRecipe(<minecraft:sand>, <exnihilocreatio:item_ore_aluminium:2>);
mods.thermalexpansion.InductionSmelter.removeRecipe(<thermalfoundation:material:865>, <exnihilocreatio:item_ore_aluminium:1>);
mods.thermalexpansion.InductionSmelter.removeRecipe(<thermalfoundation:material:866>, <exnihilocreatio:item_ore_aluminium:1>);
mods.thermalexpansion.InductionSmelter.removeRecipe(<minecraft:sand>, <exnihilocreatio:item_ore_aluminium:1>);

mods.thermalexpansion.InductionSmelter.addRecipe(<thermalfoundation:material:132>*3, <thermalfoundation:material:866>, <exnihilocreatio:item_ore_aluminium:1>, 4000, <thermalfoundation:material:865>, 75);
mods.thermalexpansion.InductionSmelter.addRecipe(<thermalfoundation:material:132>*3, <thermalfoundation:material:865>, <exnihilocreatio:item_ore_aluminium:1>, 4000, <thermalfoundation:material:864>, 75);
mods.thermalexpansion.InductionSmelter.addRecipe(<thermalfoundation:material:132>*2, <minecraft:sand>, <exnihilocreatio:item_ore_aluminium:1>, 4000, <thermalfoundation:material:865>, 5);
mods.thermalexpansion.InductionSmelter.addRecipe(<thermalfoundation:material:132>, <minecraft:sand>, <exnihilocreatio:item_ore_aluminium:2>, 4000, <thermalfoundation:material:864>, 75);

mods.thermalexpansion.Pulverizer.removeRecipe(<minecraft:netherrack>);
mods.thermalexpansion.Pulverizer.addRecipe(<exnihilocreatio:block_netherrack_crushed>, <minecraft:netherrack>, 4000);
mods.thermalexpansion.Pulverizer.addRecipe(<exnihilocreatio:block_endstone_crushed>, <minecraft:end_stone>, 4000);

recipes.addShapeless(<thermalfoundation:material:16>,
  [<translocators:diamond_nugget>]
);

recipes.addShapeless(<thermalfoundation:material:1>, [<ore:oreGold>, <immersiveengineering:tool>]);
recipes.addShapeless(<thermalfoundation:material:64>, [<ore:oreCopper>, <immersiveengineering:tool>]);
recipes.addShapeless(<thermalfoundation:material:65>, [<ore:oreTin>, <immersiveengineering:tool>]);
recipes.addShapeless(<thermalfoundation:material:69>, [<ore:oreNickel>, <immersiveengineering:tool>]);
recipes.addShapeless(<thermalfoundation:material:70>, [<ore:oreplatinum>, <immersiveengineering:tool>]);
recipes.addShapeless(<thermalfoundation:material:71>, [<ore:oreIridium>, <immersiveengineering:tool>]);

mods.thermalexpansion.Enchanter.removeRecipe(<minecraft:book>, <minecraft:arrow>);

recipes.addShaped(<thermalfoundation:material:33> * 3, [
  [<ore:ingotGold>, <ore:ingotGold>, <ore:ingotGold>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShaped(<thermalfoundation:material:320> * 3, [
  [<ore:ingotCopper>, <ore:ingotCopper>, <ore:ingotCopper>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShaped(<thermalfoundation:material:322> * 3, [
  [<ore:ingotSilver>, <ore:ingotSilver>, <ore:ingotSilver>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShaped(<thermalfoundation:material:323> * 3, [
  [<ore:ingotLead>, <ore:ingotLead>, <ore:ingotLead>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShaped(<thermalfoundation:material:324> * 3, [
  [<ore:ingotAluminum>, <ore:ingotAluminum>, <ore:ingotAluminum>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShaped(<thermalfoundation:material:352> * 3, [
  [<ore:ingotSteel>, <ore:ingotSteel>, <ore:ingotSteel>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShaped(<thermalfoundation:material:353> * 3, [
  [<ore:ingotElectrum>, <ore:ingotElectrum>, <ore:ingotElectrum>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShaped(<thermalfoundation:material:356> * 3, [
  [<ore:ingotConstantan>, <ore:ingotConstantan>, <ore:ingotConstantan>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:321>, [<ore:ingotTin>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:321> * 3, [
  [<ore:ingotTin>, <ore:ingotTin>, <ore:ingotTin>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:326>, [<ore:ingotPlatinum>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:326> * 3, [
  [<ore:ingotPlatinum>, <ore:ingotPlatinum>, <ore:ingotPlatinum>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:327>, [<ore:ingotIridium>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:327> * 3, [
  [<ore:ingotIridium>, <ore:ingotIridium>, <ore:ingotIridium>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:328>, [<ore:ingotMithril>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:328> * 3, [
  [<ore:ingotMithril>, <ore:ingotMithril>, <ore:ingotMithril>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:354>, [<ore:ingotInvar>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:354> * 3, [
  [<ore:ingotInvar>, <ore:ingotInvar>, <ore:ingotInvar>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:355>, [<ore:ingotBronze>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:355> * 3, [
  [<ore:ingotBronze>, <ore:ingotBronze>, <ore:ingotBronze>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:357>, [<ore:ingotSignalum>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:357> * 3, [
  [<ore:ingotSignalum>, <ore:ingotSignalum>, <ore:ingotSignalum>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:358>, [<ore:ingotLumium>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:358> * 3, [
  [<ore:ingotLumium>, <ore:ingotLumium>, <ore:ingotLumium>],
  [null, null, null],
  [null, null, null]
]);

recipes.addShapeless(<thermalfoundation:material:359>, [<ore:ingotEnderium>, <immersiveengineering:tool>]);
recipes.addShaped(<thermalfoundation:material:359> * 3, [
  [<ore:ingotEnderium>, <ore:ingotEnderium>, <ore:ingotEnderium>],
  [null, null, null],
  [null, null, null]
]);


print("Initialized 'Thermal.zs'");
