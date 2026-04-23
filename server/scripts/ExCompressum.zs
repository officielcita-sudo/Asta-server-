#Name: ExCompressum.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'ExCompressum.zs'...");


//Theres already Iron mesh from exnihilocreatio
mods.jei.JEI.removeAndHide(<excompressum:iron_mesh>);

//Removing Uncompressed Coal favoriting tiny coal from ActuallyAdditions
mods.jei.JEI.removeAndHide(<excompressum:uncompressed_coal>);

//recipe conflict cow bait
recipes.remove(<excompressum:bait:2>);
recipes.addShaped(<excompressum:bait:2>, [
  [null, <minecraft:wheat>],
  [<minecraft:wheat>, null]
]);

mods.jei.JEI.removeAndHide(<excompressum:compressed_block:5>);

recipes.addShapeless(<excompressum:bait:10>, [
  <ore:fish>, <minecraft:snowball>
]);
recipes.addShapeless(<excompressum:bait:11>, [
  <ore:cropWheat>, <ore:listAllsugar>
]);
recipes.addShapeless(<excompressum:bait:12>, [
  <ore:dyeRed>, <ore:dyeGreen>
]);

mods.jei.JEI.removeAndHide(<excompressum:compressed_block:1>);
mods.jei.JEI.removeAndHide(<excompressum:compressed_block:2>);
mods.jei.JEI.removeAndHide(<excompressum:compressed_block:3>);
mods.jei.JEI.removeAndHide(<excompressum:compressed_block:4>);
recipes.removeByRecipeName("excompressum:compressed_cobblestone_unpack");
recipes.removeByRecipeName("excompressum:compressed_gravel_unpack");
recipes.removeByRecipeName("excompressum:compressed_sand_unpack");
recipes.removeByRecipeName("excompressum:compressed_dirt_unpack");


print("Initialized 'ExCompressum.zs'");
