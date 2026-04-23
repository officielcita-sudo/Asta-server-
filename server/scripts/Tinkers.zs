#Name: Tinkers.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Tinkers.zs'...");


//Other Items to be Smelted Down
mods.tconstruct.Melting.addRecipe(<liquid:iron> * 648, <extrautils2:spike_iron>, 400);
mods.tconstruct.Melting.addRecipe(<liquid:iron> * 540, <mob_grinding_utils:spikes>, 400);
mods.tconstruct.Melting.addRecipe(<liquid:gold> * 648, <extrautils2:spike_gold>, 400);

//slimydirt
recipes.addShaped(<tconstruct:slime_dirt>, [
  [<minecraft:slime_ball>, <minecraft:slime_ball>, <minecraft:slime_ball>],
  [<minecraft:slime_ball>, <minecraft:dirt>, <minecraft:slime_ball>],
  [<minecraft:slime_ball>, <minecraft:slime_ball>, <minecraft:slime_ball>]
]);
recipes.addShaped(<tconstruct:slime_dirt:1>, [
  [<tconstruct:edible:1>, <tconstruct:edible:1>, <tconstruct:edible:1>],
  [<tconstruct:edible:1>, <minecraft:dirt>, <tconstruct:edible:1>],
  [<tconstruct:edible:1>, <tconstruct:edible:1>, <tconstruct:edible:1>]
]);
recipes.addShaped(<tconstruct:slime_dirt:2>, [
  [<tconstruct:edible:2>, <tconstruct:edible:2>, <tconstruct:edible:2>],
  [<tconstruct:edible:2>, <minecraft:dirt>, <tconstruct:edible:2>],
  [<tconstruct:edible:2>, <tconstruct:edible:2>, <tconstruct:edible:2>]
]);
recipes.addShaped(<tconstruct:slime_dirt:3>, [
  [<tconstruct:edible:4>, <tconstruct:edible:4>, <tconstruct:edible:4>],
  [<tconstruct:edible:4>, <minecraft:dirt>, <tconstruct:edible:4>],
  [<tconstruct:edible:4>, <tconstruct:edible:4>, <tconstruct:edible:4>]
]);

//Compressed Block Smelting
mods.tconstruct.Melting.addRecipe(<liquid:stone> * 648, <extrautils2:compressedcobblestone>, 200);
mods.tconstruct.Melting.addRecipe(<liquid:stone> * 5832, <extrautils2:compressedcobblestone:1>, 350);
mods.tconstruct.Melting.addRecipe(<liquid:stone> * 52488, <extrautils2:compressedcobblestone:2>, 500);
mods.tconstruct.Melting.addRecipe(<liquid:stone> * 472392, <extrautils2:compressedcobblestone:3>, 650);
mods.tconstruct.Melting.addRecipe(<liquid:stone> * 4251528, <extrautils2:compressedcobblestone:4>, 800);
mods.tconstruct.Melting.addRecipe(<liquid:stone> * 38263752, <extrautils2:compressedcobblestone:5>, 950);

//Adds Dirt Melting To smeltery
mods.tconstruct.Melting.addRecipe(<liquid:dirt> * 648, <extrautils2:compresseddirt>, 200);
mods.tconstruct.Melting.addRecipe(<liquid:dirt> * 5832, <extrautils2:compresseddirt:1>, 350);
mods.tconstruct.Melting.addRecipe(<liquid:dirt> * 52488, <extrautils2:compresseddirt:2>, 500);
mods.tconstruct.Melting.addRecipe(<liquid:dirt> * 472392, <extrautils2:compresseddirt:3>, 650);

recipes.remove(<tconstruct:rack>);
recipes.addShaped(<tconstruct:rack>.withTag({textureBlock: {id: "minecraft:wooden_slab", Count: 1 as byte, Damage: 0 as short}}), [[<ore:slabWood>, <ore:stickWood>]]);

mods.tconstruct.Casting.addBasinRecipe(<minecraft:coal_block>, null, <liquid:coal>, 1296, false, 200);
mods.tconstruct.Casting.addBasinRecipe(<tconstruct:slime:1>, null, <liquid:blueslime>, 1296, false, 200);
mods.tconstruct.Casting.addBasinRecipe(<tconstruct:slime:2>, null, <liquid:purpleslime>, 1296, false, 200);

print("Initialized 'Tinkers.zs'");
