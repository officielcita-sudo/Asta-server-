#Name: AppliedEnergistics2.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'AppliedEnergistics2.zs'...");

//import mods.appliedenergistics2.Grinder;

//Recipe conflict
recipes.removeShapeless(<appliedenergistics2:material:3> * 2, [<ore:oreQuartz>, <ore:dustPetrotheum>]);
mods.jei.JEI.removeAndHide(<appliedenergistics2:material:40>);

recipes.addShaped(<appliedenergistics2:facade>.withTag({damage: 0, item: "minecraft:glass"}), [
  [null, <appliedenergistics2:part:120>, null],
  [<appliedenergistics2:part:120>, <minecraft:glass>, <appliedenergistics2:part:120>],
  [null, <appliedenergistics2:part:120>, null]
]);

mods.thermalexpansion.InductionSmelter.addRecipe(<appliedenergistics2:material:15>, <thermalfoundation:storage_alloy:2>, <minecraft:gold_ingot>, 1500);
mods.thermalexpansion.InductionSmelter.addRecipe(<appliedenergistics2:material:14>, <thermalfoundation:storage_alloy:2>, <minecraft:diamond>, 1500);
mods.thermalexpansion.InductionSmelter.addRecipe(<appliedenergistics2:material:13>, <thermalfoundation:storage_alloy:2>, <appliedenergistics2:material>, 1500);
mods.thermalexpansion.InductionSmelter.addRecipe(<appliedenergistics2:material:19>, <thermalfoundation:storage_alloy:2>, <appliedenergistics2:material:5>, 1500);
mods.thermalexpansion.InductionSmelter.addRecipe(<appliedenergistics2:material:19>, <thermalfoundation:storage_alloy:2>, <enderio:item_material:5>, 1500);

mods.extrautils2.Crusher.add(<appliedenergistics2:material:2>, <appliedenergistics2:material>);
mods.extrautils2.Crusher.add(<appliedenergistics2:material:3>, <minecraft:quartz>);
mods.extrautils2.Crusher.add(<appliedenergistics2:material:8>, <appliedenergistics2:material:7>);
mods.extrautils2.Crusher.add(<appliedenergistics2:material:46>, <minecraft:ender_pearl>);

//grinder not accepting wheat, even tho the recipe shows in jei
mods.appliedenergistics2.Grinder.removeRecipe(<minecraft:wheat>);
mods.appliedenergistics2.Grinder.addRecipe(<appliedenergistics2:material:4>, <minecraft:wheat>, 4);
mods.appliedenergistics2.Grinder.addRecipe(<actuallyadditions:item_misc:5>, <actuallyadditions:block_misc:3> ,4);


print("Initialized 'AppliedEnergistics2.zs'");
