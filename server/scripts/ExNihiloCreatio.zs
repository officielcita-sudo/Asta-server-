#Name: ExNihiloCreatio.zs
#Author: Feed the Beast and Sunekaer

print("Initializing 'ExNihiloCreatio.zs'...");


//remove vanilla trees seeds, as there saplings drops from dirt broken with stone crook
mods.jei.JEI.removeAndHide(<exnihilocreatio:item_seed_oak>);
mods.jei.JEI.removeAndHide(<exnihilocreatio:item_seed_spruce>);
mods.jei.JEI.removeAndHide(<exnihilocreatio:item_seed_birch>);
mods.jei.JEI.removeAndHide(<exnihilocreatio:item_seed_jungle>);
mods.jei.JEI.removeAndHide(<exnihilocreatio:item_seed_acacia>);
mods.jei.JEI.removeAndHide(<exnihilocreatio:item_seed_darkoak>);
mods.jei.JEI.removeAndHide(<exnihilocreatio:block_end_cake>);


mods.jei.JEI.removeAndHide(<exnihilocreatio:crook_stone>);

//end cake
mods.jei.JEI.removeAndHide(<exnihilocreatio:item_material:7>);

recipes.addShaped(<exnihilocreatio:hammer_stone>, [
  [null, <ore:cobblestone>, null],
  [null, <ore:rodStone>, <ore:cobblestone>],
  [<ore:rodStone>, null, null]
]);

recipes.remove(<exnihilocreatio:hammer_wood>);
recipes.addShaped(<exnihilocreatio:hammer_wood>, [
  [null, <ore:plankWood>, null],
  [null, <ore:stickWood>, <ore:plankWood>],
  [<ore:stickWood>, null, null]
]);

recipes.remove(<exnihilocreatio:block_axle_stone>);
recipes.addShaped(<exnihilocreatio:block_axle_stone>, [
  [<ore:rodStone>, <ore:rodStone>, <ore:rodStone>],
  [<ore:gearStone>, <ore:gearStone>, <ore:gearStone>],
  [<ore:rodStone>, <ore:rodStone>, <ore:rodStone>]
]);


//removing Stone Rod favouriting tinkers Stone Rod
mods.jei.JEI.removeAndHide(<exnihilocreatio:item_material:6>);

furnace.remove(<exnihilocreatio:item_ore_aluminium:3>, <exnihilocreatio:item_ore_aluminium:1>);
furnace.remove(<exnihilocreatio:item_ore_aluminium:3>, <exnihilocreatio:item_ore_aluminium:2>);
furnace.addRecipe(<thermalfoundation:material:132>, <exnihilocreatio:item_ore_aluminium:1>);
furnace.addRecipe(<thermalfoundation:material:132>, <exnihilocreatio:item_ore_aluminium:2>);


print("Initialized 'ExNihiloCreatio.zs'");
