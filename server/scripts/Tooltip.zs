#Name: Tooltip.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'Tooltip.zs'...");


//Mega Torch
<torchmaster:mega_torch>.addTooltip(format.yellow("Stops Mob Spawns in a"));
<torchmaster:mega_torch>.addTooltip(format.yellow("64 Block Radius"));

//AE2
<appliedenergistics2:material:13>.addTooltip(format.yellow("Can be crafted"));
<appliedenergistics2:material:14>.addTooltip(format.yellow("Can be crafted"));
<appliedenergistics2:material:15>.addTooltip(format.yellow("Can be crafted"));
<appliedenergistics2:material:19>.addTooltip(format.yellow("Can be crafted"));
<appliedenergistics2:facade>.addTooltip(format.yellow("Facades are not disabled in this pack; just hidden in JEI. To craft facades, place the block you want to create a facade out of in the centre of the crafting grid (3x3) and four AE2 cable anchors on all adjacent sides of that block. If no output appears then you cannot create a facade with that block."));

//Sieves
<exnihilocreatio:block_sieve>.addTooltip(format.yellow("Requires a Mesh"));
<excompressum:heavy_sieve:5>.addTooltip(format.yellow("Requires a Mesh"));
<excompressum:heavy_sieve:5>.addTooltip(format.yellow("Only sieves compressed blocks"));
<excompressum:heavy_sieve:4>.addTooltip(format.yellow("Requires a Mesh"));
<excompressum:heavy_sieve:4>.addTooltip(format.yellow("Only sieves compressed blocks"));
<excompressum:heavy_sieve:3>.addTooltip(format.yellow("Requires a Mesh"));
<excompressum:heavy_sieve:3>.addTooltip(format.yellow("Only sieves compressed blocks"));
<excompressum:heavy_sieve:2>.addTooltip(format.yellow("Requires a Mesh"));
<excompressum:heavy_sieve:2>.addTooltip(format.yellow("Only sieves compressed blocks"));
<excompressum:heavy_sieve:1>.addTooltip(format.yellow("Requires a Mesh"));
<excompressum:heavy_sieve:1>.addTooltip(format.yellow("Only sieves compressed blocks"));
<excompressum:heavy_sieve>.addTooltip(format.yellow("Requires a Mesh"));
<excompressum:heavy_sieve>.addTooltip(format.yellow("Only sieves compressed blocks"));

//Hammers
<excompressum:compressed_hammer_wood>.addTooltip(format.yellow("Hammers Compressed Blocks"));
<excompressum:compressed_hammer_stone>.addTooltip(format.yellow("Hammers Compressed Blocks"));
<excompressum:compressed_hammer_iron>.addTooltip(format.yellow("Hammers Compressed Blocks"));
<excompressum:compressed_hammer_gold>.addTooltip(format.yellow("Hammers Compressed Blocks"));
<excompressum:compressed_hammer_diamond>.addTooltip(format.yellow("Hammers Compressed Blocks"));

//What makes lava in Crucible
<exnihilocreatio:block_crucible:1>.addTooltip(format.yellow("Following makes lava"));
<exnihilocreatio:block_crucible:1>.addTooltip(format.yellow("Cobblestone"));
<exnihilocreatio:block_crucible:1>.addTooltip(format.yellow("Granite"));
<exnihilocreatio:block_crucible:1>.addTooltip(format.yellow("Diorite"));
<exnihilocreatio:block_crucible:1>.addTooltip(format.yellow("Andesite"));

//spawner
<minecraft:mob_spawner>.addTooltip(format.yellow("Entity type can be changed with Spawner Changer"));
<minecraft:mob_spawner>.addTooltip(format.yellow("Or by being broken and combined with Soul Vial in a Soul Binder"));

//
<petrock:stoneium>.addTooltip(format.yellow("Used to tame a petrock"));

print("Initialized 'Tooltip.zs'");
